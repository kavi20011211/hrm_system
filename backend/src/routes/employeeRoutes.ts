import express from "express";

import {
  createEmployee,
  deleteEmployee,
  readAllEmployee,
  readSingleEmployee,
  updateEmployee,
} from "../controller/employeeController";

const router = express.Router();

// Signup Route
router.post("/employee/create", createEmployee);

router.get("/employee/allread", readAllEmployee);

router.get("/employee/singleread", readSingleEmployee);

router.put("/employee/update", updateEmployee);

router.delete("/employee/delete", deleteEmployee);

export default router;
