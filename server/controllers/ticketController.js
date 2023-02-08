import Ticket from "../models/Ticket.js";

// create ticket
export const createTicket = async (req, res) => {
  try {
    const tickets = await Ticket.create(req.body);
    if (!tickets) {
      return res.status(400).json({ message: "sorry something went wrong" });
    }
    res.status(201).json({ message: "ticket created successfully", tickets });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};
