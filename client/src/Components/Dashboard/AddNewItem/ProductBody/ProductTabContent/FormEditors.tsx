import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Card, CardBody, Label } from "reactstrap";
import { setFormValue } from "@/Redux/Reducers/AddNewsSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { NewsCONTENT, NewsCONTENT_AR } from "@/Constant";

interface EditorProps {
  contentName: string;
  lang: string;
}

const Editor: React.FC<EditorProps> = ({ contentName, lang = "en" }) => {
  const { formValue } = useAppSelector((state) => state.addNews);
  const dispatch = useAppDispatch();

  const handleEditorChange = (event: unknown, editor: ClassicEditor) => {
    const data = editor.getData();
    dispatch(setFormValue({ name: contentName, value: data }));
  };

  return (
    <Card>
      <CardBody>
        <Label className="mb-1" check>
          {lang === "ar" ? NewsCONTENT_AR : NewsCONTENT}
          <span className="txt-danger"> *</span>
        </Label>
        <div
          style={{
            width: "100%",
            height: "400px",
            overflow: "auto"
          }
          }
        >
          <CKEditor
            editor={ClassicEditor}
            data={formValue[contentName]}
            onChange={handleEditorChange}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Editor;
