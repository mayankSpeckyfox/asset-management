import React, { useEffect, useState } from "react";
import "./Createrole.css";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { useForm } from "react-hook-form";
import Footer from "../footer/Footer.js";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Stack } from "@mui/material";
const Createrole = (props) => {
  const { read } = props;
  const [permissions, setPermissions] = useState([]);
  const [rolename, setRolename] = useState();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const sendRoleData = async () => {
      await axios
        .post(`api/roles/create`, {
          rolename: rolename,
          permissions: data,
        })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          navigate("/allroles");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    sendRoleData();
    reset();
    setRolename("");
  };

  const getPermissions = async () => {
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
    getPermissions();
  }, []);
  return (
    <>
      <div className="create-role-content">
        <div className="container-fluid">
          <div className="p-4 page-nav">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Stack direction="row" spacing={2}>
                <KeyboardBackspaceIcon
                  onClick={() => navigate(-1)}
                  sx={{
                    fontSize: "x-large",
                    color: "brown",
                    cursor: "pointer",
                  }}
                />
                <span className="text-muted ">
                  <b className="nav-head">CREATE ROLE </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
              {read ? (
                <Stack
                  direction="row"
                  className="nav-icon"
                  onClick={() => navigate("/allroles")}
                  spacing={1}
                  sx={{ color: "brown", cursor: "pointer" }}>
                  <GroupOutlinedIcon sx={{ fontSize: "medium" }} />
                  <b>All Roles</b>
                </Stack>
              ) : null}
            </Stack>
          </div>
          <div className="p-5 border border-1 mt-5  form-class">
            <hr />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label">Role Name</label>
                <input
                  className="form-control "
                  placeholder="Role Name"
                  value={rolename}
                  onChange={(e) => {
                    setRolename(e.target.value);
                  }}
                />

                <hr />
                <div className="table-responsive  tableScroll">
                  <table className=" table table-striped text-muted ">
                    <thead>
                      <tr className="tableRow">
                        <th>Permissions</th>
                        <th style={{ textAlign: "center" }}>Create</th>
                        <th style={{ textAlign: "center" }}>Read</th>
                        <th style={{ textAlign: "center" }}>Update</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.map((val, ind) => {
                        return (
                          <tr key={val._id} className="tableRow">
                            <td>{val.permissionname}</td>
                            <td className="table-data">
                              <input
                                type="checkbox"
                                {...register(
                                  `${val.permissionname}.create`,
                                  {}
                                )}
                              />
                            </td>
                            <td className="table-data">
                              <input
                                type="checkbox"
                                {...register(`${val.permissionname}.read`, {})}
                              />
                            </td>
                            <td className="table-data">
                              <input
                                type="checkbox"
                                {...register(
                                  `${val.permissionname}.update`,
                                  {}
                                )}
                              />
                            </td>
                            <td className="table-data">
                              <input
                                type="checkbox"
                                {...register(
                                  `${val.permissionname}.delete`,
                                  {}
                                )}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button type="submit" className="btn btn-info">
                  Create Role
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Createrole;
