import { Response } from "express";

export const responseHandler = <T, D>(res: Response, message: string, data: T, statusCode: number, meta?: D) => {
    return res.status(statusCode)
        .json({
            message,
            data,
            meta: meta ?? null,
        })
}