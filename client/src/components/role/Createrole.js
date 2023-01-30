import React, { useEffect, useState } from "react";
import "./Createrole.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const Createrole = () => {
  const [permissions, setPermissions] = useState([]);
  const [rolename, setRolename] = useState();

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
        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendRoleData();
    reset();
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
          <h2 className="create-role-heading">CREATE ROLE</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control"
              placeholder="Role Name"
              value={rolename}
              onChange={(e) => {
                setRolename(e.target.value);
              }}
            />

            <hr />
            <ul>
              {permissions.map((val, ind) => {
                return (
                  <li key={val._id}>
                    {val.permissionname}
                    <input
                      type="checkbox"
                      {...register(`${val.permissionname}.create`, {})}
                    />
                    <input
                      type="checkbox"
                      {...register(`${val.permissionname}.read`, {})}
                    />
                    <input
                      type="checkbox"
                      {...register(`${val.permissionname}.update`, {})}
                    />
                    <input
                      type="checkbox"
                      {...register(`${val.permissionname}.delete`, {})}
                    />
                  </li>
                );
              })}
            </ul>
            <button type="submit" className="btn btn-info">
              Create Role
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Createrole;
