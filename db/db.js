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

    // Wrap the database operation in a Promise
    return new Promise((resolve, reject) => {
      db.run(query, [data.fullName, data.email, hashedPass, data.avatarLink, data.userType], function(err) {
        if (err) {
          console.error('Error inserting user into users table: ', err.message);
          reject(err); // Reject the promise with the error
        } else {
          console.log(`A new user has been inserted with rowid ${this.lastID}`);
          resolve(true); // Resolve the promise with a success indicator
        }
      });
    });

  } catch (err) {
    console.error('Error hashing password: ', err.message);
    throw err; // Throw the error to be caught elsewhere if needed
  }
}


DB.fetchUser = async (userEmail) => {
  const query = `SELECT * FROM users WHERE email = ?`;

  try {
    const row = await new Promise((resolve, reject) => {
      db.get(query, [userEmail], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    return row; // Return the fetched row
  } catch (err) {
    throw err; // Re-throw the error for handling elsewhere
  }
};

// Function to add a new venue
DB.addVenue = (venueData) => {
  return new Promise((resolve, reject) => {
    // Prepare the SQL query
    const query = `
      INSERT INTO venues (name, address, image_url, seating_capacity, charges)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    // Execute the query with parameters
    db.run(query, [venueData.name, venueData.address, venueData.pictureUrl, venueData.area, venueData.charges], function(err) {
      if (err) {
        console.error('Error adding venue:', err.message);
        reject(err); // Reject the promise with the error
      } else {
        console.log(`Venue added with ID: ${this.lastID}`);
        resolve({ id: this.lastID }); // Resolve the promise with the last inserted ID
      }
    });
  });
};

DB.fetchAllVenues = () => {
  return new Promise((resolve, reject) => {
    // Prepare the SQL query
    const query = `SELECT * FROM venues`;
    
    // Execute the query
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error fetching venues:', err.message);
        reject(err); // Reject the promise with the error
      } else {
        resolve(rows); // Resolve the promise with the fetched rows
      }
    });
  });
};

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

// db.all(`PRAGMA table_info(venues);`, [], (err, rows) => {
//   if (err) {
//     console.error('Error fetching table schema:', err.message);
//     return;
//   }
//   console.log('Table schema:', rows);
// });

db.get(`select * from venues`, [], (err, rows) => {
  // console.log("Row:", rows);
});

module.exports = DB;
