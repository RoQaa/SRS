import { Col, Form, Input, Label, Row } from "reactstrap";
import FormEditors from "./FormEditors";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { NewsTitle } from "@/Constant";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";

const ProductOne = ({ titleName = "title", contentName = "content" }) => {
  const { formValue } = useAppSelector((state) => state.editNews);
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <Col xs="12">
            <Label className="m-0" check>
              {NewsTitle} <span className="txt-danger"> *</span>
            </Label>
          </Col>
          <Col xs="12">
            <div className="custom-input">
              <Input
                value={formValue[titleName]}
                className={formValue[titleName] !== "" ? "valid" : "is-invalid"}
                type="text"
                required
                name={titleName} // Use titleName for the name
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: titleName, value: e.target.value })
                  )
                } // Use titleName for dispatch
              />
            </div>
          </Col>
          <FormEditors contentName={contentName} />
        </Row>
      </Form>
    </div>
  );
};

export default ProductOne;
