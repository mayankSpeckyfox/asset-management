import { Stack } from "@mui/material";
import React from "react";
import "./Footer.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import axios from "axios";
const Footer = () => {
  const logoutUser = async () => {
    await axios
      .get(`api/users/logout`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="footer">
        <div className="p-4">
          <Stack direction="row" spacing={4}>
            <Stack
              direction="row"
              sx={{ cursor: "pointer" }}
              onClick={logoutUser}>
              <LogoutOutlinedIcon sx={{ fontSize: "large" }} /> <b> LOGOUT</b>
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
};
export default Footer;
