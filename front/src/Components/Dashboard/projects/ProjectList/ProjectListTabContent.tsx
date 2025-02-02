import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Card, CardBody, Row, TabContent, TabPane, Spinner } from "reactstrap";
import { CommonProjectListCard } from "../Common/CommonProjectListCard";
import { useEffect } from "react";
import { fetchProjects } from "@/Redux/Reducers/ProjectSlice";

const ProjectListTabContent = () => {
  const { activeTab, projectsData, loading } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();

  // Ensure projectsData is an array
  const hasProjects = Array.isArray(projectsData) && projectsData.length > 0;

  // Define badge filter mapping
  const badgeMapping: Record<string, (item?: { status: string }) => boolean> = {
    "1": () => true, // All projects
    "2": (item) => item?.status === "pending", // Pending projects
    "3": (item) => item?.status === "in progress", // Projects in progress
    "4": (item) => item?.status === "completed", // Completed projects
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Card>
      <CardBody>
        <TabContent activeTab={activeTab}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner color="primary" />
            </div>
          ) : hasProjects ? (
            (Object.keys(badgeMapping) as (keyof typeof badgeMapping)[]).map(
              (tabId) => (
                <TabPane tabId={tabId} key={tabId}>
                  <Row>
                    {projectsData
                      .filter((item) => badgeMapping[tabId](item))
                      .map((item, index) => (
                        <CommonProjectListCard
                          item={item}
                          key={item._id || item.name || index}
                        />
                      ))}
                  </Row>
                </TabPane>
              )
            )
          ) : (
            <p className="text-center pt-3 pb-5">
              <strong>No Projects Found</strong>
            </p>
          )}
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default ProjectListTabContent;