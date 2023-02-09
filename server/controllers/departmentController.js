import Department from "../models/Department.js";
// create department
export const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    if (!department) {
      return res.status(400).json({ message: "Sorry ! Error occured" });
    }
    res
      .status(201)
      .json({ message: "department created successfully", department });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const department = await Department.find();
    if (!department) {
      return res.status(404).json({ message: "Sorry no department found" });
    }
    res
      .status(200)
      .json({ message: "department fetched successfully", department });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//update department by id
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    if (!department) {
      return res.status(404).json({ message: "Sorry department not found" });
    }
    const updatedDepartment = await Department.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(400).json({ message: "Sorry something went wrong" });
    }
    res
      .status(200)
      .json({ message: "Data updated successfully", updatedDepartment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};
