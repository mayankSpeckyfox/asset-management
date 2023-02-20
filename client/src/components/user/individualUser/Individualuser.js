import React from "react";
import "./Individualuser.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Individualuser = (props) => {
  const {
    name,
    email,
    role,
    id,
    deleteFun,
    editFun,
    department,

    update,
    del,
  } = props;
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{department}</td>

      <td>{role}</td>
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
export default Individualuser;
