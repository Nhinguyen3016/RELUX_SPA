import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

const emailOrUsername = z.string().trim().min(1, "This field is required").refine((value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // example: 3 to 20 chars, alphanumeric and underscores allowed
  return emailRegex.test(value) || usernameRegex.test(value);
}, "Must be a valid email or username");

export const loginSchema = z.object({
  emailOrUsername,
  password: requiredString.min(8, "Must be at least 8 characters"),
})

export const registerSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
})

export const forgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email address"),
})

export const newPasswordSchema = z.object({
  password: requiredString.min(8, "Must be at least 8 characters"),
  confirmPassword: requiredString.min(8, "Must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})