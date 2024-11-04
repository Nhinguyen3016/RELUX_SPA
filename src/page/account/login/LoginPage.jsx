import { Link } from "react-router-dom";
import "../../../styles/account/LoginPage.css";
import LoginForm from "./component/LoginForm";

const LoginPage = () => {
  return (
    <div className="form_container">
      <h2 className="form-heading">Account</h2>
      <LoginForm />
      <p className="form-link">Don’t have an account? <Link to="/register">Sign up now</Link></p>
    </div>
  )
}

export default LoginPage