import React, { useState, useEffect } from "react";
import axios from "axios";
import Individualpermission from "./individualPermission/Individualpermission.js";
import "./Allpermissions.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
const Allpermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  //get all pemissions
  const getAllPermissions = async () => {
    await axios
      .get(`api/permissions/getallpermissions?page=${page}`)
      .then((res) => {
        setPermissions(res.data.permissions);
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
              <KeyboardBackspaceIcon
                onClick={() => navigate(-1)}
                sx={{ fontSize: "xx-large", color: "brown", cursor: "pointer" }}
              />
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
                  <tr className="permission-table-row">
                    <th>Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((val, ind) => {
                    return (
                      <tr key={val._id} className="permission-table-row">
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
