require("./config/config");
require("./global_functions");
require("./models");
require("./middleware/passport");
console.log(`Environment: ${CONFIG.app}`);

// Default package
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')

// Addition package
const mongoose = require("mongoose");
const passport = require("passport");

//=================================
var producers = require("./routes/producers");
var categories = require("./routes/categories");
var products = require("./routes/products");
var users = require("./routes/users");
var login = require("./routes/login");
var register = require("./routes/register");
var orders = require("./routes/orders");
//=================================

// Bonsai: Elasticsearch
var client = getElasticInstance();

// Test the connection:
// Send a HEAD request to "/" and allow
// up to 30 seconds for it to complete.
client.ping(
	{
		requestTimeout: 30000,
	},
	function(error) {
		if (error) {
			console.error("elasticsearch cluster is down!");
		} else {
			console.log("All is well");
		}
	},
);

var app = express();

// view engine setup
app.use(express.static("public"));
app.use(express.static("views"));
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(cors())

app.use("*", (req, res, next) => {
	if (req.method == "OPTIONS") {
		res.status(200);
		res.send();
	} else {
		next();
	}
});

app.get("/", (req, res) => {
	res.statusCode = 200;
	res.send("Server online~~~");
});

//===========================
app.use("/api/producers", producers);
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/users", passport.authenticate("jwt", { session: false }), users);
app.use("/api/sign-in", login);
app.use("/api/sign-up", register);
app.use("/api/orders", orders);
//===========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404).send("404: File Not Found");
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
