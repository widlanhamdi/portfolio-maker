import React from "react";
import Logo from "../../../assets/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="fw-semibold">
            Homepage
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
