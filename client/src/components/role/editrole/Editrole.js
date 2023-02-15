import React, { useState, useEffect } from "react";
import Footer from "../../footer/Footer";
import "./Editrole.css";
import axios from "axios";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
const Editrole = (props) => {
  const { id, rolename, closeEdit, rolepermissions } = props;
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState(rolename);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      permissions: rolepermissions,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const updateRole = async () => {
      await axios
        .patch(`api/roles/updaterole/${id}`, {
          rolename: role,
          currentRole: rolename,
          permissions: data.permissions,
        })
        .then((res) => {
          alert(res.data.message);

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    updateRole();
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
      <div className="edit-role-content">
        <div className="container-fluid">
          <div className="p-4 page-nav ">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Stack direction="row" spacing={2}>
                <KeyboardBackspaceIcon
                  className="nav-icon"
                  onClick={() => navigate(-1)}
                  sx={{
                    fontSize: "x-large",
                    color: "brown",
                    cursor: "pointer",
                  }}
                />

                <span className="text-muted ">
                  <b className="nav-head">EDIT ROLE </b>
                </span>
              </Stack>

              <CottageOutlinedIcon
                className="home-icon nav-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
              <Stack
                className="nav-icon"
                direction="row"
                onClick={closeEdit}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <b>All Roles</b>
              </Stack>
            </Stack>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 border border-1 mt-5 form-class">
            <Stack sx={{ justifyContent: "end" }} direction="row">
              <DisabledByDefaultIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "xx-large",
                  color: "#bf0f27",
                }}
                onClick={closeEdit}
              />
            </Stack>
            <br />
            <label className="form-label">Role Name</label>
            <input
              className="form-control "
              placeholder="Role Name"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
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
                              `permissions.${val.permissionname}.create`,
                              {}
                            )}
                          />
                        </td>
                        <td className="table-data">
                          <input
                            type="checkbox"
                            {...register(
                              `permissions.${val.permissionname}.read`,
                              {}
                            )}
                          />
                        </td>
                        <td className="table-data">
                          <input
                            type="checkbox"
                            {...register(
                              `permissions.${val.permissionname}.update`,
                              {}
                            )}
                          />
                        </td>
                        <td className="table-data">
                          <input
                            type="checkbox"
                            {...register(
                              `permissions.${val.permissionname}.delete`,
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
              Submit
            </button>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Editrole;
