var products = require("../models/products");

exports.create = function(req, res) {
	console.log(req.body);

	var celebrities = new products({
		proname: req.body.proname || "null",
		tinyDes: req.body.tinyDes || "null",
		fullDes: req.body.fullDes || "null",
		Prize: req.body.Prize || 0,
		catID: req.body.catID || 0,
		idNSX: req.body.idNSX || 0,
		Quantity: req.body.Quantity || 0,
		SLBan: req.body.SLBan || 0,
		View: req.body.View || 0,
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
	products.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when finding celebrities" });
		} else {
			res.send(docs);
		}
	});
};

exports.findOne = function(req, res) {
	products.findById(req.params.Id, (err, docs) => {
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
	products.findById(req.params.id, (err, docs) => {
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

		(docs.proname = req.body.proname || "null"),
		(docs.tinyDes = req.body.tinyDes || "null"),
		(docs.fullDes = req.body.fullDes || "null"),
		(docs.Prize = req.body.Prize || 0),
		(docs.catID = req.body.catID || 0),
		(docs.idNSX = req.body.idNSX || 0),
		(docs.Quantity = req.body.Quantity || 0),
		(docs.SLBan = req.body.SLBan || 0),
		(docs.View = req.body.View || 0),
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
	products.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === "ObjectId") {
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
