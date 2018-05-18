const mongoose = require("mongoose");

if (CONFIG.db_host != "") {
	mongoose.Promise = global.Promise; //set mongo up to use promises

	const mongo_location = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@${
		CONFIG.db_host
	}:${CONFIG.db_port}/${CONFIG.db_name}`;

	mongoose
		.connect(mongo_location)
		.then(
			() => {
				console.log(
					`*** Success connect to Mongo Server at ${mongo_location}`
				);
			},
			err => {
				console.log(`*** ${err}`);
			}
		)
		.catch(err => {
			console.log(
				`*** Can Not Connect to Mongo Server: ${mongo_location}`
			);
		});
} else {
	console.log("No Mongo Credentials Given");
}