import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {},
});

export default mongoose.model("Role", RoleSchema);
