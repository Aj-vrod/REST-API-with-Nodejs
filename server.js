// REQUIRING APP INSTANCE
const app = require('./app.js')

// TRIGGER SERVER
const port = 3000
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",port))
})
