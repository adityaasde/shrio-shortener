import express from "express";
import {
  confirmUser,
  forgotPassword,
  loginUser,
  resetPassword,
  signUpUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/confirm-mail/:token", confirmUser);
router.post("/signin", loginUser);

export default router;
