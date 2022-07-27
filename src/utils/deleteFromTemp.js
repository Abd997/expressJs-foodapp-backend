const fs = require("fs");
const path = require("path");
const resolve = require("path").resolve;

/**
 *
 * @param {e.Request} req
 */
module.exports = function deleteFromTemp(req) {
	const directory = resolve(__dirname + "/../../temp-storage");
	fs.readdir(directory, (err, files) => {
		if (err) throw err;

		for (const file of files) {
			fs.unlink(path.join(directory, file), (err) => {
				if (err) throw err;
			});
		}
	});
};
