import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './home.css';

function Header() {
  return (
      <>
        <Navbar bg="dark" expand="lg" class="text-light">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="home_nav">
              <Nav className="me-auto">
                <Link className="link" to='/'>Home</Link>
              </Nav>
              <Nav>
                <Link className="link" to='/login'>Login</Link>
                <Link className="link" to='/register'>Register</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  );
};

export default Header;
