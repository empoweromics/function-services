import type { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";
import { HttpStatus } from "../../../config/httpCodes";
import { opportunityRepo } from "../../../repositories/opportunity.repository";
import { ExpressFunc } from "../../../types";
import { empRepo } from "../../../repositories/emp.repository";

/**
 * getAllOpportunities (Filter / search)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllOpportunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    let limit = 1000;
    const skip = page * limit;
    limit = limit + skip;

    const data = await opportunityRepo.getOpportunitiesPaginated(limit, skip, {
      user,
      active: true
    });
    if (!data)
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: ErrorMessage.NO_CONTENT });

    return res.send({ data, length: data.length });
  } catch (error) {
    next(error);
  }
};

/**
 * getOpportunityDetails lookups
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getOpportunityDetails = async (
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

/**
 * addOpportunity submit a new one
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const addOpportunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const data = await opportunityRepo.Create({
      user,
      ...req.body
    });
    if (req.body.emp?._id && req.body.emp?.selected) {
      switch (req.body.emp.selected) {
        case 1: {
          await empRepo.submitOutputRes1(req.body.emp._id);
          break;
        }
        case 2: {
          await empRepo.submitOutputRes2(req.body.emp._id);
          break;
        }
        case 3: {
          await empRepo.submitOutputRes3(req.body.emp._id);
          break;
        }
        default: {
          return res
            .status(409)
            .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
        }
      }
    }
    if (!data)
      return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });
    return res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const Delete: ExpressFunc = async (req, res, next) => {
  try {
    const data = await opportunityRepo.deleteOne(req.params.id);
    if (data)
      return res
        .status(HttpStatus.OK)
        .json({ data, message: "Resource Deleted" });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};
