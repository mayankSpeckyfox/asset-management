import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Individualticket.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Stack } from "@mui/material";

const Individualticket = (props) => {
  const { _id, department, subject, description, status, createdAt, image } =
    props.val;
  const { deleteFun, downloadImage, del, setViewFun, sendTicketInfo } = props;
  return (
    <>
      <td>
        <Stack direction="row" spacing={1}>
          <VisibilityIcon
            onClick={() => {
              setViewFun(true);
              sendTicketInfo(props.val);
            }}
            sx={{ fontSize: "large", cursor: "pointer", color: "blue" }}
          />
          <Stack> {_id}</Stack>
        </Stack>
      </td>
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

      {del ? (
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
      ) : null}
    </>
  );
};
export default Individualticket;
