import { useAppDispatch } from "@/Redux/Hooks";
import { setActiveTab } from "@/Redux/Reducers/UserSlice";
import { useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Users } from "react-feather";
import { Button, Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

interface UsersListHeadProps {
  activeTab: string;
}

export const UsersListHead: React.FC<UsersListHeadProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
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
                <Users />
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
                Admins
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={activeTab === "3" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("3"))}
              >
                <Info />
                Editors
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                href="#"
                className={activeTab === "3" ? "active" : ""}
                onClick={() => dispatch(setActiveTab("4"))}
              >
                <Info />
                Viewers
              </NavLink>
            </NavItem> */}
          </Nav>
        </Col>
        <Col>
          <Button className="float-end" color="primary">
            <Link
              href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/users/add`}
              className="text-white text-light"
            >
              <PlusSquare className="me-1" />
              Add User
            </Link>
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UsersListHead;
