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
          alert(res.data.message);
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
          <div className="p-5 border border-2 mt-5 mb-5 ">
            <blockquote className="blockquote">
              <h3 className="text-muted">CREATE ROLE</h3>
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
                <div className="table-responsive">
                  <table className=" table table-striped ">
                    <thead>
                      <tr>
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
                          <tr key={val._id}>
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
        </div>
      </div>
    </>
  );
};
export default Createrole;
