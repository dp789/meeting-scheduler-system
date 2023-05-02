const express = require("express");
const expressListRoutes = require("express-list-routes");
const dotenv = require("dotenv");
const app = express();
const logReqRes = require("./middlewares/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const meet = require("./routes/meetings");
const connect = require("./utils/database/index");

dotenv.config({ path: "/.env.local" });

app.use(express.json());
app.use(logReqRes);

//connect to database
connect();

//mount routes
app.use("/api/v1/", meet);

expressListRoutes(meet);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      description: "API for scheduling meetings",
      version: "1.0.0",
    },
  },
  apis: ["./swagger.yml"], // Path to the API specs file
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log({ swaggerSpec });
// Serve the Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`server on port ${PORT}!`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err}`);
  server.close(() => process.exit(1));
});
