import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../services/apiError.js";
import { verifyToken } from "../util/jwt.token.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.refreshToken;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Missing token");
  }

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(403, "No user associated with this token");
  }

  req.user = user;

  next();
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not allowed to access this route");
    }

    next();
  };
};
