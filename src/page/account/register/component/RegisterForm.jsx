import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../../../account/component/FormField";
import Label from "../../../account/component/Label";
import Input from "../../../account/component/Input";
import FormErrorMessage from "../../../account/component/FormErrorMessage";
import PasswordInput from "../../../account/component/PasswordInput";
import Button from "../../../account/component/Button";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const registerSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(255),
  fullName: z.string().max(255),
});

const RegisterForm = () => {
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
      email: "",
      phone: "",
      fullName: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_HOST}/v1/register`, data);

      console.log("Registration successful:", response.data);
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", { message: error.response?.data?.message || "Failed to register. Please try again." });
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
      <Button type="submit">{isSubmitting ? "Loading..." : "Register"}</Button>
      {errors.root && (
        <FormErrorMessage>{errors.root.message}</FormErrorMessage>
      )}
    </form>
  );
};

export default RegisterForm;
