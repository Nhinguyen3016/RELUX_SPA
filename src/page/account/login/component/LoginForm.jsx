<<<<<<< HEAD
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../account/component/validations";
import { Link, useNavigate } from "react-router-dom";
import "../../../../styles/account/LoginPage.css";
=======
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

<<<<<<< HEAD
const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,  
=======
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
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
<<<<<<< HEAD
      emailOrUsername: "",
=======
      username: "",
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
<<<<<<< HEAD
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
=======
      const response = await axios.post(`${API_HOST}/v1/login`, data);

      console.log("Login successful:", response.data);
      // Perform any further actions on successful login, e.g., redirecting the user
      reset();
    } catch (error) {
      console.error("Error during login:", error);
      setError("root", { message: error.response?.data?.message || "Failed to login. Please try again." });
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    }
  };

  return (
    <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <FormField>
<<<<<<< HEAD
        <Label htmlFor="emailOrUsername">Username </Label>
        <Input
          register={register}
          name="emailOrUsername"
          placeholder=" Enter username "
        />
        {errors.emailOrUsername && (
          <FormErrorMessage>{errors.emailOrUsername.message}</FormErrorMessage>
=======
        <Label htmlFor="username">Username</Label>
        <Input register={register} name="username" placeholder=" " />
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
        )}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
<<<<<<< HEAD
        <PasswordInput register={register} name="password" placeholder="Enter your password" />
=======
        <PasswordInput register={register} name="password" placeholder="Your password" />
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
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

<<<<<<< HEAD
export default LoginForm;
=======
export default LoginForm;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
