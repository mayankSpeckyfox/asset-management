import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
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
  const [data, setData] = useState({});
  const [showUser, setShowUser] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const [showRole, setShowRole] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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

  const getData = async () => {
    await axios
      .get(`api/authentication/getdata`)
      .then((res) => {
        setData(res.data.user);
        getRoleData(res.data.user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRoleData = async (name) => {
    await axios
      .get(`api/roles/rolebyname/${name}`)
      .then((res) => {
        setRoleData(res.data.individualRole.permissions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(roleData);
  useEffect(() => {
    getData();
  }, []);
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
        {data.role === "admin" ? (
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
        ) : null}

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
        {roleData && (roleData.role.create || roleData.role.read) ? (
          <span className="a spreader" onClick={() => setShowRole(!showRole)}>
            <GroupOutlinedIcon sx={{ fontSize: "x-large" }} /> <b> Role</b>
            {showRole ? (
              <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
            ) : (
              <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
            )}
          </span>
        ) : null}
        {showRole && (
          <span>
            {roleData && roleData.role.create ? (
              <Link className="a spreader-link" to="/createrole">
                <BorderColorOutlinedIcon sx={{ fontSize: "large" }} />{" "}
                <b>Create Role</b>
              </Link>
            ) : null}

            {roleData && roleData.role.read ? (
              <Link className="a spreader-link" to="/allroles">
                <GroupAddOutlinedIcon sx={{ fontSize: "large" }} />{" "}
                <b> All Roles</b>
              </Link>
            ) : null}
          </span>
        )}

        {roleData && (roleData.user.create || roleData.user.read) ? (
          <span onClick={() => setShowUser(!showUser)} className="a spreader">
            <AccountCircleOutlinedIcon sx={{ fontSize: "x-large" }} />
            <b> User</b>
            {showUser ? (
              <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
            ) : (
              <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
            )}
          </span>
        ) : null}
        {showUser && (
          <span>
            {roleData && roleData.user.create ? (
              <Link className="a spreader-link" to="/createuser">
                <BorderColorOutlinedIcon sx={{ fontSize: "large" }} />
                <b> Create User</b>
              </Link>
            ) : null}

            {roleData && roleData.user.read ? (
              <Link className="a spreader-link" to="/allusers">
                <GroupAddOutlinedIcon sx={{ fontSize: "large" }} />{" "}
                <b> All Users</b>
              </Link>
            ) : null}
          </span>
        )}

        {roleData && (roleData.ticket.create || roleData.ticket.read) ? (
          <span className="a spreader" onClick={() => setShowHelp(!showHelp)}>
            <HelpOutlineOutlinedIcon sx={{ fontSize: "x-large" }} />
            <b> Help</b>
            {showHelp ? (
              <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
            ) : (
              <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
            )}
          </span>
        ) : null}

        {showHelp && (
          <span>
            {roleData && roleData.ticket.create ? (
              <Link className="a spreader-link" to="/createticket">
                <BorderColorOutlinedIcon sx={{ fontSize: "large" }} />
                <b> Create Ticket</b>
              </Link>
            ) : null}
            {roleData && roleData.ticket.read ? (
              <Link className="a spreader-link" to="/alltickets">
                <StorageOutlinedIcon sx={{ fontSize: "large" }} />
                <b> All Tickets</b>
              </Link>
            ) : null}
          </span>
        )}

        {data.role === "admin" ? (
          <Link className="a " to="/settings">
            <SettingsIcon sx={{ fontSize: "x-large" }} /> <b>Settings</b>
          </Link>
        ) : null}
        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          <LogoutOutlinedIcon sx={{ fontSize: "x-large" }} /> <b>Logout</b>
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
