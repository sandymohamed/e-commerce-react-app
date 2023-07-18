import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// -------------------------------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-light py-3">
    <Container>
      <Row>
        <Col md={12}>
          <p className="text-muted mb-0">
            © 2023 Sandy Mohammed. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
  )
}

export default Footer
