import { Col, Form, Input, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddScopeSlice";

interface ScopeFormValue {
  service: string;
  details: string;
  service_ar: string;
  details_ar: string;
}

const ScopeOne = ({
  titleName = "service",
  contentName = "details",
  lang = "en",
}: {
  titleName?: keyof ScopeFormValue;
  contentName?: keyof ScopeFormValue;
  lang?: "en" | "ar";
}) => {
  const { formValue } = useAppSelector((state) => state.addScope);
  const dispatch = useAppDispatch();

  // Regular expressions for validation
  const isArabicText = (text: string) =>
    /^[\u0600-\u06FF0-9\s.,،؛:؟!"'()\[\]{}\-…&a-zA-Z]+$/u.test(text);
  

  const isEnglishText = (text: string) =>
    /^[A-Za-z0-9\s.,:;!?'"()\[\]{}\-…&]+$/u.test(text);

  const validateInput = (text: string) => {
    if (lang === "ar") {
      return isArabicText(text);
    } else {
      return isEnglishText(text);
    }
  };

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          {/* Service title */}
          <Col xs="12">
            <Label className="m-0" check>
              {lang === "ar" ? ScopeService_AR : ScopeService}
              <span className="txt-danger"> *</span>
            </Label>
          </Col>
          <Col xs="12">
            <div className="custom-input">
              <Input
                type="text"
                name={titleName}
                className={
                  formValue[titleName] && validateInput(formValue[titleName])
                    ? "valid"
                    : "is-invalid"
                }
                required
                value={formValue[titleName]}
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: titleName, value: e.target.value })
                  )
                }
              />
              {formValue[titleName] && !validateInput(formValue[titleName]) && (
                <small className="text-danger">
                  {lang === "ar"
                    ? "Please enter the text in Arabic with valid punctuation."
                    : "Please enter the text in English with valid punctuation."}
                </small>
              )}
            </div>
          </Col>

          {/* Service details textarea */}
          <Col xs="12">
            <Label className="m-0" check>
              {lang === "ar" ? "Service Details (Arabic)" : "Service Details"}
            </Label>
          </Col>
          <Col xs="12">
            <div className="custom-input">
              <Input
                type="textarea"
                name={contentName}
                className={
                  formValue[contentName] &&
                  validateInput(formValue[contentName])
                    ? "valid"
                    : "is-invalid"
                }
                required
                value={formValue[contentName]}
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: contentName, value: e.target.value })
                  )
                }
              />
              {formValue[contentName] &&
                !validateInput(formValue[contentName]) && (
                  <small className="text-danger">
                    {lang === "ar"
                      ? "Please enter the text in Arabic with valid punctuation."
                      : "Please enter the text in English with valid punctuation."}
                  </small>
                )}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ScopeOne;

export const ScopeService = "Service";
export const ScopeService_AR = "Service (Arabic)";
