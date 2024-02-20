import { useState } from "react";
import axios from "axios";
import InputModal from "../subcomponents/modalinput";
import styles from "../style/style.module.css";
import Cards from "../subcomponents/cards";
import PaginatedItems from "../subcomponents/paginate";
import LoadingSpin from "../subcomponents/spinner";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [sorted, setSorted] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!sorted) {
    axios
      .get(`http://localhost:8080/api/vi/todos`, { params: { search: search } })
      .then((res) => {
        if (res.data.status === false) {
          setError(res.data.message);
          setTimeout(() => {
            setError("");
            setSearch("");
          }, 2000);
          return;
        }
        setTodos(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        setError(err.data.message);
      });
  } else if (sorted) {
    axios
      .get(`http://localhost:8080/api/vi/todos/sorted-by-deadline`)
      .then((res) => {
        if (res.data.status === false) {
          setError(res.data.message);
          setTimeout(() => {
            setError("");
            setSearch("");
          }, 2000);
          return;
        }
        setTodos(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        setError(err.data.message);
      });
  }

  const onChangeSearchVal = (e) => {
    const value = e.target.value;
    setSearchVal(value);
    setAlert("");
    setError("");
  };
  return (
    <div className="m-0 p-0 row" style={{ height: "100vh" }}>
      {redirect && <Navigate to="/login" />}
      <div className="col-lg-2 bg-primary d-none d-lg-block shadow-lg">
        <div className="row d-flex flex-column text-light justify-content-between align-content-center" style={{ height: "100%" }}>
          <div className="pt-5" style={{ height: "10%" }}>
            <h3>DreamSetter</h3>
          </div>
          <div className="" style={{ height: "65%", marginTop: "40%" }}>
            <Link to={"../"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-outline-light w-100 mt-2">Home</button>
            </Link>
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-light w-100 mt-2">Dashboard</button>
            </Link>
            <Link to={"/about"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-outline-light w-100 mt-2">About</button>
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
          <div className="col-12 mt-3 mb-5">
            <div className="d-flex justify-content-center align-item-center">
              <div className="input-group input-group-lg mb-3 mx-3 d-flex justify-content-center w-75">
                <input type="text" className={`form-control`} placeholder="Search goals here..." aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={searchVal} onChange={onChangeSearchVal} />
                <button
                  className="btn btn-primary rounded-end"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    setIsLoading(true);
                    setSorted(false);
                    setSearch(searchVal);
                  }}
                >
                  Search
                </button>
                <button
                  className={`btn btn-primary mx-3 rounded-start ${sorted ? "active" : ""}`}
                  onClick={() => {
                    sorted ? setSorted(false) : setSorted(true);
                  }}
                >
                  By Deadline
                </button>
              </div>
            </div>

            <div className={`row mt-3 justify-content-center`}>
              {error && <div className="alert alert-danger text-center w-75">{error}</div>}
              {isLoading && <LoadingSpin />}

              {!isLoading && todos.length !== 0 && <PaginatedItems itemsPerPage={8} items={todos} />}
            </div>
            <i class={`fa fa-plus-circle ${styles.icon}`} style={{ fontSize: "5em", position: "fixed", top: "70%", right: "5%", cursor: "pointer" }} onClick={() => setModalShow(true)}></i>

            <InputModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
          <div id="footer" className="col-12 bg-primary d-lg-none text-light py-2 pt-2 fixed-bottom">
            Version 1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
