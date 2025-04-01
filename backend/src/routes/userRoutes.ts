import express from "express";
import { signUp, login } from "../controller/userController";

const router = express.Router();

// Signup Route
router.post("/users/signup", signUp);

// Login Route
router.post("/users/login", login);

export default router;
