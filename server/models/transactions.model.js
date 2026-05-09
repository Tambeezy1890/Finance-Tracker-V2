import mongoose from "mongoose";

const transactionScheme = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
      default: "expense",
    },
    description: {
      type: String,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionScheme);
