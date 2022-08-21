import { Request, Response } from "express";
import UserCollection from "../../collections/User";
import { BadRequestError } from "../../custom-error";
import sendErrorResponse from "../../utils/sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		// validate request
		const storyUserEmail: string = req.body.storyUserEmail;
		if (!storyUserEmail) {
			throw new BadRequestError(
				"Email of the story user was not sent"
			);
		}
		const storyUser = await UserCollection.findOne({
			email: storyUserEmail
		});
		if (!storyUser) {
			throw new BadRequestError("Story user does not exist");
		}
		if (!storyUser.hasPostedStory) {
			throw new BadRequestError("User has not posted any story");
		}

		interface comment {
			commentText: string;
			commentUserEmail: string;
		}
		let userComment: comment = {
			commentText: req.body.commentText,
			commentUserEmail: req.body.email
		};
		const storyComments = storyUser.storyComments;
		storyComments.push(userComment);

		await UserCollection.updateOne(
			{ email: storyUserEmail },
			{
				storyComments: storyComments
			}
		);
		res.json({
			msg: "User has successfully commented on the story"
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
