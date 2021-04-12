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
 app.get('/rest/users', (req, res) => {
  const query = 'select * from user'
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

// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})
