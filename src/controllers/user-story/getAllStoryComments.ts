import { Request, Response } from "express";
import { BadRequestError } from "../../custom-error";
import sendErrorResponse from "../../utils/sendErrorResponse";

export = async (req: Request, res: Response) => {
	try {
		// validate request
		const loggedInUser = req.body.loggedInUser;
		const storyComments = loggedInUser.storyComments;

		res.json({
			comments: storyComments
		});
	} catch (error: any) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
