import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualrole.css";
const Individualrole = (props) => {
  const { rolename, id, deleteFun, editFun } = props;
  return (
    <>
      <td>{rolename}</td>
      <td className="tableData">
        {" "}
        <EditIcon
          onClick={() => editFun(id)}
          sx={{
            color: "brown",
            cursor: "pointer",
          }}
        />
      </td>
      <td className="tableData">
        <DeleteIcon
          onClick={() => deleteFun(id)}
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
