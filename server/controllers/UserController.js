import argon2 from "argon2";
import { User } from "../models/UserModel.js";
import { sendMailUser } from "../utils/sendMail.js";
import { getValue, setValue } from "../store/store.js";
import { generateToken } from "../utils/token.js";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  try {
    const { email, password, userId, userIp } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const isExistUser = await User.find({ email: email });

    if (isExistUser.length > 0) {
      return res.status(400).json({
        message: "Email has been used!",
      });
    }

    const hashPassword = await argon2.hash(cleanPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    const createUser = new User({
      userId,
      userIp,
      email: cleanEmail,
      password: hashPassword,
      isVerified: false,
      createdAt: Date.now(),
    });

    const tokenId = crypto.randomUUID();

    setValue(tokenId, cleanEmail, "verify");

    await createUser.save();

    const authMail = await sendMailUser(cleanEmail, tokenId, "verify");

    if (!authMail) {
      return res.status(400).json({
        message: "Failed to send email, try to login.",
      });
    }

    res.status(200).json({
      isCreated: true,
      message: "Verification email has been sent, check ur inbox!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const fetchedUser = await User.findOne({ email: email });

    if (!fetchedUser) {
      return res.status(400).json({
        message: "Invalid email and password!",
      });
    }

    const isPasswordMatch = await argon2.verify(
      fetchedUser.password,
      cleanPassword
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }

    const isVerified = fetchedUser.isVerified;

    if (!isVerified) {
      const tokenId = crypto.randomUUID();
      setValue(cleanEmail, tokenId);
      await sendMailUser(cleanEmail, tokenId, "verify");
      return res.status(200).json({
        message: "Verification email has been sent!",
      });
    }

    const userToken = generateToken(fetchedUser);

    await User.findOneAndUpdate(
      { email: cleanEmail },
      { $set: { lastLogin: Date.now() } }
    );

    res.cookie("token", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "dev",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      isLogin: true,
      user: { id: fetchedUser._id, email: fetchedUser.email },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }

    const isExistUser = await User.find({ email: email });

    if (isExistUser.length > 0) {
      const tokenId = crypto.randomUUID();
      setValue(tokenId, email, "reset");

      const userMail = await sendMailUser(email, tokenId, "reset");

      if (!userMail) {
        return res.status(400).json({
          message: "Failed to send mail, try again.",
        });
      }
      return res.status(200).json({
        message: "If email is registred, u will receive a reset password mail.",
      });
    }

    return res.status(200).json({
      message: "If email is registred, u will receive a reset password mail.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.params.token;
    const cleanPassword = password.trim();

    if (!password || !token) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const searchToken = getValue(token);

    if (!searchToken) {
      return res.status(400).json({
        message: "Invalid token!",
      });
    }

    const email = searchToken.email;
    const hashPassword = await argon2.hash(cleanPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashPassword } }
    );

    return res.status(200).json({
      message: "Password has been updated, login to continue.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const confirmUser = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({
        message: "Invalid token!",
      });
    }

    const searchToken = getValue(token);

    if (!searchToken) {
      return res.status(400).json({
        message: "Expired token!",
      });
    }
    const email = searchToken.email;

    const findUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { isVerified: true, updatedAt: Date.now() } }
    );

    const userToken = generateToken(findUser);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { lastLogin: Date.now() } }
    );

    res.cookie("token", userToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "dev",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      isLogin: true,
      user: { id: findUser._id, email: findUser.email },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select("userId email");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({
      user: {
        id: user.userId,
        email: user.email,
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV != "dev",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
