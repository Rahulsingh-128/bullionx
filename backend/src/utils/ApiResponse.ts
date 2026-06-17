import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200,
) => {
  res.status(statusCode).json({ success: true, data, message });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  code: string = "API_ERROR",
) => {
  res.status(statusCode).json({ success: false, error: code, message });
};
