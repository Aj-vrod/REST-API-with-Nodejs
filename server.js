// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database.js'))
const md5 = require('md5')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TRIGGER SERVER
const port = 3000
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",port))
})

// GET ROOMS
 app.get('/rest/rooms', (req, res) => {
  const query = 'SELECT * FROM rooms'
  var params = []
  db.all(query, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error": error.message });
      return;
    }
    res.status(200).json(rows)
  });
 });

// GET ROOM
 app.get('/rest/rooms/:id', (req, res) => {
  const params = [req.params.id]
  const query = `SELECT * FROM rooms WHERE id = ?`
  db.get(query, params, (error, row) => {
    if (error) {
      res.status(400).json({"error": error.message});
      return
    }
    res.status(200).json(row)
  });
 });

// GET SEATS
app.get('/rest/seats', (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats`
  const params = []
  db.all(query, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error": error.message});
      return
    }
    res.status(200).json(rows)
  })
})

// GET SEAT
app.get('/rest/seats/:id', (req, res) => {
  const params = [req.params.id]
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats WHERE id = ?`
  db.get(query, params, (error, row) => {
    if (error) {
      res.status(400).json({"error": error.message});
      return
    }
    res.status(200).json(row)
  })

})

// (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room

// GET BOOKINGS
app.get('/rest/bookings', (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings`
  params = []
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return
    }
    res.status(200).json(rows)
  })
})

// GET BOOKING
app.get('/rest/bookings/:id', (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room) AS seat), date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  const params = [req.params.id]
  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return
    }
    res.status(200).json(row)
  })
})

// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})
