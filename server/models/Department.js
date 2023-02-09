import mongoose from "mongoose";
import validator from "validator";
const departmentSchema = new mongoose.Schema({
  it: {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid, please provide valid email");
        }
      },
    },
  },
  admin: {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid, please provide valid email");
        }
      },
    },
  },
  hr: {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid, please provide valid email");
        }
      },
    },
  },
  account: {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid, please provide valid email");
        }
      },
    },
  },
});

export default mongoose.model("Department", departmentSchema);
