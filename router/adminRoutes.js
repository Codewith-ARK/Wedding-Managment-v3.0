const express = require("express");
const router = express.Router();
const path = require("path");
const adminHTMl = require("../utils/renderAdminHTML");
const DB = require("../db/db");

router.get("/", (req, res) => {
  res.send(adminHTMl.adminDashboard());
});

router.get("/venue/view", async (req, res) => {
  const venues = await DB.fetchAllVenues();
  res.send(adminHTMl.renderAdminView(venues));
});

router.get("/venue/new", (req, res) => {
  res.send(adminHTMl.addVenue());
});

router.post("/venue/new", (req,res)=>{
  const data = {
    name: req.body.name,
    address: req.body.address,
    pictureUrl: req.body.pictureUrl,
    area: req.body.area,
    charges: req.body.charges
  }
  DB.addVenue(data)
  res.status(200);
})

router.get("/venue/edit", async (req, res) => {
  const response = await DB.fetchAllVenues()
  res.send(adminHTMl.editVenue(response));  
});

router.get("/venue/delete", (req, res) => {
  res.send(adminHTMl.deleteVenue());  
});

module.exports = router;