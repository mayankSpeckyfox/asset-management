import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer.js";
import "./Settings.css";
import { Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Editdepartment from "./editdepartment/Editdepartment.js";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const Settings = () => {
  const [data, setData] = useState({
    admin: { email: "" },
    hr: { email: "" },
    it: { email: "" },
    account: { email: "" },
  });
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const fetchDepartment = async () => {
    await axios
      .get(`api/department/getdepartment`)
      .then((res) => {
        setData(res.data.department[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeEdit = () => {
    setShowEdit(false);
  };
  useEffect(() => {
    fetchDepartment();
  }, []);
  return (
    <>
      <div className="settings-content">
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
                  <b className="nav-head">Settings </b>
                </span>
              </Stack>
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "x-large", color: "brown" }}
              />
            </Stack>
          </div>
          {!showEdit ? (
            <div className="table-responsive department-tableScroll m-5 p-5 pt-4 border border-1">
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-end", marginBottom: "12px" }}>
                <BorderColorIcon
                  className="edit-icon"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                  sx={{
                    fontSize: "x-large",
                    color: "brown",
                    cursor: "pointer",
                  }}
                />
              </Stack>
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="department-table-row">
                    <th>Department</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="department-table-row">
                    <td>ADMIN</td>
                    <td className="table-data">{data.admin.email}</td>
                  </tr>
                  <tr className="department-table-row">
                    <td>HR</td>
                    <td className="table-data">{data.hr.email}</td>
                  </tr>
                  <tr className="department-table-row">
                    <td>IT</td>
                    <td className="table-data">{data.it.email}</td>
                  </tr>
                  <tr className="department-table-row">
                    <td>ACCOUNTS</td>
                    <td className="table-data">{data.account.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <Editdepartment closeEdit={closeEdit} data={data} />
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Settings;
