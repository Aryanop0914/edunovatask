const express = require("express");
const router = express.Router();
router.get("/healthcheck", (req, res, next) => {
  res.status(200).json({succes: true, message: "Server Is Up And Running."})
});
module.exports = router;
