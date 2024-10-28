import { Link } from "react-router-dom"
import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
  return (
    <div className="form_container">
      <h2 className="form-heading">Sign Up</h2>
      <RegisterForm />
      <p className="form-link">Already have an account? <Link to="/login">Sign in now</Link></p>
    </div>
  )
}

export default RegisterPage