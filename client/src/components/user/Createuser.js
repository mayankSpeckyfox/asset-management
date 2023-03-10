import React, { useEffect, useState } from "react";
import "./Createuser.css";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
import Footer from "../footer/Footer.js";
const Createuser = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const submitUserData = async () => {
      try {
        await axios
          .post(`api/users/create`, {
            name: data.name,
            email: data.email,
            password: data.password,
            cpassword: data.cpassword,
            role: role,
          })
          .then((res) => {
            console.log(res);
            alert(res.data.message);
            navigate("/allusers");
          })
          .catch((er) => {
            console.log(er);
            if (er.response.data.error) {
              alert(er.response.data.error);
            } else {
              alert(er.response.data.message);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    submitUserData();
    setRole("");
    reset();
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
      <div className="create-user-content">
        <div className="container-fluid ">
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
                  <b className="nav-head">CREATE USER </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
              <Stack
                className="nav-icon"
                direction="row"
                onClick={() => navigate("/allusers")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <GroupAddOutlinedIcon sx={{ fontSize: "medium" }} />
                <b>All Users</b>
              </Stack>
            </Stack>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-1 p-5 mt-5  form-class">
            <hr />
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
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <span className="create-user-validation-error">
                *Password is required
              </span>
            )}
            <hr />
            <label className="form-label">Conform Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              {...register("cpassword", { required: true })}
            />

            {errors.cpassword && (
              <span className="create-user-validation-error">
                *Please confirm your password
              </span>
            )}
            <hr />
            <label className="form-label">Select Role</label>
            <select
              name="roles"
              onChange={(e) => setRole(e.target.value)}
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

            <button className="btn btn-info" type="submit">
              Create User
            </button>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Createuser;
