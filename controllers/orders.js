const orderModel = require("../models/orders");

exports.create = function(req, res) {
	const order = new orderModel({
		OrderDate: req.body.OrderDate,
		UserDetail: req.body.UserDetail,
		ListProduct: req.body.ListProduct,
		Price: req.body.Price,
		Status: req.body.Status,
	});

	order
		.save()
		.then(docs => {
			res.send(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		});
};

exports.findAll = function(req, res) {
	orderModel
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
	orderModel
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
	orderModel
		.findByIdAndUpdate(
			req.params.id,
			{
				OrderDate: req.body.OrderDate,
				UserDetail: req.body.UserDetail,
				ListProduct: req.body.ListProduct,
				Price: req.body.Price,
				Status: req.body.Status,
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
