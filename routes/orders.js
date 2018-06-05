const express = require("express");
const router = express.Router();

const orders = require("../controllers/orders");

const passport = require("passport");

router.post("/",
	passport.authenticate("jwt", { session: false }),
	orders.create
);

// Retrieve all Note
router.get("/", orders.findAll);

// Retrieve a single Note with noteId
router.get("/:id", orders.findOne);
// Update a Note with Id

router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	orders.update,
);

module.exports = router;
