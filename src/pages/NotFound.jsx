import React from "react";
import Logo from "../assets/logo.png";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="h-100">
      {/* header */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/profile">
            <img src={Logo} alt="logo" />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* body */}
      <div className="text-center my-5 py-5">
        <h4>We can't find the page you are looking for. Sorry for the inconvenience.</h4>
        <Button as={Link} to="/" className="mt-4">
          Go back home
        </Button>
      </div>

      {/* footer */}

      <div className="footer__pin">
        <hr className="mb-4" />
        <Container>
          <Row>
            <Col lg={5}>
              <p className="fw-bold">ABOUT US</p>
              <p>
                Welcome to the Career Development Center. We help you prepare for the career of your dreams. We assist
                you in building an attractive and professional online portfolio.
              </p>
            </Col>
            <Col lg={4}>
              <p className="fw-bold">ADDRESS</p>
              <p>
                Garut Institute of Technology Campus, <br /> Jl. Mayor Syamsu No.1 Garut 44151
              </p>
            </Col>
            <Col lg={3}>
              <p className="fw-bold">FOLLOW US</p>
              <div className="d-flex gap-3">
                <Link
                  to="https://www.facebook.com/official.itg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  <FaFacebookF size="20px" />
                </Link>
                <Link
                  to="https://twitter.com/itg_campus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  <FaTwitter size="20px" />
                </Link>
                <Link
                  to="https://www.instagram.com/itg_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  <FaInstagram size="20px" />
                </Link>
                <Link
                  to="https://www.youtube.com/@InstitutTeknologiGarut"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                >
                  <FaYoutube size="20px" />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <hr />
        <p className="text-center text-black-50">© 2023 Career Development Center ITG</p>
      </div>
    </div>
  );
}
