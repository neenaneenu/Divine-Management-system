import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const DrivingSchoolForm = () => {
  const [formData, setFormData] = useState({
    applicationNumber: "",
    name: "",
    fatherName: "",
    dob: "",
    mobile1: "",
    mobile2: "",
    address: "",
    pin: "",
    vehicleClass: "",
    bloodGroup: "",
    billNumber: "",
    amount: "",
    date: "",
  });

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const navigate = useNavigate();

  // handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file inputs
  const handleFileChange = (e) => {
    if (e.target.name === "photo") {
      setPhoto(e.target.files[0]);
    } else if (e.target.name === "signature") {
      setSignature(e.target.files[0]);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (photo) data.append("photo", photo);
      if (signature) data.append("signature", signature);

      const res = await axios.post("http://localhost:3000/application/post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application Submitted Successfully ✅");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error submitting application ❌");
    }
  };

  return (
    <div style={{ backgroundColor: "#002044", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
         {/* ✅ Application List Button */}
          <div className="text-end mb-3">
            <Button variant="success" onClick={() => navigate("/applications")}>
              View Application List
            </Button>
          </div>
        <div className="p-4 rounded shadow bg-white">
          <h2 className="text-center mb-4 text-dark">Driving School Application Form</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Application Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleChange}
                    placeholder="Enter Application Number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Father / W/O / D/O</Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter Father's / Spouse's Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number 1</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleChange}
                    placeholder="Enter first mobile number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number 2</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile2"
                    value={formData.mobile2}
                    onChange={handleChange}
                    placeholder="Enter second mobile number"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class of Vehicle</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleClass"
                    value={formData.vehicleClass}
                    onChange={handleChange}
                    placeholder="Eg: LMV, MCWG"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter Blood Group (Eg: O+)"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control type="file" name="photo" onChange={handleFileChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Signature</Form.Label>
                  <Form.Control type="file" name="signature" onChange={handleFileChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bill Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="billNumber"
                    value={formData.billNumber}
                    onChange={handleChange}
                    placeholder="Enter Bill Number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button variant="primary" type="submit" className="fw-bold px-4">
                Submit Application
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default DrivingSchoolForm;
