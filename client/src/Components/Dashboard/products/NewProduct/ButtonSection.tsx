import { Add, Cancel } from "@/Constant";
import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

export const ButtonSection = () => {
  

  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">{Add}</Button>
          <Link className="btn btn-danger" href={`${process.env.NEXT_PUBLIC_URI}/dashboard/products`}>{Cancel}</Link>
        </div>
      </Col>
    </Row>
  );
};
