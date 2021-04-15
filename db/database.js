// USING SQLITE3 AS LOCAL DATABASE
const sqlite3 = require('sqlite3').verbose()
const seeding = require('./seed')

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
        profilePicture TEXT);`)
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
          seeding(db)
        }
      });
  }
});

// CHECK! RUN TWICE IF FOREIGN_KEYS RETURN AN ERROR

module.exports = db
