const db = require('../db/database.js')

const bookingsIndex = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings`
  params = []
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return
    }
    res.status(200).json(rows)
  })
}

const bookingsShow = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  const params = [req.params.id]
  db.get(query, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return
    }
    res.status(200).json(row)
  })
}

module.exports = {
  bookingsIndex,
  bookingsShow
}
