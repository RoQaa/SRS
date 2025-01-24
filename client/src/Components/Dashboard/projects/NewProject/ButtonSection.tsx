import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

interface ButtonSectionProps {
  slug: string;
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ slug = "" }) => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">
            {slug ? "Update" : "Create"}
          </Button>
          <Link
            className="btn btn-danger"
            href={`${process.env.NEXT_PUBLIC_URI}/dashboard/projects`}
          >
            Cancel
          </Link>
        </div>
      </Col>
    </Row>
  );
};
