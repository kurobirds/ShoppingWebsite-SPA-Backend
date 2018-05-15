var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

//=================================
var producers = require("./routes/nsx");
var categories = require("./routes/categories");
var products = require("./routes/products");
var users = require("./routes/users");
//=================================
var indexRouter = require("./routes/index");

var app = express();

// Mongoose

const mongoDB =
"mongodb://admin:admin@ds117590.mlab.com:17590/shopping-website-spa";
mongoose.Promise = global.Promise;
mongoose
.connect(mongoDB)
.then(() => {
	console.log("connection success");
})
.catch(error => {
	console.log("Connect fail: ", error.stack);
	process.exit(1);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// enable cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
		);
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.use("/", indexRouter);

//===========================
app.use("/api/producers", producers);
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/users", users);
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
