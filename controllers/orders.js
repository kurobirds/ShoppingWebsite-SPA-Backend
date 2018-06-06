const orderModel = require("../models/orders");
const productModel = require("../models/products");

exports.create = async function(req, res) {
	updateProductQuantity = async orderProduct => {
		const plainProduct = await productModel
			.findById(orderProduct.Product_Info)
			.exec()
			.then(product => {
				return product;
			});
		await productModel.findByIdAndUpdate(orderProduct.Product_Info, {
			Stock_Quantity:
				plainProduct.Stock_Quantity - orderProduct.Select_Quantity,
			Sold_Quantity:
				plainProduct.Sold_Quantity + orderProduct.Select_Quantity,
		});
	};

	const List_Product = req.body.List_Product;

	for (let index in List_Product) {
		updateProductQuantity(List_Product[index]);
	}

	const order = new orderModel({
		Order_Date: req.body.Order_Date,
		User_Detail: req.body.User_Detail,
		List_Product,
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
				Status: req.body.Status,
			},
			{ new: true },
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
