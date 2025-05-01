require("dotenv").config();
import express from "express";
import cors from "cors";
import { authenticateToken } from "./middlewares/auth";
import userRoutes from "./routes/userRoutes";
import sampleRoutes from "./routes/sampleRoutes";
import jobRoutes from "./routes/jobRoutes";
import adminRoutes from "./routes/adminRoutes";
<<<<<<< HEAD
=======
import employeeRoutes from "./routes/employeeRoutes";

>>>>>>> 8e048c3901b71626ec9e68ba34f4d5806ed226a6
export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow requests from both frontend origins
    credentials: true, // Allow cookies/authorization headers if needed
  })
);

// Register each route separately to ensure proper handling
app.use("/api", userRoutes);
app.use("/api", sampleRoutes);
app.use("/api", jobRoutes);
<<<<<<< HEAD
app.use("/api",adminRoutes);
=======
app.use("/api", adminRoutes);
app.use("/api", employeeRoutes); // Apply JWT authentication middleware to all routes
>>>>>>> 8e048c3901b71626ec9e68ba34f4d5806ed226a6

// Add route debugging
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/health", (req: any, res: any) => {
  res.json({ status: "up", timestamp: new Date().toISOString() });
});

// To tesing JWT authentication
app.get("/protected", authenticateToken, (req: any, res: any) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

// Global error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
  console.error("Server will continue running, but please fix the error");
  // We're not exiting the process to prevent the server from stopping
});

// Global error handling for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED PROMISE REJECTION:", reason);
  console.error("Server will continue running, but please fix the error");
  // We're not exiting the process to prevent the server from stopping
});

// Define the port to use
const PORT = 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});

// Handle server errors
server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});
