const mongoose = require("mongoose");

if (CONFIG.DB_URI != "") {
	mongoose.Promise = global.Promise; //set mongo up to use promises

	const mongo_location = CONFIG.DB_URI;

	mongoose
		.connect(mongo_location, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(
			() => {
				console.log(
					"*** Success connect to Mongo Server"
				);
			},
			err => {
				console.log(`*** ${err}`);
			}
		)
		.catch(err => {
			console.log(
				"*** Can Not Connect to Mongo Server"
			);
		});
} else {
	console.log("No Mongo Credentials Given");
}
