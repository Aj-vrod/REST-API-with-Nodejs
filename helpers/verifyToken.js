const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
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
  }
}

module.exports = verifyToken
