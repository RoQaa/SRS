import { Col, TabContent, TabPane } from "reactstrap";
import ProductOne from "./ProductOne";
import ProductTwo from "./ProductTwo";
import ProductThree from "./ProductThree";
import CommonButton from "../CommonButton";
import { useAppSelector } from "@/Redux/Hooks";

const ProductTabContent = ({ slug }: { slug: string }) => {
  const { navId } = useAppSelector((state) => state.editNews);
  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <TabContent activeTab={navId}>
          <TabPane tabId={1}>
            <ProductOne titleName="title" contentName="description" />
          </TabPane>
          <TabPane tabId={2}>
            <ProductOne titleName="title_ar" contentName="description_ar" />
          </TabPane>
          <TabPane tabId={3}>
            <ProductTwo />
          </TabPane>
          <TabPane tabId={4}>
            <ProductThree />
          </TabPane>
        </TabContent>
      </Col>
      <CommonButton slug={slug} />
    </>
  );
};

export default ProductTabContent;
