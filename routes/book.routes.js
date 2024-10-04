const express = require("express");
const router = express.Router();
const {
  findBookByNameOrTerm,
  findBookByPriceRange,
  findBookByPriceRangeCategoryName,
  getAllBooks,
} = require("../controllers/book.controller.js");
router.get("/getAllBooks", getAllBooks);
router.get("/findBookByNameOrTerm", findBookByNameOrTerm);
router.get("/findBookByPriceRange", findBookByPriceRange);
router.get(
  "/findBookByPriceRangeCategoryName",
  findBookByPriceRangeCategoryName,
);
module.exports = router;
