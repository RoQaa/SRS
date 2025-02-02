import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const TitleSection = ({ lang = "en" }) => {
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>{lang === "en" ? "Title" : "Title (Arabic)"}</Label>
            <Field
              name={lang === "en" ? "title" : "title_ar"}
              type="text"
              className="form-control"
              placeholder={"Enter Title"}
            />
            {lang === "en" ? (
              <ErrorMessage
                name="title"
                component="span"
                className="text-danger"
              />
            ) : (
              <ErrorMessage
                name="title_ar"
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
