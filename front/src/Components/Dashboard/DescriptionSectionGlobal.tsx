import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
export const DescriptionSectionGlobal = ({ lang = "en", label="Description", name="description", name_ar="description_ar" }) => {
  return (
    <Row>
      <Col>
        <FormGroup>
          <Label check>
            {lang === "en"
              ? label
              : label + " " + "(Arabic)"}
          </Label>
          <Field
            name={lang === "en" ? name : name_ar}
            as="textarea"
            className="form-control"
            rows={3}
          />
          <ErrorMessage
            name={lang === "en" ? name : name_ar}
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
    </Row>
  );
};
