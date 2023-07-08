import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function ListMahasiswa() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");

  console.log(inputText);

  // search
  const inputHandler = (e) => setInputText(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    const headers = { Authorization: "Bearer 55240|5WNSp03ZX8zAKSUmoWtXMBmc6WgBLwaPRBoELT1s" };
    fetch(`https://api-aisnet.itg.ac.id/mahasiswa2?program_studi=${inputText}`, { headers })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  console.log(data);
  return (
    <div>
      <p>List Data Mahasiswa</p>
      <Row className="justify-content-center my-4">
        <Col lg={5}>
          <Form className="mb-3" onSubmit={handleSearch}>
            <p className="text-center" style={{ color: "#094b72" }}>
              Search Skill
            </p>
            <Form.Control type="text" placeholder="Search..." onChange={inputHandler} />
            <Button type="submit">Search</Button>
          </Form>
        </Col>
        <div>
          {data?.data?.data?.map((item) => (
            <>
              <p>{item.nama}</p>
              <p>{item.program_studi}</p>
            </>
          ))}
        </div>
      </Row>
    </div>
  );
}
