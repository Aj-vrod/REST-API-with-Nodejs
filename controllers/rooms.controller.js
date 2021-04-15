const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')

const index = (req, res) => {
  const query = 'SELECT * FROM rooms'
  var params = []
  // TO RETRIEVE ALL INSTANCES FROM ROOMS
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    res.status(200).json(rows)
  });
 }

 const show = (req, res) => {
  // RSABE ROOM ID FROM HTTP REQUEST
  const params = [req.params.id]
  const query = `SELECT * FROM rooms WHERE id = ?`
  // TO RETRIEVE ALL DATA FROM ROOM INSTANCE
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    res.status(200).json(row)
  });
 }

module.exports = {
  index,
  show
}
