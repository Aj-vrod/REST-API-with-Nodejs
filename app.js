const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database'))
const md5 = require('md5')


const roomsController = require('./controllers/rooms.controller')
// GET ROOMS
 app.get('/rest/rooms', roomsController.roomsIndex);

// GET ROOM
 app.get('/rest/rooms/:id', roomsController.roomShow);

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

// BASIC JSON_OBJECT = (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room

// GET BOOKINGS
app.get('/rest/bookings', (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings`
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
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  const params = [req.params.id]
  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return
    }
    res.status(200).json(row)
  })
})

// POST BOOKING
app.post('/rest/bookings', (req, res) => {
  var errors = []
  if (!req.body.date) {
    errors.push('No date specified');
  }
  if (!req.body.seat) {
    errors.push('No seat specified');
  }
  if (!req.body.user) {
    errors.push('No user specified');
  }
  const regex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{1,2}$')
  if (!regex.test(req.body.date)) {
    errors.push('Incorrect date format. Must be YYYY-MM-DD')
  }
  if (errors.length) {
    res.status(400).json({"error": errors.join(", ")});
    return
  }
  var data = {
    seat: req.body.seat,
    date: req.body.date,
    user: req.body.user
  }
  const query = 'INSERT INTO bookings (seat, date, user) VALUES (?,?,?)'
  const params = [data.seat, data.date, data.user]
  db.run(query, params, (err, result) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    }
    res.status(200).json(data)
  });
})

// DELETE BOOKING
app.delete('/rest/bookings/:id', (req, res) => {
  const query = 'DELETE FROM bookings WHERE id = ?'
  const params = [req.params.id]
  db.run(query, params, (err, result) => {
    if(err) {
      res.status(400).json({"error": err.message})
      return;
    }
    res.status(200).json({"message":"deleted", changes: this.changes})
  });
})

// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})


module.exports = app
