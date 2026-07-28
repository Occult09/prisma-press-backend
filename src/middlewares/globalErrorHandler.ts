import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode
    let errorMessage = error.message || "Internal Server Error";
    let errorName = error.name || "Internal Server Error";

    if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.BAD_REQUEST;
        const errorMessage = "You have provide incorrect field type or missing fields"
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Duplicate Key Error"
        } else if (error.code === 'P2003') {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Foreign key constraint failed"
        } else if (error.code === 'P2025') {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "An operation failed because it depends on one or more records that were required but not found"
        }
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
        if (error.errorCode === 'P1000') {
            statusCode = httpStatus.UNAUTHORIZED
            errorMessage = "Authentication failed agains database server"
        } else if (error.errorCode === 'P1001') {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Can not reach database server"
        }
    } else if(error instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        errorMessage = "Error occured during query execution"
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        name: errorName,
        message: errorMessage,
        error: error.stack
    });
}