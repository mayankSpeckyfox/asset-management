import React, { useState, useEffect } from "react";
import axios from "axios";
import Individualpermission from "./individualPermission/Individualpermission.js";
import "./Allpermissions.css";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
const Allpermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  //get all pemissions
  const getAllPermissions = async () => {
    await axios
      .get(`api/permissions/getallpermissions`)
      .then((res) => {
        setPermissions(res.data.allPermissions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPermissions();
  }, []);
  return (
    <>
      <div className="all-permission-content">
        <div className="container-fluid">
          <div className="p-4 page-nav">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "xx-large", color: "brown" }}
              />
              <Stack
                direction="row"
                onClick={() => navigate("/createpermission")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <ModeOutlinedIcon sx={{ fontSize: "large" }} />
                <b>Create Permission</b>
              </Stack>
            </Stack>
          </div>
          <div className="p-5 border border-1 mb-5 mt-5 form-class">
            <blockquote className="blockquote">
              <h4 className="text-muted">
                <b>ALL PERMISSIONS</b>
              </h4>
            </blockquote>
            <hr />
            <div className="table-responsive">
              <table className="table table-striped text-muted">
                <thead>
                  <tr>
                    <th>Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((val, ind) => {
                    return (
                      <tr key={val._id}>
                        <Individualpermission
                          permissionname={val.permissionname}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Allpermissions;
