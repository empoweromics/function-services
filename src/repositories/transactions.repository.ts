import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import {
  TransactionDocument,
  TransactionModel
} from "../models/ transactions.model";
import { getUserBalanceAggregation } from "../modules/client/aggregations/user.agg";
import { WithdrawDocument, WithdrawModel } from "../models/withdraw.model";

export const transactionRepo = {
  find: (
    query: _FilterQuery<TransactionDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<TransactionDocument> = { lean: true },
    select: ProjectionType<TransactionDocument> = {}
  ) =>
    TransactionModel.find(query, select, options)
      .skip(skip)
      .limit(limit)
      .populate("user", "displayName phone email")
      .sort({ createdAt: -1 })
      .exec(),

  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<TransactionDocument> = {}
  ) => TransactionModel.findById(id, select, options).exec(),

  Last100Transaction: (userId: string) =>
    TransactionModel.find({ user: userId })
      .limit(100)
      .sort({ createdAt: -1 })
      .exec(),

  getUserBalance: (user: string) =>
    TransactionModel.aggregate(getUserBalanceAggregation(user)).then(data =>
      data[0]?.balance ? data[0]?.balance : 0
    ),

  Create: (item: TransactionDocument | Array<TransactionDocument>) =>
    TransactionModel.create(item),

  Withdraw: (item: WithdrawDocument | Array<WithdrawDocument>) =>
    WithdrawModel.create(item),

  deleteOne: (id: string) => TransactionModel.findByIdAndDelete(id).exec()
};
