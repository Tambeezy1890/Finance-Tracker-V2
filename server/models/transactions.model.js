import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title too short"],
      maxlength: [40, "Title too long"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [120, "Description too long"],
      default: "",
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "food",
        "entertainment",
        "travel",
        "utilities",
        "household",
        "lifestyle",
        "health",
        "other",
      ],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
      default: "expense",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
