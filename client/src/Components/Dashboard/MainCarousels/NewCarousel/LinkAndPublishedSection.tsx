import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const LinkAndPublishedSection = () => {
  return (
    <Row>
      <Col sm="6">
        <FormGroup>
          <Label>Publish</Label>
          <Field
            name="publish"
            as="select"
            className="form-control form-select"
          >
            <option value="true">Publish</option>
            <option value="false">Un Publish</option>
          </Field>
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <Label check>Link</Label>
          <Field
            name="link"
            type="text"
            className="form-control"
            placeholder="Enter Button Link"
          />
          <ErrorMessage name="link" component="span" className="text-danger" />
        </FormGroup>
      </Col>
    </Row>
  );
};
