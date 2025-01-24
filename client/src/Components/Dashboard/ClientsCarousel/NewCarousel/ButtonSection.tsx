import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

export const ButtonSection = ({ id = "" }: { id: string }) => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button type="submit" color="success" className="me-3">
            {id ? "Update" : "Create"}
          </Button>
          <Link
            className="btn btn-danger"
            href={`${process.env.NEXT_PUBLIC_URI}/dashboard/edit-home/clients-carousel`}
          >
            Cancel
          </Link>
        </div>
      </Col>
    </Row>
  );
};
