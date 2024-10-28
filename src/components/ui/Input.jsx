import '../../styles/ui/Input.css';

const Input = ({ name, type = "text", register, placeholder = "Type something...", ...props }) => {
  return (
    <input
      name={name}
      {...register(name)}
      className="input"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;