import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const LinkSection = () => {
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>Video Link</Label>
            <Field
              name="video"
              type="text"
              className="form-control"
              placeholder={"Enter Video Link"}
            />
            <ErrorMessage
              name="video"
              component="span"
              className="text-danger"
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};
