const db = require('../db/database.js')

// REQUIRE HELPERS
const checkErrors = require('../helpers/errors')
const checkInput = require('../helpers/checkInput')
const limitPastBookings = require('../helpers/limitBookingsIndex')

// ROUTES
const index = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE bookings.date > ?`
  // STORES LIMIT DATE IN VARIABLE
  const twoWeeksAgo = limitPastBookings()
  params = [twoWeeksAgo]
  // TO RETRIEVE ALL INSTANCES OF BOOKING THAT MATCH QUERY
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    // TRANSFORMS STRINGS OF DATA INTO JSON
    rows.forEach( (row) => {
      row.seat = JSON.parse(row.seat);
      row.user = JSON.parse(row.user)
    })
    res.status(200).json(rows)
  })
}

const show = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'room', (SELECT json_object('id', id, 'name', name) FROM rooms WHERE seats.room = rooms.id)) FROM seats WHERE bookings.seat = seats.id) AS seat, datetime(date) AS date, (SELECT json_object('id', id, 'name', name, 'profilePicture', profilePicture) FROM users WHERE bookings.user = users.id) AS user FROM bookings WHERE id = ?`
  // STORES BOOKING ID IN PARAMS
  const params = [req.params.id]
  // RETRIEVES INSTANCE OF BOOKING
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    if (row) {
      // TRANSFORMS STRINGS OF DATA INTO JSON
      row.seat = JSON.parse(row.seat)
      row.user = JSON.parse(row.user)
      res.status(200).json(row)
    } else {
      // SO THE SERVER DOES NOT BREAK IF THERE ARE NO BOOKINGS
      res.status(404).json({ "error": "Booking not found"})
      return;
    }
  })
}

const create = (req, res, next) => {
  // FIRST CHECK IF ALL REQUIREMENTS HAVE BEEN FULFILLED, IF TRUE, CONTINUE
  if (checkInput(req, res, next)) {
    // TO STORE DATA IN OBJECT
    var data = {
      seat: req.body.seat,
      date: req.body.date,
      user: req.userId
    }
    // TO RETRIEVE ALL SEATS.ID OF BOOKINGS BOOKED FOR THE DATE PROVIDED
    db.all('SELECT seat FROM bookings WHERE date = ?', data.date, (err, bookings) => {
      if (err) {
        res.status(500).json({"error": "A database error occurred"})
        return;
        // IN CASE THERE ARE, CHECKS IF ANY OF THEM IS THE SAME AS THE ONE ASKED TO BOOK
      } else if (bookings.length > 0 && bookings.filter(function(e) { return e.seat === parseInt(data.seat); }).length > 0) {
        // IF IT IS, RETURNS ERROR
        res.status(400).json({ "error": "This seat is already taken" })
        return;
      } else {
        // IF NOT, MOVES ON TO CHECKS SEAT EXISTENCE
        // RETRIVE SEAT INSTANCE THAT MATCHES ID PROVIDED, IF EXISTS
        db.get('SELECT id FROM seats WHERE id = ?', data.seat, (err, result) => {
          if (err) {
            res.status(500).json({"error": "A database error occurred"})
            // IF THERE IS A MATCH, IT CREATES NEW BOOKING
          } else if (result) {
            const query = `INSERT INTO bookings (seat, date, user) VALUES (?,?,?)`
            // STORES DATAHASH IN PARAMS
            const params = [data.seat, data.date, data.user]
            // BOOKING CREATION
            db.run(query, params, (err, result) => {
              if (err) {
                res.status(500).json({"error": "A database error occurred"})
                return;
              }
              res.status(200).json(data)
            });
          } else {
            // IF THERE IS NO MATCH, SENDS ERROR
            res.status(404).json({ "error": "Seat not found" })
            return;
          }
        });
      }
    });
  }
}

const destroy = (req, res) => {
  // LOOKS FOR ERRORS IN REQUEST
  if (req.params) {
    // STORES ID FROM HTTP REQUEST
    const params = [req.params.id]
    // TO RETRIEVE USER.ID OF BOOKING SELECTED
    db.get('SELECT user FROM bookings WHERE id = ?', params, (err, booking) => {
      // IF BOOKING EXISTS, MOVES ON TO NEXT CONDITION
      if (booking) {
        const query = 'DELETE FROM bookings WHERE id = ?'
        // GETS THE USERID FROM THE BOOKING INSTANCE RETRIEVED WITH QUERY
        const booking_user_id = booking.user
        // GETS THE USERID OF THE LOGGED IN USER OBTAINED THROUGH TOKEN
        const logged_user_id = req.userId
        // CHECK IF THE TWO IDS MATCH = THE LOGGED IN USER IS THE AUTHOR OF THE BOOKING
        if (booking_user_id === logged_user_id) {
          // IF THEY MATCH, MOVES ON TO DELETE BOOKING
          db.run(query, params, (err, result) => {
            if(err) {
              res.status(400).json({"error": "A database error occurred"})
              return;
            }
            res.status(200).json({ "message": "deleted" })
          });
        } else {
          // IF THEY DON'T MATCH, SEND ERROR MESSAGE 403
          res.status(403).json({ "message": "403 Unauthorized action" })
          return
        }
      } else {
        // IF IT DOES NOT EXISTS, SENDS ERROR MESSAGE
        res.status(404).json({ "message": "Booking not found" })
        return
      }
    })
  } else {
    res.status(500).json({ "message": "Internal Server error" })
    return
  }
}

module.exports = {
  index,
  show,
  create,
  destroy
}
