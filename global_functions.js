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

// JWT

const jwt = require("jsonwebtoken");

generateToken = function(user) {
	let payload = {
		Username: user.Username,
		Email: user.Email,
		Name: user.Name,
		Permission: user.Permission,
		_id: user._id.toString(),
	};

	let expiration_time = parseInt(CONFIG.jwt_expiration);

	return (token = jwt.sign(payload, CONFIG.jwt_encryption, {
		expiresIn: expiration_time,
	}));
};

getCleanUser = function(user) {
	if (!user) return {};

	var u = user.toJSON();
	return {
		_id: u._id,
		name: u.name,
		username: u.username,
		email: u.email,
		permission: u.permission,
		DOB: u.DOB,
	};
};

// Bonsai: Elasticsearch
const elasticsearch = require("elasticsearch");
let elasticClient;
const host = process.env.ELASTIC_URL;
getElasticInstance = () => {
	if (elasticClient) return elasticClient;
	elasticClient = new elasticsearch.Client({
		host,
	});
	return elasticClient;
};
