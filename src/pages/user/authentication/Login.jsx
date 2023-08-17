import React, { useState } from "react";
import AuthUser from "../../../utils/AuthUser";
import Ilustration from "../../../assets/ilustration-login.png";
import Logo from "../../../assets/logo.png";
import useSignIn from "../../../hooks/authentication/useSignIn";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthAdmin from "../../../utils/AuthAdmin";
import AuthCDC from "../../../utils/AuthCDC";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const accessModifier = () => {
    if (email === "admin@itg.ac.id") return "/admin";
    if (email === "ketua.cdc@itg.ac.id") return "/cdc";
    return "/profile";
  };

  const auth = () => {
    if (email === "admin@itg.ac.id") return AuthAdmin.storeAdminInfoToCookie;
    if (email === "ketua.cdc@itg.ac.id") return AuthCDC.storeCDCInfoToCookie;
    return AuthUser.storeUserInfoToCookie;
  };

  const signIn = useSignIn(email, password, "users", accessModifier(), auth());
  const { isLoading } = signIn;

  const handleSignIn = async (e) => {
    e.preventDefault();
    signIn.mutate(true);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "30px" }}>
        <Col lg={5} className="ps-5">
          <h3 style={{ color: "#094b72" }}>Login</h3>
          <p style={{ color: "#094b72" }}>Let’s Create your professional portfolio easily and quickly</p>
        </Col>
        <Col lg={5}></Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "10px" }}>
        <Col lg={5} className="ps-5">
          <img
            src={Ilustration}
            alt="ilustration"
            className="rounded d-md-none d-sm-none d-none d-lg-block"
            style={{ width: "350px" }}
          />
        </Col>
        <Col lg={5} className="text-start">
          <Form onSubmit={handleSignIn}>
            <Link to="/">
              <img src={Logo} alt="logo cdc" />
            </Link>
            <Form.Group className="mb-3 mt-4">
              <Form.Label style={{ color: "#094B72" }}>Email</Form.Label>
              <Form.Control
                type="email"
                className="p-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="d-flex justify-content-between">
                <Form.Label style={{ color: "#094B72" }}>Password</Form.Label>
                <Form.Label style={{ color: "#094B72", fontSize: "14px" }} as={Link} to="/reset-password">
                  Forgot Password?
                </Form.Label>
              </div>
              <Form.Control
                type="password"
                className="p-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
            </Form.Group>

            <Button variant="primary w-100 p-3 text-white mb-3" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>

            <p className="text-black-50">
              Back to{" "}
              <Link to="/" className="text-black">
                Homepage
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
