<<<<<<< HEAD


import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../account/component/validations";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
=======
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import Input from "../../account/component/Input";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";
<<<<<<< HEAD

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
=======
import "../../../styles/account/ForgotPasswordPage.css";

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";

// Define the schema for email validation
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email is too long"),
});

const ResetPasswordPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // useForm hook with zod validation schema
  const {
    register,
    handleSubmit,
    setError,
    reset,
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
<<<<<<< HEAD
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
=======
    resolver: zodResolver(resetPasswordSchema),
  });

  // Submit handler
  const onSubmit = async (data) => {
    try {
      // Send request to reset password API
      const response = await axios.post(`${API_HOST}/v1/password/reset-request`, data);
      console.log("Password reset email sent:", response.data);

      // Reset the form
      reset();

      // Save email to localStorage to use later in the OTP verification
      localStorage.setItem("email", data.email);

      // Redirect to OTP verification page
      navigate("/otp");
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setError("root", { message: error.response?.data?.message || "Failed to send reset code. Please try again." });
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    }
  };

  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot password?</h2>
<<<<<<< HEAD
      <p className="form-description">Don’t worry! It happens. Please enter the email address associated with your account.</p>
      <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
=======
      <p className="form-description">
        Don’t worry! It happens. Please enter the email address associated with your account.
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            register={register}
            name="email"
            type="email"
<<<<<<< HEAD
            placeholder="truongnhan@gmail.com"
=======
            placeholder="youremail@example.com"
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Send code"}</Button>
<<<<<<< HEAD
      </form>
      <p className="form-link">Remember password? <Link to="/login">Sign in</Link></p>
    </div>
  )
}

export default ForgotPasswordPage
=======
        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
