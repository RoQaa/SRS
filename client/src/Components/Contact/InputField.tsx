interface InputFieldProps {
  id: string;
  name: string
  label: string;
  type: string; // could use more specific types if known, like "text" | "email" | "password" | etc.
  placeholder?: string; // optional
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
      name={name}
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
