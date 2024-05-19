import "./style.scss";
import { ILoginField } from "../../../interfaces/form/login.interface";
import { Button, FormField, Alert } from "../../../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../../services/auth.service";
import useAlert, { IUseAlert } from "../../../hooks/useAlert";
import useAuth, { IUseAuth } from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginField>();

  const navigate = useNavigate();

  const { onOpenAlert, onCloseAlert, isAlertOpen } = useAlert() as IUseAlert;
  const { onLogin, token } = useAuth() as IUseAuth;

  const loginMutation = useMutation({
    mutationKey: "login-request",
    mutationFn: loginService,
  });

  const submitHandler: SubmitHandler<ILoginField> = async (formData) => {
    try {
      const { data,status } = await loginMutation.mutateAsync(
        formData
      );
      if (status === "success") {
        onLogin(data?.access_token);
        window.location.href="/";
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      onOpenAlert(data.message, "error");
    } finally {
      setTimeout(() => {
        onCloseAlert();
      }, 4500);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-title-container">
        <h3>Welcome Back</h3>
        <p>Enter your email and password to log in</p>
      </div>

      {isAlertOpen && (
        <div className="mt-3">
          <Alert />
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="login-form">
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

        <Button isDisabled={loginMutation.isLoading} title="Sign In" />
      </form>
      <p className="action-redirect mt-2">
        Don't have account? <Link to="/auth/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
