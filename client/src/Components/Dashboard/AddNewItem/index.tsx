import { CreateNews } from "@/Constant";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import ProductBody from "./ProductBody";

const AddProductContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <h5>{CreateNews}</h5>
            </CardHeader>
            <CardBody>
              <ProductBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductContainer;
