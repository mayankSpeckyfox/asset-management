import express from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getIndividualPermission,
  updatePermission,
} from "../controllers/permissionController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();
//create permission
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createPermission
);
//update permisiion
router.patch(
  "/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updatePermission
);
//get all permissions
router.get(
  "/getallpermissions",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllPermissions
);
//get individual permission
router.get(
  "/getindividualpermission/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getIndividualPermission
);
//delete permission by id
router.delete(
  "/deletepermission/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deletePermission
);
export default router;
