import React, { useState } from 'react';
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3003';

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
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/v1/login`, data);

      console.log("Login successful:", response.data);

      if (response.data && response.data.data) {
        const { accessToken, refreshToken } = response.data.data;

        // Save tokens to localStorage
        if (accessToken) {
          localStorage.setItem('authToken', accessToken);
          console.log("Access token saved:", accessToken);
        }

        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
          console.log("Refresh token saved:", refreshToken);
        }

        // Decode the token to get user role
        const decodedToken = jwtDecode(accessToken); 
        const userRole = decodedToken.role;

        // Save user role to localStorage using correct key 'userRole'
        if (userRole) {
          localStorage.setItem('userRole', userRole);
          console.log("User role saved:", userRole);
        }

        if (userRole === "USER") {
          navigate("/");  
        } else if (userRole === "ADMIN") {
          navigate("/dashboard"); 
        } else if (userRole === "MANAGER") {
          navigate("/dashboard");  
        }

        setSuccess("You have logged in successfully!");
        setErrorMessage(null);  
        reset();  
      } else {
        setErrorMessage("Failed to retrieve token. Please try again.");
        console.error("No token in the response:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("root", { message: error.response?.data?.message || "Failed to login. Please try again." });
      setSuccess(null);  
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
