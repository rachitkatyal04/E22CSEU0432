const express = require("express");
const config = require("./config");
const numbersController = require("./controllers/numberscontroller");

const app = express();

app.use((req, res, next) => {
  res.setTimeout(config.REQUEST_TIMEOUT, () => {
    res.status(503).json({ error: "Service response timeout" });
  });
  next();
});

app.get(
  "/numbers/:numberid",
  numbersController.getNumbers.bind(numbersController)
);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(config.PORT, () => {
  console.log(`Average Calculator service running on port ${config.PORT}`);
});
