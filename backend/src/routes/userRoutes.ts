import express, { Request, Response, NextFunction } from "express";
import { signUp, login, verifyEmail, verifySecurityAnswer, resetPassword } from "../controller/userController";

const router = express.Router();

// Type for Express route handler to overcome TypeScript errors
type RouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<any> | any;

// Authentication Routes
router.post("/users/signup", signUp as unknown as RouteHandler);
router.post("/users/login", login as unknown as RouteHandler);

// Password Reset Routes
router.post("/users/verify-email", verifyEmail as unknown as RouteHandler);
router.post("/users/verify-security-answer", verifySecurityAnswer as unknown as RouteHandler);
router.post("/users/reset-password", resetPassword as unknown as RouteHandler);

export default router;
