const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add necessary headers
};

app.use(cors(corsOptions));

const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const port = 4000;
const apiKey = process.env.API_KEY;

// Conectar a MongoDB
connectDB();

// Definir esquema de Mongoose
const EventoSchema = new mongoose.Schema({
    id: String,
    name: String,
    date: String,
    time: String,
    city: String,
    price: String
});

// Crear modelo de Mongoose
const Evento = mongoose.model('Evento', EventoSchema);

// Cargar todos los eventos a la base de datos
app.get('/uploadData', async (req, res) => {
    try {
        const url = `http://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        await Evento.deleteMany({});
        
        const eventos = data._embedded.events.map(event => {
            return {
                id: event.id,
                name: event.name,
                date: event.dates.start.localDate,
                time: event.dates.start.localTime,
                city: event._embedded.venues[0].city.name,
                price: event.priceRanges[0].min + ' - ' + event.priceRanges[0].max
            };
        })

        await Evento.insertMany(eventos);

        //res.json({ message: 'Data uploaded successfully' });
res.json(data)
        console.log('Events uploaded successfully');

    } catch (error) {
        console.error('Error uploading the events: ' + error);
        res.status(500).send('Error uploading the events');
    }
})

// Obtener todos los eventos
app.get('/eventos/all', async (req, res) => {
    try {
        const eventos = await Evento.find();
        console.log(eventos.length + ' events retrieved successfully');
        res.json(eventos);

    } catch (error) {
        console.error('Error obtaining the events: ' + error);
        res.status(500).send('Error obtaining the events');
    }
})

/**
 * @swagger
 * /events/id/{eventID}:
 *   get:
 *     description: Get the data from the database by ID
 *     parameters:
 *       - in: path
 *         name: eventID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento not found
 *       500:
 *         description: Error retrieving the data
 */
app.get('/eventos/id/:id', async (req, res) => {
    try {
        const evento = await Evento.findOne({ id: req.params.id });
        console.log('Event retrieved successfully');
        res.json(evento);

    } catch (error) {
        console.error('Error obtaining the event: ' + error);
        res.status(500).send('Error obtaining the event');
    }
})

// Obtener eventos por ciudad
app.get('/eventos/city/:city', async (req, res) => {
    try {
        const eventos = await Evento.find({ city: req.params.city });
        console.log(eventos.length + ' events retrieved successfully');
        res.json(eventos);

    } catch (error) {
        console.error('Error obtaining the events: ' + error);
        res.status(500).send('Error obtaining the events');
    }
})

// Obtener eventos por fecha
app.get('/eventos/date/:date', async (req, res) => {
    try {
        const eventos = await Evento.find({ date: req.params.date });
        console.log(eventos.length + ' events retrieved successfully');
        res.json(eventos);

    } catch (error) {
        console.error('Error obtaining the events: ' + error);
        res.status(500).send('Error obtaining the events');
    }
})

// Obtener eventos por nombre
app.get('/eventos/name/:name', async (req, res) => {
    try {
        const eventos = await Evento.find({ name: req.params.name });
        console.log(eventos.length + ' events retrieved successfully');
        res.json(eventos);

    } catch (error) {
        console.error('Error obtaining the events: ' + error);
        res.status(500).send('Error obtaining the events');
    }
})

//obtener imagenes de eventos
app.get('/eventos/img/:id', async (req, res) => {
    try {
        const url = `http://app.ticketmaster.com/discovery/v2/events/${req.params.id}/images.json?apikey=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);

    } catch (error) {
        console.error('Error obtaining the event image: ' + error);
        res.status(500).send('Error obtaining the event image');
    }
})

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Events API',
            version: '1.0.0',
            description: 'Events API documentation',
        },
        components: {
            schemas: {
                Evento: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        date: { type: 'string' },
                        time: { type: 'string' },
                        city: { type: 'string' },
                        price: { type: 'string' },
                       
                    },
                },
            },
        },
    },
    apis: [__filename],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Agregar Swagger a Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





// Iniciar el servidor
app.listen(port, () => {
    console.log('Servior escuchando en ' + port)
})