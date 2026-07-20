import { Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";

const registerUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await userService.registerUserIntoDB(payload);
        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User registered successfully",
            data: {
                user: result
            }
        });

    } catch (error: any) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: error.message
        });
    }
}


export const userController = {
    registerUser
}