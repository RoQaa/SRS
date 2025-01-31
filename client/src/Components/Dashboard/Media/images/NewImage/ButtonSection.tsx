import { useLocale } from "next-intl";
import Link from "next/link";
import { Button, Col, Row } from "reactstrap";

export const ButtonSection = ({
  id = "",
  type,
}: {
  id: string;
  type: string;
}) => {
  const locale = useLocale();
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
              type === "Image"
                ? `${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/media/images/`
                : `${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/media/videos/`
            }
          >
            Cancel
          </Link>
        </div>
      </Col>
    </Row>
  );
};
