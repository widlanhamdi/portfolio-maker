import React from "react";
import Banner from "../../../components/Banner";
import FindPortfolio from "./FindPortfolio";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { Container } from "react-bootstrap";

export default function ListPortfolio() {
  return (
    <>
      <TopBar />
      <hr />
      <Container className="mt-4">
        <Banner content="Find The E-Portfolio You Need" />
        <FindPortfolio />
      </Container>
      <Footer />
    </>
  );
}
