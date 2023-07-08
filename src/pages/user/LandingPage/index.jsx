import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import StudentPortofolio from "./StudentPortofolio";
import TopBar from "../layouts/TopBar";

export default function LandingPage() {
  return (
    <div>
      <TopBar />
      <Hero />
      <StudentPortofolio />
      <Footer />
    </div>
  );
}
