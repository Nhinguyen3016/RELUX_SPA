import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../libs/validations";
import { useForm } from "react-hook-form";
import FormField from "../components/ui/FormField";
import Label from "../components/ui/Label";
import PasswordInput from "../components/ui/PasswordInput";
import FormErrorMessage from "../components/ui/FormErrorMessage";
import Button from "../components/ui/Button";

const NewPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="form_container">
      <h2 className="form-heading">Forgot password?</h2>
      <p className="form-description">Your new password must be different from the previously used password.</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label htmlFor="password">New Password</Label>
          <PasswordInput register={register} name="password" placeholder="New Password" />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="confirmPassword">Re-enter password</Label>
          <PasswordInput register={register} name="confirmPassword" placeholder="Re-enter password" />
          {errors.confirmPassword && (
            <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>
          )}
        </FormField>
        <Button type="submit">{isSubmitting ? "Loading..." : "Reset Password"}</Button>
      </form>
    </div>
  )
}

export default NewPasswordPage