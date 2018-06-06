const producerModel = require("../models/producers");

exports.create = function(req, res) {
	var producer = new producerModel({
		Name: req.body.Name || "null",
	});

	producer.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "Error when creating!" });
		} else {
			res.send(docs);
		}
	});
};

exports.findAll = function(req, res) {
	producerModel
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
	producerModel
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
	producerModel
		.findByIdAndUpdate(
			req.params.id,
			{
				Name: req.body.Name,
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

exports.delete = function(req, res) {
	producerModel
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
