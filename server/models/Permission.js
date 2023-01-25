import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  permissionname: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Permission", permissionSchema);
