require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");	
const app = require("./app");

mongoose
	.connect(process.env.DATABASE_PROD)
	.then(() => console.log("Connected to MongoDb"))
	.catch(() => console.log("Could not connect to MongoDb"));



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(
		`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
	);
});

require("./controllers/user-chat/index");
