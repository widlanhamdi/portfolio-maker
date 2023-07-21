import React from "react";

export default function Post({ data }) {
  const { name, nim, program_studi, tahun_lulusan } = data;
  return (
    <div>
      {/* body */}
      <div className="px-4">
        <div className="d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold">{name}</p>
            <p className="m-0 text-black-50">{nim}</p>
            <p className="m-0">
              {program_studi} | Tahun Lulus {tahun_lulusan}
            </p>
          </div>
          <div>
            <p className="text-black-50">(Registered)</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
