import { Col, Form, Input, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/EditScopeSlice";
import { useEffect } from "react";

export interface ScopeFormValue {
  service: string;
  details: string;
  service_ar: string;
  details_ar: string;
}

type ScopeOneProps = {
  titleName: keyof ScopeFormValue;
  contentName: keyof ScopeFormValue;
  lang: "en" | "ar";
};

const ScopeOne = ({
  titleName = "service",
  contentName = "details",
  lang = "en",
}: ScopeOneProps) => {
  const { formValue } = useAppSelector((state) => state.editScope);
  const dispatch = useAppDispatch();

  // Validation regular expressions
  const isArabicText = (text: string) =>
    /^[\u0600-\u06FF0-9\s.,،؛:؟!"'()\[\]{}\-…&]+$/u.test(text); // Arabic letters and punctuation
  const isEnglishText = (text: string) =>
    /^[A-Za-z0-9\s.,:;!?'"()\[\]{}\-…&]+$/u.test(text); // English letters and punctuation

  const validateInput = (text: string) => {
    if (lang === "ar") {
      return isArabicText(text);
    } else {
      return isEnglishText(text);
    }
  };

  useEffect(() => {
    // Initialize form fields if they are not set
    if (formValue && formValue[titleName] === undefined) {
      dispatch(setFormValue({ name: titleName, value: "" }));
    }
    if (formValue && formValue[contentName] === undefined) {
      dispatch(setFormValue({ name: contentName, value: "" }));
    }
  }, [formValue, dispatch, titleName, contentName]);

  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          {/* Title input */}
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
                value={formValue[titleName] || ""}
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: titleName, value: e.target.value })
                  )
                }
              />
              {formValue[titleName] && !validateInput(formValue[titleName]) && (
                <small className="text-danger">
                  {lang === "ar"
                    ? "Please enter a valid Arabic title."
                    : "Please enter a valid English title."}
                </small>
              )}
            </div>
          </Col>

          {/* Content textarea */}
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
                value={formValue[contentName] || ""}
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
                      ? "Please enter valid Arabic details."
                      : "Please enter valid English details."}
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
