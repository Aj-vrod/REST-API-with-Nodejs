const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')

const index = (req, res) => {
  const query = 'SELECT * FROM rooms'
  var params = []
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    res.status(200).json(rows)
  });
 }

 const show = (req, res) => {
  const params = [req.params.id]
  const query = `SELECT * FROM rooms WHERE id = ?`
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    res.status(200).json(row)
  });
 }

module.exports = {
  index,
  show
}
