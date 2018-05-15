var products = require("../models/products");

exports.create = function(req, res) {
	console.log(req.body);

	var products = new products({
		ProName: req.body.ProName || "",
		TinyDes: req.body.TinyDes || "",
		FullDes: req.body.FullDes || "",
		Prize: req.body.Prize || 0,
		CatID: req.body.CatID || 0,
		IDNSX: req.body.IDNSX || 0,
		Quantity: req.body.Quantity || 0,
		SLB: req.body.SLB || 0,
		LX: req.body.LX || 0,
		XX: req.body.XX || "",
		SLAnh: req.body.SLAnh || ""
	});

	products.save((err, docs) => {
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
			res.status(500).send({ message: "Error when finding" });
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
			ProName: req.body.ProName || "",
			TinyDes: req.body.TinyDes || "",
			FullDes: req.body.FullDes || "",
			Prize: req.body.Prize || 0,
			CatID: req.body.CatID || 0,
			IDNSX: req.body.IDNSX || 0,
			Quantity: req.body.Quantity || 0,
			SLB: req.body.SLB || 0,
			LX: req.body.LX || 0,
			XX: req.body.XX || "",
			SLAnh: req.body.SLAnh || ""
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
