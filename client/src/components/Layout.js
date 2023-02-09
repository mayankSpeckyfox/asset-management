import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import "../css/sidebar.css";
const Layout = () => {
  const [showUser, setShowUser] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showPermission, setShowPermission] = useState(false);
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
        <span className="a mt-3">
          <b>Asset Management</b>
        </span>
        <hr />
        <Link className="a" to="/">
          <DashboardOutlinedIcon sx={{ fontSize: "x-large" }} />
          <b> Dashboard</b>
        </Link>
        <span
          className="a spreader"
          onClick={() => setShowPermission(!showPermission)}>
          <KeyOutlinedIcon sx={{ fontSize: "x-large" }} />
          <b> Permissions</b>
          {showPermission ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>

        {showPermission && (
          <span>
            <Link className="a spreader-link" to="/createpermission">
              <AddCircleOutlineOutlinedIcon sx={{ fontSize: "large" }} />{" "}
              <b>Add Permission</b>
            </Link>
            <Link className="a spreader-link" to="/allpermissions">
              <GroupAddOutlinedIcon sx={{ fontSize: "large" }} />{" "}
              <b>All Permissions</b>
            </Link>
          </span>
        )}
        <span className="a spreader" onClick={() => setShowRole(!showRole)}>
          <GroupOutlinedIcon sx={{ fontSize: "x-large" }} /> <b> Role</b>
          {showRole ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>
        {showRole && (
          <span>
            <Link className="a spreader-link" to="/createrole">
              <BorderColorOutlinedIcon sx={{ fontSize: "large" }} />{" "}
              <b>Create Role</b>
            </Link>

            <Link className="a spreader-link" to="/allroles">
              <GroupAddOutlinedIcon sx={{ fontSize: "large" }} />{" "}
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
              <BorderColorOutlinedIcon sx={{ fontSize: "large" }} />
              <b> Create User</b>
            </Link>

            <Link className="a spreader-link" to="/allusers">
              <GroupAddOutlinedIcon sx={{ fontSize: "large" }} />{" "}
              <b> All Users</b>
            </Link>
          </span>
        )}
        <Link className="a " to="/settings">
          <b>Settings</b>
        </Link>
        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          <LogoutOutlinedIcon sx={{ fontSize: "x-large" }} /> <b>Logout</b>
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
