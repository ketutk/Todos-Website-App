import { useState } from "react";
import ParticleBackground from "../particle/particleBackground";
import { TypeAnimation } from "react-type-animation";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import "../style/mainpage.css";
const MainPage = () => {
  const [typed, setType] = useState(false);
  const [open, setOpen] = useState(true);
  const [redirect, setRedirect] = useState(false);

  return (
    <div style={{}} className="p-0 m-0 company">
      <Fade in={open} timeout={300}>
        <div className="fade-element jumbotron">
          <h1 className="text-light text-center mb-5" style={{ fontSize: "5em" }}>
            <TypeAnimation sequence={["Lets set your Goals", 500, () => setType(true)]} wrapper="span" speed={10} />
          </h1>
          {/* <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              
            </Link> */}
          <button
            className={`btn btn-light fs-3 fw-bold ${typed ? "fade-in-btn" : "invisible"}`}
            aria-controls="fade-element"
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);

              setTimeout(() => {
                setRedirect(true);
              }, 300);
            }}
          >
            Let's Start
          </button>
          {redirect && <Navigate to={"/login"} />}
        </div>
      </Fade>
    </div>
  );
};
export default MainPage;
