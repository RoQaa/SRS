import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const TitleSection = ({ lang = "en" }) => {
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>{lang === "en" ? "Name" : "Name (Arabic)"}</Label>
            <Field
              name={lang === "en" ? "name" : "name_ar"}
              type="text"
              className="form-control"
              placeholder={"Product Name"}
            />
            {lang === "en" ? (
              <ErrorMessage
                name="name"
                component="span"
                className="text-danger"
              />
            ) : (
              <ErrorMessage
                name="name_ar"
                component="span"
                className="text-danger"
              />
            )}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};
