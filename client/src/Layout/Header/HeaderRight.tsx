import { Col } from "reactstrap";
import { DarkMode } from "./DarkMode";
import { Profile } from "./Profile";
// import Languages from "./Languages";
// import MaximizeScreen from "./MaximizeScreen";

export const HeaderRight = () => {
  return (
    <Col xxl="8" xl="6" md="7" xs="8" className="nav-right pull-right right-header p-0 ms-auto">
      <ul className="nav-menus">
        {/* <MaximizeScreen /> */}
        <li style={{display:"none", background:"none"}}></li>
        <li style={{display:"none", background:"none"}}></li>
        <li style={{display:"none", background:"none"}}></li>
        <DarkMode />
        <li style={{display:"none", background:"none"}}></li>
        {/* <Languages/> */}
        <li style={{display:"none", background:"none"}}></li>
        <li style={{display:"none", background:"none"}}></li>
        <li style={{display:"none", background:"none"}}></li>
        <Profile/>
      </ul>
    </Col>
  );
};
