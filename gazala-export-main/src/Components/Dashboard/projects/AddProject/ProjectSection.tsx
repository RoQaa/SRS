import { Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import {
  ProjectStatus,
  ProjectProgress,
  ProjectProgressPlaceholder,
} from "@/Constant";

export const ProjectSection = () => {
  return (
    <Row>
      <Col sm="4">
        <FormGroup>
          <Label check>{ProjectProgress}</Label>
          <Field
            name="projectProgress"
            className="form-control"
            type="number"
            placeholder={ProjectProgressPlaceholder}
          />
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup>
          <Label check>{ProjectStatus}</Label>
          <Field name="status" as="select" className="form-control form-select">
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </Field>
        </FormGroup>
      </Col>
      <Col sm="4">
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
      </Col>
    </Row>
  );
};
