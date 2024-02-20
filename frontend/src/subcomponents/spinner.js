import Spinner from "react-bootstrap/Spinner";

function LoadingSpin() {
  return (
    <div className="fs-1 text-primary" style={{ marginTop: "4em" }}>
      <Spinner animation="border" style={{ width: "5em", height: "5em" }} />
    </div>
  );
}

export default LoadingSpin;
