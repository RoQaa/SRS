"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./EditProductForm";

interface EditProductContainerProps {
  slug: string;
}

const EditProductContainerPage:React.FC<EditProductContainerProps> = ({ slug }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateNewProjectForm slug={slug} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductContainerPage;
