import React, { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

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

  // 🔎 Filtered applications
  const filteredApplications = applications.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
    app.fatherName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
        <h2 className="mb-4 text-center">Registered Applications</h2>

        {/* 🔍 Search Bar */}
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by Application No, Name or Father Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>

        <Table striped bordered hover responsive>
          <thead>
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
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
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
                      width="50"
                      height="50"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ApplicationList;
