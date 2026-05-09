import { FRONTEND_URL } from "../config/env.js";
import User from "../models/user.model.js";
import { ApiError } from "../services/apiError.js";
import { asyncHandler } from "../services/fetch.js";
import { validationResult } from "express-validator";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../util/emailService.js";
import crypto from "crypto";
import { generateToken, verifyToken } from "../util/jwt.token.js";
import bcrypt from "bcrypt";
export const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "", errors.array());
  }
  const { email, username, password, role } = req.body;

  const requiredFields = ["email", "username", "password"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new ApiError(400, `Missing the ${field} field`);
    }
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ email, username, password, role });
  const verificationToken = user.getEmailVerificationToken();

  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${FRONTEND_URL}/verify-email/${verificationToken}`;

  try {
    await sendVerificationEmail(user, verificationUrl);
    return res.status(201).json({ success: true, message: "Check you email" });
  } catch (err) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, "email could not be sent", err?.message);
  }
});

export const verifyEmailToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, "Invalid or Expired Email verification token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Email verified",
  });
});
export const resendEmailVerificationToken = asyncHandler(
  async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || user.isEmailVerified == true) {
      throw new ApiError(404, "Cannot find user or user already verified");
    }

    const emailVerificationToken = user.getEmailVerificationToken();

    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${FRONTEND_URL}/verify-email/${emailVerificationToken}`;

    try {
      await sendVerificationEmail(user, verificationUrl);
      return res
        .status(201)
        .json({ success: true, message: "Check you email" });
    } catch (err) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });

      throw new ApiError(500, "email could not be sent", err?.message);
    }
  },
);

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  const validPassword = await user.matchPassword(password);
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(400, "Invalid credentials");
  }
  await generateToken(user, 200, res);
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "logged out" });
});

export const generateNewAccessToken = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    throw new ApiError(400, "Missing refersh token");
  }
  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    throw new ApiError(401, "Invalid token");
  }
  await generateToken(user, 200, res);
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Failed to find email");
  }
  console.log("Loaded atleast");
  const token = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const cleanUrl = `${FRONTEND_URL}/reset-password/${token}`;
  try {
    await sendResetPasswordEmail(user, cleanUrl);
    return res
      .status(200)
      .json({ success: true, message: "Check your emails" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(400, "Email could not be sent");
  }
});

export const verifyPasswordToken = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Missing reset token");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user || !user.isEmailVerified) {
    throw new ApiError(404, "Invalid or expired password reset token");
  }

  return res.status(200).json({
    success: true,
    message: "Reset token is valid",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) {
    throw new ApiError(400, "Missing reset token");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.resetPasswordVerified = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
