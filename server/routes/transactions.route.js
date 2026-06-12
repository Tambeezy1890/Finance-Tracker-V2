import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { body } from "express-validator";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransactions,
} from "../controllers/tranactions.controller.js";

const transactionRouter = Router();
transactionRouter.post("/transaction", protect, createTransaction);
transactionRouter.post("/set-budget/:id", protect);
transactionRouter.get("/transaction", protect, getTransactions);
transactionRouter.patch("/transaction/:id", protect, updateTransactions);
transactionRouter.delete("/transaction/:id", protect, deleteTransaction);

export default transactionRouter;
