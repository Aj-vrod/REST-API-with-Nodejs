// REQUIRING APP INSTANCE
const app = require('./app.js')

// USING BODY-PARSER TO PARSE BODY DATA FROM REQUESTS
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TRIGGER SERVER
const port = 3000
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",port))
})
