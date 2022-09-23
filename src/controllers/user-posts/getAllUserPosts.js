const sendErrorResponse = require("../../utils/sendErrorResponse");
const UserCollection = require("../../collections/User");
const PostCollection = require("../../collections/UserPosts");
const UserPosts = require("../../collections/UserPosts");
const { BadRequestError } = require("../../custom-error");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		let feedPosts = [];
		let likedPosts = []
		const postUser = await UserCollection.findOne({
			email: email
		});
		console.log(postUser)
		if (!postUser) {
			throw new Error(`User having email ${email} not found`);
		}
		const user = req.body.loggedInUser;

		const data = await UserPosts.find(
			{ email: email },
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

		
		for (let i = 0; i < data.length; i++) {
			
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
		
		for(let post of feedPosts){
			if(user.likedPosts.includes(post.id)){
				likedPosts.push({post,isLiked:true})
			}else{
				likedPosts.push({post,isLiked:false})
			}
		}
		return res.json({
			posts: likedPosts
		});
	} catch (e) {
		sendErrorResponse(res, 500, e.message);
	}
};
