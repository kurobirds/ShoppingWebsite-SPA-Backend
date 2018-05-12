var nsx = require("../models/nsx");

exports.create = function(req, res) {
	console.log(req.body);

	var celebrities = new nsx({
		namensx: req.body.namensx || "null",
	});

	celebrities.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findAll = function(req, res) {
	nsx.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when finding celebrities" });
		} else {
			res.send(docs);
		}
	});
};

exports.findOne = function(req, res) {
	nsx.findById(req.params.Id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === "ObjectId") {
				res.status(404).send({
					message: "Not found with id!",
				});
			}
			res.status(500).send({ message: "Error when finding!" });
		}

		if (!docs) {
			return res.status(404).send({
				message: "Not found with id!",
			});
		}

		res.send(docs);
	});
};

exports.update = function(req, res) {
	nsx.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === "ObjectId") {
				res.status(404).send({
					message: "Not found with id" + req.params.id,
				});
			}
			res.status(500).send({ message: "Error when finding!" });
		}

		if (!docs) {
			return res.status(404).send({
				message: "Not found with id" + req.params.id + req.params.id,
			});
		}

		docs.namensx = req.body.description || "Null";

		docs.save((err, docs) => {
			err
				? res.status(500).send({
					message: "Could not update with id" + req.params.id,
				  })
				: res.send(docs);
		});
	});
};

exports.delete = function(req, res) {
	nsx.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === "ObejectId") {
				res
					.status(404)
					.send({ message: "Not found with id" + req.params.id });
			}
			res
				.status(500)
				.send({ message: "Error when delete with id" + req.params.id });
		}

		if (!docs) {
			return res
				.status(404)
				.send({ message: "Not found with id" + req.params.id });
		}

		res.send({ message: "Deleted successfully!" });
	});
};
