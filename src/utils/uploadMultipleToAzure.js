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
  const newBlobBlock = client.getBlockBlobClient(req.files.video[0].filename);
  await newBlobBlock.uploadFile("/tmp/" + req.files.video[0].filename);

  const newBlobBlock1 = client.getBlockBlobClient(req.files.image[0].filename);
  await newBlobBlock1.uploadFile("/tmp/" + req.files.image[0].filename);
};
