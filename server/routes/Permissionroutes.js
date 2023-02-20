import express from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getIndividualPermission,
  getSearchedPermissions,
  updatePermission,
} from "../controllers/permissionController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();
//create permission
router.post(
  "/create",

  createPermission
);
//update permisiion
router.patch(
  "/update/:id",

  updatePermission
);
//get all permissions
router.get(
  "/getallpermissions",

  getAllPermissions
);
//get searched permissions
router.get(
  "/getsearchedpermissions",

  getSearchedPermissions
);
//get individual permission
router.get(
  "/getindividualpermission/:id",

  getIndividualPermission
);
//delete permission by id
router.delete(
  "/deletepermission/:id",

  deletePermission
);
export default router;
