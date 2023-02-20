import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCookies,
  getIndividualUser,
  getSearchedUsers,
  getUsersByDept,
  loginUser,
  logout,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//create user
router.post(
  "/create",

  createUser
);
//get all users
router.get(
  "/getallusers",

  getAllUsers
);
//get users by department
router.get("/getusersbydepartment/:department", getUsersByDept);
//get searched users
router.get(
  "/getsearchedusers",

  getSearchedUsers
);
//update individual user by id
router.patch(
  "/updateuser/:id",

  updateUser
);
//delete individual user by id
router.delete(
  "/deleteuser/:id",

  deleteUser
);
//get individual user by id
router.get(
  "/individualuser/:id",

  getIndividualUser
);
//login user
router.post("/login", loginUser);
//logout user
router.get("/logout", isAuthenticatedUser, logout);

//get token from cookies
router.get("/gettoken", isAuthenticatedUser, getCookies);

export default router;
