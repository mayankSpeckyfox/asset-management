import React, { useState, useEffect } from "react";
import "./Permissions.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Allpermissions from "./allpermissions/Allpermissions.js";
const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
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
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    };
    createPermission();
    reset();
  };
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
      <div className="permission-content">
        <div className="container-fluid">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 border border-2 mt-5">
            <blockquote className="blockquote mt-2">
              <h3 className="text-muted"> ADD PERMISSIONS</h3>
            </blockquote>
            <hr />
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
          <Allpermissions permissions={permissions} />
        </div>
      </div>
    </>
  );
};
export default Permissions;
