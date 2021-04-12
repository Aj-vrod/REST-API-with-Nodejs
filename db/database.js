// USING SQLITE AS LOCAL DATABASE
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DB = 'db.sqlite3'

let db = new sqlite3.Database(DB, (error) => {
  if (error) {
    console.log(error.message)
    throw error
  } else {
    console.log('Connected to the SQLite database')
    db.run(`CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR,
      profilePicture TEXT,
      token TEXT UNIQUE,
      CONSTRAINT token_unique UNIQUE (token))`,
      (error) => {
        if (error) {
          console.log('Table already created')
        } else {
          console.log('Creating some rows')
          var insert = 'INSERT INTO user (name, profilePicture, token) VALUES (?,?,?)'
          db.run(insert, ["Malte", "db/user_pictures/user.jpg", "wakndi492jn290n8398"])
        }
      });
  }
});

module.exports = db
