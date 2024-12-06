import React, { useState } from 'react'; 
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const loginSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [success, setSuccess] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null); // For displaying error message

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/v1/login`, data);

      console.log("Login successful:", response.data);

      // Log the response to see if the token is present
      if (response.data && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;

        // Save tokens to localStorage
        if (accessToken) {
          localStorage.setItem('authToken', accessToken);
          console.log("Access token saved:", accessToken);  // Log token for verification
        }

        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
          console.log("Refresh token saved:", refreshToken);  // Log refresh token for verification
        }

        setSuccess("You have logged in successfully!");
        setErrorMessage(null);  // Clear previous error message if any
        reset();  // Reset form fields
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
        console.error("No token in the response:", response.data);  // Log to debug
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("root", { message: error.response?.data?.message || "Failed to login. Please try again." });
      setSuccess(null);  // Clear success message if login fails
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input register={register} name="username" placeholder=" " />
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
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
      
      {/* Show root error message */}
      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}

      {/* Show error message if any */}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      {/* Success message */}
      {success && <p className="success-message">{success}</p>}

      <Link to="/forgot-password">Lost your password?</Link>
    </form>
  );
};

export default LoginForm;
