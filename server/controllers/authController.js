import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { currentPassword, newPassword } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, user_id]
    );

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      `
      UPDATE users
      SET reset_token = ?, reset_token_expiry = ?
      WHERE email = ?
      `,
      [resetToken, expiry, email]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"TaskAI Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your TaskAI Password",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#ec4899,#8b5cf6);padding:30px;text-align:center;">
            <h1 style="color:white;margin:0;">✨ TaskAI</h1>
            <p style="color:rgba(255,255,255,0.9);margin-top:10px;">
              Password Reset Request
            </p>
          </div>

          <div style="padding:30px;">
            <h2 style="color:#111827;">Hello 👋</h2>

            <p style="color:#4b5563;line-height:1.7;">
              We received a request to reset your password for your TaskAI account.
            </p>

            <p style="color:#4b5563;line-height:1.7;">
              Click the button below to create a new password.
            </p>

            <div style="text-align:center;margin:35px 0;">
              <a
                href="${resetLink}"
                style="
                  background:linear-gradient(135deg,#ec4899,#8b5cf6);
                  color:white;
                  padding:14px 28px;
                  border-radius:10px;
                  text-decoration:none;
                  font-weight:bold;
                  display:inline-block;
                "
              >
                Reset Password
              </a>
            </div>

            <p style="color:#6b7280;">
              This link will expire in <strong>15 minutes</strong>.
            </p>

            <p style="color:#6b7280;">
              If you did not request a password reset, you can safely ignore this email.
            </p>

            <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

            <p style="font-size:12px;color:#9ca3af;">
              TaskAI Productivity Suite
            </p>
          </div>
        </div>
      `,
    });
    res.json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Failed to send reset email",
    });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const [users] = await pool.query(
      `
      SELECT * FROM users
      WHERE reset_token = ?
      AND reset_token_expiry > NOW()
      `,
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users
      SET password = ?, reset_token = NULL, reset_token_expiry = NULL
      WHERE reset_token = ?
      `,
      [hashedPassword, token]
    );

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};