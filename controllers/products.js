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
	products
		.findById(req.params.id)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			res.send(doc);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({ message: "Error when finding!" });
		});
};

exports.update = function(req, res) {
	products
		.findByIdAndUpdate(
			req.params.id,
			{
				proname: req.body.proname || "null",
				tinyDes: req.body.tinyDes || "null",
				fullDes: req.body.fullDes || "null",
				Prize: req.body.Prize || 0,
				catID: req.body.catID || 0,
				idNSX: req.body.idNSX || 0,
				Quantity: req.body.Quantity || 0,
				SLBan: req.body.SLBan || 0,
				View: req.body.View || 0,
			},
			{ new: true }
		)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			res.send(doc);
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({
				message: "Error when finding!",
			});
		});
};

exports.delete = function(req, res) {
	products
		.findByIdAndRemove(req.params.id)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			res.send({ message: "Deleted successfully!" });
		})
		.catch(err => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			return res.status(500).send({
				message: `Error when delete with id ${req.params.id}`,
			});
		});
};
