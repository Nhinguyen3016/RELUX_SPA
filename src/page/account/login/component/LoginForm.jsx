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
      // Bước 1: Gửi yêu cầu đăng nhập
      const response = await axios.post(`${API_HOST}/v1/login`, data);

      console.log("Login successful:", response.data);

      // Save user input to localStorage
      localStorage.setItem('Username', data.username);


      if (response.data && response.data.data) {
        const { accessToken, refreshToken, username } = response.data.data;

        // Log the username to check its value
        console.log("Username from response:", username);

        // Lưu accessToken và refreshToken vào localStorage
        if (accessToken) {
          localStorage.setItem('authToken', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        // Giải mã token để lấy role người dùng

        const decodedToken = jwtDecode(accessToken); 
        const userRole = decodedToken.role;

        if (userRole) {
          localStorage.setItem('userRole', userRole);
        }

        // Xác định điều hướng người dùng theo vai trò
        if (userRole === "USER") {
          navigate("/");  
        } else if (userRole === "ADMIN" || userRole === "MANAGER") {
          navigate("/dashboard"); 
        }

        setSuccess("You have logged in successfully!");
        setErrorMessage(null);  
        reset();  

        // Bước 2: Gọi API /v1/profile để lấy thông tin bookingCount
        const token = localStorage.getItem('authToken'); 
        if (!token) {
          setErrorMessage("Authentication token not found. Please login again.");
          return;
        }

        try {
          const profileResponse = await axios.post(
            `${API_HOST}/v1/profile`, 
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (profileResponse.data && profileResponse.data.data) {
            const { bookingCount } = profileResponse.data.data;

            // Lưu giá trị bookingCount vào localStorage
            if (bookingCount !== undefined) {
              localStorage.setItem('bookingCount', bookingCount);
              console.log("Booking count saved:", bookingCount);
            }
          } else {
            console.error("No booking count in the response:", profileResponse.data);
          }
        } catch (error) {
          console.error("Error while fetching booking count:", error);
          setErrorMessage(
            error.response?.data?.message || "Failed to fetch profile. Please try again."
          );
        }
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
        <Input register={register} name="username" placeholder="Your username" />
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

      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

      {success && <p className="success-message">{success}</p>}

      <Link to="/forgot-password">Lost your password?</Link>
    </form>
  );
};

export default LoginForm;
