import { Card, CardBody, Col, Row } from "reactstrap";
import DashboardCommonHeader from "./common/DashboardCommonHeader";
import {  useAppSelector } from "@/Redux/Hooks";
import {
  selectProjectStatusCounts,
  selectTotalProjectsCount,
} from "@/Redux/Reducers/ProjectSlice";

const ProjectStatus = () => {
  const projectStatusCounts = useAppSelector(selectProjectStatusCounts);
  const totalProjectsCount = useAppSelector(selectTotalProjectsCount);


  return (
    <Col xl="4" md="6" className="col-xl-40 proorder-md-1 ">
      <Card>
        <DashboardCommonHeader title={"Projects Status"} dropDownFalse />
        <CardBody className="">
          <Row>
            <Col xs="6">
              <div className={`btn-light1-primary b-r-10`}>
                <div className={`upcoming-box`}>
                  <div className={`upcoming-icon bg-primary`}>
                    <img
                      src={`/assets/images/dashboard-2/svg-icon/calendar.png`}
                      alt="icons"
                    />
                  </div>
                  <h6>Upcomings</h6>
                  <p>{projectStatusCounts.pending} Projects</p>
                </div>
              </div>
            </Col>
            <Col xs="6">
              <div className={`btn-light1-warning b-r-10`}>
                <div className={`upcoming-box`}>
                  <div className={`upcoming-icon bg-warning`}>
                    <img
                      src={`/assets/images/dashboard-2/svg-icon/processing.png`}
                      alt="icons"
                    />
                  </div>
                  <h6>In Progress</h6>
                  <p>{projectStatusCounts.inProgress} Projects</p>
                </div>
              </div>
            </Col>
            <Col xs="6">
              <div className={`btn-light1-secondary b-r-10`}>
                <div className={`upcoming-box mb-0`}>
                  <div className={`upcoming-icon bg-secondary`}>
                    <img
                      src={`/assets/images/dashboard-2/svg-icon/check.png`}
                      alt="icons"
                    />
                  </div>
                  <h6>Completed</h6>
                  <p>{projectStatusCounts.completed} Projects</p>
                </div>
              </div>
            </Col>
            <Col xs="6">
              <div className={`btn-light1-tertiary b-r-10`}>
                <div className={`upcoming-box  mb-0`}>
                  <div className={`upcoming-icon bg-tertiary`}>
                    <img
                      src={`/assets/images/dashboard-2/svg-icon/total.png`}
                      alt="icons"
                    />
                  </div>
                  <h6>Total</h6>
                  <p>{totalProjectsCount} Projects</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectStatus;
