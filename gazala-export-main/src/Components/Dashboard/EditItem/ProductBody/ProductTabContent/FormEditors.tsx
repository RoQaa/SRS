import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Card, CardBody } from "reactstrap";
import { setFormValue } from "@/Redux/Reducers/EditNewsSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";


interface EditorProps {
  contentName: string; 
}

const Editor: React.FC<EditorProps> = ({ contentName }) => {
  const { formValue } = useAppSelector((state) => state.editNews);
  const dispatch = useAppDispatch();

  const handleEditorChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any, 
    editor: ClassicEditor
  ) => {
    const data = editor.getData(); // Get the editor data

    // Dispatch action to update form value in Redux store
    dispatch(setFormValue({ name: contentName, value: data }));
  };

  return (
    <Card>
      <CardBody>
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
            data={formValue[contentName]} // Bind the data from formValue
            onChange={handleEditorChange} // Handle change event
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Editor;
