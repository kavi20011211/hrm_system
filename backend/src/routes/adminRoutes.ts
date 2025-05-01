import express from "express";

// import {
//   viewAdminProfile,
//   editAdminProfile,
//   changePassword,
//   addTestData,
//   fetchTestData,
//   updateTestData,
// } from "../controller/adminController";

import {

    loginAdmin,  // Import the login function
  } from "../controller/adminLoginController";

const router = express.Router();

// // Profile Routes
// router.get("/admin/profile", viewAdminProfile);
// router.put("/admin/profile/edit", editAdminProfile);
// router.put("/admin/profile/change-password", changePassword);

// // Admin Test Data Routes
// router.post("/admin/test-data", addTestData);
// router.get("/admin/test-data", fetchTestData);
// router.put("/admin/test-data", updateTestData);

// Login Route
router.post("/admin/login", loginAdmin);  // Add login route

export default router;
