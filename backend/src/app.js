/**
 * @fileoverview Main Application Entry Point
 * @created 2025-05-31
 * @file app.js
 * @description This is the main entry point of the Kicks Shoes backend application.
 * It sets up the Express server, middleware configurations, and route handlers.
 * The application uses a modular architecture with separate routes, controllers,
 * and services for better organization and maintainability.
 *
 * Key features:
 * - Express server configuration
 * - Middleware setup (CORS, body-parser, etc.)
 * - Route registration
 * - Error handling
 * - Database connection
 * - Logging configuration
 */

import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/database.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import rewardPointRoutes from "./routes/rewardPointRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import {
  default as shopRoutes,
  default as storeRoutes,
} from "./routes/storeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import logger from "./utils/logger.js";
import { setupUploadDirectories } from "./utils/setupUploads.js";
import { startDiscountStatusUpdateCron } from "./utils/cronJobs.js";
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Set up upload directories
setupUploadDirectories();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kicks Shoes API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reward-points", rewardPointRoutes);
app.use("/api/discounts", discountRoutes);

// Start cron jobs
startDiscountStatusUpdateCron();
app.use("/api/favourites", favouriteRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
