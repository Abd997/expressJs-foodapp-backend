const fs = require("fs");
const resolve = require("path").resolve;

/**
 *
 * @param {e.Request} req
 */
module.exports = function deleteFromTemp(req) {
	fs.unlink(
		resolve(__dirname + "/../../temp-storage") +
			"/" +
			req.file.filename,
		() => {}
	);
};
