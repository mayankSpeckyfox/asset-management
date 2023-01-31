import React from "react";

import Individualpermission from "./individualPermission/Individualpermission.js";

const Allpermissions = (props) => {
  const { permissions } = props;
  return (
    <>
      <div className="p-5 border border-2 mb-5">
        <blockquote className="blockquote">
          <h4 className="text-muted">
            <b>ALL PERMISSIONS</b>
          </h4>
        </blockquote>
        <hr />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((val, ind) => {
                return (
                  <tr key={val._id}>
                    <Individualpermission permissionname={val.permissionname} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Allpermissions;
