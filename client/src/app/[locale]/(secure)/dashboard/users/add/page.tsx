"use client";
import UserRegisterForm from "@/Components/Dashboard/ProfileContainer/UserRegisterForm";
import React from "react";
import { Col, Container, Row } from "reactstrap";

const AddUserByAdmin = () => {
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <UserRegisterForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddUserByAdmin;
