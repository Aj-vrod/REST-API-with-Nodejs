// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database'))
const jwt = require('jsonwebtoken')

// USING BODY-PARSER TO PARSE BODY DATA FROM REQUESTS
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SESSION ROUTES
app.get('/rest', (req, res) => {
  res.json({
    "message": "Welcome to Amiconsult Office API"
  })
})

const login = (req, res) => {
  const query = 'SELECT name FROM users WHERE name = ?'
  params = [req.headers['name']]
  db.all(query, params, (err, user) => {
    if (err) {
      res.status(400).json(err.message)
      return
    } else if (user.length) {
      jwt.sign({user: user}, 'secretToken', (err, token) => {
        res.json({
          token,
        })
      })
    } else {
      res.status(403).json({
        "message": "403 No authorized access"
      })
    }
  })
}

const verifyUser = () => {

}

app.post('/rest/login', login)

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
// GET BOOKINGS
app.get('/rest/bookings', bookingsController.index)
// GET BOOKING
app.get('/rest/bookings/:id', bookingsController.show)
// POST BOOKING
app.post('/rest/bookings', bookingsController.create)
// DELETE BOOKING
app.delete('/rest/bookings/:id', bookingsController.destroy)

// DEFAULT RESPONSE FOR OTHER ERRORS
app.use((req, res) => {
  res.status(404);
})


module.exports = app
