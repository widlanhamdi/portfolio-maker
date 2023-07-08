import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ViewPortofolio from "./ViewPortofolio";
import { auth, db, storage } from "../../../config/firebase";
import { Button, Modal } from "react-bootstrap";
import { BsCheck2All } from "react-icons/bs";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
  // Utils
  const user = auth.currentUser;
  const isFile = (input) => "File" in window && input instanceof File;
  const [isLoading, setIsLoading] = useState(false);

  // Container File
  const [filePhoto, setFilePhoto] = useState(null);
  const [fileAchievments, setFileAchievments] = useState([]);
  const [fileProjects, setFileProjects] = useState([]);

  // Container File URL Storage Cloud
  const [achievmentURL, setAchievmentURL] = useState([]);
  const [projectURL, setProjectURL] = useState([]);

  // Filter is File or URL
  useEffect(() => {
    if (isFile(photo)) {
      setFilePhoto(photo);
    }

    // Separate Achievments File and URL
    const isFileAchievment = achievments?.filter((item) => {
      return isFile(item.file);
    });

    setFileAchievments(isFileAchievment);

    const isURLAchievment = achievments?.filter((item) => {
      return item?.file?.url;
    });

    setAchievmentURL(isURLAchievment);

    // Separate Projects File and URL
    const isFileProject = projects?.filter((item) => {
      return isFile(item.file);
    });

    setFileProjects(isFileProject);

    const isURLProject = projects?.filter((item) => {
      return item?.file?.url;
    });

    setProjectURL(isURLProject);
  }, [achievments, photo, projects]);

  const handlePhoto = async () => {
    if (!filePhoto) return;
    const path = `photos/${photo?.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, filePhoto);

    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  };

  const handleAchievments = async () => {
    if (!fileAchievments) return;

    var dataAchievments = [];

    for (const data of fileAchievments) {
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
    if (!fileProjects) return;

    var dataProjects = [];

    for (const data of fileProjects) {
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

  const createPost = async (photoURL, achievmentURL, projectURL) => {
    try {
      await updateDoc(doc(db, "portfolios", user.uid), {
        user_uid: user.uid,
        bg,
        photo: photoURL ? photoURL : photo,
        name,
        skill,
        about_me: aboutMe,
        email,
        phone,
        socmed: socMed,
        achievments: achievmentURL,
        work,
        education,
        organization,
        projects: projectURL,
        created_at: Timestamp.now(),
      });
      Swal.fire("Good job!", "Updated Portfolio is Successfully!", "success");
      setFilePhoto(null);
      setFileAchievments([]);
      setFileProjects([]);

      setAchievmentURL([]);
      setProjectURL([]);

      setIsLoading(false);
    } catch (err) {
      Swal.fire("Something Error!", "Something Error!", "error");
      setIsLoading(false);
      console.error(err);
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const photoURL = await handlePhoto();
    const newAchievmentURL = await handleAchievments();
    const newProjectURL = await handleProjects();

    createPost(photoURL, [...achievmentURL, ...newAchievmentURL], [...projectURL, ...newProjectURL]);
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
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <BsCheck2All className="me-2" />
                Save
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
