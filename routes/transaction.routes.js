const express = require("express");
const router = express.Router();
const {
  updateIssueDate,
  updateReturnDate,
  getPeopleCountStatusIfNotIssued,
  totalRentGeneratedByBook,
  getAllBookIssuedByUser,
  getAllBookInDateRange,
} = require("../controllers/transaction.controller.js");
router.post("/updateIssueDate", updateIssueDate);
router.post("/updateReturnDate", updateReturnDate);
router.post(
  "/getPeopleCountStatusIfNotIssued",
  getPeopleCountStatusIfNotIssued,
);
router.post("/totalRentGeneratedByBook", totalRentGeneratedByBook);
router.post("/getAllBookIssuedByUser", getAllBookIssuedByUser);
router.post("/getAllBookInDateRange", getAllBookInDateRange);
module.exports = router;
