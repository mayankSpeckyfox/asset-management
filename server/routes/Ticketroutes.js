import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";

import {
  assignTo,
  changeStatusTicket,
  createTicket,
  deleteTicket,
  downloadImage,
  getAllTickets,
  getAssignedTickets,
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
//change ticket status
router.patch("/changestatus/:id", isAuthenticatedUser, changeStatusTicket);
// get individual ticket by id
router.get(
  "/getindividualticket/:id",
  isAuthenticatedUser,
  getIndividualTicket
);
//assign to
router.patch("/assignto/:id", assignTo);
//get assigned tickets
router.get("/getassignedtickets/:id", getAssignedTickets);
// delete ticket by id
router.delete("/deleteticket/:id", isAuthenticatedUser, deleteTicket);
//download ticket image
router.get("/download/:id", isAuthenticatedUser, downloadImage);
export default router;
