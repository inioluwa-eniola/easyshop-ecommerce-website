const express = require("express");
const productsRoute = require("./controllers/products");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const mongoose = require('mongoose')

const app = express();

logger.info("connecting to", MONGODB_URI);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { family: 4 });
    logger.info("connected to MongDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error);
  }
};

connectToDatabase();

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/products", productsRoute);

module.exports = app;
