var express = require("express");
var app = express();


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

//var mongoOp = require("./models/mongo");

// var router = express.Router();

//include the routes file
var routes = require('./routes/routes');

////////
app.use('/', routes);

app.listen(3000);
console.log("Listening to PORT 3000");
