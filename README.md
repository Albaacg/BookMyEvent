## Ejecutar 

### Requisitos
- Python 3.8 o superior
- Uvicorn

### Pasos para ejecutar

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/Albaacg/BookMyEvent.git
    ```

2. Navegar al directorio del microservicio:
    ```bash
    cd /C:/WEB/BookMyEvent/microservicioAuth
    ```

3. Crear y activar el entorno virtual:
    ```bash
    python -m venv microservicioauth
    microservicioauth/Scripts/activate
    ```

4. Instalar las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

5. Ejecutar el servidor:
    ```bash
    uvicorn main:app --reload
    ```
6. Ejecutar el front
    ```bash
    npm start
    ```
