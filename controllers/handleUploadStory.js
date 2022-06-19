const dotenv = require("dotenv").config();
const e = require("express");
const storage = require("@azure/storage-blob");
const fs = require("fs");
const resolve = require("path").resolve;
const UserCollection = require("../models/User");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async function (req, res) {
	// res.send(req.body.email);
	await checkIfStoryPosted(req, res);
	await uploadToAzure(req);
	deleteFromTemp(req);
	await saveStoryToDatabase(req);
	res.send("story uploaded successfully");
};

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
		return res.status(400).send({ error: "user not found" });
	}
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
async function checkIfStoryPosted(req, res) {
	const doc = await UserCollection.findOne({ email: req.body.email });
	if (!doc) {
		return res.status(400).send({ error: "user not found" });
	}
	if (doc.hasPostedStory) {
		return res.status(400).send({ error: "Can only post one story" });
	}
}

/**
 *
 * @param {e.Request} req
 */
function deleteFromTemp(req) {
	fs.unlink(
		resolve(__dirname + "/../temp-storage") + "/" + req.file.filename,
		() => {}
	);
}

/**
 *
 * @param {e.Request} req
 */
async function uploadToAzure(req) {
	const accountName = process.env.STORAGE_NAME;
	const key = process.env.CLOUD_KEY;
	const certs = new storage.StorageSharedKeyCredential(
		accountName,
		key
	);
	const blobServiceClient = new storage.BlobServiceClient(
		`https://${accountName}.blob.core.windows.net`,
		certs
	);
	const containerName = process.env.CONTAINER;
	const client = blobServiceClient.getContainerClient(containerName);
	const newBlobBlock = client.getBlockBlobClient(req.file.filename);
	await newBlobBlock.uploadFile(
		resolve(__dirname + "/../temp-storage") + "/" + req.file.filename
	);
}
