import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { ApiError } from "../services/apiError.js";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please add a valid email"],
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
      maxLength: [40, "Username is too long"],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      trim: true,
      required: [true, "Please enter your password"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    resetPasswordVerified: Boolean,
    refreshToken: String,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    throw new ApiError(500, "Failed to hash password", err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString("hex");
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  //set expirty 24 hours
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  //return verification token;
  return verificationToken;
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
export default mongoose.model("User", userSchema);
