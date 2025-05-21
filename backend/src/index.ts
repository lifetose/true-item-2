import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { configs } from "./config/configs";
import { itemRouter } from "./routes/item.router";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

const allowedOrigins =
  configs.NODE_ENV === "production" ? [] : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type", "Origin"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/items", itemRouter);

app.use(errorHandler);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

async function startServer() {
  try {
    app.listen(configs.APP_PORT, async () => {
      await mongoose.connect(configs.DATABASE_URL);
      console.log(
        `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
      );
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
}

startServer();
