const express = require("express")
const path = require("path");
const { renderDashboard, renderUserVenues,renderReservations,renderUserProfile, renderVenue } = require("../utils/renderHTML");
const DB = require("../db/db");
const auth = require("../utils/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "views", "pages", "index.html"));
});

router.post("/login", async (req, res) => {
  try {
    const userData = await DB.fetchUser(req.body.email);
    if (userData === null) {
      res.status(400).json({ status: 404, message: "Can not requested user." });
    }

    const result = await auth(
      req.body.email,
      req.body.password,
      userData.email,
      userData.password
    );

    if (result) {
      res.status(200).json({ status: 200, data: {userId: userData.user_id, userType: userData.user_type} });
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: "Error authenticating: Incorrect email or passsword",
        });
    }
  } catch (error) {
    console.error("Error at login: ", error);
  }
});

router.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "views", "pages", "signup.html"));
});

router.post("/signup", async (req, res) => {
  try {
    const response = await DB.createUser(req.body); // Await the createUser function

    if (response === true) {
      res.status(200).json({ status: 200 });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/dashboard", (req, res) => {
  res.send(renderDashboard());
});

router.get("/venues", async (req, res) => {
  const response = await DB.fetchAllVenues();
  res.send(renderUserVenues(response));
});

router.get("/venue/view/:id", async (req, res) => {
  const venueId = req.params.id;
  const response = await DB.fetchVenueById(venueId);
  res.send(renderVenue(response));
});


router.get("/user/reservations", (req, res) => {
  res.send(renderReservations());
});

router.get('/user/account',(req,res)=>{
  res.send(renderUserProfile());
});

router.get("/401", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "pages", "401.html"));
});

module.exports = router;