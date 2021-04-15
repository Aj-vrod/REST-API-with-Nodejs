// USING SQLITE3 AS LOCAL DATABASE
const sqlite3 = require('sqlite3').verbose()
const createSchema = require('./schema')
const seeding = require('./seed')

const DB = 'db.sqlite3'

let db = new sqlite3.Database(DB, (error) => {
  if (error) {
    console.log(error.message)
    throw error
  } else {
    createSchema(db)
    db.run(`pragma foreign_keys=on`,
      (error) => {
        if (error) {
          console.log(error)
        } else {
          seeding(db)
        }
      });
  }
});

// CHECK! RUN AGAIN IF FOREIGN_KEYS RETURNS AN ERROR AT FIRST ATTEMPT
//        NO ERROR FOUND IN CODE THAT CAUSE IT, STILL, SOMETIMES IT FAILS

module.exports = db
