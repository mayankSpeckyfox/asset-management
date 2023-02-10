import React, { useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import "./Createticket.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import axios from "axios";
import { useForm } from "react-hook-form";
const Createticket = () => {
  const [data, setData] = useState({});
  const [department, setDepartment] = useState("");
  const [depData, setDepData] = useState({
    admin: { email: "" },
    hr: { email: "" },
    it: { email: "" },
    account: { email: "" },
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (d) => {
    const sendEmail = async (receiver, SUBJECT, DESCRIPTION) => {
      await axios
        .post(`api/tickets/sendemail`, {
          email: receiver,
          subject: SUBJECT,
          description: DESCRIPTION,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    if (department) {
      sendEmail(data.email, d.subject, d.description);
      sendEmail(depData[department].email, d.subject, d.description);
    }
    const submitTicketData = async () => {
      try {
        await axios
          .post(`api/tickets/create`, {
            department: department,
            subject: d.subject,
            description: d.description,
          })
          .then((res) => {
            alert(res.data.message);
            navigate("/alltickets");
          })
          .catch((er) => {
            console.log(er);
            if (er.response.data.error) {
              alert(er.response.data.error);
            } else {
              alert(er.response.data.message);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    submitTicketData();
    setDepartment("");
    reset();
  };

  const getData = async () => {
    await axios
      .get(`api/authentication/getdata`)
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDepartment = async (req, res) => {
    await axios
      .get(`api/department/getdepartment`)
      .then((res) => {
        setDepData(res.data.department[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="create-tickets-content">
        <div className="container-fluid">
          <div className="p-4 page-nav">
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
                  <b className="nav-head">CREATE TICKET </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
              <Stack
                onClick={() => navigate("/alltickets")}
                direction="row"
                spacing={1}
                className="nav-icon"
                sx={{ color: "brown", cursor: "pointer" }}>
                <b>All tickets</b>
              </Stack>
            </Stack>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-1 p-5 mt-5  form-class">
            <hr />
            <label className="form-label">Department</label>

            <select
              className="form-control "
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                getDepartment();
              }}>
              <option>Select-Department</option>
              <option value="admin">ADMIN</option>
              <option value="hr">HR</option>
              <option value="it">IT</option>
              <option value="account">ACCOUNTS</option>
            </select>
            <hr />
            <label className="form-label">Subject</label>
            <input
              className="form-control "
              type="text"
              placeholder="Subject"
              {...register("subject", { required: true })}
            />

            {errors.subject && (
              <span className="create-ticket-validation-error">
                *Subject is required
              </span>
            )}
            <hr />
            <label className="form-label">Description</label>
            <input
              className="form-control "
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
            />

            {errors.subject && (
              <span className="create-ticket-validation-error">
                *Description is required
              </span>
            )}
            <hr />

            <button className="btn btn-info" type="submit">
              Create Ticket
            </button>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Createticket;
