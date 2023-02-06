import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualrole.css";
const Individualrole = (props) => {
  const { rolename, id } = props;
  return (
    <>
      <td>{rolename}</td>
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
export default Individualrole;
