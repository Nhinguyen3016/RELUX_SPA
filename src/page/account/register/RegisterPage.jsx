<<<<<<< HEAD
import { Link } from "react-router-dom"
import RegisterForm from "./component/RegisterForm"
=======
import { Link } from "react-router-dom";
import "../../../styles/account/RegisterPage.css";
import RegisterForm from "./component/RegisterForm";
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b

const RegisterPage = () => {
  return (
    <div className="form_container">
      <h2 className="form-heading">Sign Up</h2>
      <RegisterForm />
      <p className="form-link">Already have an account? <Link to="/login">Sign in now</Link></p>
    </div>
<<<<<<< HEAD
  )
}

export default RegisterPage
=======
  );
}

export default RegisterPage;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
