const e = require("express");
require("dotenv").config();
const FoodCollection = require("../models/Food");
const { uploadToAzure, deleteFromTemp } = require("./utils");

const updateToMongo = async (req, res) => {
	const doc = await FoodCollection.updateOne(
		{ _id: req.params.id },
		{
			imageURL:
				process.env.AZURE_FOODIMAGES_CONTAINER_URL + req.file.filename
		}
	);
	if (!doc) {
		return res.status(400).send("Error: cannot update");
	}
	return res.send("Added image successfully");
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	await uploadToAzure(req, "foodimages");
	deleteFromTemp(req);
	await updateToMongo(req, res);
	// res.send(req.params.id);
};
