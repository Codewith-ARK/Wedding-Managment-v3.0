const express = require("express")
const path = require("path");
const { renderDashboard, renderUserVenues,renderReservations,renderUserProfile } = require("../utils/renderHTML");
const DB = require("../db/db");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "views", "pages", "index.html"));
});

router.post("/login", (req, res) => {
  const isOkay = auth(req.body);

  if (isOkay) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/");
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

router.get("/venues", (req, res) => {
  res.send(renderUserVenues());
});

router.get("/user/reservations", (req, res) => {
  res.send(renderReservations());
});

router.get('/user/account',(req,res)=>{
  res.send(renderUserProfile());
});

module.exports = router;