import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../account/component/validations";
import { Link, useNavigate } from "react-router-dom";
import "../../../../styles/account/LoginPage.css";
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,  
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
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please check your credentials.");
      }

      const result = await response.json();
      console.log("Login successful:", result);
      reset();

     
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error during login:", error);
      setError("root", { message: error.message });
    }
  };

  return (
    <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="emailOrUsername">Username </Label>
        <Input
          register={register}
          name="emailOrUsername"
          placeholder=" Enter username "
        />
        {errors.emailOrUsername && (
          <FormErrorMessage>{errors.emailOrUsername.message}</FormErrorMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <PasswordInput register={register} name="password" placeholder="Enter your password" />
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