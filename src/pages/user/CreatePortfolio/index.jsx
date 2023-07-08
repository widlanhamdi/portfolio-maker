import React from "react";
import Banner from "../../../components/Banner";
import FormProfile from "./FormProfile";

export default function CreatePortfolio() {
  return (
    <div>
      <Banner content="Create Your Profile" />
      <FormProfile />
    </div>
  );
}
