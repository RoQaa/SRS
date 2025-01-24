import SVG from "@/CommonComponent/SVG";
import { EditScopeNav } from "@/Data/Application/Ecommerce"; // Adjusted to use editScopeNav data
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId } from "@/Redux/Reducers/EditScopeSlice"; // Updated to use EditScopeSlice
import { Col, Nav, NavItem, NavLink } from "reactstrap";

const EditScopeSidebar = () => {
  // Renamed to reflect editing scope
  const { navId } = useAppSelector((state) => state.editScope); // Accessing the editScope state
  const dispatch = useAppDispatch();

  return (
    <Col
      xxl="3"
      xl="4"
      className="box-col-4e sidebar-left-wrapper mb-2 edit-product-tab"
    >
      <Nav pills className="sidebar-left-icons border-0" tabs>
        {EditScopeNav.map((data, i) => (
          <NavItem key={i}>
            <NavLink
              className="border-0"
              active={navId === data.id}
              onClick={() => dispatch(setNavId(data.id))}
            >
              <div className="nav-rounded">
                <div className="product-icons">
                  <SVG className="stroke-icon" iconId={data.icon} />
                </div>
              </div>
              <div className="product-tab-content">
                <h5>{data.title}</h5>
                <p>{data.detail}</p>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default EditScopeSidebar;
