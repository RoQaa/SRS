import { Badge, Col, Progress, Row } from "reactstrap";
import { CommonDropdown } from "../ProjectList/CommonDropdown";
import { IProject } from "@/interfaces/Project.interface";

interface CommonProjectListCardProps {
  item: IProject;
}

export const CommonProjectListCard: React.FC<CommonProjectListCardProps> = ({
  item,
}) => {
  return (
    <Col xxl="6" lg="6" md="12">
      <div
        className={`project-box ${
          item.projectProgress === 100 ? "b-light1-success" : "b-light1-primary"
        }`}
      >
        <CommonDropdown
          projectSlug={item.slug ?? ""}
          projectId={item._id ?? ""}
        />
        <div style={{ position: "absolute", top: "10px", right: "0px" }}>
          <Badge
            color={
              item.status === "completed"
                ? "success"
                : item.status === "pending"
                ? "warning"
                : "primary"
            }
          >
            {item.status}
          </Badge>
        </div>

        <h5 className="fw-bold">{item.title}</h5>
        <div className="d-flex">
          <img
            className="img-100 me-1"
            src={
              `${process.env.NEXT_PUBLIC_API_URL}/${item.images?.[0]}` || ""
            }
            alt={item.title}
            style={{ borderRadius: "8px" }}
          />
          <div className="flex-grow-1 mx-2">
            <Row className="details">
              <Col xs="6">
                <span>Start Date</span>
              </Col>
              <Col
                xs="6"
                className={`txt-${
                  item.status === "completed"
                    ? "success"
                    : item.status === "pending"
                    ? "warning"
                    : "primary"
                }`}
              >
                {new Date(item.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) || ""}
              </Col>
              <Col xs="6">
                <span>End Date</span>
              </Col>
              <Col
                xs="6"
                className={`txt-${
                  item.status === "completed"
                    ? "success"
                    : item.status === "pending"
                    ? "warning"
                    : "primary"
                }`}
              >
                {new Date(item.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) || ""}
              </Col>
              <Col xs="6">
                <span>Client</span>
              </Col>
              <Col
                xs="6"
                className={`txt-${
                  item.status === "completed"
                    ? "success"
                    : item.status === "pending"
                    ? "warning"
                    : "primary"
                }`}
              >
                {item.client}
              </Col>
            </Row>
          </div>
        </div>
        <p>{(item?.description || "").slice(0, 250) + "..."}</p>
        <div className="project-status mt-4">
          <div className="d-flex mb-0">
            <p>{item.projectProgress}%</p>
            <div className="flex-grow-1 text-end">
              <span>Done</span>
            </div>
          </div>
          {item.projectProgress === 100 ? (
            <Progress
              className="sm-progress-bar"
              color="success"
              value={item.projectProgress || ""}
              style={{ height: "5px" }}
            />
          ) : (
            <Progress
              className="sm-progress-bar"
              animated
              striped
              color={"primary"}
              value={item.projectProgress || 0}
              style={{ height: "5px" }}
            />
          )}
        </div>
      </div>
    </Col>
  );
};
