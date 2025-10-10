import express from "express";
import {
  createQR,
  createQRForUser,
  deleteQR,
  deleteQRForUser,
  getQR,
  getQRForUser,
  getQRs,
  updateQR,
  updateQRForUser,
} from "../controllers/QrController.js";
import { UserMiddleware } from "../middlewares/UserMiddleware.js";

const router = express.Router();

router.post("/v1/generate", createQR);
router.put("/v1/update/:qrId", updateQR);
router.delete("/v1/delete/:qrId", deleteQR);
router.get("/v1/get/:userId", getQRs);
router.get("/v1/getqr/:qrId", getQR);

router.post("/v2/generate", UserMiddleware, createQRForUser);
router.put("/v2/update/:qrId", UserMiddleware, updateQRForUser);
router.delete("/v2/delete/:qrId", UserMiddleware, deleteQRForUser);
router.get("/v2/get/:userId", UserMiddleware, getQRForUser);

export default router;