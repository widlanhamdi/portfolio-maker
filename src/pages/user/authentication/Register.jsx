import React, { useState } from "react";
import Ilustration from "../../../assets/ilustration-login.png";

import Logo from "../../../assets/logo.png";
import useSignUp from "../../../hooks/authentication/useSignUp";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useSignUp(email, password, name);
  const { isLoading } = signUp;

  const handleRegister = (e) => {
    e.preventDefault();
    signUp.mutate(true);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "20px" }}>
        <Col lg={5} className="ps-5">
          <h3 style={{ color: "#094b72" }}>Register</h3>
          <p style={{ color: "#094b72" }}>Let’s Create your professional portfolio easily and quickly</p>
        </Col>
        <Col lg={5}></Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "10px" }}>
        <Col lg={5} className="ps-5">
          <img
            src={Ilustration}
            alt=""
            className="rounded d-md-none d-sm-none d-none d-lg-block"
            style={{ width: "350px" }}
          />
        </Col>
        <Col lg={5} className="text-start">
          <Form onSubmit={handleRegister}>
            <div className="mb-4">
              <img src={Logo} alt="" />
              <h4 className="mt-4" style={{ color: "#094b72" }}>
                Register
              </h4>
            </div>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#094B72" }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                className="p-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
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
              <Form.Label style={{ color: "#094B72" }}>Password</Form.Label>
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
              {isLoading ? "Loading..." : "Register"}
            </Button>

            <p>
              Have account?{" "}
              <Link to="/login" className="text-primary text-decoration-underline">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
