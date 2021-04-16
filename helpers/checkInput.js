const testTimeSpan = require('./timespan')

// CHECK POSSIBLE ERRORS OF A POST REQUEST
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
    // MUST HAVE THIS FORMAT TO WORK WITH DATE FUNCTION
    const regex = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{1,2}$')
    if (!regex.test(req.body.date)) {
      error = {
        msg: 'Invalid value. Must be YYYY-MM-DD',
        param: 'date',
        location: 'body'
      }
      errors.push(error);
    }
    // CHECKS IF THE DATE PROVIDED IS ALLOWED
    if (testTimeSpan(req.body.date) === false) {
      error = {
        msg: 'Invalid value. Booking date must be within the next 7 days',
        param: 'date',
        location: 'body'
      }
      errors.push(error);
    }
    // IF THERE ARE ERRORS, RESPONDS WITH THEM IN JSON FORMAT
    if (errors.length) {
      res.status(400).json({ "errors": errors });
      return
    } else {
      return true
    }
  } else {
    // IF THERE IS NO BODY
    res.status(400).json({ "error": "Invalid values" })
  }
}

module.exports = checkInput
