# BookMyEvent 
BookMyEvent is a web application designed to help users discover events in their area, save their favorite matches, and access relevant event details. The application consists of multiple microservices, each responsible for specific functionalities, such as authentication, event management, and favorite tracking.

## MICROSERVICES

### 1. EVENT MANAGEMENT MICROSERVICE 
This microservice is developed using Node.js and MongoDB. It is responsible for managing all actions related to the events, such as adding, updating, and retrieving event details.

#### INSTALLATION 
To run this microservice, you need to download or clone the repository and have MongoDB and Node.js installed.

You need to download the following dependencies:

**-config, express, fs, mongodb, mongoose, nodemon, swagger-jsdoc and swagger-ui-express**

To do this, run the following command:

    npm install config express fs mongodb mongoose nodemon swagger-jsdoc swagger-ui-express

#### EXECUTION 
To run the project, execute the following command:

    npm start

#### DOCUMENTATION
If you want to see the documentation of the api you have to enter in this [link](http:localhost:8000/api-docs) after starting the server

### 2. AUTHENTICATION MICROSERVICE
This microservice, built with Flask (Python), handles user login, registration, retrieval of user-related data, and the management of favorite matches. All data is stored in a MySQL database.


#### INSTALLATION
You need to have the proyect clone and Python installed.

Also you need to have some dependencies installed:
**fastapi, pydantic, uvicorn, mysql-connector-python, SQLAlchemy, pymysq, PyJWT, cryptography, python-dotenv, python-multipart**

To do this run the following command:

    pip install -r requirements.txt

You need to have the database in your computer

To run the database, navigate to the local directory where the project is located, and in the command line (cmd), execute the command `mysqld`.

#### EXECUTION 
To run the project, simply execute the following command:
    
    uvicorn main:app --reload

#### DOCUMENTATION 
If you want to see the documentation of the api you have to enter in this [link](http:localhost:8000/api-docs) after starting the server


## FRONTEND
The frontend of this project is a web application developed using React, a widely recognized JavaScript library for building interactive user interfaces and reusable components.

#### EXECUTION
To run the project, simply execute the following command:

    npm start