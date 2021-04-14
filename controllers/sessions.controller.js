const jwt = require('jsonwebtoken')
const db = require('../db/database.js')

const home = (req, res) => {
  res.json({
    "message": "Welcome to our Office Booking API"
  })
}

const login = (req, res) => {
  const query = 'SELECT name FROM users WHERE name = ?'
  params = [req.headers['name']]
  db.all(query, params, (err, user) => {
    if (err) {
      res.status(400).json(err.message)
      return
    } else if (user.length) {
      jwt.sign({user: user}, 'secretToken', (err, token) => {
        res.json({
          token,
        })
      })
    } else {
      res.status(403).json({
        "message": "403 No authorized access"
      })
    }
  })
}

module.exports = {
  login,
  home
}
