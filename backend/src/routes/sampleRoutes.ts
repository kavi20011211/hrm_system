import express from "express";
import { sampleCreate } from "../controller/sampleController";
const router = express.Router();

// Sample Route
router.post("/protected/samplecreate", sampleCreate);
export default router;
