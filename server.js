import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import indexRouter from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import logger from "./config/logger.js";
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static(path.join("public")));
app.set("views", "./view");
app.set("view engine", "ejs");

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use("/", indexRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
