import { useState } from "react"
import '../../styles/ui/Input.css';
import { Eye, EyeOff } from "lucide-react"

const PasswordInput = ({ name, register, placeholder = "Type something...", ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="password">
      <input
        name={name}
        {...register(name)}
        className="input"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <button className="eyeBtn" onClick={() => setShowPassword(!showPassword)} type="button">
        {showPassword ? (
          <Eye size={24} />
        ) : (
          <EyeOff size={24} />
        )}
      </button>
    </div>
  )
}

export default PasswordInput