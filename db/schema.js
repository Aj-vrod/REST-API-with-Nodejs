// TABLES: USERS, ROOMS, SEATS, BOOKINGS
//           id      id    id        id
//           name   name  room_id    seat_id
// profilePicture                    date
//                                   user_id

const createSchema = (db) => {
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
      FOREIGN KEY(user) REFERENCES users(id));`)
}

module.exports = createSchema
