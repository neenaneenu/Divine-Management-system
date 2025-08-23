import React from 'react'
import { Card, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import logo from "../assets/logo.png"
const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/register");
  };
   const handleLogout = () => {
    
    localStorage.removeItem("token");
    sessionStorage.clear();
    toast.success("Logout successful!");

    
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#002044", minHeight: "100vh" }}>
      
      <nav className="bg-blend-difference px-6 py-3 flex justify-between items-center fixed-top"  style={{ backgroundColor: "#002044" }}>
            
            <div className="text-2xl font-bold"><img src={logo} alt=""  style={{height: "80px"}}/></div>
               <Button variant="secondary" onClick={handleLogout}>
                        ⬅ Logout
           </Button>
            
          </nav>

      <Container className="home-container">
        <Row className="g-4 justify-content-center">
         
          {/* License Card */}
          <Col md={3} sm={6} xs={12}>
            <Card className="custom-card h-100 text-center card-hover">
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>License</Card.Title>
                <Button variant="primary" onClick={handleSubmit}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Billing Card */}
          <Col md={3} sm={6} xs={12}>
            <Card className="custom-card h-100 text-center card-hover">
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>Billing</Card.Title>
                <Button variant="primary" onClick={handleSubmit}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* RC Card */}
          <Col md={3} sm={6} xs={12}>
            <Card className="custom-card h-100 text-center card-hover">
              <Card.Img variant="top" src="https://picsum.photos/200" />
              <Card.Body>
                <Card.Title>RC</Card.Title>
                <Button variant="primary" onClick={handleSubmit}>
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .home-container {
          margin-top: 100px; /* pushes cards below fixed navbar */
          padding-bottom: 50px; /* add spacing at bottom */
        }
        .custom-card {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Home;
