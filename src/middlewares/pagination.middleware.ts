import { ExpressCustomFunc } from "../types";

export const paginate: ExpressCustomFunc = (req, _res, next) => {
  const page = req.headers.page ? parseInt(req.headers.page.toString()) - 1 : 0;
  req.limit = 10;
  req.skip = page * req.limit;
  next();
};
