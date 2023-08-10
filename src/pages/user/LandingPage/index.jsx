import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import TopBar from "../layouts/TopBar";
import FindPortfolio from "../FindPortfolio";
import { Container } from "react-bootstrap";

export default function LandingPage() {
  return (
    <div>
      <TopBar />
      <Hero />
      <Container className="px-5">
        <h2>Find the e-portfolio you need</h2>
      </Container>
      <FindPortfolio />
      <Footer />
    </div>
  );
}
