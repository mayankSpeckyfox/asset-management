import React from "react";
import axios from "axios";

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
      Home
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};

export default Home;
