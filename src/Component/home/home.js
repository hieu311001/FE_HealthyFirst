import React from "react";
import './home.css';
import LogoutNavbar from "./logout_navbar";
import LoginNavbar from "./login_navbar";
import HomeBody from "./home_body";

function Home() {
  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <LoginNavbar />
        <HomeBody />
      </>
    )
  }

  return (
    <>
        <LogoutNavbar />
        <HomeBody />
    </>
  );
};

export default Home;
