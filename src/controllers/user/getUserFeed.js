const e = require("express");
const UserCollection = require("../../collections/User");
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
		_id
        title 
        email 
        imageUrl 
        description 
        totalLikes
        totalComments 
        dateCreated 
        dateUpdated
      `
		).sort({ dateUpdated: -1 });
		let feedPosts = [];
		for (let i = 0; i < data.length; i++) {
			let postUser = await UserCollection.findOne({
				email: data[i].email
			});
			feedPosts.push({
				id: data[i]._id,
				title: data[i].title,
				imageUrl: data[i].imageUrl,
				email: data[i].email,
				totalLikes: data[i].totalLikes,
				totalComments: data[i].totalComments,
				dateCreated: data[i].dateCreated,
				description: data[i].description,
				username: postUser.firstName,
				profileImageUrl: postUser.profileImageUrl
			});
		}
		return res.json({
			posts: feedPosts
		});
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
