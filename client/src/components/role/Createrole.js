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
const Createrole = () => {
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
                onClick={() => navigate("/allroles")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <GroupOutlinedIcon sx={{ fontSize: "large" }} />
                <b>All Roles</b>
              </Stack>
            </Stack>
          </div>
          <div className="p-5 border border-1 mt-5  form-class">
            <blockquote className="blockquote">
              <h4 className="text-muted">
                <b>CREATE ROLE</b>
              </h4>
            </blockquote>
            <hr />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                        <th>Create</th>
                        <th>Read</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.map((val, ind) => {
                        return (
                          <tr key={val._id} className="tableRow">
                            <td>{val.permissionname}</td>
                            <td>
                              <input
                                type="checkbox"
                                {...register(
                                  `${val.permissionname}.create`,
                                  {}
                                )}
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                {...register(`${val.permissionname}.read`, {})}
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                {...register(
                                  `${val.permissionname}.update`,
                                  {}
                                )}
                              />
                            </td>
                            <td>
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
