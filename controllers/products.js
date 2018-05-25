const productModel = require("../models/products");

exports.create = function(req, res) {
	const products = new productModel({
		Name: req.body.Name || "",
		Description: req.body.Description || "",
		Price: req.body.Price || 0,
		Categories_Detail: req.body.Categories_Detail || null,
		Producer_Detail: req.body.Producer_Detail || null,
		Quantity: req.body.Quantity || 0,
		SellQuantity: req.body.SellQuantity || 0,
		View: req.body.View || 0,
	});

	products
		.save()
		.then(doc =>
			productModel.populate(doc, [
				{
					path: "Categories_Detail",
					model: "categories",
				},
				{
					path: "Producer_Detail",
					model: "producers",
				},
			])
		)
		.then(docs => {
			res.send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		});
};

exports.findAll = function(req, res) {
	productModel
		.find()
		.exec()
		.then(docs => {
			res.status(200).send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when finding" });
		});
};

exports.findOne = function(req, res) {
	productModel
		.findById(req.params.id)
		.exec()
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
	productModel
		.findByIdAndUpdate(
			req.params.id,
			{
				Name: req.body.Name || "",
				Description: req.body.Description || "",
				Price: req.body.Price || 0,
				Categories_Detail: req.body.Categories_Detail || null,
				Producer_Detail: req.body.Producer_Detail || null,
				Quantity: req.body.Quantity || 0,
				SellQuantity: req.body.SellQuantity || 0,
				View: req.body.View || 0,
			},
			{ new: true }
		)
		.then(doc =>
			productModel.populate(doc, [
				{
					path: "Categories_Detail",
					model: "categories",
				},
				{
					path: "Producer_Detail",
					model: "producers",
				},
			])
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
	productModel
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
