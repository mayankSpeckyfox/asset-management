import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getIndividualRole,
  getSearchedRoles,
  updateRole,
} from "../controllers/rolesController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//create role
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createRole
);
//get all roles
router.get(
  "/getallroles",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllRoles
);

//get searched roles
router.get(
  "/getsearchedroles",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSearchedRoles
);
//update a role by id
router.patch(
  "/updaterole/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateRole
);
//delete role by id
router.delete(
  "/deleterole/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteRole
);

//get single role by id
router.get(
  "/individualrole/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getIndividualRole
);

export default router;
