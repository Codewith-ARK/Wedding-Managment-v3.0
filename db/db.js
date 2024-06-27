const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

let db = new sqlite3.Database('./db/wedding-management.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error('Error connecting to DB: ', err.message);
  }
  console.log("Connection to DB successful.");
});

const DB = {};

DB.createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar_link TEXT,
    user_type TEXT CHECK(user_type IN ('user', 'admin', 'employee')) NOT NULL DEFAULT 'user'
  );`;

  db.run(query, (err) => {
    if (err) {
      return console.error('Error creating users table: ', err.message);
    }
    console.log('Users table created or already exists.');
  });
}

DB.createVenueTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS venues (
    venue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    image_url TEXT,
    seating_capacity INTEGER NOT NULL,
    charges REAL NOT NULL
  );`;

  db.run(query, (err) => {
    if (err) {
      return console.error('Error creating venues table: ', err.message);
    }
    console.log('Venues table created or already exists.');
  });
}

DB.createUser = async (data) => {
  try {
    const hashedPass = await bcrypt.hash(data.password, 10);

    const query = `INSERT INTO users (username, email, password, avatar_link, user_type) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [data.fullName, data.email, hashedPass, data.avatarLink, data.userType], function(err) {
      if (err) {
        return console.error('Error inserting user into users table: ', err.message);
      }
      console.log(`A new user has been inserted with rowid ${this.lastID}`);
    });
  } catch (err) {
    console.error('Error hashing password: ', err.message);
  }
}

DB.fetchAllUsers = () => {
  const query = `SELECT * FROM users`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(rows);
  });
}

DB.closeDB = () => {
  db.close((err) => {
    if (err) {
      return console.error('Error closing the database connection: ', err.message);
    }
    console.log('Database connection closed.');
  });
};

module.exports = DB;
