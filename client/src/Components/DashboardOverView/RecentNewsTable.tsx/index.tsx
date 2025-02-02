import { Card, CardBody, Col, Table } from "reactstrap";
import RecentNewsTableBody from "./RecentNewsTableBody";
import DashboardCommonHeader from "../common/DashboardCommonHeader";

const RecentNews = () => {
  return (
    <Col xl="8" md="12" className="col-xl-70 proorder-md-3 col-md-12 col-xl-5">
      <Card>
        <DashboardCommonHeader title={"Recent News"} dropDownFalse />
        <CardBody className="projects p-0">
          <div className="table-responsive theme-scrollbar">
            <div className="dataTables_wrapper">
              <Table
                className="display overflow-hidden w-100 dataTable"
                id="recent-product"
              >
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Content</th>
                  </tr>
                </thead>
                <RecentNewsTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentNews;
