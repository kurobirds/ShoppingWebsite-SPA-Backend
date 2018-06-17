const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
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
		.then(doc => {
			res.send(doc);
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

exports.createComment = async (req, res) => {
	let [err, listComment] = await to(
		productModel.findById(req.params.id).select("Comments"),
	);

	newComment = {
		author: req.body.author,
		createdAt: req.body.createdAt,
		comment: req.body.comment,
	};

	listComment.Comments.push(newComment);

	const newListComment = listComment.Comments;

	productModel
		.findByIdAndUpdate(
			req.params.id,
			{
				Comments: newListComment,
			},
			{ new: true },
		)
		.then(doc => {
			if (!doc) {
				return res.status(404).send({
					message: `Not found with id ${req.params.id}`,
				});
			}
			res.send(doc.Comments);
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

exports.findCategorySales = function(req, res) {
	productModel
		.aggregate([
			{
				$group: {
					_id: "$Categories_Detail",
					sumQuantity: { $sum: "$Sold_Quantity" },
				},
			},
			{
				$lookup: {
					from: "categories",
					localField: "_id",
					foreignField: "_id",
					as: "Categories_Detail",
				},
			},
			{
				$unwind: "$Categories_Detail",
			},
			{
				$project: {
					_id: 0,
					sumQuantity: 1,
					Name: "$Categories_Detail.Name",
				},
			},
			{ $sort: { sumQuantity: -1 } },
		])
		.exec()
		.then(docs => {
			res.status(200).send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when finding" });
		});
};

exports.findProducerSales = function(req, res) {
	productModel
		.aggregate([
			{
				$group: {
					_id: "$Producer_Detail",
					sumQuantity: { $sum: "$Sold_Quantity" },
				},
			},
			{
				$lookup: {
					from: "producers",
					localField: "_id",
					foreignField: "_id",
					as: "Producer_Detail",
				},
			},
			{
				$unwind: "$Producer_Detail",
			},
			{
				$project: {
					_id: 0,
					sumQuantity: 1,
					Name: "$Producer_Detail.Name",
				},
			},
			{ $sort: { sumQuantity: -1 } },
		])
		.exec()
		.then(docs => {
			res.status(200).send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when finding" });
		});
};

exports.findTop10ProductSales = function(req, res) {
	productModel
		.aggregate([
			{
				$project: {
					_id: 1,
					Price: 1,
					Sold_Quantity: 1,
					Name: 1,
					Images: 1,
				},
			},
			{ $sort: { Sold_Quantity: -1 } },
			{ $limit: 10 },
		])
		.exec()
		.then(docs => {
			res.status(200).send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when finding" });
		});
};
