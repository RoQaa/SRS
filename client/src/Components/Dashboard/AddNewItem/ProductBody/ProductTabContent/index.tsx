import { Col, TabContent, TabPane } from "reactstrap";
import ProductOne from "./ProductOne";
import ProductTwo from "./ProductTwo";
import ProductThree from "./ProductThree";
import CommonButton from "../CommonButton";
import { useAppSelector } from "@/Redux/Hooks";

const ProductTabContent = () => {
  const { navId } = useAppSelector((state) => state.addNews);
  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <TabContent activeTab={navId}>
          <TabPane tabId={1}>
            <ProductOne titleName="title" contentName="content" lang="en"/>
          </TabPane>
          <TabPane tabId={2}>
            <ProductOne titleName="title_ar" contentName="content_ar" lang="ar"/>
          </TabPane>
          <TabPane tabId={3}>
            <ProductTwo />
          </TabPane>
          <TabPane tabId={4}>
            <ProductThree />
          </TabPane>
        </TabContent>
      </Col>
      <CommonButton />
    </>
  );
};

export default ProductTabContent;
