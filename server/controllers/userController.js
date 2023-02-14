import User from "../models/User.js";
import ApiFeatures from "../utils/apifeatures.js";
import { sendToken } from "../utils/jwtToken.js";
//create a user
export const createUser = async (req, res) => {
  try {
    const { name, email, department, password, cpassword, role } = req.body;
    const userExist = await User.findOne({ email });

    if (!name || !email || !department || !password || !cpassword || !role) {
      return res.status(422).json({ error: "Please fill all the fields" });
    } else if (userExist) {
      return res.status(422).json({ message: "Sorry user already exists" });
    } else if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    } else {
      const result = new User({ name, email, department, password, role });
      await result.save();
      res.status(201).json({ message: "user created successfully", result });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//get all users

export const getAllUsers = async (req, res) => {
  try {
    const resultPerPage = 10;
    const userCount = await User.countDocuments();
    const apiFeature = new ApiFeatures(User.find(), req.query).search();

    apiFeature.pagination(resultPerPage);

    const users = await apiFeature.query;
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(400).json({ message: "Sorry no users found" });
    }

    let totalPages = !(resultPerPage === userCount || userCount < resultPerPage)
      ? userCount % resultPerPage === 0
        ? userCount / resultPerPage
        : Math.floor(userCount / resultPerPage) + 1
      : 1;
    res.status(200).json({
      message: "Users fetched successfully",
      users,
      allUsers,
      userCount,
      totalPages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured " });
  }
};
//get searched users

export const getSearchedUsers = async (req, res) => {
  try {
    const apiFeature = new ApiFeatures(User.find(), req.query).search();

    const users = await apiFeature.query;

    if (!users) {
      return res.status(400).json({ message: "Sorry no users found" });
    }
    res.status(200).json({
      message: "Searched users fetched successfully",
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured " });
  }
};

//update user by id

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, role, currentemail } = req.body;
    if (email !== currentemail) {
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Sorry user does not exist" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { name, email, department, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "Some error occured!" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured " });
  }
};

//delete user by id

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Sorry user does not exist" });
    }
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(400).json({ message: "Sorry something went wrong!" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//get individual user by id

export const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Sorry user does not exist" });
    }
    const foundUser = await User.findById({ _id: id });
    if (!foundUser) {
      return res.status(400).json({ message: "Sorry something went wrong" });
    }
    res.status(200).json({ message: "User fetched successfully", foundUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //checking if user has given password and email both
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter Email and Password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! error occured" });
  }
};

//logout user
export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      message: "logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//get token from cookies
export const getCookies = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({ message: "token not found" });
    }
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};
