const jwt = require('jsonwebtoken')
const db = require('../db/database.js')

const home = (req, res) => {
  // SIMPLE WELCOMING MESSAGE
  res.json({
    "message": "Welcome to our Office Booking API"
  })
}

const login = (req, res) => {
  const query = 'SELECT name, id FROM users WHERE name = ?'
  // SAVE USER NAME FROM HTTP REQUEST
  params = [req.headers['name']]
  // TO RETRIEVE USER INSTANCE AND USE IT AS USER FOR BOOKING CREATION
  db.all(query, params, (err, user) => {
    if (err) {
      res.status(400).json(err.message)
      return
      // IF USER FOUND
    } else if (user.length) {
      // SAVES USER ID
      jwt.sign({user: user, userId: user.id}, 'secretToken', (err, token) => {
        // SEND TOKEN
        res.json({
          token,
        })
      })
    } else {
      // WHEN NO MATCHING USER HAS BEEN FOUND
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
