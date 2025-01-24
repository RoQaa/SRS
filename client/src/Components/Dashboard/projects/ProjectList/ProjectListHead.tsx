import { All, CreateNewProject, Href } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setActiveTab } from "@/Redux/Reducers/ProjectSlice";
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Target } from "react-feather";
import {
  Card,
  Col,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";

export const ProjectListHead = () => {
  const { activeTab } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <Row>
        <Col md="6" className="p-0 d-flex">
          <Nav tabs className="border-tab" id="top-tab">
            <NavItem>
              <NavLink
                href={Href}
                className={activeTab === "1" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("1"))}
              >
                <Target />
                {All}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={activeTab === "2" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("2"))}
              >
                <Info />
                Pending
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={activeTab === "3" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("3"))}
              >
                <Info />
                In Progress
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={activeTab === "4" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("4"))}
              >
                <CheckCircle />
                Completed
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md="6">
          <FormGroup className="m-0 me-0"></FormGroup>
          <Link
            className="btn btn-primary"
            href={`${process.env.NEXT_PUBLIC_URI}/dashboard/projects/add`}
            prefetch={true}
          >
            <PlusSquare />
            {CreateNewProject}
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
