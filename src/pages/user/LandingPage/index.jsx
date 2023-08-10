import React from "react";
import FindPortfolio from "./FindPortfolio";
import Footer from "./Footer";
import Hero from "./Hero";
import TopBar from "../layouts/TopBar";

export default function LandingPage() {
  return (
    <div>
      <TopBar />
      <Hero />
      <FindPortfolio />
      <Footer />
    </div>
  );
}
