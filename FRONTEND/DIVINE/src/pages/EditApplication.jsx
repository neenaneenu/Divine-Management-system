import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicationNumber: "",
    name: "",
    fatherName: "",
    dob: "",
    mobile1: "",
    vehicleClass: "",
    bloodGroup: "",
    billNumber: "",
    amount: "",
    testDate: "",
    leanersDate: "",
    SlNo: "",
  });

  const [documents, setDocuments] = useState([]); // ✅ Added state for new file uploads
  const [existingDocs, setExistingDocs] = useState([]); // ✅ Show previously uploaded docs

  // ✅ Fetch the existing application data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/application/${id}`);
        setFormData(res.data);
        if (res.data.documents) setExistingDocs(res.data.documents); // store old docs
      } catch (err) {
        console.error("❌ Error fetching application:", err);
      }
    };
    fetchApplication();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (including file upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // Append all form data fields
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      // Append new documents (if any)
      for (let i = 0; i < documents.length; i++) {
        data.append("documents", documents[i]);
      }

      // ✅ PUT request with multipart/form-data
      await axios.put(`http://localhost:3000/application/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Application updated successfully!");
      navigate("/applications");
    } catch (err) {
      console.error("❌ Error updating application:", err);
      alert("Failed to update application!");
    }
    console.log("Updating ID:", id);

  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg rounded-4 p-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold text-primary">Edit Application</h3>
                <Button variant="secondary" onClick={() => navigate("/applications")}>
                  Back
                </Button>
              </div>

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3">
                  <Form.Label>Application No</Form.Label>
                  <Form.Control
                    type="text"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sl No</Form.Label>
                  <Form.Control
                    type="text"
                    name="SlNo"
                    value={formData.SlNo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob?.slice(0, 10) || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Class</Form.Label>
                  <Form.Select
                    name="vehicleClass"
                    value={formData.vehicleClass}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Vehicle Class --</option>
                    <option value="Two Wheeler">Two Wheeler</option>
                    <option value="Four Wheeler">Four Wheeler</option>
                    <option value="Conductor License">Conductor License</option>
                    <option value="Heavy License">Heavy License</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Blood Group --</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bill Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="billNumber"
                    value={formData.billNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Test Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="testDate"
                    value={formData.testDate ? formData.testDate.slice(0, 10) : ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* ✅ Existing uploaded documents */}
                {existingDocs.length > 0 && (
                  <Form.Group className="mb-3">
                    <Form.Label>Existing Documents</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {existingDocs.map((doc, index) => (
                        <a
                          key={index}
                          href={`http://localhost:3000/${doc.includes("uploads/") ? doc : "uploads/" + doc}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none text-primary"
                        >
                          📄 {doc.split("/").pop()}
                        </a>
                      ))}
                    </div>
                  </Form.Group>
                )}

                {/* ✅ New Documents Upload */}
                <Form.Group className="mb-3">
                  <Form.Label>Upload New Documents</Form.Label>
                  <Form.Control
                    type="file"
                    name="documents"
                    multiple
                    onChange={(e) => setDocuments(e.target.files)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Learner Test Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="leanersDate"
                    value={formData.leanersDate ? formData.leanersDate.slice(0, 10) : ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/applications")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditApplication;
