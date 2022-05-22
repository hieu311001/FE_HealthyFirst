import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './home.css';

function HomeAccount() {
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
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="home_nav">
                <Nav className="me-auto">
                    <Link className="link" to='/home'>Home</Link>
                </Nav>
                <Nav>
                    <Link className="link" to='/' onClick={handleLogout}>Logout</Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
};

export default HomeAccount;
