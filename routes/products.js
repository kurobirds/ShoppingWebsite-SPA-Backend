var express = require("express");
var router = express.Router();

var products = require("../controllers/products");

router.post("/", products.create);
// Retrieve all Note
router.get("/", products.findAll);
// Retrieve a single Note with noteId
router.get("/:Id", products.findOne);
// Update a Note with Id
router.put("/:Id", products.update);
// Delete a Note with Id
router.delete("/:Id", products.delete);

module.exports = router;
