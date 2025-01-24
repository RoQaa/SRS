"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./CreateNewProjectForm";

interface NewProjectContainerProps {
  slug: string;
}

const NewProjectContainer: React.FC<NewProjectContainerProps> = ({
  slug = "",
}) => {
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

export default NewProjectContainer;
