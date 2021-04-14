const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')

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

const create = (req, res) => {
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
  destroy,
  checkErrors
}
