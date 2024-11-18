import { Link } from "react-router-dom";
import "../../../styles/account/LoginPage.css";
import LoginForm from "./component/LoginForm";

const LoginPage = () => {
  return (
<<<<<<< HEAD
    <div className="form_container">
=======
    <div className="login_page">
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      <h2 className="form-heading">Account</h2>
      <LoginForm />
      <p className="form-link">Don’t have an account? <Link to="/register">Sign up now</Link></p>
    </div>
  )
}

export default LoginPage