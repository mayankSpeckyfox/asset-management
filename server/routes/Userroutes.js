import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCookies,
  getIndividualUser,
  loginUser,
  logout,
  updateUser,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//create user
router.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createUser
);
//get all users
router.get(
  "/getallusers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
//update individual user by id
router.patch(
  "/updateuser/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUser
);
//delete individual user by id
router.delete(
  "/deleteuser/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);
//get individual user by id
router.get(
  "/individualuser/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getIndividualUser
);
//login user
router.post("/login", loginUser);
//logout user
router.get("/logout", isAuthenticatedUser, logout);

//get token from cookies
router.get("/gettoken", isAuthenticatedUser, getCookies);

export default router;
