import Ticket from "../models/Ticket.js";
import nodemailer from "nodemailer";
//send email
export const sendEmail = async (req, res) => {
  try {
    const { email, subject, description } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    const ms = Date.now();
    const date = Date(ms);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ticket",
      text: `Subject:${subject} , Description:${description} , Date: ${date}!   `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error sending email" });
      } else {
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};
// create ticket
export const createTicket = async (req, res) => {
  try {
    const { department, subject, description } = req.body;
    const ticket = new Ticket({ department, subject, description });

    await ticket.save();

    if (!ticket) {
      return res.status(400).json({ message: "sorry something went wrong" });
    }
    res.status(201).json({ message: "ticket created successfully", ticket });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

//get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const ticketCount = await Ticket.countDocuments();
    const tickets = await Ticket.find();
    if (!tickets) {
      return res.status(400).json({ message: "sorry something went wrong" });
    }
    const hrTickets = await Ticket.find({
      department: { $regex: "hr", $options: "i" },
    });
    const itTickets = await Ticket.find({
      department: { $regex: "it", $options: "i" },
    });
    const adminTickets = await Ticket.find({
      department: { $regex: "admin", $options: "i" },
    });
    const accountTickets = await Ticket.find({
      department: { $regex: "account", $options: "i" },
    });
    res.status(200).json({
      message: "tickets fetched successfully",
      tickets,
      hrTickets,
      itTickets,
      adminTickets,
      accountTickets,
      ticketCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

// update ticket by id
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketExist = await Ticket.findById({ _id: id });
    if (!ticketExist) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Ticket updated successfully", updatedTicket });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

// get individual ticket by id

export const getIndividualTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    res.status(200).json({ message: "Ticket fetched successfully", ticket });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

// delete ticket by id

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    const deletedTicket = await Ticket.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Ticket deleted successfully", deletedTicket });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};
