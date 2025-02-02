import { Row } from "reactstrap";
import ProductLeftSidebar from "./ProductLeftSidebar";
import ProductTabContent from "./ProductTabContent";

const ProductBody = ({ slug }: { slug: string }) => {
  return (
    <Row className="g-xl-5 g-3">
      <ProductLeftSidebar />
      <ProductTabContent slug={slug} />
    </Row>
  );
};

export default ProductBody;
