import { Col, Row } from "reactstrap";
import { HeaderRight } from "./HeaderRight";
import { HeaderLogo } from "./HeaderLogo";

export const PageHeader = () => {
  return (
    <Col className="header-wrapper m-0">
      <Row>
        <HeaderLogo />
        <HeaderRight />
      </Row>
    </Col>
  );
};
