import Ticket from "../models/Ticket.js";
import nodemailer from "nodemailer";

//send email
export const sendEmail = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const { email } = req.params;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    const ms = Date.now();
    const date = Date(ms);
    if (req.files) {
      var imagedata = req.files.file.data;
      var imagename = req.files.file.name;
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ticket",
      text: `Subject:${subject} , Description:${description} , Date: ${date}!   `,
      html: `<h2>Subject: ${subject}</h2>
      <h2>Description:${description}</h2>
      <h2>Date:${date}</h2>
   ${req.files ? ` <img src="cid:image@nodemailer" />` : `<p></p>`}`,
      attachments: req.files && [
        {
          filename: imagename,
          content: imagedata,
          cid: "image@nodemailer",
        },
      ],
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
    const { department, subject, description, assignedTo, createdBy } =
      req.body;

    const ticket = new Ticket({
      department,
      subject,
      description,
      assignedTo,
      createdBy,
    });
    if (req.files) {
      const { data, mimetype, name } = req.files.file;
      ticket.image.data = data;
      ticket.image.contentType = mimetype;
      ticket.image.imgname = name;
    }
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
    const qaTickets = await Ticket.find({
      department: { $regex: "qa", $options: "i" },
    });
    const developmentTickets = await Ticket.find({
      department: { $regex: "development", $options: "i" },
    });
    const salesTickets = await Ticket.find({
      department: { $regex: "sales", $options: "i" },
    });
    res.status(200).json({
      message: "tickets fetched successfully",
      tickets,
      hrTickets,
      itTickets,
      adminTickets,
      accountTickets,
      qaTickets,
      developmentTickets,
      salesTickets,
      ticketCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};
//get assigned tickets
export const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      $or: [{ assignedTo: req.params.id }, { createdBy: req.params.id }],
    });

    res
      .status(200)
      .json({ message: "Assigned tickets fetched successfully", tickets });
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
//change status of ticket
export const changeStatusTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketExist = await Ticket.findById({ _id: id });
    if (!ticketExist) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status },
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
//assign change

export const assignTo = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketExist = await Ticket.findById({ _id: id });
    if (!ticketExist) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { assignedTo: req.body.assignedTo },
      { new: true }
    );
    res.status(200).json({ message: "assigned successfully", updatedTicket });
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

//download image

export const downloadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById({ _id: id }).select("+image.data");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket does not exist" });
    }
    res.set("Content-Type", ticket.image.contentType);
    res.status(200).send(ticket.image.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};
