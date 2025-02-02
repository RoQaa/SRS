import { Card, CardBody, Col, Table } from "reactstrap";
import { RecentProject } from "@/Constant";
import RecentProjectsTableBody from "./RecentProjectsTableBody";
import DashboardCommonHeader from "../common/DashboardCommonHeader";

const RecentProjects = () => {
  return (
    <Col xl="8" md="12" className="col-xl-70 proorder-md-3 col-md-12 col-xl-5">
      <Card>
        <DashboardCommonHeader title={RecentProject} dropDownFalse />
        <CardBody className="projects p-0">
          <div className="table-responsive theme-scrollbar">
            <div className="dataTables_wrapper">
              <Table
                className="display overflow-hidden w-100 dataTable"
                id="recent-product"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Started</th>
                    <th>Finished</th>
                    <th>Progress</th>
                    <th className="px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <RecentProjectsTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentProjects;
