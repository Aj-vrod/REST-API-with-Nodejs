// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database'))

// USING BODY-PARSER TO PARSE BODY DATA FROM REQUESTS
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SESSION ROUTES
const sessionsController = require('./controllers/sessions.controller')
app.get('/rest', sessionsController.home)
// POST SESSION
app.post('/rest/login', sessionsController.login)

// ROOMS ROUTES
const roomsController = require('./controllers/rooms.controller')
// GET ROOMS
 app.get('/rest/rooms', roomsController.index);
// GET ROOM
 app.get('/rest/rooms/:id', roomsController.show);

// SEATS ROUTES
const seatsController = require('./controllers/seats.controller')
// GET SEATS
app.get('/rest/seats', seatsController.index)
// GET SEAT
app.get('/rest/seats/:id', seatsController.show)

// BOOKINGS ROUTES
const bookingsController = require('./controllers/bookings.controller')
const verifyToken = require('./helpers/verifyToken')
// GET BOOKINGS
app.get('/rest/bookings', bookingsController.index)
// GET BOOKING
app.get('/rest/bookings/:id', bookingsController.show)
// POST BOOKING
app.post('/rest/bookings', verifyToken, bookingsController.create)
// DELETE BOOKING
app.delete('/rest/bookings/:id', verifyToken, bookingsController.destroy)

// DEFAULT RESPONSE FOR OTHER ERRORS
app.use((req, res) => {
  res.status(404);
})


module.exports = app
