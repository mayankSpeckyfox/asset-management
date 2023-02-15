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
const Alltickets = (props) => {
  const { data, create, del } = props;
  const [tickets, setTickets] = useState([]);

  const [ticketCount, setTicketCount] = useState(0);
  const navigate = useNavigate();
  const getTickets = async () => {
    await axios
      .get(`api/tickets/getalltickets`)
      .then((res) => {
        if (data.department === "admin") {
          setTickets(res.data.tickets);
          setTicketCount(res.data.ticketCount);
        } else if (data.department === "hr") {
          setTickets(res.data.hrTickets);
        } else if (data.department === "account") {
          setTickets(res.data.accountTickets);
        } else if (data.department === "it") {
          setTickets(res.data.itTickets);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

          <div className="table-responsive tickets-tableScroll ticket-table-class p-5">
            {ticketCount ? (
              <small className="ticket-count">
                Ticket Count : {ticketCount}
              </small>
            ) : null}
            <table className="table table-striped text-muted">
              <thead>
                <tr className="ticket-table-row">
                  <th>ID</th>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Image</th>
                  {del ? <th style={{ textAlign: "center" }}>Delete</th> : null}
                </tr>
              </thead>
              <tbody>
                {tickets.map((val, ind) => {
                  return (
                    <tr key={val._id} className="ticket-table-row">
                      <Individualticket
                        val={val}
                        deleteFun={deleteFun}
                        downloadImage={downloadImage}
                        del={del}
                      />
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
