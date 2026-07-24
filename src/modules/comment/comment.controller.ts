import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

const getCommentByAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getSingleComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const updateModeration = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

export const commentController = {
    getCommentByAuthor,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment,
    updateModeration
}