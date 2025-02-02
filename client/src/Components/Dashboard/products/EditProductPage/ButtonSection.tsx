import { useLocale } from "next-intl";
import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

export const ButtonSection = () => {
  const locale = useLocale();

  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">Update</Button>
          <Link className="btn btn-danger" href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/products`}>Cancel</Link>
        </div>
      </Col>
    </Row>
  );
};
