import React, { useEffect, useState } from "react";
import "./Viewticket.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/material";
import axios from "axios";
const Viewticket = (props) => {
  const { setViewFun, ticketInfo, data, update } = props;
  const [user, setUser] = useState({});
  const [creator, setCreator] = useState({});
  const [assigntousers, setAssigntoUsers] = useState([]);
  const [show, setShow] = useState(false);
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

  const getCreator = async () => {
    await axios
      .get(`api/users/individualuser/${ticketInfo.createdBy}`)
      .then((res) => {
        setCreator(res.data.foundUser);
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
    getCreator();
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
        <div className="panel panel-default mt-5">
          <div className="panel-heading">
            <b>Subject</b>
          </div>
          <div className="panel-body">{ticketInfo.subject}</div>
        </div>

        <hr />
        <div className="panel panel-default ">
          <div className="panel-heading">
            <b>ID</b>
          </div>
          <div className="panel-body">{ticketInfo._id}</div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Department</b>
          </div>
          <div className="panel-body">{ticketInfo.department}</div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Assigned To</b>
          </div>
          <div className="panel-body"> {user ? user.name : ""}</div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Created By</b>
          </div>
          <div className="panel-body"> {creator ? creator.name : ""}</div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Created At</b>
          </div>
          <div className="panel-body"> {ticketInfo.createdAt} </div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Status</b>
          </div>
          <div className="panel-body">{ticketInfo.status} </div>
        </div>

        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <b>Description</b>
          </div>
          <div className="panel-body"> {ticketInfo.description} </div>
        </div>

        {update ? (
          <div className=" m-4 p-5 ">
            <button
              onClick={() => setShow(!show)}
              type="button"
              className="btn btn-info form-control">
              {!show ? `Action` : `Close`}
            </button>{" "}
            {show ? (
              <>
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
        ) : null}
      </div>
    </>
  );
};
export default Viewticket;
