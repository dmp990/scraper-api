const express = require("express");
const app = express();

app.use(express.json());

const { getDistance } = require("./controllers/basicController");
const { unhandledErrors } = require("./errors/handleErrors");

app.get("/", getDistance);

app.use(unhandledErrors);

module.exports = app;
