const e = require("express");
const storage = require("@azure/storage-blob");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
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
 */
const validate = async (req) => {
	const { storyUserEmail } = req.params;
	if (!storyUserEmail) {
		throw new BadRequestError(
			"Email of the user whose story is requested has not been sent"
		);
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		await validate(req);
		const { storyUserEmail } = req.params;
		const user = await UserCollection.findOne({
			email: storyUserEmail
		});
		if (!user) {
			throw new BadRequestError("Story user does not exist");
		}
		if (!user.hasPostedStory) {
			throw new BadRequestError("User has not posted any story");
		}
		return res.json({
			storyUrl: user.storyUrl,
			avatar: user.profileImageUrl
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
