import "./input.css";

const Input = ({ type, name }) => {
  return <input className="input" type={type} placeholder={name} />;
};

export default Input;
