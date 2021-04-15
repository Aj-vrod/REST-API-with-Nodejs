const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')
const checkInput = require('../helpers/checkInput')
const limitPastBookings = require('../helpers/limitBookingsIndex')

const index = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE bookings.date > ?`
  const twoWeeksAgo = limitPastBookings()
  params = [twoWeeksAgo]
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    rows.forEach( (row) => {
      row.seat = JSON.parse(row.seat);
      row.user = JSON.parse(row.user)
    })
    res.status(200).json(rows)
  })
}

const show = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  const params = [req.params.id]
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    row.seat = JSON.parse(row.seat)
    row.user = JSON.parse(row.user)
    res.status(200).json(row)
  })
}

const create = (req, res, next) => {
  if (checkInput(req, res, next)) {
    var data = {
      seat: req.body.seat,
      date: req.body.date,
      user: req.userId
    }
    db.all('SELECT seat FROM bookings WHERE date = ?', data.date, (err, bookings) => {
      if (err) {
        res.status(500).json({"error": "A database error occurred"})
        return;
      } else if (bookings.length > 0 && bookings.filter(function(e) { return e.seat === parseInt(data.seat); }).length > 0) {
        res.status(400).json({ "error": "This seat is already taken" })
        return;
      } else {
        db.get('SELECT id FROM seats WHERE id = ?', data.seat, (err, result) => {
          if (err) {
            res.status(500).json({"error": "A database error occurred"})
          } else if (result) {
            const query = `INSERT INTO bookings (seat, date, user) VALUES (?,?,?)`
            const params = [data.seat, data.date, data.user]
            db.run(query, params, (err, result) => {
              if (err) {
                res.status(500).json({"error": "A database error occurred"})
                return;
              }
              res.status(200).json(data)
            });
          } else {
            res.status(404).json({ "error": "Seat not found" })
            return;
          }
        })
      }
    })
  }
}

const destroy = (req, res) => {
  const params = [req.params.id]
  db.get('SELECT user FROM bookings WHERE id = ?', params, (err, booking) => {
    if (booking) {
      const query = 'DELETE FROM bookings WHERE id = ?'
      const booking_user_id = booking.user
      const logged_user_id = req.userId
      if (booking_user_id === logged_user_id) {
        db.run(query, params, (err, result) => {
          if(err) {
            res.status(400).json({"error": "A database error occurred"})
            return;
          }
          res.status(200).json({ "message": "deleted" })
        });
      } else {
        res.status(403).json({ "message": "403 Unauthorized action" })
      }
    } else {
      res.status(404).json({ "message": "Booking not found" })
    }
  })
}

module.exports = {
  index,
  show,
  create,
  destroy
}
