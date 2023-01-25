import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  rolename: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      permissionname: {
        type: String,
        required: true,
      },
      create: {
        type: Boolean,
        default: false,
      },
      read: {
        type: Boolean,
        default: false,
      },
      update: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.model("Role", RoleSchema);
