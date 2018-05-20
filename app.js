require("./config/config");
require("./global_functions");
require("./models");
console.log(`Environment: ${CONFIG.app}`);

// Default package
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Addition package
const _ = require("lodash");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

// Passport
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt_encryption;

passport.use(
	new JwtStrategy(jwtOptions, function(jwt_payload, next) {
		console.log("payload received", jwt_payload);
		next(null, jwt_payload);
	})
);

//=================================
var producers = require("./routes/nsx");
var categories = require("./routes/categories");
var products = require("./routes/products");
var users = require("./routes/users");
var login = require("./routes/login");
//=================================
var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");
	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With, content-type, Authorization, Content-Type"
	);
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);
	// Pass to next layer of middleware
	next();
});

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
app.use(
	"/api/producers",
	passport.authenticate("jwt", { session: false }),
	producers
);
app.use(
	"/api/categories",
	passport.authenticate("jwt", { session: false }),
	categories
);
app.use(
	"/api/products",
	passport.authenticate("jwt", { session: false }),
	products
);
app.use("/api/users", passport.authenticate("jwt", { session: false }), users);
app.use("/api/login", login);
//===========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
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
