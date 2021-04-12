// USING SQLITE AS LOCAL DATABASE
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DB = 'db.sqlite3'

let db = new sqlite3.Database(DB, (error) => {
  if (error) {
    console.log(error.message)
    throw error
  } else {
    console.log('Creating database with SQLite3...')
    db.run(`
      CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        profilePicture TEXT,
        token TEXT UNIQUE NOT NULL,
        CONSTRAINT token_unique UNIQUE (token));`)
    db.run(`CREATE TABLE rooms(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT);`)
    db.run(`CREATE TABLE seats(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room INTEGER NOT NULL,
        FOREIGN KEY(room) REFERENCES rooms(id));`)
    db.run(`CREATE TABLE bookings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seat INTEGER NOT NULL,
        user INTEGER NOT NULL,
        date TEXT,
        FOREIGN KEY(seat) REFERENCES seats(id),
        FOREIGN KEY(user) REFERENCES users(id));`,
      (error) => {
        if (error) {
          console.log('Table already created')
        } else {
          console.log('Creating some rows...')
          const insertUser = 'INSERT INTO users (name, profilePicture, token) VALUES (?,?,?)'
          db.run(insertUser, ["Malte", "db/user_pictures/user.jpg", "wakndi492jn290n8398"])
          const insertRoom1 = 'INSERT INTO rooms (name) VALUES (?)'
          db.run(insertRoom1, ["Kaminzimmer"])
          const insertRoom2 = 'INSERT INTO rooms (name) VALUES (?)'
          db.run(insertRoom2, ["Konferenzsaal"])
          const insertSeat1 = 'INSERT INTO seats (room) VALUES (?)'
          db.run(insertSeat1, [1])
          const insertSeat2 = 'INSERT INTO seats (room) VALUES (?)'
          db.run(insertRoom2, [2])
        }
      });
  }
});

module.exports = db
