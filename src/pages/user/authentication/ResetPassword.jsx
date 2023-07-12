import React, { useState } from "react";
import Ilustration from "../../../assets/ilustration-login.png";
import Logo from "../../../assets/logo.png";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email).then(() => {
      setIsLoading(false);
      Swal.fire({
        text: "Password Reset Email Sent!",
        title: "Check your email!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login");
    });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "70px" }}>
        <Col lg={5} className="ps-5">
          <img
            src={Ilustration}
            alt=""
            className="rounded d-md-none d-sm-none d-none d-lg-block"
            style={{ width: "350px" }}
          />
        </Col>
        <Col lg={5} className="text-start">
          <Form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <Link to="/">
                <img src={Logo} alt="logo cdc" />
              </Link>
              <h4 className="mt-4" style={{ color: "#094b72" }}>
                Reset Your Password
              </h4>
            </div>
            <Form.Group className="mb-5">
              <Form.Label style={{ color: "#094B72" }}>Email</Form.Label>
              <Form.Control
                type="email"
                className="p-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary w-100 p-3 text-white mb-3" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Password Email"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
