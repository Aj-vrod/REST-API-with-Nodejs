// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()
const path = require('path')
const db = require(path.join(__dirname, 'db', 'database.js'))

const port = 3000
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",port))
})

// GET ROOMS
 app.get('/rest/rooms', (req, res) => {
  const query = 'SELECT * FROM rooms'
  var params = []
  db.all(query, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error": error.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
 });

// GET ROOM
 app.get('/rest/rooms/:id', (req, res) => {
  const params = [req.params.id]
  const query = `SELECT * FROM rooms WHERE id = ?`
  db.get(query, params, (error, rows) => {
    if (error) {
      res.status(400).json({"error": error.message});
      return
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
 });

// GET SEATS
app.get('/rest/seats', (req, res) => {
  const query = 'SELECT * FROM seats'
  const params = []
  db.all(query, params, (error, row) => {
    if (error) {
      res.status(400).json({"error": error.message});
      return
    }
    res.json({
      "message": "success",
      "data": row
    })
  })
})



// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})
