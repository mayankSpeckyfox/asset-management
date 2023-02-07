import React, { useState, useEffect } from "react";
import Footer from "../../footer/Footer.js";
import "./Edituser.css";
import axios from "axios";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
const Edituser = (props) => {
  const { id, name, email, role, closeEdit } = props;
  const [allRoles, setAllRoles] = useState([]);
  const [roleName, setRole] = useState(role);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: name,
      email: email,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const updateUser = async () => {
      await axios
        .patch(`api/users/updateuser/${id}`, {
          name: data.name,
          email: data.email,
          role: roleName,
        })
        .then((res) => {
          alert(res.data.message);

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    updateUser();
  };

  useEffect(() => {
    const getAllRoles = async () => {
      try {
        await axios
          .get(`api/roles/getallroles`)
          .then((res) => {
            console.log(res);

            setAllRoles(res.data.roles);
          })
          .catch((er) => {
            console.log(er);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getAllRoles();
  }, []);
  return (
    <>
      <div className="edit-user-content">
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
                  <b className="nav-head">EDIT PERMISSION </b>
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
                <b>All Users</b>
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

            <label className="form-label">Name</label>
            <input
              className="form-control "
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="create-user-validation-error">
                *Name is required
              </span>
            )}
            <hr />
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="create-user-validation-error">
                *Email is required
              </span>
            )}
            <hr />

            <label className="form-label">Select Role</label>
            <select
              name="roles"
              onChange={(e) => setRole(e.target.value)}
              value={roleName}
              className="form-control">
              <option>Select-Role</option>
              {allRoles.map((val, ind) => {
                return (
                  <option key={val._id} value={val.rolename}>
                    {val.rolename}
                  </option>
                );
              })}
            </select>
            <hr />
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
export default Edituser;
