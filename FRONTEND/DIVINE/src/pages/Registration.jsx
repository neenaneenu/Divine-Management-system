import React from 'react'
import { Form, Button, Container, Row, Col } from "react-bootstrap"

const DrivingSchoolForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div style={{ backgroundColor: "#002044", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
        <div className="p-4 rounded shadow bg-white">
          <h2 className="text-center mb-4 text-dark">Driving School Application Form</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Application Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Application Number" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Father / W/O / D/O</Form.Label>
              <Form.Control type="text" placeholder="Enter Father's / Spouse's Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number 1</Form.Label>
                  <Form.Control type="tel" placeholder="Enter first mobile number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number 2</Form.Label>
                  <Form.Control type="tel" placeholder="Enter second mobile number" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your address" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PIN</Form.Label>
                  <Form.Control type="text" placeholder="Enter PIN code" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class of Vehicle</Form.Label>
                  <Form.Control type="text" placeholder="Eg: LMV, MCWG" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control type="text" placeholder="Enter Blood Group (Eg: O+)" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Signature</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Bill Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Bill Number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="Enter Amount" />
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
  )
}

export default DrivingSchoolForm
