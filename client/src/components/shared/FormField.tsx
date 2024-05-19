
type FormFieldProps = {
  name: string;
  type: string;
  register: any;
  label: string;
  error?: string;
  placeholder: string;
};

const FormField = ({
  name,
  type,
  register,
  label,
  error,
  placeholder,
}: FormFieldProps) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      <input
        className={`${error ? 'err' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value:true,
            message:`${name} field is required`
          },
          validate:(value:string) => {
              if(value && typeof value === 'string' && value.trim().length === 0) {
                 return `${name} field is required`;
              }
          },
          minLength:{
            value: type === "password" ? 8 : 0,
            message:"Password at least have 8 characters"
          }
        })}
      />
     <p className="validation-fail">{error}</p>
    </div>
  );
};

export default FormField;
