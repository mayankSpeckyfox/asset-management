import React, { useEffect, useState } from "react";
import Footer from "../../footer/Footer.js";
import "./Alltickets.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Individualticket from "./individualticket/Individualticket.js";
import Viewticket from "../viewticket/Viewticket.js";
const Alltickets = (props) => {
  const { data, create, del, update } = props;
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [view, setView] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({});

  const navigate = useNavigate();
  /* const getTickets = async () => {
    await axios
      .get(`api/tickets/getalltickets`)
      .then((res) => {
        if (data.department === "admin") {
          setTickets(res.data.tickets);
        } else if (data.department === "hr") {
          setTickets(res.data.hrTickets);
        } else if (data.department === "account") {
          setTickets(res.data.accountTickets);
        } else if (data.department === "it") {
          setTickets(res.data.itTickets);
        } else if (data.department === "qa") {
          setTickets(res.data.qaTickets);
        } else if (data.department === "development") {
          setTickets(res.data.developmentTickets);
        } else if (data.department === "sales") {
          setTickets(res.data.salesTickets);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  //download image function
  const downloadImage = async (id) => {
    const res = await axios.get(`api/tickets/getindividualticket/${id}`);

    const response = await axios.get(`api/tickets/download/${id}`, {
      responseType: "blob",
    });

    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = res.data.ticket.image.imgname;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteFun = async (id) => {
    await axios
      .delete(`api/tickets/deleteticket/${id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAssignedTickets = async () => {
    await axios
      .get(`api/tickets/getassignedtickets/${data._id}`)
      .then((res) => {
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getData = async () => {
    await axios
      .get(`api/authentication/getdata`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeStatus = async (id, data) => {
    await axios
      .patch(`api/tickets/changestatus/${id}`, { status: data })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setViewFun = (val) => {
    setView(val);
  };
  const sendTicketInfo = (val) => {
    setTicketInfo(val);
  };
  useEffect(() => {
    getAssignedTickets();
    getData();
  }, []);
  return (
    <>
      <div className="all-tickets-content">
        <div className="container-fluid">
          <div className="p-4 page-nav ">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Stack direction="row" spacing={2}>
                <KeyboardBackspaceIcon
                  onClick={() => navigate(-1)}
                  sx={{
                    fontSize: "x-large",
                    color: "brown",
                    cursor: "pointer",
                  }}
                />

                <span className="text-muted ">
                  <b className="nav-head">ALL TICKETS </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />

              {create ? (
                <Stack
                  direction="row"
                  onClick={() => navigate("/createticket")}
                  spacing={1}
                  sx={{ color: "brown", cursor: "pointer" }}>
                  <ModeOutlinedIcon sx={{ fontSize: "medium" }} />
                  <b className="nav-icon">Create Ticket</b>
                </Stack>
              ) : null}
            </Stack>
          </div>

          {!view ? (
            <div className="table-responsive tickets-tableScroll ticket-table-class p-5">
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="ticket-table-row">
                    <th>ID</th>
                    <th>Department</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Image</th>
                    <th>Status</th>

                    {del ? (
                      <th style={{ textAlign: "center" }}>Delete</th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((val, ind) => {
                    return (
                      <tr key={val._id} className="ticket-table-row">
                        <Individualticket
                          val={val}
                          deleteFun={deleteFun}
                          del={del}
                          downloadImage={downloadImage}
                          changeStatus={changeStatus}
                          setViewFun={setViewFun}
                          sendTicketInfo={sendTicketInfo}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Viewticket
              setViewFun={setViewFun}
              ticketInfo={ticketInfo}
              data={data}
              update={update}
            />
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Alltickets;
