
const Label = ({ children, ...props }) => {
  return (
    <label className="label" {...props}>{children}</label>
  )
}

export default Label