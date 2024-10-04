const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user.controller.js");

/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches all users from the database.
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                   example: "Users fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user_name:
 *                         type: string
 *                   example: [{ _id: "1",user_name: "john@example.com" }]
 *       500:
 *         description: Internal Server Error
 */
router.get("/getAllUsers", getAllUsers);

module.exports = router;
