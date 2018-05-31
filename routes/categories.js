const express = require("express");
const router = express.Router();

const categories = require("../controllers/categories");

const passport = require("passport");

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	categories.create
);
// Retrieve all Note
router.get("/", categories.findAll);

// Retrieve a single Note with noteId
router.get("/:id", categories.findOne);
router.get("/:id/products", categories.findProducts);

// Update a Note with Id
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	categories.update
);

// Delete a Note with Id
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	categories.delete
);

module.exports = router;
