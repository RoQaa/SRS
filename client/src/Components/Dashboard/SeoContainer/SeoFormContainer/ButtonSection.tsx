import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

interface ButtonSectionProps {
  page: string;
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ page = "" }) => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">
            {page ? "Update" : "Create"}
          </Button>
          <Link
            className="btn btn-danger"
            href={`${process.env.NEXT_PUBLIC_URI}/dashboard/seo`}
          >
            Cancel
          </Link>
        </div>
      </Col>
    </Row>
  );
};
