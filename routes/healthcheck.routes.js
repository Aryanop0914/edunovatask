const express = require("express");
const router = express.Router();
/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     summary: Health check for the server
 *     responses:
 *       200:
 *         description: Server is up and running
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
 *                   example: "Server Is Up And Running."
 */
router.get("/healthcheck", (req, res, next) => {
  res.status(200).json({ succes: true, message: "Server Is Up And Running." });
});
module.exports = router;
