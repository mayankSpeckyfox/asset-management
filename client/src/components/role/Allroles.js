import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allroles.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useNavigate } from "react-router-dom";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import { Stack } from "@mui/material";
import Footer from "../footer/Footer.js";
import Individualrole from "./individualrole/Individualrole.js";
import Editrole from "./editrole/Editrole.js";
const Allroles = () => {
  const [roles, setRoles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [totalpages, setTotalpages] = useState();
  const [keyword, setKeyword] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState();

  const [searchedValues, setSearchedValues] = useState([]);
  const navigate = useNavigate();
  let pageArray = [];
  for (let i = 1; i <= totalpages; i++) {
    pageArray[i - 1] = i;
  }

  //get roles for search
  const searchFunction = async () => {
    if (keyword) {
      await axios
        .get(`api/roles/getsearchedroles?keyword=${keyword}`)
        .then((res) => {
          setSearchedValues(res.data.roles);
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

  //get all roles

  const getAllRoles = async (val) => {
    await axios
      .get(`api/roles/getallroles?page=${val}`)
      .then((res) => {
        setRoles(res.data.roles);
        setTotalpages(res.data.totalPages);
        if (val) {
          setPageNumber(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFun = async (id) => {
    await axios
      .delete(`api/roles/deleterole/${id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeEdit = () => {
    setShowEdit(false);
  };
  const editFun = async (id) => {
    await axios
      .get(`api/roles/individualrole/${id}`)
      .then((res) => {
        setEditData(res.data.individualRole);
        setShowEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllRoles();
  }, []);
  return (
    <>
      {!showEdit ? (
        <div className="all-roles-content">
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
                    <b className="nav-head">ALL ROLES </b>
                  </span>
                </Stack>
                <CottageOutlinedIcon
                  className="home-icon"
                  onClick={() => navigate("/")}
                  sx={{ fontSize: "x-large", color: "brown" }}
                />
                <Stack
                  direction="row"
                  onClick={() => navigate("/createrole")}
                  spacing={1}
                  sx={{ color: "brown", cursor: "pointer" }}>
                  <ModeOutlinedIcon sx={{ fontSize: "medium" }} />
                  <b className="nav-icon">Create Role</b>
                </Stack>
              </Stack>
            </div>
            <div className="p-5 border border-1  mt-5 form-class">
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
                <div className="table-responsive role-tableScroll">
                  <table className="table table-striped text-muted">
                    <thead>
                      <tr className="role-table-row">
                        <th>Roles</th>
                        <th style={{ textAlign: "center" }}>Edit</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedValues.map((val, ind) => {
                        return (
                          <tr key={val._id} className="role-table-row">
                            <Individualrole
                              rolename={val.rolename}
                              id={val._id}
                              editFun={editFun}
                              deleteFun={deleteFun}
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <hr />
                </div>
              )}

              <div className="table-responsive permission-tableScroll">
                <table className="table table-striped text-muted">
                  <thead>
                    <tr className="permission-table-row">
                      <th>Roles</th>
                      <th style={{ textAlign: "center" }}>Edit</th>
                      <th style={{ textAlign: "center" }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((val, ind) => {
                      return (
                        <tr key={val._id} className="permission-table-row">
                          <Individualrole
                            rolename={val.rolename}
                            id={val._id}
                            editFun={editFun}
                            deleteFun={deleteFun}
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
                        getAllRoles(val);
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
        <Editrole
          id={editData._id}
          rolename={editData.rolename}
          rolepermissions={editData.permissions}
          closeEdit={closeEdit}
        />
      )}
    </>
  );
};
export default Allroles;
