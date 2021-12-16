import { Spinner } from "react-bootstrap";

const Loader = ({ size }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: size || "100px",
        height: size || "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only"> Loading...</span>
    </Spinner>
  );
};

export default Loader;
