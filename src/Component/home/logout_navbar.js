import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './home.css';

function LogoutNavbar() {
  return (
      <>
        <Navbar className="color-nav" expand="lg" class="text-light">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="home_nav">
              <div className="me-auto"></div>
              <Nav>
                <a className="link" href="#about">About</a>
              </Nav>
              <Nav>
                <Link className="link" to='/'>Home</Link>
              </Nav>
              <div className="dropdown-divider"></div>
              <Nav>
                <Link className="link" to='/login'>Login</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  );
};

export default LogoutNavbar;
