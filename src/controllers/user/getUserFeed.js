const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		const data = await UserPosts.find(
			{},
			`
        title 
        email 
        firstName 
        lastName 
        profileImageUrl 
        imageUrl 
        description 
        totalLikes 
        totalComments 
        dateCreated 
        dateUpdated
      `
		).sort({ dateUpdated: -1 });
		return res.json({
			data
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
