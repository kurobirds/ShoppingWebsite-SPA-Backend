to = function(promise) {
	//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
	return promise
	.then(data => {
		return [null, data];
	})
	.catch(err => [pe(err)]);
};

pe = require("parse-error"); //parses error so you can read error message and handle them accordingly

TE = function(err_message, log) {
	// TE stands for Throw Error
	if (log === true) {
		console.error(err_message);
	}

	throw new Error(err_message);
};
