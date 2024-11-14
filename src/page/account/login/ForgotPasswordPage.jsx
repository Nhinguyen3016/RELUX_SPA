import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import Input from "../../account/component/Input";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";
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
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
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
    }
  };

  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot password?</h2>
      <p className="form-description">
        Don’t worry! It happens. Please enter the email address associated with your account.
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            register={register}
            name="email"
            type="email"
            placeholder="youremail@example.com"
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Send code"}</Button>
        {errors.root && (
          <FormErrorMessage>{errors.root.message}</FormErrorMessage>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
