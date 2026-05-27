import {
  EXPIRES_IN,
  JWT_REFRESH_EXPIRE,
  JWT_REFRESH_TOKEN,
  JWT_SECRET,
  NODE_ENV,
} from "../config/env.js";
import jwt from "jsonwebtoken";
export const generateToken = async (user, statusCode, res) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    JWT_REFRESH_TOKEN,
    { expiresIn: JWT_REFRESH_EXPIRE },
  );

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(statusCode)
    .cookie("token", accessToken, cookieOptions)
    .json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_TOKEN);
};
