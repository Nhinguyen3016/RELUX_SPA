

import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../account/component/validations";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import Input from "../../account/component/Input";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send reset code. Please try again.");
      }

      const result = await response.json();
      console.log("Password reset email sent:", result);
      // Optionally, display a success message or redirect the user
    } catch (error) {
      console.error("Error sending password reset request:", error);
      // Optionally, display an error message
    }
  };

  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot password?</h2>
      <p className="form-description">Don’t worry! It happens. Please enter the email address associated with your account.</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            register={register}
            name="email"
            type="email"
            placeholder="truongnhan@gmail.com"
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Send code"}</Button>
      </form>
      <p className="form-link">Remember password? <Link to="/login">Sign in</Link></p>
    </div>
  )
}

export default ForgotPasswordPage