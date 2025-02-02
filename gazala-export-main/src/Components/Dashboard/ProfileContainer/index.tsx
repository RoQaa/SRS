"use client";
import React from "react";
import { Container, Row } from "reactstrap";
import AddUsersAndUpdate from "./AddUsersAndUpdate/AddUsersAndUpdate";

const EditProfileContainer = () => {
  return (
    <Container fluid>
      <div className="edit-profile">
        <Row>
          <AddUsersAndUpdate />
        </Row>
      </div>
    </Container>
  );
};

export default EditProfileContainer;
