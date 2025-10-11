import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
import helemt from "helmet";
import { connectToDB } from "./config/db.js";
import LinkRoutes from "./routes/LinkRoutes.js";
import QrRoutes from "./routes/QrRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import { redirectTo } from "./controllers/LinkController.js";
import useragent from "express-useragent";
import { redirectForQr } from "./controllers/QrController.js";
import { rateLimit } from 'express-rate-limit'

const app = express();
dotenv.config({
  quiet: true,
});

app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    quiet: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "disabled",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "too many request, try again later.",
});

app.use(limiter);
app.use(morgan("short"));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(helemt());
app.use(cookieParser());
app.use(useragent.express());

connectToDB();

app.use("/link", LinkRoutes);
app.use("/qr", QrRoutes);
app.use("/user", UserRoutes);
app.get("/:slug", redirectTo);
app.get("/scan/:slug", redirectForQr);

const PORT = 9500;

app.listen(PORT, () => {
  console.log(`Server is running`);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});
