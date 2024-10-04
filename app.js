const express = require("express");
const app = express();
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Edunova Task",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "https://edunova.callsconnectai.me/", // Update this based on your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};
// Initialize Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const bookRoutes = require("./routes/book.routes.js");
const userRoutes = require("./routes/user.routes.js");
const transactionRoutes = require("./routes/transaction.routes.js");
const healthCheckRoutes = require("./routes/healthcheck.routes.js");
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api", healthCheckRoutes);
const errorHandler = require("./middleware/errorhandling.middleware.js");
app.use(errorHandler);
module.exports = { app };
