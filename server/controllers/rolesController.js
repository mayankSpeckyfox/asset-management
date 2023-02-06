import Role from "../models/Role.js";
import ApiFeatures from "../utils/apifeatures.js";
//create a role
export const createRole = async (req, res) => {
  try {
    const { rolename } = req.body;
    const result = await Role.findOne({ rolename });
    if (result) {
      return res.status(400).json({ message: "Role already exists" });
    }
    const newrole = await Role.create(req.body);

    return res
      .status(201)
      .json({ message: "role created successfullly", newrole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

//get all roles

export const getAllRoles = async (req, res) => {
  try {
    const resultPerPage = 10;
    const roleCount = await Role.countDocuments();
    const apiFeature = new ApiFeatures(Role.find(), req.query).rolesearch();

    apiFeature.pagination(resultPerPage);
    const roles = await apiFeature.query;
    const allroles = await Role.find();
    let totalPages = !(resultPerPage === roleCount || roleCount < resultPerPage)
      ? roleCount % resultPerPage === 0
        ? roleCount / resultPerPage
        : Math.floor(roleCount / resultPerPage) + 1
      : 1;
    return res.status(200).json({
      message: "fetched all roles successfully",
      roles,
      allroles,
      totalPages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

//get searched permissions

export const getSearchedRoles = async (req, res) => {
  try {
    const apiFeature = new ApiFeatures(Role.find(), req.query).rolesearch();

    const roles = await apiFeature.query;

    if (!roles) {
      return res.status(404).json({ message: "Sorry no roles found" });
    }

    res.status(200).json({
      message: "Searched roles fetched successfully",
      roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//update a role

export const updateRole = async (req, res) => {
  try {
    const { rolename } = req.body;
    const temp = await Role.findOne({ rolename });
    if (temp) {
      return res.status(400).json({ message: "Role already exists" });
    }
    const { id } = req.params;
    const result = await Role.findById({ _id: id });
    if (!result) {
      return res
        .status(404)
        .json({ message: "sorry this role does not exists" });
    }
    const updatedRole = await Role.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Role updated successfully", updatedRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

//delete a role

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.findById({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Sorry no such role exists" });
    }
    const deletedRole = await Role.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Role deleted successfully", deletedRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sorry error occured" });
  }
};

//get individual role by id

export const getIndividualRole = async (req, res) => {
  try {
    const { id } = req.params;
    const individualRole = await Role.findById({ _id: id });
    if (!individualRole) {
      return res
        .status(404)
        .json({ message: "Sorry this role does not exist" });
    }
    res
      .status(200)
      .json({ message: "fetched role successfully", individualRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry error occured" });
  }
};
