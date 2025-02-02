import { Row } from "reactstrap";
import React from "react";
import ScopeLeftSidebar from "./ScopeLeftSidebar";
import ScopeTabContent from "./ScopeTabContent";

const ScopeBody = () => (
  <Row className="g-xl-5 g-3">
    <ScopeLeftSidebar />
    <ScopeTabContent />
  </Row>
);

export default React.memo(ScopeBody);
