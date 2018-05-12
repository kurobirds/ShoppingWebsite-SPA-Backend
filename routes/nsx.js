var express = require("express");
var router = express.Router();

var nsx = require("../controllers/nsx");

router.post("/", nsx.create);
// Retrieve all Note
router.get("/", nsx.findAll);
// Retrieve a single Note with noteId
router.get("/:Id", nsx.findOne);
// Update a Note with Id
router.put("/:Id", nsx.update);
// Delete a Note with Id
router.delete("/:Id", nsx.delete);

module.exports = router;
