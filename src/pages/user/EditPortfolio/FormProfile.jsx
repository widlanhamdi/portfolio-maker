import React, { useEffect, useRef, useState } from "react";
import ModalBg from "../../../components/ModalBg";
import PreviewPortofolio from "./PreviewPortofolio";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillFileEarmarkFill, BsFillXCircleFill } from "react-icons/bs";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { bytesConverter } from "../../../utils/bytesConverter";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FormProfile() {
  const { state } = useLocation();

  // State Form
  const [selectedBg, setSelectedBg] = useState(state.bg);
  const [selectedPhoto, setSelectedPhoto] = useState(state.photo);
  const [previewPhoto, setPreviewPhoto] = useState();
  const [name, setName] = useState(state.name);
  const [skill, setSkill] = useState(state.skill);
  const [aboutMe, setAboutMe] = useState(state.about_me);
  const [email, setEmail] = useState(state.email);
  const [phone, setPhone] = useState(state.phone);
  const [socMed, setSocMed] = useState(state.socmed);

  // handleChange form
  const onSelectedBg = (e) => setSelectedBg(e.target.value);
  const onSelectedPhoto = (e) => setSelectedPhoto(e.target.files[0]);
  const onName = (e) => setName(e.target.value);
  const onSkill = (e) => setSkill(e.target.value);
  const onAboutMe = (e) => setAboutMe(e.target.value);
  const onEmail = (e) => setEmail(e.target.value);
  const onPhone = (e) => setPhone(e.target.value);
  const onSocMed = (e) => setSocMed(e.target.value);

  // Achievment Fields
  const [achievments, setAchievments] = useState(state.achievments);

  const onAchievmentChange = (e, index) => {
    let data = [...achievments];
    if (e.target.name === "file") {
      data[index][e.target.name] = e.target.files[0];
    } else {
      data[index][e.target.name] = e.target.value;
    }

    setAchievments(data);
  };

  const addAchievment = () => {
    let newAchievment = { name: "", year: "", file: null };

    setAchievments([...achievments, newAchievment]);
  };

  const removeAchievment = (i) => {
    let newAchievment = [...achievments];
    newAchievment.splice(i, 1);
    setAchievments(newAchievment);
  };

  // Work Experience Fields
  const [work, setWork] = useState(state.work);

  const onWorkChange = (e, index) => {
    let data = [...work];
    data[index][e.target.name] = e.target.value;

    setWork(data);
  };

  const addWork = () => {
    let newWork = { name: "", year: "", company: "", location: "" };

    setWork([...work, newWork]);
  };

  const removeWork = (i) => {
    let newWork = [...work];
    newWork.splice(i, 1);
    setWork(newWork);
  };

  // Education Fields
  const [education, setEducation] = useState(state.education);

  const onEducationChange = (e, index) => {
    let data = [...education];
    data[index][e.target.name] = e.target.value;

    setEducation(data);
  };

  const addEducation = () => {
    let newEducation = { name: "", study: "", year: "" };

    setEducation([...education, newEducation]);
  };

  const removeEducation = (i) => {
    let newEducation = [...education];
    newEducation.splice(i, 1);
    setEducation(newEducation);
  };

  // Organization Fields
  const [organization, setOrganization] = useState(state.organization);

  const onOrganizationChange = (e, index) => {
    let data = [...organization];
    data[index][e.target.name] = e.target.value;

    setOrganization(data);
  };

  const addOrganization = () => {
    let newOrganization = { name: "", year: "", role: "" };

    setOrganization([...organization, newOrganization]);
  };

  const removeOrganization = (i) => {
    let newOrganization = [...organization];
    newOrganization.splice(i, 1);
    setOrganization(newOrganization);
  };

  // Projects Fields
  const [projects, setProjects] = useState(state.projects);

  const onProjectChange = (e, index) => {
    let data = [...projects];
    if (e.target.name === "file") {
      data[index][e.target.name] = e.target.files[0];
    } else {
      data[index][e.target.name] = e.target.value;
    }

    setProjects(data);
  };

  const addProject = () => {
    let newProject = { file: null, name: "", year: "" };

    setProjects([...projects, newProject]);
  };

  const removeProject = (i) => {
    let newProject = [...projects];
    newProject.splice(i, 1);
    setProjects(newProject);
  };

  // Custome Input File Photo Profile
  const fileInput = useRef();

  const handleClick = () => {
    fileInput.current.click();
  };

  // Custome Input File Photo Profile
  const fileInputAchievment = useRef([]);

  const handleClickAchievment = (i) => {
    fileInputAchievment.current[i].click();
  };

  // Custome Input File Photo Profile
  const fileInputProject = useRef([]);

  const handleClickProject = (i) => {
    fileInputProject.current[i].click();
  };

  // Validate is File or not
  const isFile = (input) => "File" in window && input instanceof File;

  // File Reader
  useEffect(() => {
    const photoURL = isFile(selectedPhoto) && URL.createObjectURL(selectedPhoto);
    setPreviewPhoto(photoURL);
  }, [selectedPhoto]);

  // Modal
  const [show, setShow] = useState(false);
  const [showBg, setShowBg] = useState(false);

  // isEmpty
  const isEmpty = (value) => value.every((item) => Object.values(item).every((x) => x === null || x === ""));

  // Disabled Button
  const btnDisabled =
    !selectedBg || !selectedPhoto || !name || !skill || !aboutMe || !email || !phone || !socMed || isEmpty(education);

  return (
    <div>
      <Container className="mb-5">
        <Form className="px-5">
          <div className="d-block mb-4 text-center">
            <img src={selectedBg} alt="" width="100%" className="d-block mb-3 mx-auto" />
            <Button variant="outline-primary px-5" onClick={() => setShowBg(true)}>
              Choose Background
            </Button>
          </div>

          <Form.Label>Photo Profile</Form.Label>
          <div className="d-flex mb-4" onClick={handleClick}>
            <div className="rounded-circle shadow" style={{ cursor: "pointer", width: "150px", height: "150px" }}>
              <img
                src={previewPhoto ? previewPhoto : selectedPhoto}
                alt="Preview"
                className="rounded-circle p-1"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onLoad={() => URL.revokeObjectURL(previewPhoto)}
              />
            </div>
            <Form.Group>
              <Form.Control type="file" className="d-none" ref={fileInput} onChange={onSelectedPhoto} />
            </Form.Group>
          </div>

          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>
                <span className="text-danger">*</span>Name
              </Form.Label>
              <Form.Control type="text" placeholder="Your Name" value={name} onChange={onName} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <span className="text-danger">*</span>Skills
              </Form.Label>
              <Form.Control type="text" placeholder="Your Skills" value={skill} onChange={onSkill} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>
              <span className="text-danger">*</span>About Me
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Tell About You..."
              style={{ height: "150px" }}
              value={aboutMe}
              onChange={onAboutMe}
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>
                <span className="text-danger">*</span>Email
              </Form.Label>
              <Form.Control type="text" placeholder="Your Mail" value={email} onChange={onEmail} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <span className="text-danger">*</span>Phone Number
              </Form.Label>
              <Form.Control type="text" placeholder="Your Number" value={phone} onChange={onPhone} />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} lg={6}>
              <Form.Label>
                <span className="text-danger">*</span>Social Media
              </Form.Label>
              <Form.Control type="text" placeholder="Your Instagram" value={socMed} onChange={onSocMed} />
            </Form.Group>
          </Row>

          <Form.Label>Work Experience</Form.Label>
          {work?.map((item, index) => (
            <div key={index}>
              {index ? <hr className="mb-4" /> : null}
              <Row className="mb-4 gy-4">
                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Job Title"
                    value={item.name}
                    onChange={(e) => onWorkChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3}>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year You Started and Left"
                    value={item.year}
                    onChange={(e) => onWorkChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={item.company}
                    onChange={(e) => onWorkChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3}>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Location Your Company"
                    value={item.location}
                    onChange={(e) => onWorkChange(e, index)}
                  />
                </Form.Group>

                {index ? (
                  <Form.Group as={Col} lg={3}>
                    <Button onClick={() => removeWork(index)}>Remove</Button>
                  </Form.Group>
                ) : null}
              </Row>
            </div>
          ))}

          <Button variant="outline-primary mb-4 d-block" onClick={addWork}>
            Add More +
          </Button>

          <Form.Label>
            <span className="text-danger">*</span>Education
          </Form.Label>
          {education?.map((item, index) => (
            <div key={index}>
              {index ? <hr className="mb-4" /> : null}
              <Row className="mb-4 gy-4">
                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Institution Name"
                    value={item.name}
                    onChange={(e) => onEducationChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3}>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year of Graduation"
                    value={item.year}
                    onChange={(e) => onEducationChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="study"
                    placeholder="Field of Study"
                    value={item.study}
                    onChange={(e) => onEducationChange(e, index)}
                  />
                </Form.Group>

                {index ? (
                  <Form.Group as={Col} lg={3}>
                    <Button onClick={() => removeEducation(index)}>Remove</Button>
                  </Form.Group>
                ) : null}
              </Row>
            </div>
          ))}

          <Button variant="outline-primary mb-4 d-block" onClick={addEducation}>
            Add More +
          </Button>

          <Form.Label>Organization</Form.Label>
          {organization?.map((item, index) => (
            <div key={index}>
              {index ? <hr className="mb-4" /> : null}
              <Row className="mb-4 gy-4">
                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Organization Name"
                    value={item.name}
                    onChange={(e) => onOrganizationChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={3}>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={item.year}
                    onChange={(e) => onOrganizationChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Role and Responsibilies"
                    value={item.role}
                    onChange={(e) => onOrganizationChange(e, index)}
                  />
                </Form.Group>

                {index ? (
                  <Form.Group as={Col} lg={3}>
                    <Button onClick={() => removeOrganization(index)}>Remove</Button>
                  </Form.Group>
                ) : null}
              </Row>
            </div>
          ))}

          <Button variant="outline-primary mb-4 d-block" onClick={addOrganization}>
            Add More +
          </Button>

          <Form.Label>Achievments</Form.Label>
          {achievments?.map((item, index) => (
            <div key={index}>
              {index ? <hr className="mb-4" /> : null}
              <div>
                {!item.file && (
                  <div
                    className="border rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickAchievment(index)}
                  >
                    <div className="text-center text-black-50" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                      <AiOutlineCloudUpload size="90px" />
                      <p>Upload Your Document</p>
                    </div>
                  </div>
                )}

                {item.file && (
                  <div className="border rounded d-flex">
                    <div className="d-flex p-2">
                      <BsFillFileEarmarkFill className="my-auto me-2" size="30" />
                      <div>
                        <p className="m-0">{item.file.name}</p>
                        <p className="m-0 text-black-50">{bytesConverter(item.file.size)}</p>
                      </div>
                    </div>

                    <div className="p-2 my-auto ms-auto">
                      <BsFillXCircleFill
                        className="icon-delete"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setAchievments(achievments.map((item, i) => (i === index ? { ...item, file: null } : item)))
                        }
                      />
                    </div>
                  </div>
                )}

                <Form.Group className="mb-4">
                  <Form.Control
                    type="file"
                    name="file"
                    className="d-none"
                    ref={(el) => (fileInputAchievment.current[index] = el)}
                    onChange={(e) => onAchievmentChange(e, index)}
                  />
                </Form.Group>
              </div>

              <Row className="mb-4">
                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Achievments"
                    value={item.name}
                    onChange={(e) => onAchievmentChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={2}>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={item.year}
                    onChange={(e) => onAchievmentChange(e, index)}
                  />
                </Form.Group>

                {index ? (
                  <Form.Group as={Col} lg={4}>
                    <Button onClick={() => removeAchievment(index)}>Remove</Button>
                  </Form.Group>
                ) : null}
              </Row>
            </div>
          ))}

          <Button variant="outline-primary mb-4 d-block" onClick={addAchievment}>
            Add More +
          </Button>

          <Form.Label>Upload Your Supporting Works or Portfolio</Form.Label>
          {projects?.map((item, index) => (
            <div key={index}>
              {index ? <hr className="mb-4" /> : null}
              <div>
                {!item.file && (
                  <div
                    className="border rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickProject(index)}
                  >
                    <div className="text-center text-black-50" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                      <AiOutlineCloudUpload size="90px" />
                      <p>Upload Your Document</p>
                    </div>
                  </div>
                )}

                {item.file && (
                  <div className="border rounded d-flex">
                    <div className="d-flex p-2">
                      <BsFillFileEarmarkFill className="my-auto me-2" size="30" />
                      <div>
                        <p className="m-0">{item.file.name}</p>
                        <p className="m-0 text-black-50">{bytesConverter(item.file.size)}</p>
                      </div>
                    </div>

                    <div className="p-2 my-auto ms-auto">
                      <Button
                        onClick={() =>
                          setProjects(projects.map((item, i) => (i === index ? { ...item, file: null } : item)))
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <Form.Group className="mb-4">
                  <Form.Control
                    type="file"
                    name="file"
                    className="d-none"
                    ref={(el) => (fileInputProject.current[index] = el)}
                    onChange={(e) => onProjectChange(e, index)}
                  />
                </Form.Group>
              </div>

              <Row className="mb-4">
                <Form.Group as={Col} lg={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name Document"
                    value={item.name}
                    onChange={(e) => onProjectChange(e, index)}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={2}>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={item.year}
                    onChange={(e) => onProjectChange(e, index)}
                  />
                </Form.Group>

                {index ? (
                  <Form.Group as={Col} lg={4}>
                    <Button onClick={() => removeProject(index)}>Remove</Button>
                  </Form.Group>
                ) : null}
              </Row>
            </div>
          ))}

          <Button variant="outline-primary mb-4 d-block" onClick={addProject}>
            Add More +
          </Button>
        </Form>

        <div className="text-center px-5">
          <Button className="w-100 mb-4" onClick={() => setShow(true)} disabled={btnDisabled}>
            Preview Portofolio
          </Button>
          <Button variant="outline-primary" className="w-100" as={Link} to={"/profile"}>
            Back to Profile
          </Button>
        </div>
      </Container>
      <PreviewPortofolio
        show={show}
        setShow={setShow}
        bg={selectedBg}
        photo={selectedPhoto}
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
      <ModalBg show={showBg} setShow={setShowBg} selectedBg={selectedBg} onSelectedBg={onSelectedBg} />

      <hr />
      <p className="text-center text-black-50">© 2023 Career Development Center ITG</p>
    </div>
  );
}
