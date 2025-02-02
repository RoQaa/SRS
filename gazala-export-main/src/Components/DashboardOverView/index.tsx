import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "reactstrap";
import ProjectStatusCard from "./ProjectStatusCard";
import RecentProjectsCard from "./RecentProjectsTable.tsx";
import RecentNewsCard from "./RecentNewsTable.tsx";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProjects } from "@/Redux/Reducers/ProjectSlice";
import { stringToTitleCase } from "@/utils/stringToTitleCase";
import { fetchNews } from "@/Redux/Reducers/NewsSlice";
// import VisitorTransactionChart from "./VisitorTransactionChart ";

const DashboardOverView = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.project.loading);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchNews());
  }, [dispatch]);

  // Safely access user data with optional chaining
  const userName = user
    ? `${stringToTitleCase(user.fName)} ${stringToTitleCase(user.lName)}`
    : "User";

  return (
    <Container className="dashboard-2">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          <Row>
            <Col sm="12">
              <Card>
                <p className="px-3 pt-3" style={{ fontSize: "13px" }}>
                  <strong>Hello {userName}, </strong>
                  <span style={{ fontSize: "12px", color: "#555555" }}>
                    Welcome To Gazala Dashboard
                  </span>
                </p>
              </Card>
            </Col>
          </Row>
          <Row>
            <ProjectStatusCard />
            <RecentProjectsCard />
            <RecentNewsCard />
            {/* <VisitorTransactionChart /> */}
          </Row>
        </>
      )}
    </Container>
  );
};

export default DashboardOverView;
