const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')

const index = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats`
  const params = []
  // TO RETRIEVE ALL INSTANCES FROM SEATS, INCLUDING THEIR ROOMS AS NESTED INSTANCES
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    // TRANSFORM STRINGS OF DATA RETRIEVED WITH QUERY INTO JSON
    rows.forEach((row) => { row.room = JSON.parse(row.room) })
    res.status(200).json(rows)
  })
}

const show = (req, res) => {
  // SAVE SEAT ID FROM HTTP REQUEST
  const params = [req.params.id]
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats WHERE id = ?`
  // TO RETRIEVE ALL DATA FROM SEAT INSTANCE
  db.get(query, params, (err, row) => {
    if (row) {
      checkErrors(err, res)
      // TRANSFORM STRING OF DATA RETRIEVED WITH QUERY INTO JSON
      row.room = JSON.parse(row.room)
      res.status(200).json(row)
    } else {
      // SO THE SERVER DOES NOT BREAK IF THERE ARE NO SEATS
      res.status(404).json({ "error": "Seat not found"})
      return;
    }
  })

}

module.exports = {
  index,
  show
}
