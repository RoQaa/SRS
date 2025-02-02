import { Button, Col, Row, Spinner } from "reactstrap";

interface ButtonSectionProps {
  loading: boolean;
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ loading }) => {
  return (
    <Row>
      <Col>
        <div className="text-end">
          <Button
            type="submit"
            color={loading ? "secondary" : "primary"}
            className="me-3"
            disabled={loading}
          >
            {loading ? (
              <>
                Saving... <Spinner size="sm" />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </Col>
    </Row>
  );
};
