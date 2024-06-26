const express = require("express")
const path = require("path");
const { renderDashboard } = require("../utils/renderHTML");

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

router.get("/dashboard", (req, res) => {
  res.send(renderDashboard());
});


module.exports = router;