import Permission from "../models/Permission.js";
import ApiFeatures from "../utils/apifeatures.js";
//create permission
export const createPermission = async (req, res) => {
  try {
    const { permissionname } = req.body;
    const permissionExists = await Permission.findOne({ permissionname });
    if (permissionExists) {
      return res.status(400).json({ message: "Permission already exists" });
    }
    const result = await Permission.create(req.body);
    if (!result) {
      return res.status(400).json({ message: "Error occured" });
    }
    res
      .status(201)
      .json({ message: "permission created successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//update permission
export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permissionExists = await Permission.findById({ _id: id });
    if (!permissionExists) {
      return res
        .status(404)
        .json({ message: "Sorry this permission doesnt exist" });
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updatedPermission) {
      return res.status(400).json({ message: "Sorry some error occured" });
    }
    res
      .status(200)
      .json({ message: "permission updated successfully", updatedPermission });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//get all permissions

export const getAllPermissions = async (req, res) => {
  try {
    const resultPerPage = 2;
    const permissionCount = await Permission.countDocuments();
    const apiFeature = new ApiFeatures(
      Permission.find(),
      req.query,
      "permissionname"
    ).search();
    apiFeature.pagination(resultPerPage);
    let permissions = await apiFeature.query;

    const allPermissions = await Permission.find();
    if (!allPermissions) {
      return res.status(404).json({ message: "Sorry no permissions found" });
    }
    res.status(200).json({
      message: "Permissions fetched successfully",
      permissions,
      allPermissions,
      permissionCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//get individual permission by id

export const getIndividualPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById({ _id: id });
    if (!permission) {
      return res
        .status(404)
        .json({ message: "Sorry permission does not exist" });
    }
    res
      .status(200)
      .json({ message: "Permission fetched successfully", permission });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};

//delete permission by id
export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permissionExist = await Permission.findById({ _id: id });
    if (!permissionExist) {
      return res.status(404).json({ message: "Sorry permission not found" });
    }
    const deletedPermission = await Permission.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "permission deleted successfully", deletedPermission });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Sorry ! Error occured" });
  }
};
