var express = require("express");
var router = express.Router();

var nsx = require("../controllers/nsx");

router.post("/", nsx.create);
// Retrieve all Note
router.get("/", nsx.findAll);
// Retrieve a single Note with noteId
router.get("/:id", nsx.findOne);
// Update a Note with Id
router.put("/:id", nsx.update);
// Delete a Note with Id
router.delete("/:id", nsx.delete);

module.exports = router;
