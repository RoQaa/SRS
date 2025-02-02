'use client'
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import ScopeBody from "./ScopeBody";

const AddScopeContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <h5>Add Scope</h5>
            </CardHeader>
            <CardBody>
              <ScopeBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddScopeContainer;
