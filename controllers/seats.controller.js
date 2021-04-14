const db = require('../db/database.js')
const checkErrors = require('../helpers/errors')

const index = (req, res) => {
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats`
  const params = []
  db.all(query, params, (err, rows) => {
    checkErrors(err, res)
    res.status(200).json(rows)
  })
}

const show = (req, res) => {
  const params = [req.params.id]
  const query = `SELECT id, (SELECT json_object('id', id, 'name', name) FROM rooms WHERE rooms.id = seats.room) AS room FROM seats WHERE id = ?`
  db.get(query, params, (err, row) => {
    checkErrors(err, res)
    res.status(200).json(row)
  })

}

module.exports = {
  index,
  show
}
