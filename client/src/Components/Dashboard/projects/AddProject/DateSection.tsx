/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";

export const DateSection = ({  startDate, endDate }: any) => {
  const validateDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : new Date();
  };

  return (
    <Row>
      <Col sm="6">
        <FormGroup className="d-flex flex-column align-items-stretch">
          <Label check>Start Date</Label>
          <Field name="startDate">
            {({ field, form }: any) => (
              <DatePicker
                className="datepicker-here form-control"
                selected={validateDate(field.value || startDate)}
                onChange={(date: Date) => {
                  form.setFieldValue("startDate", date);
                }}
              />
            )}
          </Field>
          <ErrorMessage
            name="startDate"
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup className="d-flex flex-column align-items-stretch">
          <Label check>End Date</Label>
          <Field name="endDate">
            {({ field, form }: any) => (
              <DatePicker
                className="datepicker-here form-control"
                selected={validateDate(field.value || endDate)}
                onChange={(date: Date) => {
                  form.setFieldValue("endDate", date);
                }}
              />
            )}
          </Field>
          <ErrorMessage
            name="endDate"
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
    </Row>
  );
};
