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
    <div style={{ minHeight: "100vh", padding: "40px 0", backgroundColor: "#002044" }}>
      <Container>
        <Card className="shadow-lg rounded-4 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0 text-dark">📄 Registered Applications</h2>
            <Button variant="secondary" onClick={() => navigate("/home")}>
              ⬅ Back
            </Button>
          </div>

          {/* 🔍 Search Bar */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search by Application No or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          <Table striped bordered hover responsive className="table-rounded shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Application No</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Vehicle Class</th>
                <th>Blood Group</th>
                <th>Photo</th>
                <th>Signature</th>
                <th>Bill No</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.applicationNumber}</td>
                    <td>{app.name}</td>
                    <td>{app.fatherName}</td>
                    <td>{new Date(app.dob).toLocaleDateString()}</td>
                    <td>{app.mobile1}</td>
                    <td>{app.vehicleClass}</td>
                    <td>{app.bloodGroup}</td>
                    <td>
                      {app.photo && (
                        <img
                          src={`http://localhost:3000/uploads/${app.photo}`}
                          alt="photo"
                          className="rounded"
                          width="50"
                          height="50"
                        />
                      )}
                    </td>
                    <td>
                      {app.signature && (
                        <img
                          src={`http://localhost:3000/uploads/${app.signature}`}
                          alt="signature"
                          className="rounded"
                          width="50"
                          height="50"
                        />
                      )}
                    </td>
                    <td>{app.billNumber}</td>
                    <td>{app.amount}</td>
                    <td className="d-flex gap-2">
                      <Button
                        variant="warning"
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
                  <td colSpan="12" className="text-center text-muted py-4">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default ApplicationList;
