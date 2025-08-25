import React, { useRef, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const BillingForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    billNo: "",
    date: "",
    name: "",
    address: "",
    phone: "",
    item: "",
    total: "",
    advance: "",
    balance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .bill-box {
              border: 2px dashed #000;
              padding: 20px;
              width: 350px;
              margin: auto;
              background-color: #f8d7da;
            }
            h4 {
              text-align: center;
              margin: 0;
              font-size: 20px;
              font-weight: bold;
            }
            p {
              text-align: center;
              margin: 2px 0;
              font-size: 12px;
            }
            table {
              width: 100%;
              margin-top: 10px;
              border-collapse: collapse;
            }
            td {
              padding: 4px;
              font-size: 14px;
            }
            .label {
              font-weight: bold;
            }
            .signature {
              margin-top: 30px;
              text-align: right;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="bill-box">
            <h4>Divine Driving School</h4>
            <p>Opp. Paravathani Furniture, Nilambur Road, MANJERI</p>
            <table>
              <tr><td class="label">No:</td><td>${formData.billNo}</td></tr>
              <tr><td class="label">Date:</td><td>${formData.date}</td></tr>
              <tr><td class="label">Name:</td><td>${formData.name}</td></tr>
              <tr><td class="label">Address:</td><td>${formData.address}</td></tr>
              <tr><td class="label">Phone:</td><td>${formData.phone}</td></tr>
              <tr><td class="label">Item:</td><td>${formData.item}</td></tr>
              <tr><td class="label">Total:</td><td>${formData.total}</td></tr>
              <tr><td class="label">Advance:</td><td>${formData.advance}</td></tr>
              <tr><td class="label">Balance:</td><td>${formData.balance}</td></tr>
            </table>
            <p class="signature">Signature: __________</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container className="p-4">
      <div ref={formRef} className="border p-4 bg-light" style={{ width: "400px", margin: "auto" }}>
        <h4 className="text-center fw-bold">Divine Driving School</h4>
        <p className="text-center small mb-2">Opp. Paravathani Furniture, Nilambur Road, MANJERI</p>

        <Form>
          <Form.Group className="mt-2">
            <Form.Label>Bill No</Form.Label>
            <Form.Control size="sm" name="billNo" value={formData.billNo} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" size="sm" name="date" value={formData.date} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control size="sm" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Address</Form.Label>
            <Form.Control size="sm" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control size="sm" name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Item</Form.Label>
            <Form.Control size="sm" name="item" value={formData.item} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Total</Form.Label>
            <Form.Control size="sm" name="total" value={formData.total} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Advance</Form.Label>
            <Form.Control size="sm" name="advance" value={formData.advance} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Balance</Form.Label>
            <Form.Control size="sm" name="balance" value={formData.balance} onChange={handleChange} />
          </Form.Group>
        </Form>
      </div>

      <div className="text-center mt-3">
        <Button variant="primary" onClick={handlePrint}>Print Bill</Button>
      </div>
    </Container>
  );
};

export default BillingForm;
