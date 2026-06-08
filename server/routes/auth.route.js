import { Router } from "express";
import {
  forgotPassword,
  generateNewAccessToken,
  getUser,
  loginUser,
  logoutUser,
  resendEmailVerificationToken,
  resetPassword,
  signup,
  userDashboard,
  verifyEmailToken,
  verifyPasswordToken,
} from "../controllers/auth.controller.js";
import { sendVerificationEmail } from "../util/emailService.js";
import { body } from "express-validator";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const authRoute = Router();

const registerValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 2, max: 40 }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Passord must be atleas 6 characters"),
];

const emailValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email email is required")
    .normalizeEmail(),
];
const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email is required")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password is required"),
];
const passwordValidation = [
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Passord must be atleas 6 characters"),
];

authRoute.post("/signup", registerValidation, signup);
authRoute.post("/login", loginValidation, loginUser);
authRoute.post("/resend-token", emailValidation, resendEmailVerificationToken);
authRoute.post("/refresh-token", generateNewAccessToken);
authRoute.post("/forgot-password", forgotPassword);

authRoute.get("/reset-password/:token", verifyPasswordToken);
authRoute.get("/verify-email/:token", verifyEmailToken);
authRoute.get("/logout", logoutUser);
authRoute.get("/me", protect, getUser);
authRoute.get(
  "/user-dashboard",
  protect,
  authorizeRoles("user"),
  userDashboard
);

authRoute.patch("/reset-password/:token", passwordValidation, resetPassword);

authRoute.patch("/update-user/:id", (req, res) => null);
authRoute.delete("/delete-user/:id", (req, res) => null);

export default authRoute;
