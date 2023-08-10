import React from "react";
import AuthCDC from "../../../utils/AuthCDC";
import Logo from "../../../assets/logo.png";
import { auth } from "../../../config/firebase";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function TopBar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      AuthCDC.signOut(navigate);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar expand="lg">
      <Container className="px-5">
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto gap-3">
            <Button variant="danger" onClick={logout}>
              <BiLogOut /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
