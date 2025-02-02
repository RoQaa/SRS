import { Col, TabContent, TabPane } from "reactstrap";
import ScopeOne from "./ScopeOne";
import ScopeTwo from "./ScopeTwo";
import ScopeThree from "./ScopeThree";
import CommonButton from "../CommonButton";
import { useAppSelector } from "@/Redux/Hooks";

const ScopeTabContent = () => {
  const { navId } = useAppSelector((state) => state.addScope);

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <TabContent activeTab={navId}>
          <TabPane tabId={1}>
            <ScopeOne titleName="service" contentName="details" lang="en" />
          </TabPane>
          <TabPane tabId={2}>
            <ScopeOne
              titleName="service_ar"
              contentName="details_ar"
              lang="ar"
            />
          </TabPane>
          <TabPane tabId={3}>
            <ScopeTwo />
          </TabPane>
          <TabPane tabId={4}>
            <ScopeThree />
          </TabPane>
        </TabContent>
      </Col>
      <CommonButton />
    </>
  );
};

export default ScopeTabContent;
