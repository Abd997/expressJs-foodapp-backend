require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DATABASE_LINK, {}).then(
  () => {
    console.log("connected to database");
  },
  (err) => console.log("could not connect to database Error: " + err)
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));