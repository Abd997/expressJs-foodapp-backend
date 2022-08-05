require("dotenv").config();
const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const uploadToAzure = require("../../utils/uploadToAzure");

const updateToMongo = async (req, res) => {
	try {
		const doc = await FoodCollection.updateMany(
			{ name: req.body.name },
			{
				imageURL:
					process.env.AZURE_FOODIMAGES_CONTAINER_URL +
					req.file.filename
			}
		);
		if (!doc) {
			return res.status(400).send("Error: cannot update");
		}
		console.log("FoodCollection updated");
		return res.json({ msg: "Added image successfully" });
	} catch (err) {
		console.log(err);
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	await uploadToAzure(req, "foodimages");
	await updateToMongo(req, res);
};
