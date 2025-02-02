import { Row } from "reactstrap";
import React from "react";
import ScopeLeftSidebar from "./ScopeLeftSidebar";
import ScopeTabContent from "./ScopeTabContent";

interface ScopeBodyProps {
  slug: string
}

const ScopeBody:React.FC<ScopeBodyProps> = ({slug}) => (
  <Row className="g-xl-5 g-3">
    <ScopeLeftSidebar />
    <ScopeTabContent slug={slug} />
  </Row>
);

export default React.memo(ScopeBody);
