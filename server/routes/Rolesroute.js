import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getIndividualRole,
  getRoleByName,
  getSearchedRoles,
  updateRole,
} from "../controllers/rolesController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//create role
router.post(
  "/create",
  isAuthenticatedUser,

  createRole
);
//get all roles
router.get(
  "/getallroles",
  isAuthenticatedUser,

  getAllRoles
);

//get searched roles
router.get(
  "/getsearchedroles",
  isAuthenticatedUser,

  getSearchedRoles
);
//update a role by id
router.patch(
  "/updaterole/:id",
  isAuthenticatedUser,

  updateRole
);
//delete role by id
router.delete(
  "/deleterole/:id",
  isAuthenticatedUser,

  deleteRole
);

//get single role by id
router.get(
  "/individualrole/:id",
  isAuthenticatedUser,

  getIndividualRole
);

//get single role by name
router.get(
  "/rolebyname/:name",
  isAuthenticatedUser,

  getRoleByName
);
export default router;
