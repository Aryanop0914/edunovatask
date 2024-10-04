const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user.controller.js");
router.get("/getAllUsers", getAllUsers);
module.exports = router;
