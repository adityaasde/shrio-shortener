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

const app = express();
dotenv.config({
  quiet: true,
});

app.use(
  cors({
    quiet: true,
  })
);
app.use(morgan("tiny"));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(helemt());
app.use(cookieParser());

connectToDB();

app.use("/link", LinkRoutes);
app.use("/qr", QrRoutes);
app.use("/user", UserRoutes);

const PORT = 9500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});
