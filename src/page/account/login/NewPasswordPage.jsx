import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../account/component/validations";
import { useForm } from "react-hook-form";
import FormField from "../../account/component/FormField";
import Label from "../../account/component/Label";
import PasswordInput from "../../account/component/PasswordInput";
import FormErrorMessage from "../../account/component/FormErrorMessage";
import Button from "../../account/component/Button";


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
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to reset password. Please try again.");
      }

      const result = await response.json();
      console.log("Password reset successful:", result);
      // Optionally, navigate to login page or show success message
    } catch (error) {
      console.error("Error resetting password:", error);
      // Optionally, display an error message to the user
    }
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