import { useAppDispatch } from "@/Redux/Hooks";
import { setActiveTab } from "@/Redux/Reducers/ProductsSlice"; // Update to ProductsSlice
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Target } from "react-feather";
import { Card, Col, Nav, NavItem, NavLink, Row } from "reactstrap";

interface ProductsListHeadProps {
  activeTab: string;
}

export const ProductsListHead: React.FC<ProductsListHeadProps> = ({
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
                Un Published
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md="6" className="text-end">
          <Link className="btn btn-primary" href={`/dashboard/products/add`}>
            <PlusSquare />
            Create Product
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductsListHead;
