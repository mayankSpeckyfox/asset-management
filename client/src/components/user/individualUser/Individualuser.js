import React from "react";
import "./Individualuser.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Individualuser = (props) => {
  const { name, email, role, id } = props;
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="tableData">
        {" "}
        <EditIcon
          sx={{
            color: "brown",
            cursor: "pointer",
          }}
        />
      </td>
      <td className="tableData">
        <DeleteIcon
          sx={{
            color: "brown",
            cursor: "pointer",
          }}
        />
      </td>
    </>
  );
};
export default Individualuser;
