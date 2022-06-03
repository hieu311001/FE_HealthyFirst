import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './home.css';
import 'bootstrap';

function LoginNavbar() {
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="home_nav">
                      <Nav className="me-auto">
                          <Link className="link" to='/coso'>Quản lý cơ sở</Link>
                          <div className="dropdown-divider"></div>
                          <Link className="link" to='/kehoach'>Thanh, kiểm tra</Link>
                      </Nav>
                      <NavDropdown title={"Hello, " + localStorage.getItem("username")} id="basic-nav-dropdown">
                        <NavDropdown.Item><Link className="link dropdown-item" to='/accountInfo'>Tài khoản</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link className="link dropdown-item" to='/' onClick={handleLogout}>Logout</Link></NavDropdown.Item>
                      </NavDropdown>
                    {/* <Nav className="accountDropdown dropdown" title="Hello">
                        <a class="dropdown-toggle" type="button" data-bs-toggle="dropdown" href>Hello, {localStorage.username}</a>
                        <ul class="dropdown-menu">
                            <li><Link className="link dropdown-item" to='/accountInfo'>Tài khoản</Link></li>
                            <div className="dropdown-divider"></div>
                            <li><Link className="link dropdown-item" to='/' onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default LoginNavbar;
