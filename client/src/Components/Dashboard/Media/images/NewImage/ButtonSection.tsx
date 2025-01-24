import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

export const ButtonSection = ({
  id = "",
  type,
}: {
  id: string;
  type: string;
}) => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">
            {id ? "Update" : "Create"}
          </Button>
          <Link
            className="btn btn-danger"
            href={
              type === "image"
                ? `${process.env.NEXT_PUBLIC_URI}/dashboard/media/images/`
                : `${process.env.NEXT_PUBLIC_URI}/dashboard/media/videos/`
            }
          >
            Cancel
          </Link>
        </div>
      </Col>
    </Row>
  );
};
