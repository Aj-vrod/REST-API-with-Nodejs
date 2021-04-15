// CREATES TWO USERS, TWO ROOMS AND TWO SEATS FOR EACH ROOM

const seeding = (db) => {
  console.log('Creating some rows...')
  const insertUser1 = 'INSERT OR IGNORE INTO users (name, profilePicture) VALUES (?,?)'
  db.run(insertUser1, ["Malte", "db/user_pictures/user.jpg"])
  const insertUser2 = 'INSERT OR IGNORE INTO users (name, profilePicture) VALUES (?,?)'
  db.run(insertUser2, ["John", "db/user_pictures/user.jpg"])
  const insertRoom1 = 'INSERT OR IGNORE INTO rooms (name) VALUES (?)'
  db.run(insertRoom1, "Kaminzimmer")
  const insertRoom2 = 'INSERT OR IGNORE INTO rooms (name) VALUES (?)'
  db.run(insertRoom2, "Konferenzsaal")
  const insertSeat1 = 'INSERT INTO seats (room) VALUES (?)'
  db.run(insertSeat1, 1)
  const insertSeat2 = 'INSERT INTO seats (room) VALUES (?)'
  db.run(insertSeat2, 1)
  const insertSeat3 = 'INSERT INTO seats (room) VALUES (?)'
  db.run(insertSeat3, 2)
  const insertSeat4 = 'INSERT INTO seats (room) VALUES (?)'
  db.run(insertSeat4, 2)
}

module.exports = seeding
