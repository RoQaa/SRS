import { Col, Form, Input, Label, Row } from "reactstrap";
import FormEditors from "./FormEditors";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { NewsTitle, NewsTitle_AR } from "@/Constant";
import { setFormValue } from "@/Redux/Reducers/AddNewsSlice";

const ProductOne = ({
  titleName = "title",
  contentName = "content",
  lang = "en",
}) => {
  const { formValue } = useAppSelector((state) => state.addNews);
  const dispatch = useAppDispatch();

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <Col xs="12">
            <Label className="m-0" check>
              {lang === "ar" ? NewsTitle_AR : NewsTitle}
              <span className="txt-danger"> *</span>
            </Label>
          </Col>
          <Col xs="12">
            <div className="custom-input">
              <Input
                className={formValue[titleName] !== "" ? "valid" : "is-invalid"}
                type="text"
                required
                name={titleName}
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: titleName, value: e.target.value })
                  )
                } 
              />
            </div>
          </Col>
          <FormEditors contentName={contentName} lang={lang} />
        </Row>
      </Form>
    </div>
  );
};

export default ProductOne;
