import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { EnterSomeDetails } from "@/Constant";

export const DescriptionSection = ({ lang = "en" }) => {
  return (
    <Row>
      <Col>
        <FormGroup>
          <Label check>
            {lang === "en"
              ? EnterSomeDetails
              : EnterSomeDetails + " " + "(Arabic)"}
          </Label>
          <Field
            name={lang === "en" ? "description" : "description_ar"}
            as="textarea"
            className="form-control"
            rows={3}
            placeholder="Enter Description"
          />
          <ErrorMessage
            name={lang === "en" ? "description" : "description_ar"}
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
    </Row>
  );
};
