var express = require('express');
var router = express.Router();
var UserTanks = require("../models/mongo").UserTanks;


router.route("/").get(function(req, res) {
  var response = {};
  UserTanks.find({}, function(err, data) {
    // Mongo command to fetch all data from collection.
    //console.log(data)
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      response = {
        "error": false,
        "message": data
      };
    }
    res.json(response);
  });
}).post(function(req, res) {
  var usertank = new UserTanks();
  var response = {};

  usertank.userid = req.body.id;
  usertank.tankType = req.body.type;
  usertank.tankDimensions = {
    "width": req.body.width,
    "length": req.body.length,
    "height": req.body.height
  };
  usertank.tankVolume = req.body.volume;
  usertank.tankName = req.body.name;
  usertank.tankPicture = req.body.picture;

  usertank.save(function(err) {
    // save() will run insert() command of MongoDB.
    // it will add new data in collection.
    if (err) {
      response = {
        "error": true,
        "message": "Error adding data"
      };
    } else {
      response = {
        "error": false,
        "message": "Data added"
      };
    }
    res.json(response);
  });

});

// USER TANK SPECIFIC FUNCTIONS
router.route("/:id").get(function(req, res) {
  var response = {};
  UserTanks.findById(req.params.id, function(err, data) {
    // This will run Mongo Query to fetch data based on ID.
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      response = {
        "error": false,
        "message": data
      };
    }
    res.json(response);
  });
}).put(function(req, res) {
  var response = {};
  // first find out record exists or not
  // if it does then update the record
  UserTanks.findById(req.params.id, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      // we got data from Mongo.
      // change it accordingly.
      if (req.body.type !== undefined) {
        // case where email needs to be updated.
        data.tankType = req.body.type;
      }
      if (req.body.width !== undefined) {
        // case where password needs to be updated
        data.tankDimensions.width = req.body.width;
      }
      if (req.body.length !== undefined) {
        // case where password needs to be updated
        data.tankDimensions.length = req.body.length;
      }
      if (req.body.height !== undefined) {
        // case where password needs to be updated
        data.tankDimensions.height = req.body.height;
      }
      if (req.body.volume !== undefined) {
        // case where password needs to be updated
        data.tankVolume = req.body.volume;
      }
      if (req.body.name !== undefined) {
        // case where password needs to be updated
        data.tankName = req.body.name;
      }
      if (req.body.picture !== undefined) {
        // case where password needs to be updated
        data.tankPicture = req.body.picture;
      }

      // save the data
      data.save(function(err) {
        if (err) {
          response = {
            "error": true,
            "message": "Error updating data"
          };
        } else {
          response = {
            "error": false,
            "message": "Data is updated for " + req.params.id
          };
        }
        res.json(response);
      })
    }
  });
}).delete(function(req, res) {
  var response = {};
  // find the data
  UserTanks.findById(req.params.id, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      // data exists, remove it.
      UserTanks.remove({
        _id: req.params.id
      }, function(err) {
        if (err) {
          response = {
            "error": true,
            "message": "Error deleting data"
          };
        } else {
          response = {
            "error": true,
            "message": "Data associated with " + req.params.id + "is deleted"
          };
        }
        res.json(response);
      });
    }
  });
});

module.exports = router;
