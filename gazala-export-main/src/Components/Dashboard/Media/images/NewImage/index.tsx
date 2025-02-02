"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./CreateNewImageForm";

const NewImageContainer = ({
  type = "",
}: {
  type: string;
}) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateNewProjectForm type={type} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewImageContainer;
