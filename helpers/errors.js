// TO CHECK IF THERE ARE ANY ERRORS
const checkErrors = (err, res) => {
  if (err) {
    res.status(400).json({"error": err.message})
    return
  }
}

module.exports = checkErrors
