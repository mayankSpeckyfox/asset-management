import React from "react";
import "./Viewticket.css";

const Viewticket = (props) => {
  const { setViewFun, ticketInfo } = props;
  console.log(ticketInfo);
  return (
    <>
      <button onClick={() => setViewFun(false)}>close</button>
      <h1>Heello</h1>
    </>
  );
};
export default Viewticket;
