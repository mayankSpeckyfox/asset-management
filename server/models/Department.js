import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  it: {
    email: {
      type: String,
      required: true,
    },
  },
  admin: {
    email: {
      type: String,
      required: true,
    },
  },
  hr: {
    email: {
      type: String,
      required: true,
    },
  },
  account: {
    email: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("Department", departmentSchema);
