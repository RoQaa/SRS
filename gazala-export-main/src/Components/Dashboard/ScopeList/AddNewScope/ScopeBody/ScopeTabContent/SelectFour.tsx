import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddScopeSlice";
import { Col, Input, Label, Row } from "reactstrap";

const SelectFour = () => {
  const dispatch = useAppDispatch();
  const { formValue } = useAppSelector((state) => state.addScope);

  const handleStatus = (select: string) => {
    dispatch(setFormValue({ name: "published", value: select }));
  };

  return (
    <Col sm="6">
      <Row>
        <Col xs="12">
          <Label for="validationServer01" check>
            Publish
            <span className="txt-danger"> *</span>
          </Label>
          <Input
            type="select"
            name="published"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={formValue.published}
            onChange={(e) => handleStatus(e.target.value)}
          >
            <option value={"true"}>Publish</option>
            <option value={"false"}>UnPublish</option>
          </Input>
          <p className="f-light">Choose the status</p>
        </Col>
      </Row>
    </Col>
  );
};

export default SelectFour;
