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
import Createticket from "./components/ticket/createticket/Createticket.js";
import Alltickets from "./components/ticket/alltickets/Alltickets.js";

const App = () => {
  const [myToken, setMyToken] = useState();
  const [data, setData] = useState({});
  const [roleData, setRoleData] = useState(null);
  const getTokenFromCookies = async () => {
    try {
      const res = await axios.get(`api/users/gettoken`);
      setMyToken(res.data.token);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    getData();
    getTokenFromCookies();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={myToken && <Layout />}>
          <Route index element={myToken ? <Home /> : <Login />} />
          {roleData && roleData.user.create ? (
            <Route
              path="/createuser"
              element={myToken && <Createuser read={roleData.user.read} />}
            />
          ) : null}
          {roleData && roleData.role.create ? (
            <Route
              path="/createrole"
              element={myToken && <Createrole read={roleData.role.read} />}
            />
          ) : null}
          {roleData && roleData.user.read ? (
            <Route
              path="/allusers"
              element={
                myToken && (
                  <Allusers
                    create={roleData.user.create}
                    update={roleData.user.update}
                    del={roleData.user.delete}
                  />
                )
              }
            />
          ) : null}
          {roleData && roleData.role.read ? (
            <Route
              path="/allroles"
              element={
                myToken && (
                  <Allroles
                    create={roleData.role.create}
                    update={roleData.role.update}
                    del={roleData.role.delete}
                  />
                )
              }
            />
          ) : null}
          {data.role === "admin" ? (
            <Route path="/settings" element={myToken && <Settings />} />
          ) : null}

          {roleData && roleData.ticket.create ? (
            <Route
              path="/createticket"
              element={myToken && <Createticket userdata={data} />}
            />
          ) : null}
          {roleData && roleData.ticket.read ? (
            <Route
              path="/alltickets"
              element={
                myToken && (
                  <Alltickets
                    data={data}
                    update={roleData.ticket.update}
                    create={roleData.ticket.create}
                    del={roleData.ticket.delete}
                  />
                )
              }
            />
          ) : null}

          {data.role === "admin" ? (
            <Route
              path="/createpermission"
              element={myToken && <Permissions />}
            />
          ) : null}
          {data.role === "admin" ? (
            <Route
              path="allpermissions"
              element={myToken && <Allpermissions />}
            />
          ) : null}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
