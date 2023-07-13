import React from "react";
import Ilustration from "../assets/ilustration-dashboard.png";
import useFetchAllData from "../hooks/query/useFetchAllData";

export default function VisualData() {
  const users = useFetchAllData("/users");

  const portfolios = useFetchAllData("/portfolios");

  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-5 my-5">
        <img src={Ilustration} alt="ilustration" className="img-fluid" width="150px" />
        <div className="text-center" style={{ color: "#094b72" }}>
          <p className="display-3">{users?.data?.length}</p> {/* fetching data */}
          <p className="fw-semibold">Total Users</p>
        </div>
        <div className="text-center" style={{ color: "#094b72" }}>
          <p className="display-3">{portfolios?.data?.length}</p> {/* fetching data */}
          <p className="fw-semibold">Already Created E-Portfolio</p>
        </div>
      </div>
      <hr />
    </>
  );
}
