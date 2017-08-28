var express = require('express');
var router = express.Router();
var mongoOp = require("../models/mongo").userTanks;


router.get("/", function(req, res) {
  res.json({"error": false, "message": "User Tanks"});
});

module.exports = router;
