import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './home.css';
import 'bootstrap';

function LoginNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.clear();
      fetch("http://localhost:5000/logout", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
            return response.json();
          })
        .then((data) => {
          console.log(data);
        });
  }

  return (
      <>
          <Navbar bg="dark" expand="lg" class="text-light">
              <Container className="navbar">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" variant="light" class="text-light" />
                  <Navbar.Collapse id="basic-navbar-nav" className="home_nav">
                    <Nav className="me-auto">
                        <Link className="link" to='/coso'>Quản lý cơ sở</Link>
                        <Link className="link" to='/kehoach'>Thanh, kiểm tra</Link>
                        <div className="dropdown-divider"></div>
                    </Nav>
                    <Nav>
                        <a className="link" href="#about" onClick={() => {navigate("/home")}}>About</a>
                    </Nav>
                    <Nav>
                        <Link className="link" to='/home'>Home</Link>
                    </Nav>
                    <div className="dropdown-divider"></div>
                    <NavDropdown title={"Hello, " + localStorage.getItem("username")} id="basic-nav-dropdown">
                      <NavDropdown.Item><Link className="link dropdown-item" to='/accountInfo'>Tài khoản</Link></NavDropdown.Item>
                      <NavDropdown.Item><Link className="link dropdown-item" to='/' onClick={handleLogout}>Logout</Link></NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </>
  );
};

export default LoginNavbar;
