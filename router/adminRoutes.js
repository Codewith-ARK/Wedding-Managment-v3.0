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
  res.status(200).redirect('/admin/venue/view');
})

router.get("/venue/edit", async (req, res) => {
  const response = await DB.fetchAllVenues()
  res.send(adminHTMl.editVenue(response));  
});

router.get("/venue/delete", (req, res) => {
  res.send(adminHTMl.deleteVenue());  
});

router.delete("/venue/delete/:id", async (req, res) => {
  const venueId = req.params.id;
  try {
    const response = await DB.deleteVenue(venueId);
    console.log(response);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/venue/view/:id", async (req, res) => {
//   try {
//     const venueId = req.params.id;
//     const venue = await DB.fetchVenueById(venueId); // Assume this function fetches a venue by ID
//     res.render("viewVenue", { venue });
//   } catch (error) {
//     console.error("Error fetching venue details: ", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;