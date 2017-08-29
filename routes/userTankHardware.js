var express = require('express');
var router = express.Router();
var UserTankHardware = require("../models/mongo").UserTankHardware;


router.route("/").get(function(req, res) {
  var response = {};
  UserTankHardware.find({}, function(err, data) {
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
  var usertankhardware = new UserTankHardware();
  var response = {};

  usertankhardware.usertankid = req.body.id;
  usertankhardware.tankHardwareType = req.body.type;
  usertankhardware.tankHardwareBrand = req.body.brand;
  usertankhardware.tankHardwarePicture = req.body.picture;

  usertankhardware.save(function(err) {
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
  UserTankHardware.findById(req.params.id, function(err, data) {
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
  UserTankHardware.findById(req.params.id, function(err, data) {
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
        data.tankHardwareType = req.body.type;
      }
      if (req.body.brand !== undefined) {
        // case where password needs to be updated
        data.tankHardwareBrand = req.body.brand;
      }
      if (req.body.picture !== undefined) {
        // case where password needs to be updated
        data.tankHardwarePicture = req.body.picture;
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
  UserTankHardware.findById(req.params.id, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      // data exists, remove it.
      UserTankHardware.remove({
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
