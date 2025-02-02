import { Col, Label, Row } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";

const SelectFive = () => {
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.editNews);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
    dispatch(setFormValue({ name: "date", value: date }));
  };

  return (
    <Col sm="6">
      <Row>
        <Col xs="12">
          <Label for="validationServer01" check>
            Date
          </Label>
          <div className="input-group flatpicker-calender product-date">
            <ReactDatePicker
              className="form-control flatpickr-input"
              selected={formValue.date}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectFive;
