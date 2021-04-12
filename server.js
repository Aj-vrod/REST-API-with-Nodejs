// USING EXPRESS INSTEAD OF HTTP
const express = require('express')
const app = express()

const port = 3000
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",port))
})

// GET ROOMS
 app.get('/rest/rooms', (req, res) => {
  res.json({"message": "Ok"})
 });

// DEFAULT RESPONSE FOR ERRORS
app.use((req, res) => {
  res.status(404);
})
