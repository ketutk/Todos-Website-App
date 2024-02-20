import { useState } from "react";
import axios from "axios";
import InputModal from "../subcomponents/modalinput";
import styles from "../style/style.module.css";
import Cards from "../subcomponents/cards";
import PaginatedItems from "../subcomponents/paginate";
import LoadingSpin from "../subcomponents/spinner";
import { Link, Navigate } from "react-router-dom";

const About = () => {
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="m-0 p-0 row overflow-y-hidden" style={{ height: "100vh" }}>
      {redirect && <Navigate to="/login" />}

      <div className="col-lg-2 bg-primary d-none d-lg-block shadow-lg" style={{ height: "100vh" }}>
        <div className="row d-flex flex-column text-light justify-content-between align-content-center" style={{ height: "100%" }}>
          <div className="pt-5" style={{ height: "10%" }}>
            <h3>DreamSetter</h3>
          </div>
          <div className="" style={{ height: "65%", marginTop: "40%" }}>
            <Link to={"../"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-outline-light w-100 mt-2">Home</button>
            </Link>
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-outline-light w-100 mt-2">Dashboard</button>
            </Link>
            <Link to={"/about"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-light w-100 mt-2">About</button>
            </Link>
            <button
              className="btn btn-danger w-100 mt-4"
              onClick={() => {
                localStorage.removeItem("token");
                setRedirect(true);
              }}
            >
              Logout
            </button>
          </div>
          <div className="text-nowrap pb-2" style={{ height: "5%" }}>
            Version 1.0
          </div>
        </div>
      </div>
      <div className="col-lg-10">
        <div className="row flex-column" style={{ height: "100%" }}>
          {/* <div className="col-12 bg-primary text-white p-3 d-lg-none">asdas</div> */}
          <nav className="col-12 navbar bg-primary border-bottom border-body d-lg-none py-3 px-3 sticky-top" data-bs-theme="primary">
            <div class="container-fluid">
              <a class="navbar-brand text-light" href="#">
                DreamSetter
              </a>
              <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link to={"../"} style={{ textDecoration: "none" }}>
                    <li class="nav-item">
                      <a class="nav-link active text-light" aria-current="page" href="#">
                        Home
                      </a>
                    </li>
                  </Link>
                  <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                    <li class="nav-item">
                      <a class="nav-link active text-light" aria-current="page" href="#">
                        Dashboard
                      </a>
                    </li>
                  </Link>
                  <Link to={"/about"} style={{ textDecoration: "none" }}>
                    <li class="nav-item">
                      <a class="nav-link active text-light" aria-current="page" href="#">
                        About
                      </a>
                    </li>
                  </Link>
                  <button
                    className="btn btn-primary btn-light w-100 mt-2"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setRedirect(true);
                    }}
                  >
                    Logout
                  </button>
                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-light" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
          <div className="col-12 mt-3 mb-5 overflow-y-scroll overflow-x-hidden" style={{ height: "100vh" }}>
            <h3 className="">About DreamSetter</h3>
            <hr className={`${styles.bar} mb-5`} />

            <div className="row m-0 p-0 justify-content-around align-items-center">
              <div className="col-lg-7 my-2">
                <div id="carouselExampleDark" class="carousel carousel-dark slide">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                      <img src={require("../images/image1.jpg")} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block text-light">
                        <h3>Membantu anda mewujudkan mimpi</h3>
                      </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                      <img src={require("../images/image4.jpg")} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block text-light">
                        <h3>Targetkan setiap langkah anda</h3>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img src={require("../images/image5.jpg")} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block text-white">
                        <h3>Analisis dan rencanakan semua</h3>
                      </div>
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-5 bg-primary-subtle p-2 rounded">
                <p className="text-start fs-4 mx-2 text-center">
                  Website ini dibuat dengan tujuan agar pengguna baik generasi muda maupun orangtua yang memiliki impian atau goals mengenai sesuatu hal secara terstruktur dan terorganisir. To-Do List ini menjadikan acuan pengguna untuk
                  menuntaskan pencapaian atau impian yang mereka buat.
                </p>
              </div>
            </div>
            <h3 className="mt-5">Contributor</h3>
            <hr className={`${styles.bar} mb-5`} />

            <div className="row m-0 p-0 align-items-center" style={{ width: "100%" }}>
              <div className="col-lg-3 my-2 d-flex justify-content-center">
                <div class="card" style={{ width: "18rem" }}>
                  <img src={require("../images/ketut.webp")} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">I Ketut Krisna K</h5>
                    <p class="card-text my-2">Sistem Informasi | 10121571 | Programmer</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 my-2 d-flex justify-content-center">
                <div class="card" style={{ width: "18rem" }}>
                  <img src={require("../images/yambet.png")} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Ilham Fatturahman </h5>
                    <p class="card-text my-2">Sistem Informasi | 11121374 | Programmer</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 my-2 d-flex justify-content-center">
                <div class="card" style={{ width: "18rem" }}>
                  <img src={require("../images/pute.jpeg")} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Putri Rahmayani</h5>
                    <p class="card-text my-2">Sistem Informasi | 11121031 | Programmer</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 my-2 d-flex justify-content-center">
                <div class="card" style={{ width: "18rem" }}>
                  <img src={require("../images/auliya.jpeg")} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Auliya Balindra</h5>
                    <p class="card-text my-2">Sistem Informasi | 10121229 | Programmer</p>
                  </div>
                </div>
              </div>
              <h3 className="mt-5">Dokumentasi</h3>
              <hr className={`${styles.bar} mb-5`} />
              <div className="row m-0 p-0 justify-content-around align-items-center">
                <div className="col-12 my-2 mb-5">
                  <div id="carouselExampleDark2" class="carousel carousel-dark slide">
                    <div class="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active" data-bs-interval="10000">
                        <img src={require("../images/dokum3.jpeg")} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block text-light"></div>
                      </div>
                      <div class="carousel-item" data-bs-interval="2000">
                        <img src={require("../images/dokum2.jpeg")} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block text-light"></div>
                      </div>
                      <div class="carousel-item">
                        <img src={require("../images/dokum1.jpeg")} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block text-white"></div>
                      </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`row my-5 justify-content-center mb-5 d-lg-none`}></div>
          </div>
          <div id="footer" className="col-12 bg-primary d-lg-none text-light py-2 pt-2 fixed-bottom">
            Version 1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
