const jwt = require('jsonwebtoken')

// INSERT TOKEN IN HEADER AS: BEARER <TOKEN> // BEARER eyJhbGciOiJIUzI1NiIsInR...
const verifyToken = (req, res, next) => {
  // CHECKS EXISTENCE OF TOKEN IN HEADERS
  if (req.headers['authorization']) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      // SELECTS ONLY THE TOKEN
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, 'secretToken', (err, user) => {
        if (err) {
          res.status(403).json({ "message": "A database error occurred"})
        }
        // STORES USER ID IN REQUEST TO USE IF IN BOOKING CREATION
        req.userId = user.user[0].id
        next();
      })
    } else {
      res.status(403).json({ "message": "A database error occurred" })
      return
    }
  } else {
    res.status(403).json({ "message": "403 Unauthorized action"})
    return
  }
}

module.exports = verifyToken
