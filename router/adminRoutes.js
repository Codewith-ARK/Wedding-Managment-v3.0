const express = require("express");
const router = express.Router();
const path = require("path");
const adminHTMl = require("../utils/renderAdminHTML");

router.get("/", (req, res) => {
  res.send(adminHTMl.adminDashboard());
});

router.get("/venue/view", (req, res) => {
  res.send(adminHTMl.renderAdminView());
});

router.get("/venue/new", (req, res) => {
  res.send(adminHTMl.addVenue());
});

router.get("/venue/edit", (req, res) => {
  res.send(adminHTMl.editVenue());  
});

router.get("/venue/delete", (req, res) => {
  res.send(adminHTMl.deleteVenue());  
});
module.exports = router;