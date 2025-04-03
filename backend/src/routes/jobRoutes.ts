import express from "express";

import {
  jobPostAllRead,
  jobPostCreate,
  jobPostSingleRead,
} from "../controller/jobController";

const router = express.Router();

// Signup Route
router.post("/jobs/create", jobPostCreate);

router.get("/jobs/allread", jobPostAllRead);

router.get("/jobs/singleread", jobPostSingleRead);

export default router;
