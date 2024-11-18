import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../account/component/validations";
import { useForm } from "react-hook-form";
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import PasswordInput from "../../account/component/PasswordInput";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";
<<<<<<< HEAD


const NewPasswordPage = () => {
=======
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

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
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
<<<<<<< HEAD
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to reset password. Please try again.");
      }

      const result = await response.json();
      console.log("Password reset successful:", result);
      // Optionally, navigate to login page or show success message
    } catch (error) {
      console.error("Error resetting password:", error);
      // Optionally, display an error message to the user
=======
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
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    }
  };

  return (
    <div className="form_container">
<<<<<<< HEAD
      <h2 className="form-heading">Forgot password?</h2>
      <p className="form-description">Your new password must be different from the previously used password.</p>
=======
      <h2 className="form-heading">Forgot Password?</h2>
      <p className="form-description">Your new password must be different from the previously used password.</p>
      {error && <p className="form-error">{error}</p>}
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="password">New Password</Label>
          <PasswordInput register={register} name="password" placeholder="New Password" />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormField>
        <FormField>
<<<<<<< HEAD
          <Label htmlFor="confirmPassword">Re-enter password</Label>
          <PasswordInput register={register} name="confirmPassword" placeholder="Re-enter password" />
=======
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput register={register} name="confirmPassword" placeholder="Confirm Password" />
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Reset Password"}</Button>
      </form>
    </div>
<<<<<<< HEAD
  )
}

export default NewPasswordPage
=======
  );
};

export default NewPasswordPage;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
