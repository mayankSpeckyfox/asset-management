import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualticket.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const Individualticket = (props) => {
  const { _id, department, subject, description, status, createdAt, image } =
    props.val;
  const { deleteFun, downloadImage, designation, changeStatus } = props;
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
      {status === "active" ? (
        <td
          style={{
            color: "red",
            fontWeight: "bold",
            backgroundColor: "pink",
            opacity: 0.8,
          }}>
          {status}
        </td>
      ) : (
        <td
          style={{
            color: "blue",
            fontWeight: "bold",
            backgroundColor: "#80d7ff",
            opacity: 0.8,
          }}>
          {status}
        </td>
      )}
      {designation === "head" ? (
        <>
          <td className="tableData">
            <select
              className="form-control"
              onChange={(e) => changeStatus(_id, e.target.value)}>
              {status === "closed" ? (
                <>
                  <option value="closed">closed</option>
                  <option value="active">open</option>
                </>
              ) : (
                <>
                  <option value="active">active</option>
                  <option value="closed">close</option>
                </>
              )}
            </select>
          </td>
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
      ) : null}
    </>
  );
};
export default Individualticket;
