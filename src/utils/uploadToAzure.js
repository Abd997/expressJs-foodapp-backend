const storage = require("@azure/storage-blob");
require("dotenv").config();

/**
 *
 * @param {e.Request} req
 */
module.exports = async (req) => {
  const accountName = process.env.STORAGE_NAME;
  const key = process.env.CLOUD_KEY;
  const certs = new storage.StorageSharedKeyCredential(accountName, key);
  const blobServiceClient = new storage.BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    certs
  );
  const client = blobServiceClient.getContainerClient("container");
  const newBlobBlock = client.getBlockBlobClient(req.file.filename);
  await newBlobBlock.uploadFile("/tmp/" + req.file.filename);
};
