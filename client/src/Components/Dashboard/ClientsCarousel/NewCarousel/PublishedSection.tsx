import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const PublishedSection = () => {
  return (
    <Row>
      <Col sm="6">
        <FormGroup>
          <Label>Publish</Label>
          <Field
            name="published"
            as="select"
            className="form-control form-select"
          >
            <option value="true">Publish</option>
            <option value="false">Un Publish</option>
          </Field>
        </FormGroup>
        <ErrorMessage
          name="published"
          component="span"
          className="text-danger"
        />
      </Col>
    </Row>
  );
};
