import React, { useState } from "react";
import Swal from "sweetalert2";
import ViewPortofolio from "./ViewPortofolio";
import { auth, db, storage } from "../../../config/firebase";
import { Button, Modal } from "react-bootstrap";
import { BsCheck2All } from "react-icons/bs";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function PreviewPortofolio({
  show,
  setShow,
  bg,
  photo,
  name,
  skill,
  aboutMe,
  email,
  phone,
  socMed,
  achievments,
  work,
  education,
  organization,
  projects,
}) {
  // Current User
  const user = auth.currentUser;

  // isEmpty
  const isEmpty = (value) => value.every((item) => Object.values(item).every((x) => x === null || x === ""));

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoto = async () => {
    if (!photo) return;
    const path = `photos/${photo?.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  };

  const handleAchievments = async () => {
    if (isEmpty(achievments)) return;

    var dataAchievments = [];

    for (const data of achievments) {
      const path = `achievements/${data?.file?.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, data?.file);

      await uploadTask;

      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      dataAchievments.push({
        file: { url: downloadURL, name: data.file.name, size: data.file.size },
        name: data.name,
        year: data.year,
      });
    }

    return dataAchievments;
  };

  const handleProjects = async () => {
    if (isEmpty(projects)) return;

    var dataProjects = [];

    for (const data of projects) {
      const path = `projects/${data?.file?.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, data?.file);

      await uploadTask;

      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      dataProjects.push({
        file: { url: downloadURL, name: data.file.name, size: data.file.size },
        name: data.name,
        year: data.year,
      });
    }

    return dataProjects;
  };

  // Create Post
  const createPost = async (photoURL, achievmentURL, projectURL) => {
    try {
      await setDoc(doc(db, "portfolios", user.uid), {
        user_uid: user.uid,
        bg,
        photo: photoURL,
        name,
        skill,
        about_me: aboutMe,
        email,
        phone,
        socmed: socMed,
        achievments: achievmentURL ? achievmentURL : achievments,
        work,
        education,
        organization,
        projects: projectURL ? projectURL : projects,
        created_at: Timestamp.now(),
      });
      navigate("/profile");
      Swal.fire("Success!", "Created Portfolio is Successfully!", "success");
      setIsLoading(false);
    } catch (err) {
      Swal.fire("Something Error!", "Something Error!", "error");
      console.error(err);
      setIsLoading(false);
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const photoURL = await handlePhoto();
    const achievmentURL = await handleAchievments();
    const projectURL = await handleProjects();
    createPost(photoURL, achievmentURL, projectURL);
  };

  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Preview Portofolio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ViewPortofolio
          bg={bg}
          photo={photo}
          name={name}
          skill={skill}
          aboutMe={aboutMe}
          email={email}
          phone={phone}
          socMed={socMed}
          achievments={achievments}
          work={work}
          education={education}
          organization={organization}
          projects={projects}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex mx-auto">
          <Button variant="primary px-5 py-2" onClick={handleSubmit} disabled={isLoading}>
            <BsCheck2All className="me-2" />
            {isLoading ? `Loading...` : "Save"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
