import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Button,
  Form,
  InputGroup,
  Card,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewBills = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Fetch all bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:3000/bills");
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching bills:", err);
      }
    };
    fetchBills();
  }, []);

  // ✅ Group bills by billNumber
  const groupedBills = bills.reduce((acc, bill) => {
    if (!acc[bill.billNumber]) {
      acc[bill.billNumber] = {
        ...bill,
        amounts: [],
        dates: [],
      };
    }
    acc[bill.billNumber].amounts.push(bill.billAmount);
    acc[bill.billNumber].dates.push(
      bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "—"
    );
    return acc;
  }, {});

  let finalBills = Object.values(groupedBills);

  // ✅ Apply search on grouped bills
  if (search) {
    finalBills = finalBills.filter(
      (bill) =>
        bill.applicationNumber?.toLowerCase().includes(search.toLowerCase()) ||
        bill.name?.toLowerCase().includes(search.toLowerCase()) ||
        bill.mobile1?.toLowerCase().includes(search.toLowerCase()) ||
        bill.billNumber?.toString().includes(search)
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-lg rounded-4 border-0">
        <Card.Body>
          <h3 className="fw-bold mb-4 text-center text-primary">
            📑 All Bills
          </h3>

          {/* ✅ Search Box with Button */}
          <InputGroup className="mb-4 shadow-sm sticky-top">
            <Form.Control
              type="text"
              placeholder="🔎 Search by Bill No, Name, App No, Phone..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="primary" onClick={() => setSearch(searchText)}>
              Search
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearch("");
                setSearchText("");
              }}
            >
              Reset
            </Button>
             <Button
              variant="secondary"
              className="px-4"
              onClick={() => navigate(-1)}
            >
              ⬅ Back
            </Button>
          </InputGroup>

          <div style={{ overflowX: "auto" }}>
            <Table
              bordered
              hover
              responsive
              striped
              className="align-middle shadow-sm rounded"
            >
              <thead className="table-dark text-center">
                <tr>
                  <th>Bill Number</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Amounts</th>
                  <th>Dates</th>
                </tr>
              </thead>
              <tbody>
                {finalBills.length > 0 ? (
                  finalBills.map((bill) => (
                    <tr key={bill._id}>
                      <td className="fw-bold  text-center">
                       
                          {bill.billNumber}
                      
                      </td>
                      <td>{bill.name}</td>
                      <td>
                        {bill.mobile1}
                        {bill.mobile2 && (
                          <>
                            <br />
                            <span className="text-muted">{bill.mobile2}</span>
                          </>
                        )}
                      </td>
                      <td>
                        {bill.amounts.map((amt, idx) => (
                          <div
                            key={idx}
                            className="text-success fw-semibold border-bottom pb-1"
                          >
                            ₹{amt}
                          </div>
                        ))}
                      </td>
                      <td>
                        {bill.dates.map((date, idx) => (
                          <div key={idx} className="text-muted small">
                            📅 {date}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      🚫 No bills found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="text-center mt-4">
           
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewBills;
