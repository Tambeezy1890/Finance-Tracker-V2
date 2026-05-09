import nodemailer from "nodemailer";

import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
} from "../config/env.js";
import { ApiError } from "../services/apiError.js";
import userModel from "../models/user.model.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendVerificationEmail = async (user, verificationUrl) => {
  try {
    if (!user?.email) {
      throw new Error("Recipient email is missing");
    }

    if (!verificationUrl || typeof verificationUrl !== "string") {
      throw new Error("verificationUrl must be a string");
    }

    const transporter = createTransporter();

    const cleanUrl = String(verificationUrl).trim();
    const message = {
      from: `"Auth App" <${EMAIL_USER}>`,
      to: user.email,
      subject: "Verify Your Email",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="20" cellspacing="0" style="background:#ffffff;border-radius:8px;">
          <tr>
            <td align="center">
              <h2 style="margin:0;color:#333;">Verify Your Email</h2>
            </td>
          </tr>
          <tr>
            <td>
              <p style="color:#555;font-size:16px;">
                Hello ${user.username || "there"},
              </p>

              <p style="color:#555;font-size:16px;">
                Thanks for signing up. Please verify your email by clicking the button below:
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${cleanUrl}" 
                   style="background:#4CAF50;color:#ffffff;padding:12px 20px;
                          text-decoration:none;border-radius:5px;font-size:16px;">
                  Verify Email
                </a>
              </div>

              <p style="color:#555;font-size:14px;">
                Or copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all;">
                <a href="${cleanUrl}">${cleanUrl}</a>
              </p>

              <p style="color:#999;font-size:13px;">
                If you didn’t create an account, you can ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size:12px;color:#aaa;">
              © ${new Date().getFullYear()} Auth App
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };
    await transporter.sendMail(message);
  } catch (err) {
    console.log("Nodemailer", err);
    throw new ApiError(500, "Email Service error", err?.message);
  }
};

export const sendResetPasswordEmail = async (user, cleanUrl) => {
  try {
    const transporter = createTransporter();
    const url = String(cleanUrl).trim();
    const message = {
      from: `"Auth App" <${EMAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="20" cellspacing="0" style="background:#ffffff;border-radius:8px;">
          <tr>
            <td align="center">
              <h2 style="margin:0;color:#333;">Reset Your password</h2>
            </td>
          </tr>
          <tr>
            <td>
              <p style="color:#555;font-size:16px;">
                Hello ${user.username || "there"},
              </p>
              <p style="color:#555;font-size:16px;">
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${url}" 
                   style="background:#4CAF50;color:#ffffff;padding:12px 20px;
                          text-decoration:none;border-radius:5px;font-size:16px;">
                  Reset Password
                </a>
              </div>

              <p style="color:#555;font-size:14px;">
                Or copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all;">
                <a href="${url}">${url}</a>
              </p>

              <p style="color:#999;font-size:13px;">
                If you didn’t request a password change you can ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size:12px;color:#aaa;">
              © ${new Date().getFullYear()} Auth App
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };
    await transporter.sendMail(message);
  } catch {
    throw new ApiError(500, "Email Service error", err?.message);
  }
};
