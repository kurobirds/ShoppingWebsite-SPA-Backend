const express = require("express");
const router = express.Router();

const products = require("../controllers/products");

const passport = require("passport");

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	products.create
);
// Retrieve all Note
router.get("/", products.findAll);
// Retrieve a single Note with noteId
router.get("/:id", products.findOne);
// Update a Note with Id
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	products.update
);
// Delete a Note with Id
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	products.delete
);

module.exports = router;
