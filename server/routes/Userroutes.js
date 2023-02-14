import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCookies,
  getIndividualUser,
  getSearchedUsers,
  loginUser,
  logout,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//create user
router.post(
  "/create",
  isAuthenticatedUser,

  createUser
);
//get all users
router.get(
  "/getallusers",
  isAuthenticatedUser,

  getAllUsers
);
//get searched users
router.get(
  "/getsearchedusers",
  isAuthenticatedUser,

  getSearchedUsers
);
//update individual user by id
router.patch(
  "/updateuser/:id",
  isAuthenticatedUser,

  updateUser
);
//delete individual user by id
router.delete(
  "/deleteuser/:id",
  isAuthenticatedUser,

  deleteUser
);
//get individual user by id
router.get(
  "/individualuser/:id",
  isAuthenticatedUser,

  getIndividualUser
);
//login user
router.post("/login", loginUser);
//logout user
router.get("/logout", isAuthenticatedUser, logout);

//get token from cookies
router.get("/gettoken", isAuthenticatedUser, getCookies);

export default router;
