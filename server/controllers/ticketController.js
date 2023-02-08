import Ticket from "../models/Ticket.js";
import nodemailer from "nodemailer";
//send email
export const sendEmail = async (req, res) => {
  try {
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
      to: req.body.email,
      subject: "Ticket",
      text: `A NEW ticket has been generated on ${date}! `,
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
