import { asyncHandler } from "../services/fetch.js";
import Transaction from "../models/transactions.model.js";
import { ApiError } from "../services/apiError.js";

export const createTransaction = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  let requiredFields = ["title", "category", "amount", "type"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new ApiError(400, `Missing the ${field} field`);
    }
  }
  const { title, description, category, amount, type, date } = req.body;
  if (!userId) {
    throw new ApiError(400, "Cannot create transaction");
  }

  const transaction = await Transaction.create({
    user: userId,
    title,
    description,
    category,
    amount,
    type,
    date,
  });
  if (!transaction) {
    throw new ApiError(400, "Could not save transactions");
  }
  return res.status(201).json({ success: true, message: "Transaction saved" });
});
export const getTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    count: transactions.length,
    transactions,
  });
});

export const updateTransactions = asyncHandler(async (req, res, next) => {
  const allowedFields = ["title", "description", "category", "amount", "type"];
  const updatedValues = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key, value]) =>
        allowedFields.includes(key) && value != undefined && value != ""
    )
  );
  const updatedTransaction = await Transaction.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    updatedValues,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!updatedTransaction) {
    return res
      .status(401)
      .json({ success: false, message: "Failed to get transaction" });
  }
  return res.status(200).json({ success: true, updatedTransaction });
});

export const deleteTransaction = asyncHandler(async (req, res, next) => {
  const deleted = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) {
    throw new ApiError(400, "Failed to identify transaction");
  }
  return res
    .status(200)
    .json({ success: true, message: "Transaction deleted" });
});

export const setBudget = asyncHandler(async (req, res, next) => {});
