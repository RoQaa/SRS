import { Row } from "reactstrap";
import ProductLeftSidebar from "./ProductLeftSidebar";
import ProductTabContent from "./ProductTabContent";
import React from "react";

const ProductBody = () => 
  (
  <Row className="g-xl-5 g-3">
    <ProductLeftSidebar />
    <ProductTabContent />
  </Row>
);

export default React.memo(ProductBody);
