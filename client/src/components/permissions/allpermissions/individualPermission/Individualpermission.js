import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Individualpermission.css";

const Individualpermission = (props) => {
  const { permissionname, id, deleteFun, editFun } = props;

  return (
    <>
      <td>{permissionname}</td>
      <td className="tableData">
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
export default Individualpermission;
