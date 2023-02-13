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
    Data: Buffer,
    ContentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ticket", ticketSchema);
