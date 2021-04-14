// USING SQLITE AS LOCAL DATABASE
const sqlite3 = require('sqlite3').verbose()

const DB = 'db.sqlite3'

let db = new sqlite3.Database(DB, (error) => {
  if (error) {
    console.log(error.message)
    throw error
  } else {
    db.run(`pragma foreign_keys=on`)
    console.log('Creating database with SQLite3...')
    db.run(`
      CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        profilePicture TEXT,
        token TEXT UNIQUE NOT NULL,
        CONSTRAINT token_unique UNIQUE (token));`)
    db.run(`CREATE TABLE IF NOT EXISTS rooms(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT);`)
    db.run(`CREATE TABLE IF NOT EXISTS seats(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room INTEGER NOT NULL,
        FOREIGN KEY(room) REFERENCES rooms(id));`)
    db.run(`CREATE TABLE IF NOT EXISTS bookings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seat INTEGER NOT NULL,
        user INTEGER NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY(seat) REFERENCES seats(id),
        FOREIGN KEY(user) REFERENCES users(id));`,
      (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log('Creating some rows...')
          const insertUser = 'INSERT OR IGNORE INTO users (name, profilePicture, token) VALUES (?,?,?)'
          db.run(insertUser, ["Malte", "db/user_pictures/user.jpg", "wakndi492jn290n8398"])
          const insertRoom1 = 'INSERT OR IGNORE INTO rooms (name) VALUES (?)'
          db.run(insertRoom1, "Kaminzimmer")
          const insertRoom2 = 'INSERT OR IGNORE INTO rooms (name) VALUES (?)'
          db.run(insertRoom2, "Konferenzsaal")
          const insertSeat1 = 'INSERT INTO seats (room) VALUES (?)'
          db.run(insertSeat1, 1)
          const insertSeat2 = 'INSERT INTO seats (room) VALUES (?)'
          db.run(insertSeat2, 2)
          const insertBooking = 'INSERT INTO bookings (seat, date, user) VALUES (?,?,?)'
          db.run(insertBooking, [1, "2021-01-08T00:00:00.000", 1])
        }
      });
  }
});

// CHECK! DOES NOT ACCEPT PRAGMA FOREIGN_KEYS = ON AFTER RUNNING FIRST TIME

module.exports = db
