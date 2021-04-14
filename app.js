// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database'))

// USING BODY-PARSER TO PARSE BODY DATA FROM REQUESTS
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOMS ROUTES
const roomsController = require('./controllers/rooms.controller')
// GET ROOMS
 app.get('/rest/rooms', roomsController.roomsIndex);
// GET ROOM
 app.get('/rest/rooms/:id', roomsController.roomShow);

// SEATS ROUTES
const seatsController = require('./controllers/seats.controller')
// GET SEATS
app.get('/rest/seats', seatsController.seatsIndex)
// GET SEAT
app.get('/rest/seats/:id', seatsController.seatsShow)

// BOOKINGS ROUTES
const bookingsController = require('./controllers/bookings.controller')
// GET BOOKINGS
app.get('/rest/bookings', bookingsController.bookingsIndex)
// GET BOOKING
app.get('/rest/bookings/:id', bookingsController.bookingsShow)
// POST BOOKING
app.post('/rest/bookings', bookingsController.bookingsCreate)
// DELETE BOOKING
app.delete('/rest/bookings/:id', bookingsController.bookingsDestroy)

// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})


module.exports = app
