<<<<<<< HEAD

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../account/component/validations";
=======
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

<<<<<<< HEAD
=======
const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const registerSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(255),
  fullName: z.string().max(255),
});

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
<<<<<<< HEAD
      email: "",
      username: "",
      password: "",
=======
      username: "",
      password: "",
      email: "",
      phone: "",
      fullName: "",
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
<<<<<<< HEAD
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register. Please try again.");
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      reset(); // Clear form fields on success
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", { message: error.message });
=======
      const response = await axios.post(`${API_HOST}/v1/register`, data);

      console.log("Registration successful:", response.data);
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", { message: error.response?.data?.message || "Failed to register. Please try again." });
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
    }
  };

  return (
    <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="username">Username</Label>
<<<<<<< HEAD
        <Input
          register={register}
          name="username"
          placeholder="truongnhan"
        />
=======
        <Input register={register} name="username" placeholder=" " />
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormField>
      <FormField>
<<<<<<< HEAD
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
      <FormField>
=======
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
        <Label htmlFor="password">Password</Label>
        <PasswordInput register={register} name="password" placeholder="Your password" />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormField>
<<<<<<< HEAD
=======
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input register={register} name="email" type="email" placeholder=" " />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="phone">Phone</Label>
        <Input register={register} name="phone" placeholder=" " />
        {errors.phone && (
          <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
        )}
      </FormField>
      <FormField>
        <Label htmlFor="fullName">Full Name</Label>
        <Input register={register} name="fullName" placeholder=" " />
        {errors.fullName && (
          <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
        )}
      </FormField>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      <Button type="submit">{isSubmitting ? "Loading..." : "Register"}</Button>
      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}
    </form>
  );
};

<<<<<<< HEAD
export default RegisterForm;
=======
export default RegisterForm;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
