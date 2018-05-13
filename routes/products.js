var express = require("express");
var router = express.Router();

var products = require("../controllers/products");

router.post("/", products.create);
// Retrieve all Note
router.get("/", products.findAll);
// Retrieve a single Note with noteId
router.get("/:id", products.findOne);
// Update a Note with Id
router.put("/:id", products.update);
// Delete a Note with Id
router.delete("/:id", products.delete);

module.exports = router;
