import express from "express";
import {
  createShortUrl,
  createShortUrlForUser,
  deleteShortUrl,
  deleteShortUrlForUser,
  getShortUrl,
  getShortUrlForUser,
  updateShortUrl,
  updateShortUrlForUser,
} from "../controllers/LinkController.js";
import { UserMiddleware } from "../middlewares/UserMiddleware.js";

const router = express.Router();

router.post("/v1/generate", createShortUrl);
router.put("/v1/update/:linkId", updateShortUrl);
router.delete("/v1/delete/:linkId", deleteShortUrl);
router.get("/v1/get/:userId", getShortUrl);

router.post("/v2/generate", UserMiddleware, createShortUrlForUser);
router.put("/v2/update/:linkId", UserMiddleware, updateShortUrlForUser);
router.delete("/v2/delete/:linkId", deleteShortUrlForUser);
router.get("/v2/get/:userId", getShortUrlForUser);

export default router;
