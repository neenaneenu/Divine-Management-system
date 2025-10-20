import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Form, Button, Card, Modal, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const printRef = useRef();
  const navigate = useNavigate();

  // ✅ Fetch Data
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

  // ✅ Safe search term
  const searchTerm = (search || "").toLowerCase();

  // ✅ Filtering logic (safe and flexible)
  const filteredApplications = (applications || []).filter((app) => {
    if (!app) return false;
    const name = (app.name || "").toLowerCase();
    const applicationNumber = (app.applicationNumber || "").toLowerCase();
    const testDate =
      app.testDate && !isNaN(new Date(app.testDate))
        ? new Date(app.testDate).toLocaleDateString().toLowerCase()
        : "";
    const leanersDate =
      app.leanersDate && !isNaN(new Date(app.leanersDate))
        ? new Date(app.leanersDate).toLocaleDateString().toLowerCase()
        : "";
    return (
      name.includes(searchTerm) ||
      applicationNumber.includes(searchTerm) ||
      testDate.includes(searchTerm) ||
      leanersDate.includes(searchTerm)
    );
  });

  // ✅ Auto-open modal on date search
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
  const [isPrintMode, setIsPrintMode] = useState(false);

// 🖨 Print Function
const handlePrint = () => {
  setIsPrintMode(true);

  setTimeout(() => {
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
          <style>
            body { font-family: Arial; padding: 20px; color: #000; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            th { background-color: #343a40; color: white; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.print();
    setIsPrintMode(false); // Reset after printing
  }, 200);
};

// 💾 Save Function
const handleSave = async () => {
  try {
    localStorage.setItem("savedApps", JSON.stringify(selectedApps));
    const response = await axios.post("http://localhost:3000/saved", {
      applications: selectedApps,
    });
    console.log("✅ Saved:", response.data);
    setIsPrintMode(false); // Ensure KDS/LMD columns are hidden again
    navigate("/saved", { state: { savedApps: selectedApps } });
  } catch (error) {
    console.error("❌ Error saving:", error);
    alert("Failed to save!");
  }
};

  

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f9", padding: "40px 0" }}>
      <Container fluid="lg" style={{ maxWidth: "95%" }}>
        <Card className="shadow-lg rounded-4 border-0 overflow-hidden">
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center p-4"
            style={{ backgroundColor: "#002244", color: "white" }}
          >
            <h3 className="fw-bold m-0">📋 Registered Applications</h3>
            <div className="d-flex gap-2">
              <Button variant="light" size="sm" onClick={() => navigate("/Home")}>
                ⬅ Back
              </Button>
              <Button variant="outline-light" size="sm" onClick={() => navigate("/billing")}>
                💳 Billing
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-3 bg-light border-bottom">
            <Form.Control
              type="text"
              placeholder="🔍 Search by Name, Application No, or Date (DD/MM/YYYY)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
            />
          </div>

          {/* Applications Table */}
          <div style={{ overflowX: "auto" }}>
            <Table
              bordered
              hover
              responsive
              className="align-middle mb-0 text-center"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <thead
                className="table-dark"
                style={{ position: "sticky", top: 0, zIndex: 2 }}
              >
                <tr>
                  <th>#</th>
                  <th>App No</th>
                  <th>Name</th>
                  <th>Father</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Vehicle</th>
                  <th>Blood</th>
                  <th>Amount</th>
                  <th>Test Date</th>
                  <th>Learner Date</th>
                  <th>Documents</th>
                  <th>Photo</th>
                  <th>Signature</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app, idx) => (
                    <tr key={app._id}>
                      <td>{idx + 1}</td>
                      <td><Badge bg="secondary">{app.applicationNumber || "N/A"}</Badge></td>
                      <td className="fw-semibold">{app.name}</td>
                      <td>{app.fatherName}</td>
                      <td>{new Date(app.dob).toLocaleDateString()}</td>
                      <td>{app.mobile1}</td>
                      <td>{app.vehicleClass}</td>
                      <td>{app.bloodGroup}</td>
                      <td className="text-success fw-bold">₹{app.amount}</td>
                      <td>{app.testDate ? new Date(app.testDate).toLocaleDateString() : "Not Set"}</td>
                      <td>{app.leanersDate ? new Date(app.leanersDate).toLocaleDateString() : "Not Set"}</td>

                      {/* Documents */}
                      <td>
                        {app.documents?.length ? (
                          app.documents.map((doc, i) => (
                            <div key={i}>
                              <a
        href={`http://localhost:3000/${doc.includes("uploads/") ? doc : "uploads/" + doc}`}
        target="_blank"
        rel="noreferrer"
        className="text-decoration-none text-primary"
      >
                                📄 Doc {i + 1}
                              </a>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted">No Docs</span>
                        )}
                      </td>

                      {/* Photo */}
                      <td>
                        {app.photo ? (
                          <img
                            src={`http://localhost:3000/uploads/${app.photo}`}
                            alt="photo"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <span className="text-muted">No Photo</span>
                        )}
                      </td>

                      {/* Signature */}
                      <td>
                        {app.signature ? (
                          <img
                            src={`http://localhost:3000/uploads/${app.signature}`}
                            alt="signature"
                            style={{
                              width: "70px",
                              height: "40px",
                              objectFit: "contain",
                              borderRadius: "6px",
                              background: "#f8f9fa",
                              padding: "2px",
                            }}
                          />
                        ) : (
                          <span className="text-muted">No Signature</span>
                        )}
                      </td>

                      {/* Action */}
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => navigate(`/application/edit/${app._id}`)}
                        >
                          ✏ Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-muted py-4">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>

      {/* 📅 Modal */}
     <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
  <Modal.Header closeButton className="bg-dark text-white">
    <Modal.Title>📆 Applications on {search}</Modal.Title>
  </Modal.Header>

  <Modal.Body ref={printRef}>
    <Table bordered hover responsive className="align-middle text-center">
      <thead className="table-dark">
        <tr>
          {/* Hide Test Date when in print mode */}
          {!isPrintMode && <th>Test Date</th>}
          <th>Name</th>
          <th>App No</th>
          <th>DOB</th>
          <th>Mobile</th>
          <th>Vehicle</th>

          {/* Show KDS & LMD only in print mode */}
          {isPrintMode && <th>MDS</th>}
          {isPrintMode && <th>CASH</th>}
        </tr>
      </thead>

      <tbody>
        {selectedApps.map((app) => (
          <tr key={app._id}>
            {!isPrintMode && (
              <td>{app.testDate ? new Date(app.testDate).toLocaleDateString() : "Not Set"}</td>
            )}
            <td>{app.name}</td>
            <td>{app.applicationNumber}</td>
            <td>{new Date(app.dob).toLocaleDateString()}</td>
            <td>{app.mobile1}</td>
            <td>{app.vehicleClass}</td>

            {/* Empty KDS/LMD columns for print */}
            {isPrintMode && <td>M</td>}
            {isPrintMode && <td></td>}
          </tr>
        ))}
      </tbody>
    </Table>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="outline-primary" onClick={handlePrint}>
      🖨 Print
    </Button>
    <Button variant="success" onClick={handleSave}>
      💾 Save
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default ApplicationList;
