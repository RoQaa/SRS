import { Field, ErrorMessage } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import {
  ClientName,
  ClientNamePlaceholder,
  ProjectTitle,
  ProjectTitlePlaceholder,
} from "@/Constant";

export const TitleAndClientSection = ({ lang = "en" }) => {
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>
              {lang === "en" ? ProjectTitle : ProjectTitle + " " + "(Arabic)"}
            </Label>
            <Field
              name={lang === "en" ? "title" : "title_ar"}
              type="text"
              className="form-control"
              placeholder={ProjectTitlePlaceholder}
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
      <Row>
        <Col>
          <FormGroup>
            <Label check>
              {lang === "en" ? ClientName : ClientName + " " + "(Arabic)"}
            </Label>
            <Field
              name={lang === "en" ? "client" : "client_ar"}
              className="form-control"
              type="text"
              placeholder={ClientNamePlaceholder}
            />
            {lang === "en" ? (
              <ErrorMessage
                name="client"
                component="span"
                className="text-danger"
              />
            ) : (
              <ErrorMessage
                name="client_ar"
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
