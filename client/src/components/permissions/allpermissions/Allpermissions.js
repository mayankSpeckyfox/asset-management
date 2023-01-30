import React from "react";
import "./Allpermissions.css";

import Individualpermission from "./individualPermission/Individualpermission.js";

const Allpermissions = (props) => {
  const { permissions } = props;
  return (
    <>
      <div>
        <h2 className="all-permissions-heading">ALL PERMISSIONS</h2>
        <ul className="permission-list">
          {permissions.map((val, ind) => {
            return (
              <li key={val._id}>
                <Individualpermission permissionname={val.permissionname} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Allpermissions;
