import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../libs/validations";
import { Link } from "react-router-dom";
import "../../styles/LoginPage.css";
import FormField from "../../components/ui/FormField";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import FormErrorMessage from "../../components/ui/FormErrorMessage";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    // setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    reset();
    // setError("root");
  };

  return (
    <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="emailOrUsername">Username or Email</Label>
        <Input
          register={register}
          name="emailOrUsername"
          placeholder="Username or Email"
        />
        {errors.emailOrUsername && (
          <FormErrorMessage>{errors.emailOrUsername.message}</FormErrorMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <PasswordInput register={register} name="password" placeholder="Your password" />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormField>
      <Button type="submit">{isSubmitting ? "Loading..." : "Login"}</Button>
      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}
      <Link to="/forgot-password">Lost your password?</Link>
    </form>
  );
};

export default LoginForm;