import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";

export interface IAppError extends Error {
    message: string;
    statusCode?: number;
    error?: Error
}

export const errorHandler = (err: IAppError, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error:", err);
    console.log('Stack: ', err.stack);


    res.status(err.statusCode || HTTP_STATUS_CODES.serverError)
        .json({
            ok: false,
            message: err.message || "Internal Server Error"
        });
};
