import express from "express";
import { createTicket } from "../controllers/ticketController.js";
const router = express.Router();
// create ticket
router.post("/create", createTicket);
export default router;
