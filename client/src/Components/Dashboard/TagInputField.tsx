/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from "formik";
import { TagsInput } from "react-tag-input-component";
import { FormGroup, Label } from "reactstrap";

export const TagsInputField = ({
  name,
  value,
  placeholder,
  validation,
  setFieldValue,
  touched,
  errors,
}: {
  name: string;
  value: string[];
  placeholder: string;
  validation?: (tag: string) => boolean;
  setFieldValue: any;
  touched: any;
  errors: any;
}) => (
  <FormGroup>
    <Label for={name}>{placeholder}</Label>
    <Field
      name={name}
      render={({ field }: any) => (
        <TagsInput
          {...field}
          disableBackspaceRemove
          value={value}
          onChange={(newSelected) => setFieldValue(name, newSelected)}
          beforeAddValidate={validation}
          placeHolder={`Enter ${placeholder.toLowerCase()}`}
          allowDuplicates
        />
      )}
    />
    {touched[name] && errors[name] && (
      <div className="text-danger">{errors[name]}</div>
    )}
  </FormGroup>
);