var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.json({"error": false, "message": "Hello World"});
});

router.use('/users', require('./users'));
router.use('/userProfiles', require('./userProfiles'));
router.use('/userTanks', require('./userTanks'));

module.exports = router;