const express = require("express")
const path = require("path");
const { renderDashboard, renderUserVenues,renderReservations,renderUserProfile } = require("../utils/renderHTML");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "pages", "index.html"));
});

router.post("/", (req, res) => {
  const isOkay = auth(req.body);

  if (isOkay) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/");
  }
});

router.post('/signup',(req,res)=>{

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