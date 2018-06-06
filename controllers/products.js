const productModel = require("../models/products");

exports.create = function(req, res) {
	const products = new productModel({
		Name: req.body.Name || "",
		Description: req.body.Description || "",
		Price: req.body.Price || 0,
		Categories_Detail: req.body.Categories_Detail || null,
		Producer_Detail: req.body.Producer_Detail || null,
		Stock_Quantity: req.body.Stock_Quantity || 0,
		Sold_Quantity: req.body.Sold_Quantity || 0,
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
			]),
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
		.sort({ _id: 1 })
		.exec()
		.then(docs => {
			res.status(200).send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when finding" });
		});
};

exports.findOne = async function(req, res) {
	updateView = async newView => {
		await productModel.findByIdAndUpdate(req.params.id, {
			View: newView,
		});
	};
	productModel
		.findById(req.params.id)
		.exec()
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}

			const newView = doc.View + 1;
			updateView(newView);
			doc.View = newView;

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

exports.findOneAdminPermission = function(req, res) {
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
				Name: req.body.Name,
				Description: req.body.Description,
				Price: req.body.Price,
				Categories_Detail: req.body.Categories_Detail,
				Producer_Detail: req.body.Producer_Detail,
				Stock_Quantity: req.body.Stock_Quantity,
				Sold_Quantity: req.body.Sold_Quantity,
				View: req.body.View,
			},
			{ new: true },
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
			]),
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
