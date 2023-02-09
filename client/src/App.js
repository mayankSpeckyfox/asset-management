import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import axios from "axios";
import Home from "./components/Home.js";

import Createuser from "./components/user/Createuser.js";
import Allusers from "./components/user/Allusers.js";
import Createrole from "./components/role/Createrole";
import Allroles from "./components/role/Allroles";
import Permissions from "./components/permissions/Permissions.js";
import Allpermissions from "./components/permissions/allpermissions/Allpermissions.js";
import Settings from "./components/settings/Settings.js";

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
        <Route path="/" element={myToken && <Layout />}>
          <Route index element={myToken ? <Home /> : <Login />} />
          <Route path="/createuser" element={myToken && <Createuser />} />
          <Route path="/createrole" element={myToken && <Createrole />} />
          <Route path="/allusers" element={myToken && <Allusers />} />
          <Route path="/allroles" element={myToken && <Allroles />} />
          <Route path="/settings" element={myToken && <Settings />} />
          <Route
            path="/createpermission"
            element={myToken && <Permissions />}
          />
          <Route
            path="allpermissions"
            element={myToken && <Allpermissions />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
