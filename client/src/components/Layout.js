import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "../css/sidebar.css";
const Layout = () => {
  const [showUser, setShowUser] = useState(false);
  const [showRole, setShowRole] = useState(false);
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
      <div className="sidebar sidebar-wrapper">
        <Link className="a" to="/permissions">
          <b> Permissions</b>
        </Link>
        <span className="a spreader" onClick={() => setShowRole(!showRole)}>
          <GroupOutlinedIcon sx={{ fontSize: "x-large" }} />
          <b> Role</b>
          {showRole ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>
        {showRole && (
          <span>
            <Link className="a spreader-link" to="/createrole">
              <b>Create Role</b>
            </Link>

            <Link className="a spreader-link" to="/allroles">
              <b> All Roles</b>
            </Link>
          </span>
        )}

        <span onClick={() => setShowUser(!showUser)} className="a spreader">
          <AccountCircleOutlinedIcon sx={{ fontSize: "x-large" }} />
          <b> User</b>
          {showUser ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>
        {showUser && (
          <span>
            <Link className="a spreader-link" to="/createuser">
              <b> Create User</b>
            </Link>

            <Link className="a spreader-link" to="/allusers">
              <b>All Users</b>
            </Link>
          </span>
        )}

        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          <LogoutOutlinedIcon sx={{ fontSize: "x-large" }} /> <b>Logout</b>
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
