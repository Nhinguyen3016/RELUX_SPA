import "../../../styles/account/component/Button.css"

const Button = ({ type = 'button', children }) => {
  return (
    <button className="button" type={type}>{children}</button>
  )
}

export default Button;