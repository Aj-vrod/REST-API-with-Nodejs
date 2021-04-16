// REPETITIVE FUNCTION TO CHECK ERRORS IN QUERIES
const checkErrors = (err, res) => {
  if (err) {
    res.status(400).json({"error": "A database error occurred"})
    return
  }
}

module.exports = checkErrors
