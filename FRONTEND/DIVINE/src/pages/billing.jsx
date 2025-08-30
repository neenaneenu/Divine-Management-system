import React, { useEffect, useState } from "react";
import { Table, Container, Button, Card, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BillingDetails = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [newBillData, setNewBillData] = useState({ billAmount: "", billDate: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:3000/application/");
        setBills(res.data);
      } catch (err) {
        console.error("❌ Error fetching bills:", err);
      }
    };
    fetchBills();
  }, []);

  // 🔎 Filter by Bill No or Application No
  const filteredBills = bills.filter(
    (bill) =>
      bill.billNumber?.toLowerCase().includes(search.toLowerCase()) ||
      bill.applicationNumber?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Open modal to add bill
  const handleAddBill = (bill) => {
    setSelectedBill(bill);
    setNewBillData({ billAmount: "", billDate: "" });
    setShowModal(true);
  };

  // 🔹 Save new bill
const handleSaveBill = async () => {
  try {
  await axios.post("http://localhost:3000/bills", {
  billAmount: newBillData.billAmount,
  billDate: newBillData.billDate,
  applicationNumber: selectedBill?.applicationNumber,
  name: selectedBill?.name
});
    alert("✅ New bill added successfully!");
    setShowModal(false);
    setNewBillData({ billAmount: "", billDate: "" });

    // Refresh bills list
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
            <div className="d-flex gap-2">
              <Button variant="outline-primary" onClick={() => navigate("/applications")}>
                ⬅ Back
              </Button>
              <Button variant="success" onClick={() => navigate("/billing/new")}>
                ➕ New Bill
              </Button>
            </div>
          </div>

          {/* 🔍 Search Bar */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="🔎 Search by Bill No or Application No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          {/* 📊 Billing Table */}
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover responsive className="align-middle shadow-sm">
              <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th>Bill No</th>
                  <th>Application No</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.length > 0 ? (
                  filteredBills.map((bill) => (
                    <tr key={bill._id}>
                      <td>{bill.billNumber || "—"}</td>
                      <td>{bill.applicationNumber}</td>
                      <td>{bill.name}</td>
                      <td>{bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "—"}</td>
                      <td>₹ {bill.billAmount || "0"}</td>
                      <td>{bill.paymentMode || "Cash"}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="info" size="sm" onClick={() => handleAddBill(bill)}>
                            ➕ Add Bill
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => navigate(`/billing/edit/${bill._id}`)}
                          >
                            ✏ Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No billing records found
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
          {selectedBill && (
            <>
              <p>
                <strong>Application No:</strong> {selectedBill.applicationNumber}
              </p>
              <p>
                <strong>Name:</strong> {selectedBill.name}
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
