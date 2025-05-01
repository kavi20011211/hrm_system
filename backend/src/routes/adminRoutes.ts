import express from "express";
import {
  viewAdminProfile,
  editAdminProfile,
  changePassword,
  addTestData,
  fetchTestData,
  updateTestData,
} from "../controller/adminController";

const router = express.Router();

// Profile Routes
router.get("/admin/profile", viewAdminProfile);
router.put("/admin/profile/edit", editAdminProfile);
router.put("/admin/profile/change-password", changePassword);

// Admin Test Data Routes
router.post("/admin/test-data", addTestData);
router.get("/admin/test-data", fetchTestData);
router.put("/admin/test-data", updateTestData);

export default router;
