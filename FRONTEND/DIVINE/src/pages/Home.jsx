import React from 'react'
import { Card, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import logo from "../assets/logo.png"
import license from "../assets/license.png"
import billing from "../assets/billing.png"
import reg from "../assets/reg.png"
import app from "../assets/app.png"





const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#002044", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="px-6 py-3 flex justify-between items-center fixed-top" style={{ backgroundColor: "#002044" }}>
        <div className="text-2xl font-bold">
          <img src={logo} alt="" style={{ height: "80px" }} />
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          ⬅ Logout
        </button>
      </nav>

      {/* Cards */}
      <Container className="home-container">
        <Row className="g-4 justify-content-center mt-5">

          {/* License Icon */}
          <Col md={3} sm={6} xs={12}>
            <Card className="app-card text-center" onClick={() => handleSubmit("/register")}>
              <div className="icon-circle">
                <img src={reg} alt="License" />
              </div>
              <Card.Body>
                <Card.Title>Registration</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Billing Icon */}
          <Col md={3} sm={6} xs={12}>
            <Card className="app-card text-center" onClick={() => handleSubmit("/applications")}>
              <div className="icon-circle">
                <img src={app} alt="Billing" />
              </div>
              <Card.Body>
                <Card.Title>Application List</Card.Title>
              </Card.Body>
            </Card>
          </Col>

           <Col md={3} sm={6} xs={12}>
            <Card className="app-card text-center" onClick={() => handleSubmit("/billing")}>
              <div className="icon-circle">
                <img src={billing} alt="Billing" />
              </div>
              <Card.Body>
                <Card.Title>Billing</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          
          

        </Row>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .home-container {
          margin-top: 100px; 
          padding-bottom: 50px;
        }
        .app-card {
          border-radius: 16px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 20px;
          background: white;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .app-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px auto;
        }
        .icon-circle img {
          width: 40px;
          height: 40px;
        }
      `}</style>
    </div>
  );
};

export default Home;
