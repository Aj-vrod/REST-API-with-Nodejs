const jwt = require('jsonwebtoken')

// INSERT TOKEN IN HEADER AS: BEARER <TOKEN> // BEARER eyJhbGciOiJIUzI1NiIsInR...
const verifyToken = (req, res, next) => {
  if (req.headers['authorization']) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, 'secretToken', (err, user) => {
        if (err) {
          res.status(403).json({ "message": "403 Unauthorized action"})
        }
        req.userId = user.user[0].id
        next();
      })
    } else {
      res.status(403).json({ "message": "403 Unauthorized action" })
      return
    }
  } else {
    res.status(403).json({ "message": "403 Unauthorized action"})
    return
  }
}

module.exports = verifyToken
