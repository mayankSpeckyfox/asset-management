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

  createRole
);
//get all roles
router.get(
  "/getallroles",

  getAllRoles
);

//get searched roles
router.get(
  "/getsearchedroles",

  getSearchedRoles
);
//update a role by id
router.patch(
  "/updaterole/:id",

  updateRole
);
//delete role by id
router.delete(
  "/deleterole/:id",

  deleteRole
);

//get single role by id
router.get(
  "/individualrole/:id",

  getIndividualRole
);

//get single role by name
router.get(
  "/rolebyname/:name",

  getRoleByName
);
export default router;
