import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import axios from "axios";
import Home from "./components/Home.js";

const App = () => {
  const [myToken, setMyToken] = useState();

  const getTokenFromCookies = async () => {
    try {
      const res = await axios.get(`api/users/gettoken`);
      setMyToken(res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenFromCookies();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={myToken ? <Home /> : <Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
