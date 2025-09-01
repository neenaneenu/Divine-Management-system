import React, { useEffect, useState } from "react";
import { Table, Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
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

  // 🔎 Filter applications
  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        backgroundColor: "#002044",
      }}
    >
      <Container
        fluid="lg"
        style={{ maxWidth: "95%", margin: "0 auto", overflowX: "hidden" }}
      >
        <Card className="shadow-lg rounded-4 p-4 border-0">
          {/* 🔹 Header Section */}
          <div
            className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h2 className="mb-0 text-dark fw-bold">
              📄 Registered Applications
            </h2>

            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/Home")}
              >
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
              placeholder="🔎 Search by Application No or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
            />
          </Form>

          {/* ✅ Better Table */}
          <div style={{ overflowX: "auto" }}>
            <Table
              bordered
              hover
              responsive
              className="align-middle shadow-sm"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <thead
                className="table-dark"
                style={{ position: "sticky", top: 0, zIndex: 2 }}
              >
                <tr>
                  <th>App No</th>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Father</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Vehicle</th>
                  <th>Blood</th>
                  <th>Photo</th>
                  <th>Signature</th>
                  <th>Bill</th>
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
                      <td>{app.applicationNumber}</td>
                      <td>{app.SlNo}</td>
                      <td>{app.name}</td>
                      <td>{app.fatherName}</td>
                      <td>{new Date(app.dob).toLocaleDateString()}</td>
                      <td>
                        {app.mobile1}
                        {app.mobile2 && (
                          <>
                            <br />
                            {app.mobile2}
                          </>
                        )}
                      </td>
                      <td>{app.vehicleClass}</td>
                      <td>{app.bloodGroup}</td>
                      <td>
                        {app.photo && (
                          <img
                            src={`http://localhost:3000/uploads/${app.photo}`}
                            alt="photo"
                            className="rounded shadow-sm"
                            width="45"
                            height="45"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>
                        {app.signature && (
                          <img
                            src={`http://localhost:3000/uploads/${app.signature}`}
                            alt="signature"
                            className="rounded shadow-sm"
                            width="45"
                            height="45"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>{app.billNumber}</td>
                      <td className="fw-bold text-success">{app.amount}</td>
                      <td>
                        {app.testDate
                          ? new Date(app.testDate).toLocaleDateString()
                          : "Not Assigned"}
                      </td>
                      <td>
                        {app.leanersDate && !isNaN(new Date(app.leanersDate))
                          ? new Date(app.leanersDate).toLocaleDateString()
                          : "Not Assigned"}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() =>
                            navigate(`/application/edit/${app._id}`)
                          }
                        >
                          ✏ Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center text-muted py-4">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ApplicationList;
