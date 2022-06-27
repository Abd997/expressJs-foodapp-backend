const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true }
});
