import express from "express";

import {
  jobPostAllRead,
  jobPostCreate,
  jobPostDelete,
  jobPostSingleRead,
  jobPostUpdate,
} from "../controller/jobController";

const router = express.Router();

// Signup Route
router.post("/jobs/create", jobPostCreate);

router.get("/jobs/allread", jobPostAllRead);

router.get("/jobs/singleread", jobPostSingleRead);

router.put("/jobs/update", jobPostUpdate);

router.delete("/jobs/delete", jobPostDelete);

export default router;
