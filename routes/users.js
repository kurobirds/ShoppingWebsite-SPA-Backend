const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post("/", users.create);
// Retrieve all Note
router.get("/", users.findAll);
// Retrieve a single Note with noteId
router.get("/:id", users.findOne);
// Update a Note with Id
router.put("/:id", users.update);
// Delete a Note with Id
router.delete("/:id", users.delete);

module.exports = router;
