import express from "express";
import {
  createTicket,
  getAllTickets,
  sendEmail,
  updateTicket,
} from "../controllers/ticketController.js";
const router = express.Router();
// send email
router.post("/sendemail", sendEmail);
// create ticket
router.post("/create", createTicket);
// get all tickets
router.get("/getalltickets", getAllTickets);
// Update ticket by id
router.patch("/updateticket/:id", updateTicket);
export default router;
