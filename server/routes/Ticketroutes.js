import express from "express";
import { createTicket, sendEmail } from "../controllers/ticketController.js";
const router = express.Router();
//send email
router.post("/sendemail", sendEmail);
// create ticket
router.post("/create", createTicket);
export default router;
