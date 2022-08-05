require("dotenv").config();
const e = require("express");
const UserCollection = require("../../collections/User");
const uploadToAzure = require("../../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
async function checkIfStoryPosted(req, res) {
	const doc = await UserCollection.findOne({ email: req.body.email });
	if (!doc) {
		return res.status(400).send({ error: "User not found" });
	}
	if (doc.hasPostedStory) {
		return res.status(400).send({ error: "Can only post one story" });
	}
}

/**
 *
 * @param {e.Request} req
 */
async function saveStoryToDatabase(req) {
	const doc = await UserCollection.findOneAndUpdate(
		{ email: req.body.email },
		{
			hasPostedStory: true,
			storyFileName: req.file.filename
		}
	);
	if (!doc) {
		return res.status(400).send({ error: "User not found" });
	}
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async function (req, res) {
	await checkIfStoryPosted(req, res);
	await uploadToAzure(req);
	await saveStoryToDatabase(req);
	res.send({ msg: "Story uploaded successfully" });
};
