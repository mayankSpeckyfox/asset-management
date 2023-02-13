import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualticket.css";
const Individualticket = (props) => {
  const { _id, department, subject, description, createdAt } = props.val;
  const { deleteFun } = props;
  return (
    <>
      <td>{_id}</td>
      <td>{department}</td>
      <td>{subject}</td>
      <td>{description}</td>
      <td>{createdAt}</td>
      <td className="tableData">
        {" "}
        <DeleteIcon
          onClick={() => deleteFun(_id)}
          sx={{
            color: "brown",
            cursor: "pointer",
          }}
        />
      </td>
    </>
  );
};
export default Individualticket;
