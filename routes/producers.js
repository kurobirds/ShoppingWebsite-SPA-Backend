const express = require("express");
const router = express.Router();

const producers = require("../controllers/producers");

const passport = require("passport");

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	producers.create
);

// Retrieve all Note
router.get("/", producers.findAll);

// Retrieve a single Note with noteId
router.get("/:id", producers.findOne);

// Update a Note with Id
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	producers.update
);

// Delete a Note with Id
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	producers.delete
);

module.exports = router;
