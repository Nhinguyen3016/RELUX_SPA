import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");
export const customerSchema = z.object({
    email: requiredString.email("Invalid email address"),
    name: requiredString.min(8, "Must be at least 8 characters"),
    phone: requiredString
  })
  
