require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const port = 4000;
const apiKey = process.env.API_KEY;

app.get('/eventos/all', async (req, res) => {
    try {
        const url = `http://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

        console.log(apiKey)

        const response = await axios.get(url);
        const data = response.data;

        const eventos = data._embedded.events.map(event => {
            return {
                id : event.id,
                name: event.name,
                date: event.dates.start.localDate,
                time: event.dates.start.localTime,
                city: event._embedded.venues[0].city.name,
                price: event.priceRanges[0].min + ' - ' + event.priceRanges[0].max
            };
        })
        
        res.json(eventos);

        console.log('Events obtained successfully');

    } catch (error) {
        console.error('Error obtaining the events: ' + error);
        res.status(500).send('Error obtaining the events');
    }
})

// Obtener un evento específico por ID
app.get('/eventos/:id?', async (req, res) => {
    try {
        const url = `http://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;
        
        const response = await axios.get(url);
        const data = response.data;

        const eventos = data._embedded.events.map(event => {
            return {
                id: event.id,
                name: event.name,
                date: event.dates.start.localDate,
                time: event.dates.start.localTime,
                city: event._embedded.venues[0].city.name,
                price: `${event.priceRanges[0].min} - ${event.priceRanges[0].max}`
            };
        });

        const { id } = req.params;

        if (id) {
            const evento = eventos.find(evento => evento.id === id);
            
            if (evento) {
                res.json(evento);  // Devuelve solo el evento encontrado
            } else {
                res.status(404).send('Event by id not found');
            }
        }

        console.log('One event by id obtained successfully');

    } catch (error) {
        console.error('Error obtaining one event by id: ' + error);
        res.status(500).send('Error obtaining one event by ID');
    }
});



app.listen(port, () => {
    console.log('Servior escuchando en ' + port)
})
