const app = require("express")();

app.get("*", (req, res) => {
  res.send("Route not exists");
});

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => console.log("server started"));
