import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("Ticket", ticketSchema);
