import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
const Home = () => {
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
        <Link className="a active" to="/">
          Dashboard
        </Link>

        <Link className=" a logout_button" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </div>

      <div className="content">
        <h2>Dashboard</h2>
        <p>home dashboard</p>
      </div>
    </>
  );
};

export default Home;
