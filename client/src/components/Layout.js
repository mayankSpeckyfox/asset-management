import { Outlet } from "react-router-dom";

import axios from "axios";

import { Link } from "react-router-dom";
import "../css/sidebar.css";
const Layout = () => {
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
        <span className="a dropdown">
          <span
            className=" dropdown-toggle"
            type="button"
            data-toggle="dropdown">
            Role
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link to="/createrole">Create</Link>
            </li>
            <li>
              <Link to="/allroles">Roles</Link>
            </li>
          </ul>
        </span>

        <span className="a dropdown">
          <span
            className=" dropdown-toggle"
            type="button"
            data-toggle="dropdown">
            User
          </span>
          <ul className="dropdown-menu">
            <li>
              <Link to="/createuser">Create</Link>
            </li>
            <li>
              <Link to="/allusers">Users</Link>
            </li>
          </ul>
        </span>
        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
