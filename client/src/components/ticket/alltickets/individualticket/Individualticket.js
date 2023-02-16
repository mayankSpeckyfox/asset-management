import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualticket.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const Individualticket = (props) => {
  const { _id, department, subject, description, status, createdAt, image } =
    props.val;
  const { deleteFun, downloadImage } = props;
  return (
    <>
      <td>{_id}</td>
      <td>{department}</td>
      <td>{subject}</td>
      <td>{description}</td>
      <td>{createdAt}</td>

      {image ? (
        <td>
          {image.contentType}{" "}
          <FileDownloadIcon
            onClick={() => downloadImage(_id)}
            sx={{ color: "brown", fontSize: "large", cursor: "pointer" }}
          />
        </td>
      ) : (
        <td>NA</td>
      )}
      <td>{status}</td>
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
