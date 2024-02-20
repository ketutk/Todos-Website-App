import { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import "../style/mainpage.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError("");
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };
  const submitLogin = () => {
    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/vi/users/login", data)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("token", res.data.token);
          setRedirect(true);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      {redirect && <Navigate to="/dashboard" />}
      <div className="company">
        <div className="container jumbotron">
          <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="col-md-6">
              <div className="card p-4">
                <div className="card-body">
                  {error && <div className="alert alert-danger text-center">{error}</div>}

                  <div className="form-group mb-3 text-start">
                    <label className="">Username</label>
                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={onChangeUsername} />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={onChangePassword} />
                  </div>
                  <button className="btn btn-primary my-3" onClick={submitLogin} style={{ width: "100%" }}>
                    Login
                  </button>
                  <Link to={"/"} style={{ textDecoration: "none" }}>
                    <a>Kembali ke home</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
