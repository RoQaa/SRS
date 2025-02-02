import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";

export const TitleSectionGlobal = ({ lang = "en", name="name", name_ar="name_ar", title="title" }) => {
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>{lang === "en" ? title : `${title} (Arabic)`}</Label>
            <Field
              name={lang === "en" ? name : name_ar}
              type="text"
              className="form-control"
              placeholder={"Enter Name"}
            />
            {lang === "en" ? (
              <ErrorMessage
                name={name}
                component="span"
                className="text-danger"
              />
            ) : (
              <ErrorMessage
                name={name_ar}
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
