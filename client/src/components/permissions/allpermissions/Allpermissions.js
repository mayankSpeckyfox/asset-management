import React, { useState, useEffect } from "react";
import axios from "axios";
import Individualpermission from "./individualPermission/Individualpermission.js";
import "./Allpermissions.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
import Footer from "../../footer/Footer.js";
const Allpermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalpages, setTotalpages] = useState();
  const [keyword, setKeyword] = useState();
  const [searchedValues, setSearchedValues] = useState([]);
  const navigate = useNavigate();
  let pageArray = [];
  for (let i = 1; i <= totalpages; i++) {
    pageArray[i - 1] = i;
  }

  //get permissions for search
  const searchFunction = async () => {
    await axios
      .get(`api/permissions/getsearchedpermissions?keyword=${keyword}`)
      .then((res) => {
        setSearchedValues(res.data.permissions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get all pemissions

  const getAllPermissions = async (val) => {
    await axios
      .get(`api/permissions/getallpermissions?page=${val}`)
      .then((res) => {
        setPermissions(res.data.permissions);
        setTotalpages(res.data.totalPages);
        if (val) {
          setPageNumber(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPermissions();
  }, []);
  return (
    <>
      <div className="all-permission-content">
        <div className="container-fluid">
          <div className="p-4 page-nav ">
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <KeyboardBackspaceIcon
                onClick={() => navigate(-1)}
                sx={{ fontSize: "xx-large", color: "brown", cursor: "pointer" }}
              />
              <CottageOutlinedIcon
                className="home-icon"
                onClick={() => navigate("/")}
                sx={{ fontSize: "xx-large", color: "brown" }}
              />
              <Stack
                direction="row"
                onClick={() => navigate("/createpermission")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <ModeOutlinedIcon sx={{ fontSize: "large" }} />
                <b>Create Permission</b>
              </Stack>
            </Stack>
          </div>
          <div className="p-5 border border-1  mt-5 form-class">
            <blockquote className="blockquote">
              <h4 className="text-muted">
                <b>ALL PERMISSIONS </b>
              </h4>
            </blockquote>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
              }}>
              <input
                className="search-input"
                type="text"
                placeholder="Search...."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <SearchIcon
                sx={{ fontSize: "xx-large", color: "brown", cursor: "pointer" }}
                onClick={searchFunction}
              />
            </Stack>
            <hr />
            <div className="table-responsive permission-tableScroll">
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="permission-table-row">
                    <th>Searched permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedValues.map((val, ind) => {
                    return (
                      <tr key={val._id} className="permission-table-row">
                        <Individualpermission
                          permissionname={val.permissionname}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
            <span className="pagenumber-class">PAGE : {pageNumber}</span>

            <div className="table-responsive permission-tableScroll">
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="permission-table-row">
                    <th>Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((val, ind) => {
                    return (
                      <tr key={val._id} className="permission-table-row">
                        <Individualpermission
                          permissionname={val.permissionname}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
            <Stack
              direction="row"
              className="pagination-wrapper"
              spacing={1}
              sx={{ width: "80px" }}>
              {pageArray.map((val, ind) => {
                return (
                  <Stack
                    className="pagination-icons"
                    sx={{
                      cursor: "pointer",
                      color: "brown",

                      padding: "3px",
                      borderRadius: "20px",
                      border: "1px solid silver",
                    }}
                    onClick={() => {
                      getAllPermissions(val);
                    }}
                    key={val - 1}>
                    {val}
                  </Stack>
                );
              })}
            </Stack>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Allpermissions;
