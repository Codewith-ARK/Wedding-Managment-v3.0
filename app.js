const express = require("express");
const path = require('path')
const appRoutes = require('./router/routes.js');
const adminRoutes = require('./router/adminRoutes.js');
const DB = require("./db/db.js");

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public',express.static(path.join(__dirname, 'public')))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

DB.createUserTable();
DB.createVenueTable();

app.use(appRoutes);
app.use('/admin',adminRoutes);


app.listen(process.env.PORT || 3000, () =>
  console.log("Server started @ http://localhost:3000")
);
