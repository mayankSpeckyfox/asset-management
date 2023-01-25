import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  permissionname: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Permission", permissionSchema);
