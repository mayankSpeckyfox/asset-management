import { Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
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
      <div className="sidebar">
        <Link className="a" to="/permissions">
          Permissions
        </Link>
        <span className="a spreader" onClick={() => setShowRole(!showRole)}>
          Role
          {showRole ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>
        {showRole && (
          <span>
            <Link className="a spreader-link" to="/createrole">
              Create Role
            </Link>

            <Link className="a spreader-link" to="/allroles">
              All Roles
            </Link>
          </span>
        )}

        <span onClick={() => setShowUser(!showUser)} className="a spreader">
          User
          {showUser ? (
            <ArrowDropDownIcon sx={{ fontSize: "x-large" }} />
          ) : (
            <ArrowDropUpIcon sx={{ fontSize: "x-large" }} />
          )}
        </span>
        {showUser && (
          <span>
            <Link className="a spreader-link" to="/createuser">
              Create User
            </Link>

            <Link className="a spreader-link" to="/allusers">
              All Users
            </Link>
          </span>
        )}

        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
