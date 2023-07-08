import React, { useState } from "react";
import AuthAdmin from "../../../utils/AuthAdmin";
import Ilustration from "../../../assets/ilustration-admin.png";
import Logo from "../../../assets/logo.png";
import useSignIn from "../../../hooks/authentication/useSignIn";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSignIn(email, password, "admin", "/admin", AuthAdmin.storeAdminInfoToCookie);
  const { isLoading } = signIn;

  const handleSignIn = async (e) => {
    e.preventDefault();
    signIn.mutate(true);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "80px" }}>
        <Col lg={5} className="ps-5">
          <h3 style={{ color: "#094b72" }}>Login For Admin</h3>
        </Col>
        <Col lg={5}></Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "30px" }}>
        <Col lg={5} className="ps-5">
          <img
            src={Ilustration}
            alt=""
            className="rounded d-md-none d-sm-none d-none d-lg-block"
            style={{ width: "350px" }}
          />
        </Col>
        <Col lg={5} className="text-start">
          <Form onSubmit={handleSignIn}>
            <div className="mb-4">
              <img src={Logo} alt="logo" />
            </div>
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
