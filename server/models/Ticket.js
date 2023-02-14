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
    imgname: String,
    data: {
      type: Buffer,
      select: false,
    },
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ticket", ticketSchema);
