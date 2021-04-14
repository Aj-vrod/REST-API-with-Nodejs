const db = require('../db/database.js')

const roomsIndex = (req, res) => {
  const query = 'SELECT * FROM rooms'
  var params = []
  db.all(query, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error": error.message });
      return;
    }
    res.status(200).json(rows)
  });
 }

module.exports = roomsIndex
