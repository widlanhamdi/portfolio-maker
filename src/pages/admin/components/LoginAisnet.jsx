import React, { useState } from "react";
import AuthAisnet from "../../../utils/AuthAisnet";
import Swal from "sweetalert2";
import { Button, Container, Form } from "react-bootstrap";

export default function LoginAisnet() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch("https://api-aisnet.itg.ac.id/login2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        AuthAisnet.storeUserInfoToCookie(body?.content);
        Swal.fire({
          text: "Success!",
          title: "Login Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Something Error!", "Please check again Email and Password", "error");
      });
  };

  return (
    <Container>
      <div className="mx-auto border bg-body rounded w-50 mt-3">
        <Form className="p-5" onSubmit={handleSignIn}>
          <h3 style={{ color: "#094b72" }}>Login For Access Data Students</h3>
          <Form.Group className="mt-5 mb-3">
            <Form.Label style={{ color: "#094B72" }}>Email</Form.Label>
            <Form.Control
              type="username"
              className="p-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <Button variant="primary w-100 p-3 text-white mb-3" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
