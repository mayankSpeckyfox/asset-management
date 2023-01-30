import React from "react";
import "./Individualpermission.css";
const Individualpermission = (props) => {
  const { permissionname } = props;
  return (
    <>
      <b>{permissionname}</b>
    </>
  );
};
export default Individualpermission;
