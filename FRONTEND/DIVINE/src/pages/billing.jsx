import React, { useEffect, useState } from "react";
import { Table, Container, Button, Card, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillingDetails = () => {
  const [applications, setApplications] = useState([]); 
  const [bills, setBills] = useState([]); // ✅ State for all bills
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [newBillData, setNewBillData] = useState({ billAmount: "", billDate: "" });

  const navigate = useNavigate();

  // 🔹 Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/application/");
        setApplications(res.data);
      } catch (err) {
        console.error("❌ Error fetching applications:", err);
      }
    };

    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:3000/bills");
        setBills(res.data);
      } catch (err) {
        console.error("❌ Error fetching bills:", err);
      }
    };

    fetchApplications();
    fetchBills();
  }, []);

  // 🔎 Filter applications
 // 🔎 Filter applications by applicationNumber OR name
const filteredApps = applications.filter((app) =>
  app.applicationNumber?.toLowerCase().includes(search.toLowerCase()) ||
  app.name?.toLowerCase().includes(search.toLowerCase())
);

  // 🔹 Open modal to add bill
  const handleAddBill = (app) => {
    setSelectedApp(app);
    setNewBillData({ billAmount: "", billDate: "" });
    setShowModal(true);
  };

  // 🔹 Save new bill
  const handleSaveBill = async () => {
    try {
      await axios.post("http://localhost:3000/bills", {
        billAmount: newBillData.billAmount,
        billDate: newBillData.billDate,
        applicationNumber: selectedApp?.applicationNumber,
        name: selectedApp?.name,
      });

      alert("✅ Bill added successfully!");
      setShowModal(false);
      setNewBillData({ billAmount: "", billDate: "" });

      // 🔄 Refresh bills list
      const res = await axios.get("http://localhost:3000/bills");
      setBills(res.data);
    } catch (err) {
      console.error("❌ Error adding bill:", err);
      alert("Failed to add bill");
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", backgroundColor: "#002044" }}>
      <Container fluid="lg" style={{ maxWidth: "95%", margin: "0 auto", overflowX: "hidden" }}>
        <Card className="shadow-lg rounded-4 p-4">
          {/* 🔹 Header */}
          <div
            className="d-flex justify-content-between align-items-center mb-4 p-3 rounded"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h2 className="mb-0 text-dark fw-bold">💳 Billing Details</h2>
            <Button variant="outline-primary" onClick={() => navigate("/applications")}>
              ⬅ Back
            </Button>
          </div>

          {/* 🔍 Search Bar */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="🔎 Search by Application No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          {/* 📊 Applications Table */}
          <h4 className="fw-bold mt-3 mb-2">📌 Applications</h4>
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover responsive className="align-middle shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Application No</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <tr key={app._id}>
                      <td>{app.applicationNumber}</td>
                      <td>{app.name}</td>
                      <td>{app.fatherName}</td>
                      <td>{app.dob ? new Date(app.dob).toLocaleDateString() : "—"}</td>
                      <td>{app.mobile1}</td>
                      <td>{app.address}</td>
                      <td>
                        <Button variant="success" size="sm" onClick={() => handleAddBill(app)}>
                          ➕ Add Bill
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* 📊 Bills Table */}
          <h4 className="fw-bold mt-5 mb-2">📑 All Bills</h4>
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover responsive className="align-middle shadow-sm">
              <thead className="table-secondary">
                <tr>
                  
                  <th>Application No</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr key={bill._id}>
                      
                      <td>{bill.applicationNumber}</td>
                      <td>{bill.name}</td>
                      <td>₹{bill.billAmount}</td>
                      <td>{bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No bills found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      {/* 🔹 Add Bill Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Add Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <>
              <p>
                <strong>Application No:</strong> {selectedApp.applicationNumber}
              </p>
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={newBillData.billAmount}
                    onChange={(e) => setNewBillData({ ...newBillData, billAmount: e.target.value })}
                    placeholder="Enter amount"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newBillData.billDate}
                    onChange={(e) => setNewBillData({ ...newBillData, billDate: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveBill}>
            💾 Save Bill
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BillingDetails;
