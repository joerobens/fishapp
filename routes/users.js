// Main user management route functions
var express = require('express');
var router = express.Router();
var Users = require("../models/mongo").Users;
var UserProfiles = require("../models/mongo").UserProfiles;

// GENERAL USER CREATION
router.route("/").get(function(req, res) {
  var response = {};
  Users.find({}, function(err, data) {
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
  var user = new Users();
  var response = {};
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  user.userEmail = req.body.email;
  // Hash the password using SHA1 algorithm.
  user.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
  user.userType = req.body.userType;
  user.userAddress = {
    "street": req.body.street,
    "city": req.body.city,
    "state": req.body.state,
    "postcode": req.body.postcode
  };
  user.userContact = {
    "userPhone": req.body.phone,
    "userMobile": req.body.mobile
  };
  user.userPrefs = {
    "userMeansurement": req.body.unit,
    "userAvatar": req.body.avatar
  };
  // Set the User Type
  // db.userType = req.body.type;

  user.save(function(err) {
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

// USER SPECIFIC FUNCTIONS
router.route("/:id").get(function(req, res) {
  var response = {};
  Users.findById(req.params.id, function(err, data) {
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
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      // we got data from Mongo.
      // change it accordingly.
      if (req.body.userEmail !== undefined) {
        // case where email needs to be updated.
        data.userEmail = req.body.userEmail;
      }
      if (req.body.userPassword !== undefined) {
        // case where password needs to be updated
        data.userPassword = req.body.userPassword;
      }

      // ADD ALL USER FIELDS
      if (req.body.userType !== undefined) {
        // case where password needs to be updated
        data.userType = req.body.userType;
      }
      if (req.body.street !== undefined) {
        // case where password needs to be updated
        data.userAddress.street = req.body.street;
      }
      if (req.body.city !== undefined) {
        // case where password needs to be updated
        data.userAddress.city = req.body.city;
      }
      if (req.body.state !== undefined) {
        // case where password needs to be updated
        data.userAddress.state = req.body.state;
      }
      if (req.body.postcode !== undefined) {
        // case where password needs to be updated
        data.userAddress.postcode = req.body.postcode;
      }

      if (req.body.phone !== undefined) {
        // case where password needs to be updated
        data.userContact.userPhone = req.body.phone;
      }
      if (req.body.mobile !== undefined) {
        // case where password needs to be updated
        data.userContact.mobile = req.body.mobile;
      }

      if (req.body.unit !== undefined) {
        // case where password needs to be updated
        data.userPrefs.userMeansurement = req.body.unit;
      }
      if (req.body.avatar !== undefined) {
        // case where password needs to be updated
        data.userPrefs.userAvatar = req.body.avatar;
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
  Users.findById(req.params.id, function(err, data) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      };
    } else {
      // data exists, remove it.
      Users.remove({
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
