import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {
            user
        }
    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { accessToken } = req.cookies;
    const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret);

    if (typeof verifiedToken === "string") {
        throw new Error("Invalid token");
    }

    const profile = await userService.getMyProfileFromDB(verifiedToken.id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: {
            profile
        }
    });
})

const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const payload = req.body;

    const updatedProfile = await userService.updateMyProfileIntoDB(userId, payload);

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully!",
        data: {
            updatedProfile
        }
    })
})

export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile
}