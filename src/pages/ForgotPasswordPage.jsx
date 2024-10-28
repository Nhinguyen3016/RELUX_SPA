import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../libs/validations";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormField from "../components/ui/FormField";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import FormErrorMessage from "../components/ui/FormErrorMessage";
import Button from "../components/ui/Button";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot password?</h2>
      <p className="form-description">Don’t worry! It happens. Please enter the email address associated with your account.</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
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
        <Button type="submit">{isSubmitting ? "Loading..." : "Send code"}</Button>
      </form>
      <p className="form-link">Remember password? <Link to="/login">Sign in</Link></p>
    </div>
  )
}

export default ForgotPasswordPage