import { useAppDispatch } from "@/Redux/Hooks";
import { setActiveTab } from "@/Redux/Reducers/ValuesSlice";
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Target } from "react-feather";
import { Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

interface ValuesListHeadProps {
  activeTab: string;
}

export const ValuesListHead: React.FC<ValuesListHeadProps> = ({
  activeTab,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Card>
      <Row>
        <Col md="6" className="p-0 d-flex">
          <Nav tabs className="border-tab" id="top-tab">
            <NavItem>
              <NavLink
                href="#"
                className={activeTab === "1" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("1"))}
              >
                <Target />
                All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={activeTab === "2" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("2"))}
              >
                <CheckCircle />
                Published
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={activeTab === "3" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("3"))}
              >
                <Info />
                Unpublished
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md="6" className="text-end">
          <Link
            className="btn btn-primary"
            href={`${process.env.NEXT_PUBLIC_URI}/dashboard/edit-home/values/add`}
          >
            <PlusSquare />
            Add Value
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ValuesListHead;
