import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualrole.css";
const Individualrole = (props) => {
  const { rolename, id, deleteFun, editFun, update, del } = props;
  return (
    <>
      <td>{rolename}</td>
      {update ? (
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
      ) : null}
      {del ? (
        <td className="tableData">
          <DeleteIcon
            onClick={() => deleteFun(id)}
            sx={{
              color: "brown",
              cursor: "pointer",
            }}
          />
        </td>
      ) : null}
    </>
  );
};
export default Individualrole;
