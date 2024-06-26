const express = require("express")
const path = require("path");

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
  res.send("Welcome to Dashboard");
});


module.exports = router;