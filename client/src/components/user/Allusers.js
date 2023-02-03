import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allusers.css";
import Individualuser from "./individualUser/Individualuser.js";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
import Footer from "../footer/Footer.js";
const Allusers = () => {
  const [users, setUsers] = useState([]);
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
    if (keyword) {
      await axios
        .get(`api/users/getsearchedusers?keyword=${keyword}`)
        .then((res) => {
          setSearchedValues(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchedValues([]);
    }
  };

  //get all pemissions

  const getAllUsers = async (val) => {
    await axios
      .get(`api/users/getallusers?page=${val}`)
      .then((res) => {
        setUsers(res.data.users);
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
    getAllUsers();
  }, []);
  return (
    <>
      <div className="all-users-content">
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
                onClick={() => navigate("/createuser")}
                spacing={1}
                sx={{ color: "brown", cursor: "pointer" }}>
                <ModeOutlinedIcon sx={{ fontSize: "large" }} />
                <b>Create User</b>
              </Stack>
            </Stack>
          </div>

          <div className="p-5 border border-1  mt-5 form-class">
            <blockquote className="blockquote">
              <h4 className="text-muted">
                <b>ALL USERS </b>
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
            <div className="table-responsive user-tableScroll">
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="user-table-row">
                    <th>Searched Users</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedValues.map((val, ind) => {
                    return (
                      <tr key={val._id} className="user-table-row">
                        <Individualuser name={val.name} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
            <span className="pagenumber-class">PAGE : {pageNumber}</span>

            <div className="table-responsive user-tableScroll">
              <table className="table table-striped text-muted">
                <thead>
                  <tr className="user-table-row">
                    <th>Users</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((val, ind) => {
                    return (
                      <tr key={val._id} className="user-table-row">
                        <Individualuser name={val.name} />
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
                      getAllUsers(val);
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
export default Allusers;
