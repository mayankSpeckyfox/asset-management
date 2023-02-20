import React, { useEffect, useState } from "react";
import "./Viewticket.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/material";
import axios from "axios";
const Viewticket = (props) => {
  const { setViewFun, ticketInfo, data, update } = props;
  const [user, setUser] = useState({});
  const [assigntousers, setAssigntoUsers] = useState([]);

  const getUser = async () => {
    await axios
      .get(`api/users/individualuser/${ticketInfo.assignedTo}`)
      .then((res) => {
        setUser(res.data.foundUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const assign = async (val) => {
    await axios
      .patch(`api/tickets/assignto/${ticketInfo._id}`, { assignedTo: val })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserDept = async (val) => {
    await axios
      .get(`api/users/getusersbydepartment/${val}`)
      .then((res) => {
        setAssigntoUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeStatus = async (val) => {
    await axios
      .patch(`api/tickets/changestatus/${ticketInfo._id}`, { status: val })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserDept(ticketInfo.department);
    getUser();
  }, []);
  return (
    <>
      <div className="mt-4 p-5 border border-1 ticket-container form-class">
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <CancelIcon
            sx={{ fontSize: "xx-large", cursor: "pointer", color: "tomato" }}
            onClick={() => setViewFun(false)}
          />
        </Stack>
        <h4>
          <b>Subject : </b>
          {ticketInfo.subject}
        </h4>
        <hr />
        <p>
          <b>ID :</b> {ticketInfo._id}
        </p>
        <hr />
        <p>
          <b>Department : </b>
          {ticketInfo.department}
        </p>
        <hr />
        <p>
          <b>Assigned to : </b>
          {user ? user.name : ""}
        </p>
        <hr />
        <p>
          <b>Created At : </b>
          {ticketInfo.createdAt}{" "}
        </p>
        <hr />
        <p>
          <b>Description :</b> {ticketInfo.description}
        </p>
        {update ? (
          <>
            {" "}
            <hr />
            <label className="form-label">Assign To</label>
            <select
              className="form-control"
              onChange={(e) => assign(e.target.value)}>
              <option value="">Assign-To</option>
              {assigntousers.map((val) => {
                return val._id !== data._id ? (
                  <option key={val._id} value={val._id}>
                    {val.name}
                  </option>
                ) : null;
              })}
            </select>
            <hr />
            <label className="form-label">Change-Status</label>
            <select
              className="form-control"
              onChange={(e) => {
                changeStatus(e.target.value);
              }}>
              <option value="">Change-Status</option>
              {ticketInfo.status === "active" ? (
                <option value="closed">close</option>
              ) : (
                <option value="active">open</option>
              )}
            </select>
          </>
        ) : null}
      </div>
    </>
  );
};
export default Viewticket;
