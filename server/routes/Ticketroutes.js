import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";

import {
  createTicket,
  deleteTicket,
  downloadImage,
  getAllTickets,
  getIndividualTicket,
  sendEmail,
  updateTicket,
} from "../controllers/ticketController.js";
const router = express.Router();
// send email
router.post("/sendemail/:email", isAuthenticatedUser, sendEmail);
// create ticket
router.post("/create", isAuthenticatedUser, createTicket);
// get all tickets
router.get("/getalltickets", isAuthenticatedUser, getAllTickets);
// Update ticket by id
router.patch("/updateticket/:id", isAuthenticatedUser, updateTicket);
// get individual ticket by id
router.get(
  "/getindividualticket/:id",
  isAuthenticatedUser,
  getIndividualTicket
);
// delete ticket by id
router.delete("/deleteticket/:id", isAuthenticatedUser, deleteTicket);
//download ticket image
router.get("/download/:id", isAuthenticatedUser, downloadImage);
export default router;
