import React, { useState } from 'react'; // Add useState here
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

  const [success, setSuccess] = useState(null); // Added success state

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/v1/login`, data);

      console.log("Login successful:", response.data);

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Set the success message
      setSuccess("You have logged in successfully!");

      // Optionally, you can also redirect the user to the dashboard or home page after login
      reset();
    } catch (error) {
      console.error("Error during login:", error);
      setError("root", { message: error.response?.data?.message || "Failed to login. Please try again." });
      setSuccess(null); // Reset success message if login fails
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
      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}
      {success && <p className="success-message">{success}</p>} {/* Success message */}
      <Link to="/forgot-password">Lost your password?</Link>
    </form>
  );
};

export default LoginForm;
