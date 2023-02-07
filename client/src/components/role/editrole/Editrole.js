import React from "react";
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
  const { id, rolename, closeEdit } = props;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rolename: rolename,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const updateRole = async () => {
      await axios
        .patch(`api/roles/updaterole/${id}`, {
          rolename: data.rolename,
          currentRole: rolename,
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
    updateRole();
  };
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
              placeholder="Role Name"
              className="form-control"
              type="text"
              {...register("rolename", { required: true })}
            />

            {errors.permissionname && (
              <span className="permission-validation-error">
                *This field is required
              </span>
            )}
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
export default Editrole;
