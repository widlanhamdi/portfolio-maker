import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AuthAisnet from "../../../utils/AuthAisnet";

export default function ListMahasiswa() {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [dataProdi, setDataProdi] = useState([]);
  const [prodi, setProdi] = useState("");
  const [tahun, setTahun] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${AuthAisnet.getAccessToken()}` };
    fetch("https://api-aisnet.itg.ac.id/prodi", { headers })
      .then((res) => res.json())
      .then((data) => setDataProdi(data?.data));

    fetch(`https://api-aisnet.itg.ac.id/mahasiswa2?program_studi=${prodi}&tahun=${tahun}&page=${page}`, { headers })
      .then((res) => res.json())
      .then((data) => setDataMahasiswa(data));
  }, [page, prodi, tahun]);

  const onProdi = (e) => setProdi(e.target.value);
  const onTahun = (e) => setTahun(e.target.value);

  return (
    <Container>
      {/* search */}
      <Row className="justify-content-center my-4">
        <Col lg={4}>
          <Form.Select onChange={onProdi} value={prodi}>
            <option>Open this select program studi</option>
            {dataProdi?.map((item, idx) => (
              <option key={idx} value={item.nmps}>
                {item.nmps}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Select onChange={onTahun} value={tahun}>
            <option>Open this select year</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
            <option value={21}>21</option>
            <option value={22}>22</option>
          </Form.Select>
        </Col>
      </Row>

      {/* table */}
      {dataMahasiswa?.data?.total ? (
        <>
          <div className="mx-auto bg-body border rounded w-75 mb-5">
            {/* head */}
            <div className="d-flex justify-content-between px-4 pt-4">
              <h4>
                List Students | <small style={{ fontSize: 15 }}>total {dataMahasiswa?.data?.total}</small>
              </h4>
              <Button>Register Students Page {page}</Button>
            </div>
            <hr style={{ height: "5px", border: "none", background: "#000000" }} />

            {/* body */}
            <div className="px-4">
              {dataMahasiswa?.data?.data?.map((item, idx) => (
                <div className="d-block" key={idx}>
                  <p className="m-0 fw-bold">{item.nama}</p>
                  <p className="m-0 text-black-50">{item.nim}</p>
                  <p className="m-0">{item.program_studi}</p>
                  <hr />
                </div>
              ))}
            </div>
            <hr style={{ height: "5px", border: "none", background: "#000000" }} />

            {/* footer */}
            <div className="d-flex justify-content-between px-4 pb-4">
              <div className="mb-0 py-1 text-black-50">
                {dataMahasiswa?.data?.from} - {dataMahasiswa?.data?.to} of {dataMahasiswa?.data?.total} students
              </div>
              <div className="mb-0 py-1 text-black-50">
                {dataMahasiswa?.data?.current_page} of {dataMahasiswa?.data?.last_page} pages
              </div>
              <div className="d-flex gap-3">
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev
                </Button>
                <Button onClick={() => setPage(page + 1)} disabled={page === dataMahasiswa?.data?.last_page}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Data Kosong</p>
      )}
    </Container>
  );
}
