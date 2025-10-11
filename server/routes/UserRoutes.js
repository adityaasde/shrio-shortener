import express from "express";
import {
  confirmUser,
  forgotPassword,
  getUser,
  loginUser,
  logout,
  resetPassword,
  signUpUser,
} from "../controllers/UserController.js";
import { UserMiddleware } from "../middlewares/UserMiddleware.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/confirm-mail/:token", confirmUser);
router.post("/signin", loginUser);
router.get("/me", getUser);
router.get("/logout", UserMiddleware, logout);

export default router;
