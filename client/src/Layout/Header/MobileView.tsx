import Link from "next/link";
import { Col } from "reactstrap";

export const MobileView = () => {
  

  return (
    <Col className="header-logo-wrapper col-auto">
      <div className="logo-wrapper">
        <Link href={`/dashboard`}>
          <img className="img-fluid for-light" src="/imgs/Clicks-White.svg" alt="" />
          <img className="img-fluid for-dark" src="/imgs/Clicks-White.svg" alt="" />
        </Link>
      </div>
    </Col>
  );
};
