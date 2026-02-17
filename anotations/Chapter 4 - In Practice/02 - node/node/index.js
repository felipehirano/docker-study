const express = require("express");
const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("<h1>It worth it on Docker!</h1>");
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
