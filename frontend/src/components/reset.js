import { useState, Fragment, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../style/mainpage.css";
import axios from "axios";
const Reset = () => {
  const [redirect, setRedirect] = useState(false);
  const { id, newPassword } = useParams();
  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/vi/users/reset/${id}/${newPassword}`)
      .then((res) => {
        if (res.data.status) {
          window.alert(res.data.message);
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        } else {
          window.alert(res.data.message);
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        }
      })
      .catch((err) => {
        window.alert(err.data.message);
        setTimeout(() => {
          setRedirect(true);
        }, 1000);
      });
  });

  return (
    <Fragment>
      {redirect && <Navigate to="/login" />}
      <h2 className="text-center">Redirect....</h2>
    </Fragment>
  );
};
export default Reset;
