import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

const AddBillForm = ({ onSubmit }) => {
  const [billData, setBillData] = useState({
    billNumber: "",
    customerName: "",
    date: "",
    amount: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(billData);
    }
    console.log("Bill Submitted:", billData);
    setBillData({ billNumber: "", customerName: "", date: "", amount: "", description: "" });
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4 rounded-3">
        <h3 className="mb-3 text-center">Add New Bill</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="billNumber">
                <Form.Label>Bill Number</Form.Label>
                <Form.Control
                  type="text"
                  name="billNumber"
                  value={billData.billNumber}
                  onChange={handleChange}
                  placeholder="Enter Bill Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="customerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={billData.customerName}
                  onChange={handleChange}
                  placeholder="Enter Customer Name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={billData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={billData.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={billData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="px-4">
              Save Bill
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddBillForm;
