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
import Edituser from "./edituser/Edituser.js";
const Allusers = (props) => {
  const { create, update, del } = props;
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [totalpages, setTotalpages] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [keyword, setKeyword] = useState();
  const [userCount, setUserCount] = useState(0);
  const [editData, setEditData] = useState();
  const [searchedValues, setSearchedValues] = useState([]);
  const navigate = useNavigate();
  let pageArray = [];
  for (let i = 1; i <= totalpages; i++) {
    pageArray[i - 1] = i;
  }

  //get Users for search
  const searchFunction = async () => {
    if (keyword) {
      await axios
        .get(`api/users/getsearchedusers?keyword=${keyword}`)
        .then((res) => {
          setSearchedValues(res.data.users);

          setShowTable(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchedValues([]);
      setShowTable(false);
    }
  };

  const editFun = async (id) => {
    await axios
      .get(`api/users/individualuser/${id}`)
      .then((res) => {
        setEditData(res.data.foundUser);
        console.log(res);
        setShowEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get all Users

  const getAllUsers = async (val) => {
    await axios
      .get(`api/users/getallusers?page=${val}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotalpages(res.data.totalPages);
        setUserCount(res.data.userCount);
        if (val) {
          setPageNumber(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const deleteFun = async (id) => {
    await axios
      .delete(`api/users/deleteuser/${id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
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
      {!showEdit ? (
        <div className="all-users-content">
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
                    <b className="nav-head">ALL USERS </b>
                  </span>
                </Stack>
                <CottageOutlinedIcon
                  className="home-icon "
                  onClick={() => navigate("/")}
                  sx={{ fontSize: "x-large", color: "brown" }}
                />
                {create ? (
                  <Stack
                    className="nav-icon"
                    direction="row"
                    onClick={() => navigate("/createuser")}
                    spacing={1}
                    sx={{ color: "brown", cursor: "pointer" }}>
                    <ModeOutlinedIcon sx={{ fontSize: "medium" }} />
                    <b>Create User</b>
                  </Stack>
                ) : null}
              </Stack>
            </div>

            <div className="p-5 border border-1  mt-5 form-class">
              <small className="user-count">User Count : {userCount}</small>
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
                  sx={{
                    fontSize: "xx-large",
                    color: "brown",
                    cursor: "pointer",
                  }}
                  onClick={searchFunction}
                />
              </Stack>
              <hr />
              {showTable && (
                <div className="table-responsive user-tableScroll">
                  <table className="table table-striped text-muted">
                    <thead>
                      <tr className="user-table-row">
                        <th>Users</th>
                        <th>Email</th>
                        <th>Department</th>

                        <th>Role</th>
                        {update ? (
                          <th style={{ textAlign: "center" }}>Edit</th>
                        ) : null}
                        {del ? (
                          <th style={{ textAlign: "center" }}>Delete</th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {searchedValues.map((val, ind) => {
                        return (
                          <tr key={val._id} className="user-table-row">
                            <Individualuser
                              name={val.name}
                              email={val.email}
                              department={val.department}
                              role={val.role}
                              editFun={editFun}
                              id={val._id}
                              deleteFun={deleteFun}
                              update={update}
                              del={del}
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <hr />
                </div>
              )}

              <div className="table-responsive user-tableScroll">
                <table className="table table-striped text-muted">
                  <thead>
                    <tr className="user-table-row">
                      <th>Users</th>
                      <th>Email</th>
                      <th>Department</th>

                      <th>Role</th>

                      {update ? (
                        <th style={{ textAlign: "center" }}>Edit</th>
                      ) : null}
                      {del ? (
                        <th style={{ textAlign: "center" }}>Delete</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((val, ind) => {
                      return (
                        <tr key={val._id} className="user-table-row">
                          <Individualuser
                            name={val.name}
                            email={val.email}
                            department={val.department}
                            editFun={editFun}
                            role={val.role}
                            id={val._id}
                            deleteFun={deleteFun}
                            update={update}
                            del={del}
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
                sx={{ justifyContent: "center" }}
                className="pagination-wrapper"
                spacing={1}>
                {pageArray.map((val, ind) => {
                  const col = pageNumber === val ? "white" : "brown";
                  const bcol = pageNumber === val ? "brown" : "white";
                  return (
                    <Stack
                      className="pagination-icons"
                      sx={{
                        cursor: "pointer",
                        color: col,
                        backgroundColor: bcol,

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
      ) : (
        <Edituser
          id={editData._id}
          name={editData.name}
          email={editData.email}
          department={editData.department}
          role={editData.role}
          closeEdit={closeEdit}
        />
      )}
    </>
  );
};
export default Allusers;
