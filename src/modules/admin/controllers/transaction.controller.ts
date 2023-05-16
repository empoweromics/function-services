import { NextFunction, Request, Response } from "express";
import { academyRepo } from "../../../repositories/academy.repository";
import { HttpStatus } from "../../../config/httpCodes";
import { ErrorMessage } from "../../../config/errors";
import { transactionRepo } from "../../../repositories/transactions.repository";

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    let limit = 10;
    const skip = page * limit;
    limit = limit + skip;

    const data = await transactionRepo.find({});
    if (!data)
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: ErrorMessage.NO_CONTENT });

    return res.send({ data, length: data.length });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await transactionRepo.Create(req.body);
    if (data) return res.status(201).json(data);
    return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await academyRepo.deleteOne(req.params.id);
    if (data)
      return res.status(HttpStatus.OK).json({ message: "Resource Deleted" });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};
