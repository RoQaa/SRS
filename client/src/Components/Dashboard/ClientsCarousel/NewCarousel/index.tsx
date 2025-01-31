"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./CreateNewCarouselForm";
import EditCarouselForm from "./EditCarouselForm";
import { useSearchParams } from "next/navigation";

const NewClientsCarouselContainer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              {id ? <EditCarouselForm id={id} /> : <CreateNewProjectForm />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewClientsCarouselContainer;
