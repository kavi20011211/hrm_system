import express from "express";

import { adminSignUp } from "../controller/adminSignUpController";

const router = express.Router();

router.post("/admin/create", ...adminSignUp);

export default router;
