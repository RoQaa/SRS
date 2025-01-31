"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./EditProductForm";
import { useSearchParams } from "next/navigation";

const EditProductContainerPage:React.FC = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("id");
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateNewProjectForm slug={slug as string} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductContainerPage;
