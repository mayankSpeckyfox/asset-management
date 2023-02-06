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
import Editpermission from "../editpermissions/Editpermission.js";
const Allpermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [totalpages, setTotalpages] = useState();
  const [editData, setEditData] = useState();
  const [keyword, setKeyword] = useState();
  const [searchedValues, setSearchedValues] = useState([]);
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  let pageArray = [];
  for (let i = 1; i <= totalpages; i++) {
    pageArray[i - 1] = i;
  }

  //get permissions for search
  const searchFunction = async () => {
    if (keyword) {
      await axios
        .get(`api/permissions/getsearchedpermissions?keyword=${keyword}`)
        .then((res) => {
          setSearchedValues(res.data.permissions);
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

  const deleteFun = async (id) => {
    await axios
      .delete(`api/permissions/deletepermission/${id}`)
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
      .get(`api/permissions/getindividualpermission/${id}`)
      .then((res) => {
        setEditData(res.data.permission);
        setShowEdit(true);
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
      {!showEdit ? (
        <div className="all-permission-content">
          <div className="container-fluid">
            <div className="p-4 page-nav ">
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="row" spacing={2}>
                  <KeyboardBackspaceIcon
                    className="nav-icon"
                    onClick={() => navigate(-1)}
                    sx={{
                      fontSize: "x-large",
                      color: "brown",
                      cursor: "pointer",
                    }}
                  />

                  <span className="text-muted ">
                    <b className="nav-head">ALL PERMISSIONS </b>
                  </span>
                </Stack>

                <CottageOutlinedIcon
                  className="home-icon nav-icon"
                  onClick={() => navigate("/")}
                  sx={{ fontSize: "x-large", color: "brown" }}
                />
                <Stack
                  className="nav-icon"
                  direction="row"
                  onClick={() => navigate("/createpermission")}
                  spacing={1}
                  sx={{ color: "brown", cursor: "pointer" }}>
                  <ModeOutlinedIcon sx={{ fontSize: "medium" }} />
                  <b>Create Permission</b>
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
                <div className="table-responsive permission-tableScroll">
                  <table className="table table-striped text-muted">
                    <thead>
                      <tr className="permission-table-row">
                        <th>Permissions</th>
                        <th style={{ textAlign: "center" }}>Edit</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedValues.map((val, ind) => {
                        return (
                          <tr key={val._id} className="permission-table-row">
                            <Individualpermission
                              deleteFun={deleteFun}
                              editFun={editFun}
                              id={val._id}
                              permissionname={val.permissionname}
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
                      <th>Permissions</th>
                      <th style={{ textAlign: "center" }}>Edit</th>
                      <th style={{ textAlign: "center" }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((val, ind) => {
                      return (
                        <tr key={val._id} className="permission-table-row">
                          <Individualpermission
                            deleteFun={deleteFun}
                            editFun={editFun}
                            permissionname={val.permissionname}
                            id={val._id}
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
      ) : (
        <Editpermission
          id={editData._id}
          closeEdit={closeEdit}
          permissionname={editData.permissionname}
        />
      )}
    </>
  );
};
export default Allpermissions;
