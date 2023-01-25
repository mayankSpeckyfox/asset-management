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
        <Link className=" a " to="/role">
          Role
        </Link>
        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
