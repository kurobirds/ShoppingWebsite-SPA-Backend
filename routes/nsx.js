const express = require("express");
const router = express.Router();

const nsx = require("../controllers/nsx");

const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), nsx.create);
// Retrieve all Note
router.get("/", nsx.findAll);
// Retrieve a single Note with noteId
router.get("/:id", nsx.findOne);
// Update a Note with Id
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	nsx.update
);
// Delete a Note with Id
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	nsx.delete
);

module.exports = router;
