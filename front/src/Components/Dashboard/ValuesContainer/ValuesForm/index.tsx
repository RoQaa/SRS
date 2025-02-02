"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateValuesForm from "./CreateValuesForm";
import EditValuesForm from "./EditValuesForm";
import { useSearchParams } from "next/navigation";

const ValuesFormContainer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              {id ? <EditValuesForm id={id as string} /> : <CreateValuesForm />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ValuesFormContainer;
