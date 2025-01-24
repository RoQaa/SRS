"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateValuesForm from "./CreateValuesForm";
import EditValuesForm from "./EditValuesForm";

const ValuesFormContainer = ({ id = "" }: { id: string }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              {id ? <EditValuesForm id={id} /> : <CreateValuesForm />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ValuesFormContainer;
