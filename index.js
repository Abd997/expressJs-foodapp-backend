const controllers = require("./controllers");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected to database");
    },
    (err) => console.log("could not connect to database")
  );

app.post("/register", express.json(), controllers.handleRegisterRequest);

app.get("*", (req, res) => {
  res.send("Route not exists");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
