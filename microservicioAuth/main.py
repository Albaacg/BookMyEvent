from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import pymysql
import jwt
import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

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


        return {"message": f"Bienvenido, {existing_user['name']}!"}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
