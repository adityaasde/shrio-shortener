import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const UserMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided!",
      });
    }

    const userToken = authHeader.split(" ")[1];

    if (!userToken) {
      return res.status(401).json({
        message: "Invalid token!",
      });
    }

    const isValidToken = jwt.verify(userToken, process.env.JWT_SECRET);

    if (!isValidToken) {
      return res.status(401).json({
        message: "Expired token!",
      });
    }

    req.user = isValidToken;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};
