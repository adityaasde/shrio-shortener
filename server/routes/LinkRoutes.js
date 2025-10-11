import express from "express";
import {
  createShortUrl,
  createShortUrlForUser,
  deleteShortUrl,
  deleteShortUrlForUser,
  getAllUrls,
  getUrl,
  updateShortUrl,
  updateShortUrlForUser,
} from "../controllers/LinkController.js";
import { UserMiddleware } from "../middlewares/UserMiddleware.js";

const router = express.Router();

router.post("/v1/generate", createShortUrl);
router.put("/v1/update/:linkId", updateShortUrl);
router.delete("/v1/delete/:linkId", deleteShortUrl);
router.get("/v1/get/:userId", getAllUrls);
router.get("/v1/geturl/:linkId", getUrl);

router.post("/v2/generate", UserMiddleware, createShortUrlForUser);
router.put("/v2/update/:linkId", UserMiddleware, updateShortUrlForUser);
router.delete("/v2/delete/:linkId", UserMiddleware, deleteShortUrlForUser);
router.get("/v2/get/:userId", UserMiddleware, getAllUrls);
router.get("/v2/geturl/:linkId", UserMiddleware, getUrl);

export default router;
