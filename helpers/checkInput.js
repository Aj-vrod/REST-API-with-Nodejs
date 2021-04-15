const testTimeSpan = require('./timespan')

const checkInput = (req, res, next) => {
  if (req.body) {
    var errors = []
    if (!req.body.date) {
      error = {
        msg: 'No date specified',
        param: 'date',
        location: 'body'
      }
      errors.push(error);
    }
    if (!req.body.seat) {
      error = {
        msg: 'No seat specified',
        param: 'seat',
        location: 'body'
      }
      errors.push(error);
    }
    const regex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{1,2}$')
    if (!regex.test(req.body.date)) {
      error = {
        msg: 'Invalid value. Must be YYYY-MM-DD',
        param: 'date',
        location: 'body'
      }
      errors.push(error);
    }
    if (testTimeSpan(req.body.date) === false) {
      error = {
        msg: 'Invalid value. Booking date must be within the next 7 days',
        param: 'date',
        location: 'body'
      }
      errors.push(error);
    }
    if (errors.length) {
      res.status(400).json({ "errors": errors });
      return
    } else {
      return true
    }
  } else {
    res.status(400).json({ "error": "Invalid values" })
  }
}

module.exports = checkInput
