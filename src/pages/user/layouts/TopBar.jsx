import React from "react";
import AuthUser from "../../../utils/AuthUser";
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
      AuthUser.signOut(navigate);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          {AuthUser.isAuthorization() ? (
            <Button variant="outline-primary" onClick={logout}>
              <BiLogOut /> Logout
            </Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-primary px-5">
                Login
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
