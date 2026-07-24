import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All posts retrieved successfully!",
        data: {
            result
        }
    })
})

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const playload = req.body;

    const result = await postService.createPostIntoDB(playload, userId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post Created Successsfully!",
        data: {
            result
        }
    });
})

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await postService.getMyPostFromDB(userId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My posts retrieved successfully!",
        data: {
            result
        }
    })
})

const getPostsStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if(!postId) {
        throw new Error("Post id required!");
    }

    const result = await postService.getSinglePostFromDB(postId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved successfully!",
        data: {
            result
        }
    })
})

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})

export const postController = {
    createPost,
    getMyPosts,
    getAllPosts,
    getPostsStats,
    getSinglePost,
    updatePost,
    deletePost
}