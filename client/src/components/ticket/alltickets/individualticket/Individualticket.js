import React from "react";
const Individualticket = (props) => {
  const { _id, department, subject, description, createdAt } = props.val;
  return (
    <>
      <td>{_id}</td>
      <td>{department}</td>
      <td>{subject}</td>
      <td>{description}</td>
      <td>{createdAt}</td>
    </>
  );
};
export default Individualticket;
