import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid, please provide valid email");
      }
    },
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(`password should have minLength:8, minLowercase: 1,
             minUppercase:1, minNumbers: 1, minSymbols:1`);
      }
    },
  },
  role: {
    type: String,
    required: true,
  },
});
//password hashing
userSchema.pre("save", function (next) {
  var tv = this;
  if (tv.isModified("password")) {
    bcrypt.hash(tv.password, 12, function (err, hash) {
      if (err) return next(err);
      tv.password = hash;
      next();
    });
  }
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  const tv = this;
  return jwt.sign({ id: tv._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  const tv = this;
  return await bcrypt.compare(enteredPassword, tv.password);
};

export default mongoose.model("User", userSchema);
