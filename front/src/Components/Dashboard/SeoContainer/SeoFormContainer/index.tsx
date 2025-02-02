"use client";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateOrUpdateSeoForm from "./CreateOrUpdateSeoForm";
import { useSearchParams } from "next/navigation";

const SeoFormContainer: React.FC= () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <CreateOrUpdateSeoForm page={page ? page as string : "" as string } />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SeoFormContainer;
