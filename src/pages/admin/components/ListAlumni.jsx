import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as xlsx from "xlsx";
import { auth, db } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import useFetchAllData from "../../../hooks/query/useFetchAllData";
import Pagination from "../../../components/Pagination";
import Post from "./Post";

export default function ListAlumni() {
  const [dataAlumni, setDataAlumni] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const users = useFetchAllData("/users");
  const { data } = users;

  const tagsAlumni = data?.map((item) => item).filter((item) => item.tags === "alumni");

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setDataAlumni(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      for (let i = 0; i < dataAlumni?.length; i++) {
        await createUserWithEmailAndPassword(auth, dataAlumni[i]?.email, dataAlumni[i]?.nim).then((userCredential) => {
          const user = userCredential.user;
          addDoc(collection(db, "users"), {
            uid: user.uid,
            name: dataAlumni[i]?.nama,
            nim: dataAlumni[i]?.nim,
            email: dataAlumni[i]?.email,
            program_studi: dataAlumni[i]?.program_studi,
            tahun_lulusan: dataAlumni[i]?.tahun_lulusan,
            role: "user",
            tags: "alumni",
          });
        });
      }
      setIsLoading(false);
      Swal.fire({
        text: "Success!",
        title: "Register Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      if (err.code === "auth/email-already-in-use") {
        return Swal.fire("Something Error!", "Email already in use", "error");
      }
      Swal.fire("Something Error!", "Please try again later", "error");
    }
  };

  return (
    <Container>
      <Form.Group className="d-flex justify-content-center gap-3 mb-4 mt-5">
        <Form.Control className="w-50" type="file" onChange={readUploadFile} />
        <Button className="px-5" onClick={handleRegister} disabled={isLoading || dataAlumni.length === 0}>
          {isLoading ? "Registering..." : "Register Alumni"}
        </Button>
      </Form.Group>

      {tagsAlumni.length !== 0 ? (
        <div className="mx-auto bg-body border rounded w-75 mb-5">
          <Pagination data={tagsAlumni} RenderComponent={Post} contentPerPage={10} />
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
