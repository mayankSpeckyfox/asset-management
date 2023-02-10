import express from "express";
import { AuthenticationFunction } from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

//get data from token route

router.get("/getdata", isAuthenticatedUser, AuthenticationFunction);

export default router;
