import "./style.scss";
import { FormField, Button, Alert } from "../../../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { IRegisterField } from "../../../interfaces/form/register.interface";
import { useMutation } from "react-query";
import { registerService } from "../../../services/auth.service";
import useAlert, { IUseAlert } from "../../../hooks/useAlert";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IRegisterField>();
  
  const navigate= useNavigate();
  const { isAlertOpen,onOpenAlert,onCloseAlert } = useAlert() as IUseAlert;
  
  const registerMutation = useMutation({
      mutationFn: registerService,
      mutationKey:'register-request'
  })
  const submitHandler: SubmitHandler<IRegisterField> = async (formData) => {
     try {
        const { status } = await registerMutation.mutateAsync(formData);
        if(status === 'success') {
           navigate("/auth");
           reset();
        }
     } catch(err:any){
       const { response:{  data } } = err;
       onOpenAlert(data.message,'error');
     } finally {
       setTimeout(()=> onCloseAlert() , 4500);
     }
  }

  return (
    <div className="register-form-container">
      <div className="register-title-container">
        <h3>Create Your Account</h3>
        <p>Sign Up and start your book management journey.</p>
      </div>

      {isAlertOpen && (
        <div className="mt-3">
          <Alert />
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="register-form">
        <FormField
            name="name"
            type="text"
            label="Username"
            placeholder="Username"
            register={register}
            error={errors.email?.message}
          />
          <FormField
            name="email"
            type="email"
            label="Email Address"
            placeholder="Email Address"
            register={register}
            error={errors.email?.message}
          />
          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
           <FormField
            name="confirm"
            type="password"
            label="Confirm"
            placeholder="Confirm"
            register={register}
            error={errors.confirm?.message}
          />

          <Button isDisabled={false} title="Sign Up"/>
        </form>

        <p className="action-redirect mt-2">
            Already have account? <Link to="/auth">Sign In</Link>
        </p>
    </div>
  );
};

export default Register;
