const express = require("express");
const router = express.Router();
const {
  findBookByNameOrTerm,
  findBookByPriceRange,
  findBookByPriceRangeCategoryName,
  getAllBooks,
} = require("../controllers/book.controller.js");
/**
 * @swagger
 * /api/books/getAllBooks:
 *   get:
 *     summary: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Books fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       book_name:
 *                         type: string
 *                       book_category:
 *                         type: string
 *                       book_rent_per_day:
 *                         type: number
 */

/**
 * @swagger
 * /api/books/findBookByNameOrTerm:
 *   get:
 *     summary: Find books by name or search term
 *     parameters:
 *       - in: query
 *         name: book_name
 *         required: true
 *         description: The name or term to search for books
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Books fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       book_name:
 *                         type: string
 *                       book_category:
 *                         type: string
 *                       book_rent_per_day:
 *                         type: number
 */

/**
 * @swagger
 * /api/books/findBookByPriceRange:
 *   get:
 *     summary: Find books within a price range
 *     parameters:
 *       - in: query
 *         name: min_price
 *         required: true
 *         description: Minimum price for the book rental
 *         schema:
 *           type: number
 *       - in: query
 *         name: max_price
 *         required: true
 *         description: Maximum price for the book rental
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Books fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       book_name:
 *                         type: string
 *                       book_category:
 *                         type: string
 *                       book_rent_per_day:
 *                         type: number
 */

/**
 * @swagger
 * /api/books/findBookByPriceRangeCategoryName:
 *   get:
 *     summary: Find books by name, category, and price range
 *     parameters:
 *       - in: query
 *         name: book_name
 *         required: true
 *         description: The name of the book
 *         schema:
 *           type: string
 *       - in: query
 *         name: book_category
 *         required: true
 *         description: The category of the book
 *         schema:
 *           type: string
 *       - in: query
 *         name: min_price
 *         required: true
 *         description: Minimum price for the book rental
 *         schema:
 *           type: number
 *       - in: query
 *         name: max_price
 *         required: true
 *         description: Maximum price for the book rental
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Books fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       book_name:
 *                         type: string
 *                       book_category:
 *                         type: string
 *                       book_rent_per_day:
 *                         type: number
 */
router.get("/getAllBooks", getAllBooks);
router.get("/findBookByNameOrTerm", findBookByNameOrTerm);
router.get("/findBookByPriceRange", findBookByPriceRange);
router.get(
  "/findBookByPriceRangeCategoryName",
  findBookByPriceRangeCategoryName
);
module.exports = router;
