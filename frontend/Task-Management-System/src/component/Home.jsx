import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';

const HomePage = () => {
    return (
      <div className="center-in-page">

        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col lg={8}>
              <h1 className="display-4">Make It Happen. With<span className="text-primary">Tandem</span></h1>
              <p className="lead mb-4">
                  Own Your Tasks. Dominate Your Day.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

export default HomePage;
