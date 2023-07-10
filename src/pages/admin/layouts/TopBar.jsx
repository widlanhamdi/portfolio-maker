import React from "react";
import AuthAdmin from "../../../utils/AuthAdmin";
import Logo from "../../../assets/logo.png";
import { auth } from "../../../config/firebase";
import { BiLogOut } from "react-icons/bi";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function TopBar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      AuthAdmin.signOut(navigate);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar expand="lg">
      <Container className="px-5">
        <Navbar.Brand as={Link} to="/admin">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto gap-3">
            <Nav.Link as={Link} to="/admin">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/register-students">
              Register
            </Nav.Link>
          </Nav>
          <Button variant="danger" onClick={logout}>
            <BiLogOut /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
