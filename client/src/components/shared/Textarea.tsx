type TextareaProps = {
    name:string;
    placeholder:string;
    label:string;
    register:any;
    error?:string;
}

const Textarea = ({
    name,
    placeholder,
    label,
    register,
    error 
}: TextareaProps) => {
    return (
        <div className="form-item textarea">
            <label>{label}</label>
            <textarea {...register(name,{ required:`${name} field is required` })} placeholder={placeholder} name={name} ></textarea>
            <p className="validation-fail">{error}</p>
        </div>
    )
}

export default Textarea;