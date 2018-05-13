var express = require("express");
var router = express.Router();

var categories = require("../controllers/categories");

router.post("/", categories.create);
// Retrieve all Note
router.get("/", categories.findAll);
// Retrieve a single Note with noteId
router.get("/:Id", categories.findOne);
// Update a Note with Id
router.put("/:Id", categories.update);
// Delete a Note with Id
router.delete("/:Id", categories.delete);

module.exports = router;
