import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const AuthenticationFunction = async (req, res) => {
  try {
    const { token } = req.cookies;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    res.status(200).json({ message: "data fetched successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};
