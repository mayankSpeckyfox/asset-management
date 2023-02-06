import React from "react";
import "./Permissions.css";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Stack } from "@mui/material";
import Footer from "../footer/Footer.js";
const Permissions = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const createPermission = async () => {
      await axios
        .post(`api/permissions/create`, { permissionname: data.permissionname })
        .then((res) => {
          alert(res.data.message);
          navigate("/allpermissions");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    createPermission();
    reset();
  };

  return (
    <>
      <div className="permission-content">
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
                  <b className="nav-head">ADD PERMISSION </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
              <Stack
                onClick={() => navigate("/allpermissions")}
                direction="row"
                spacing={1}
                className="nav-icon"
                sx={{ color: "brown", cursor: "pointer" }}>
                <VpnKeyOutlinedIcon sx={{ fontSize: "medium" }} />{" "}
                <b> Permissions</b>
              </Stack>
            </Stack>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 border border-1 mt-5 form-class">
            <hr />
            <label className="form-label">Permission</label>
            <input
              placeholder="Permission Name"
              className="form-control"
              type="text"
              {...register("permissionname", { required: true })}
            />

            {errors.permissionname && (
              <span className="permission-validation-error">
                *This field is required
              </span>
            )}
            <hr />

            <button type="submit" className="btn btn-info">
              Add Permission
            </button>
          </form>
          <hr />

          <Footer />
        </div>
      </div>
    </>
  );
};
export default Permissions;
