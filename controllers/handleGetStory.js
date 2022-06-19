const e = require("express");
const validateRequest = require("./validateRequest");
const storage = require("@azure/storage-blob");
const UserCollection = require("../models/User");
const dotenv = require("dotenv").config();

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	validateRequest(req, res);
	const doc = await checkStory(req, res);
	const sas = getBlobSasUri(doc);
	res.send(sas);
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
async function checkStory(req, res) {
	const doc = await UserCollection.findOne({
		email: req.body.userStory
	});
	if (!doc) {
		return res.status(401).send("user not found");
	}
	if (!doc.hasPostedStory) {
		return res.status(400).send("user has not posted any story");
	}
	return doc;
}

// Create a service SAS for a blob
function getBlobSasUri(doc) {
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
	const containerName = "stories";
	const client = blobServiceClient.getContainerClient(containerName);
	const blobName = doc.storyFileName;
	const blobClient = client.getBlobClient(blobName);
	const blobSAS = storage
		.generateBlobSASQueryParameters(
			{
				containerName,
				blobName,
				permissions: storage.BlobSASPermissions.parse("r"),
				startsOn: new Date(),
				expiresOn: new Date(new Date().valueOf() + 86400)
			},
			certs
		)
		.toString();
	const sasUrl = blobClient.url + "?" + blobSAS;
	console.log(sasUrl);
	return sasUrl;
}
