const app = require("express")();

app.get("*", (req, res) => {
  res.send("Route not exists");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
