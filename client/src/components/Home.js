import React from "react";
import "../css/Home.css";
import Footer from "./footer/Footer.js";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-content">
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
                  <b>
                    <span className="asset-head"> ASSET </span>{" "}
                    <span className="asset-head-b">MANAGEMENT </span>{" "}
                  </b>
                </span>
              </Stack>
            </Stack>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
