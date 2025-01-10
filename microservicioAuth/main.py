from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import pymysql
import jwt
import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from requests_oauthlib import OAuth2Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse


# Configuración de la base de datos
db = pymysql.connect(
    host="localhost",
    user="root",
    password="root",
    db="BookMyEvent",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

# Inicialización de la aplicación FastAPI
app = FastAPI(
    title="Authentication API",
    description="API for user authentication and management.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL de la aplicación frontend
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Modelo Pydantic para el registro de usuarios
class User(BaseModel):
    name: str
    email: str
    password: str

# Carga de variables de entorno
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "defaultsecretkey")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_jwt_token(data: dict):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    data.update({"exp": expiration})
    token = jwt.encode(data, SECRET_KEY, algorithm="HS256")
    return token

@app.post("/login")
async def login(user_data: User):
    cursor = db.cursor()
    try:
        # Buscar el usuario en la base de datos
        query = "SELECT * FROM user WHERE email=%s"
        cursor.execute(query, (user_data.email,))
        existing_user = cursor.fetchone()

        if not existing_user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Comparar contraseña
        if existing_user["password"] != user_data.password:
          raise HTTPException(status_code=401, detail="Contraseña incorrecta")
        
        token = create_jwt_token({"sub": existing_user["email"]})
        return {"access_token": token, "token_type": "bearer"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()


# Endpoint para registrar un nuevo usuario
@app.post("/register")
async def register(user_data: User):
    try: 
        cursor = db.cursor()
        query = "INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (user_data.name, user_data.email, user_data.password))
        db.commit()
        return {"message": "Usuario registrado exitosamente"}
    except Exception as e:
        db.rollback()
        print("Error al registrar el usuario:", e)  # Log del error
        raise HTTPException(status_code=500, detail=f"Error al registrar el usuario: {e}")
    finally:
        cursor.close()


async def getCurrentUser(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Credencial inválida")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Credencial inválida")
    
# Route to get the current user
@app.get("/users/me")
async def read_users_me(current_user: str = Depends(getCurrentUser)):
    return {"email": current_user}

class AddFavoriteEvent(BaseModel):
    event: str # The name of the event to add to the user's favorites

class DeleteFavoriteEvent(BaseModel): 
    event: str # The name of the event to delete from the user's favorites

class FavoriteEvent(BaseModel):
    roadID: str 

# Route to add a favorite event to the user
@app.post("/favorite-events/add")
async def add_favorite_event(
        favorite_event: AddFavoriteEvent,
        current_user: str = Depends(getCurrentUser)
    ):
        cursor = db.cursor()
        
        # Check if the event is already a favorite
        query = "SELECT * FROM favoriteEvents WHERE email=%s AND roadID=%s"
        cursor.execute(query, (current_user, favorite_event.event))
        existing_favorite = cursor.fetchone()

        if existing_favorite:
            cursor.close()
            raise HTTPException(status_code=400, detail="The event is already a favorite")

        # Add the event to the user's favorites
        insert_query = "INSERT INTO favoriteEvents (email, roadID) VALUES (%s, %s)"
        cursor.execute(insert_query, (current_user, favorite_event.event))
        
        db.commit()
        cursor.close()
        
        return {"message": "event added to favorites successfully"}

# Route to delete a favorite event from the user
@app.delete("/favorite-events/delete")
async def delete_favorite_event(
        favorite_event: DeleteFavoriteEvent,
        current_user: str = Depends(getCurrentUser)
    ):
        cursor = db.cursor()
        
        # Delete the event from the user's favorites
        delete_query = "DELETE FROM favoriteEvents WHERE email=%s AND roadID=%s"
        cursor.execute(delete_query, (current_user, favorite_event.event))
        
        db.commit()
        cursor.close()
        
        return {"message": "event deleted from favorites successfully"}

# Route to get all the favorite events of the user
@app.get("/favorite-events/all", response_model=list)
async def get_all_favorite_events(current_user: str = Depends(getCurrentUser)):
    cursor = db.cursor()
    
    # Get all the favorite events of the user
    query = "SELECT roadID, email FROM favoriteEvents WHERE email=%s"
    cursor.execute(query, (current_user,))
    favorite_events = cursor.fetchall()
    
    cursor.close()
    
    return favorite_events

@app.post("/favorite-events/check")
async def check_favorite_event(
    event: FavoriteEvent,
    current_user: str = Depends(getCurrentUser)
):
    cursor = db.cursor()
    
    # Check if the event is a favorite
    query = "SELECT * FROM favoriteEvents WHERE email=%s AND roadID=%s"
    cursor.execute(query, (current_user, event.roadID))
    favorite_event = cursor.fetchone()
    
    cursor.close()
    
    # Return true if an element is found, false otherwise
    return {"isFavorite": favorite_event is not None}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
