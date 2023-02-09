import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  createDepartment,
  getDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";
const router = express.Router();
//create department
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createDepartment
);
//get department data
router.get("/getdepartment", isAuthenticatedUser, getDepartment);
//update department
router.patch(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateDepartment
);
export default router;
