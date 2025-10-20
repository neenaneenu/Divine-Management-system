import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DrivingSchoolForm = () => {
  const [formData, setFormData] = useState({
    applicationNumber: "",
    SlNo: "",
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
    testDate: "",
    learnersDate: "",
  });

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [documents, setDocuments] = useState([]);


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

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append photo and signature
    if (photo) data.append("photo", photo);
    if (signature) data.append("signature", signature);

    // Append multiple documents
    if (documents) {
      Array.from(documents).forEach((file) => {
        data.append("documents", file); // field name should match backend
      });
    }

    const res = await axios.post(
      "http://localhost:3000/application/post",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

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
        {/* Top Buttons */}
        <div className="d-flex justify-content-between mb-4">
          <Button variant="outline-secondary" onClick={() => navigate("/Home")}>
            ⬅ Back
          </Button>
          <Button variant="success" onClick={() => navigate("/applications")}>
            📑 View Applications
          </Button>
        </div>

        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 text-primary fw-bold">
              Driving School Registration
            </h2>
            <Form onSubmit={handleSubmit}>
              {/* Section 1: Basic Info */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>SL No</Form.Label>
                    <Form.Control
                      type="text"
                      name="SlNo"
                      value={formData.SlNo}
                      onChange={handleChange}
                      placeholder="Enter serial number"
                    />
                  </Form.Group>
                </Col>
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
              </Row>
              <Form.Group className="mb-3">
  <Form.Label>Upload Documents</Form.Label>
  <Form.Control
    type="file"
    name="documents"
    multiple
    onChange={(e) => setDocuments(e.target.files)}
  />
</Form.Group>


              <Row>
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Section 2: Personal Info */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Guardian</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter Father's / Spouse's Name"
                />
              </Form.Group>

              {/* Section 3: Contact */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number 1</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobile1"
                      value={formData.mobile1}
                      onChange={handleChange}
                      placeholder="Enter primary number"
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
                      placeholder="Enter alternate number"
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
                    <Form.Label>PIN Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                      placeholder="Enter PIN"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Blood Group --</option>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Section 4: License Info */}
              <Form.Group className="mb-3">
                <Form.Label>Class of Vehicle</Form.Label>
                <Form.Select
                  name="vehicleClass"
                  value={formData.vehicleClass}
                  onChange={handleChange}
                >
                  <option value="">-- Select Vehicle Class --</option>
                  <option value="LMV">LMV</option>
                  <option value="MCWG">MCWG</option>
                  <option value="LMV & MCWG">LMV & MCWG</option>
                  <option value="CONDUCTOR LICENSE">Conductor License</option>
                  <option value="HEAVY LICENSE">Heavy License</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Learners Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="learnersDate"
                      value={formData.learnersDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Test Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="testDate"
                      value={formData.testDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Section 5: Uploads */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control type="file" name="photo" onChange={handleFileChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Signature</Form.Label>
                    <Form.Control
                      type="file"
                      name="signature"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Section 6: Billing */}
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

              {/* Submit Button */}
              <div className="text-center mt-4">
                <Button variant="primary" type="submit" className="fw-bold px-5 py-2 rounded-pill">
                 Submit Application
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default DrivingSchoolForm;
