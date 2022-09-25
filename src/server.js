require("dotenv").config();
const mongoose = require("mongoose");
const {Server} = require('socket.io');
const http  = require('http');
const app = require("./app");

const server = http.createServer(app);
const io = new Server(server);

mongoose
	.connect(process.env.DATABASE_TEST)
	.then(() => console.log("Connected to MongoDb"))
	.catch(() => console.log("Could not connect to MongoDb"));


/* Calling the function exported from the socket.js file. */
require("./middlewares/socket")(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(
		`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
	);
});

