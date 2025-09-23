import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Form, Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const printRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/application/");
        setApplications(res.data);
      } catch (err) {
        console.error("❌ Error fetching applications:", err);
      }
    };
    fetchApplications();
  }, []);

  const searchTerm = search.toLowerCase();

  // 🔎 Filtering
  const filteredApplications = applications.filter((app) => {
    const name = app.name?.toLowerCase() || "";
    const applicationNumber = app.applicationNumber?.toLowerCase() || "";
    const testDate = app.testDate
      ? new Date(app.testDate).toLocaleDateString().toLowerCase()
      : "";
    const leanersDate = app.leanersDate
      ? new Date(app.leanersDate).toLocaleDateString().toLowerCase()
      : "";

    return (
      name.includes(searchTerm) ||
      applicationNumber.includes(searchTerm) ||
      testDate.includes(searchTerm) ||
      leanersDate.includes(searchTerm)
    );
  });

  // 🎯 Check if search is date-like → Open Modal
  useEffect(() => {
    if (search && filteredApplications.length > 0) {
      const isDateSearch = /\d{1,2}\/\d{1,2}\/\d{4}/.test(search);
      if (isDateSearch) {
        setSelectedApps(filteredApplications);
        setShowModal(true);
      }
    }
  }, [search]);

  // 🖨 Print Function
const handlePrint = () => {
  const printContent = printRef.current.innerHTML;
  const win = window.open("", "", "width=900,height=650");
  
  win.document.write(`
    <html>
      <head>
        <title>Print</title>
        <!-- ✅ Bootstrap CSS for styling -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <style>
          /* ✅ Print-specific adjustments */
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            text-align: center;
            padding: 8px;
          }
          th {
            background-color: #343a40;
            color: white;
          }
          @media print {
            button { display: none; } /* hide buttons on print */
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);

  win.document.close();
  win.print();
};

const handleSave = () => {
  navigate("/saved", { state: { savedApps: selectedApps } });
};





  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", backgroundColor: "#002044" }}>
      <Container fluid="lg" style={{ maxWidth: "95%", margin: "0 auto", overflowX: "hidden" }}>
        <Card className="shadow-lg rounded-4 p-4 border-0">
          {/* 🔹 Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
            <h2 className="mb-0 text-dark fw-bold">📄 Registered Applications</h2>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={() => navigate("/Home")}>
                ⬅ Back
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate("/billing")}>
                💳 Bill
              </Button>
            </div>
          </div>

          {/* 🔍 Search Bar */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="🔎 Search by Application No, Name or Date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
            />
          </Form>

          {/* ✅ Table */}
          <div style={{ overflowX: "auto" }}>
            <Table bordered hover responsive className="align-middle shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th>App No</th>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Father</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Vehicle</th>
                  <th>Blood</th>
                  <th>Amount</th>
                  <th>Test Date</th>
                  <th>Learner Test</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app._id}>
                      <td>{app.applicationNumber || "Not Assigned"}</td>
                      <td>{app.SlNo}</td>
                      <td>{app.name}</td>
                      <td>{app.fatherName}</td>
                      <td>{new Date(app.dob).toLocaleDateString()}</td>
                      <td>{app.mobile1}</td>
                      <td>{app.vehicleClass}</td>
                      <td>{app.bloodGroup}</td>
                      <td className="fw-bold text-success">{app.amount}</td>
                      <td>{app.testDate ? new Date(app.testDate).toLocaleDateString() : "Not Assigned"}</td>
                      <td>{app.leanersDate ? new Date(app.leanersDate).toLocaleDateString() : "Not Assigned"}</td>
                      <td>
                        <Button variant="warning" size="sm" onClick={() => navigate(`/application/edit/${app._id}`)}>
                          ✏ Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center text-muted py-4">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

     {/* 📌 Modal for Date Search Results */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>📋 Applications Found</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={printRef}>
          <Table bordered hover responsive className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>App No</th>
                <th>Name</th>
                <th>class of vehicle</th>
                <th>DOB</th>
                <th>Mobile</th>
                 <th>Remarks</th> {/* ✅ Extra empty column */}
              
              </tr>
            </thead>
            <tbody>
              {selectedApps.map((app) => (
                <tr key={app._id}>
                  <td>{app.applicationNumber}</td>
                  <td>{app.name}</td>
                  <td>{app.vehicleClass}</td>
                  <td>{new Date(app.dob).toLocaleDateString()}</td>
                  <td>{app.mobile1}</td>
                  <td></td> 
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handlePrint}>🖨 Print</Button>
         <Button variant="success" onClick={handleSave}>💾 Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ApplicationList;
