const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')
const checkInput = require('../helpers/checkInput')

const index = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings`
  params = []
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    res.status(200).json(rows)
  })
}

const show = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  const params = [req.params.id]
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    res.status(200).json(row)
  })
}

const create = (req, res, next) => {
  checkInput(req, res, next)
  var data = {
    seat: req.body.seat,
    date: req.body.date,
    user: req.userId
  }
  const query = `INSERT INTO bookings (seat, date, user) VALUES (?,?,?)`
  const params = [data.seat, data.date, data.user]
  db.run(query, params, (err, result) => {
    if (err) {
      res.status(500).json({"error": "A database error occurred"})
      return;
    }
    res.status(200).json(data)
  });
}

const destroy = (req, res) => {
  const query = 'DELETE FROM bookings WHERE id = ?'
  const params = [req.params.id]
  db.run(query, params, (err, result) => {
    if(err) {
      res.status(400).json({"error": err.message})
      return;
    }
    res.status(200).json({"message":"deleted", changes: this.changes})
  });
}

module.exports = {
  index,
  show,
  create,
  destroy
}
