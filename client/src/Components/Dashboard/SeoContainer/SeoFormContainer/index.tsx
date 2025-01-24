"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateOrUpdateSeoForm from "./CreateOrUpdateSeoForm";

interface SeoFormContainerProps {
  page: string;
}

const SeoFormContainer: React.FC<SeoFormContainerProps> = ({ page = "" }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateOrUpdateSeoForm page={page} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SeoFormContainer;
