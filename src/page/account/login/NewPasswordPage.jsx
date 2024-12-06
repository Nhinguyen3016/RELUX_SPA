import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../account/component/validations";
import { useForm } from "react-hook-form";
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import PasswordInput from "../../account/component/PasswordInput";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Get email and token from localStorage
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("resetToken");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/v1/password/reset-password`, {
        token,           // Include token in the request
        newPassword: data.password,  // Send new password
        email,           // Include email in the request
      });

      if (response.status === 200) {
        console.log("Password reset successful:", response.data);
        navigate('/change-success');
      } else {
        throw new Error("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot Password?</h2>
      <p className="form-description">Your new password must be different from the previously used password.</p>
      {error && <p className="form-error">{error}</p>}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="password">New Password</Label>
          <PasswordInput register={register} name="password" placeholder="New Password" />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput register={register} name="confirmPassword" placeholder="Confirm Password" />
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Reset Password"}</Button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
