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
const Alltickets = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const navigate = useNavigate();
  const getTickets = async () => {
    await axios
      .get(`api/tickets/getalltickets`)
      .then((res) => {
        setTickets(res.data.tickets);
        setTicketCount(res.data.ticketCount);
      })
      .catch((err) => {
        console.log(err);
      });
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
  useEffect(() => {
    getTickets();
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
              <Stack
                direction="row"
                onClick={() => navigate("/createticket")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <ModeOutlinedIcon sx={{ fontSize: "medium" }} />
                <b className="nav-icon">Create Ticket</b>
              </Stack>
            </Stack>
          </div>

          <div className="table-responsive tickets-tableScroll ticket-table-class p-5">
            <small className="ticket-count">Ticket Count : {ticketCount}</small>
            <table className="table table-striped text-muted">
              <thead>
                <tr className="ticket-table-row">
                  <th>ID</th>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th style={{ textAlign: "center" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((val, ind) => {
                  return (
                    <tr key={val._id} className="ticket-table-row">
                      <Individualticket val={val} deleteFun={deleteFun} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Alltickets;
