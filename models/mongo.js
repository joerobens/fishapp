var mongoose = require("mongoose");
//var db = mongoose.connect('mongodb://localhost/fishapp');

// create instance of Schema
var mongoSchema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/fishapp');
//mongoose.createConnection('localhost', 'fishapp');

// create schema
var usersSchema = new mongoSchema({
  "userEmail": String,
  "userPassword": String,
  "userType": Number,
  "userAddress": {
    street: String,
    city: String,
    state: String,
    postcode: Number
  },
  "userContact": {
    "userPhone": String,
    "userMobile": String
  },
  "userPrefs": {
    "userMeansurement": String,
    "userAvatar": String
  },
  "lastLogin": { type : Date, default: Date.now }
});

var userTanksSchema = new mongoSchema({
	"userid": mongoSchema.Types.ObjectId,
	"tankType": String,
	"tankDimensions": {"width": Number, "length": Number, "height": Number},
	"tankVolume": Number,
	"tankName": String,
	"tankPicture": String,
});

var userTankHardwareSchema = new mongoSchema({
	"UserTankid": mongoSchema.Types.ObjectId,
	"tankHardwareType": String,
	"tankHardwareBrand": String,
});

var userTankParametersSchema = new mongoSchema({
	"userTankId": mongoSchema.Types.ObjectId,
  "userTankTest": {
  	"parameterName": String,
  	"parameterResult": String,
  	"parameterMeasureDate": Date,
  	"parameterMeasureType": String,
  	"parameterNotes": String
  }
});

var userTankLivestockSchema = new mongoSchema({
	"userTankId": mongoSchema.Types.ObjectId,
	"tanksLivestockType": String,
	"tanksLivestockName": String,
	"tanksLivestockQty": Number,
	"tanksLivestockType": String,
	"tanksLivestockTaxonomy": String,
	"tanksLivestockDate": Date,
	"tanksLivestockAge": Number,
	"tanksLivestockPicture": String,
});

var userTankMaintenanceSchema = new mongoSchema({
	"userTankId": mongoSchema.Types.ObjectId,
	"maintenanceTaskName": String,
	"maintenanceTaskType": String,
	"maintenanceTaskInstructions": String,
	"maintenanceTaskSchedule": {
		"scheduleStart": Date,
		"scheduleFrequencyType": String,
		"scheduleEvery": Number,
		"scheduleRepeatType": Number,
		"scheduleReminder": Date,
	},
	"maintenanceTaskActive": Boolean,
});

var Users = mongoose.model('Users', usersSchema);
var UserTanks = mongoose.model("UserTanks", userTanksSchema);
var UserTankHardware = mongoose.model('UserTankHardware', userTankHardwareSchema);
var UserTankParameters = mongoose.model('UserTankParameters', userTankParametersSchema);
var UserTankLivestock = mongoose.model('UserTankLivestock', userTankLivestockSchema);
var UserTankMaintenance = mongoose.model('UserTankMaintenance', userTankMaintenanceSchema);

// create model if not exists.
module.exports = {
  Users: Users,
  UserTanks: UserTanks,
  UserTankHardware: UserTankHardware,
  UserTankParameters: UserTankParameters,
  UserTankLivestock: UserTankLivestock,
  UserTankMaintenance: UserTankMaintenance
};
