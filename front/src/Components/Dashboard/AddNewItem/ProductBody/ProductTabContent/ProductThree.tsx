import { Col, Form, Row } from "reactstrap";
import SelectFour from "./SelectFour";
import SelectFive from "./SelectFive";

const ProductThree = () => {
  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-lg-4 g-3">
          <Col xs="12">
            <Row className="g-3">
              <SelectFour />
            </Row>
          </Col>
          <Col>
            <Row>
              <SelectFive />
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductThree;
