const e = require("express");
const storage = require("@azure/storage-blob");
const UserCollection = require("../../collections/User");
require("dotenv").config();

// Create a service SAS for a blob
function getBlobSasUri(doc) {
	// const accountName = process.env.STORAGE_NAME;
	// const key = process.env.CLOUD_KEY;
	// const certs = new storage.StorageSharedKeyCredential(accountName, key);
	// const blobServiceClient = new storage.BlobServiceClient(
	//   `https://${accountName}.blob.core.windows.net`,
	//   certs
	// );
	// const containerName = "container";
	// const client = blobServiceClient.getContainerClient(containerName);
	// const blobName = doc.storyFileName;
	// const blobClient = client.getBlobClient(blobName);
	// const blobSAS = storage
	//   .generateBlobSASQueryParameters(
	//     {
	//       containerName,
	//       blobName,
	//       permissions: storage.BlobSASPermissions.parse("r"),
	//       startsOn: new Date(),
	//       expiresOn: new Date(new Date().valueOf() + 86400),
	//     },
	//     certs
	//   )
	//   .toString();
	// const sasUrl = blobClient.url + "?" + blobSAS;
	// return sasUrl;
	return `https://foodappstorageaccount.blob.core.windows.net/container/${doc.storyFileName}`;
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const { email } = req.body;
	const doc = await UserCollection.findOne({
		email: email
	});
	if (!doc.hasPostedStory) {
		return res.json({ msg: "User has not posted any story" });
	}

	const sas = getBlobSasUri(doc);
	res.json({ storyUrl: sas });
};
