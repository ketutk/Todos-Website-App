import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import style from "../style/style.module.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import valiDate from "../helpers/validateDate";
const Cards = (props) => {
  const [isHover, setHover] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  const deleteTodos = () => {
    setAlert("Data akan dihapus");
    setTimeout(() => {
      axios
        .delete(`http://localhost:8080/api/vi/todos/${props._id}`)
        .then((res) => {
          if (res.data.status) {
            setTimeout(() => {
              setAlert("");
              setShow(false);
            }, 1500);
          } else {
            setAlert("");
            setError(res.data.message);
            setTimeout(() => {
              setError("");
              setShow(false);
            }, 3000);
          }
        })
        .catch((err) => {
          setError("Error : Action failed");
          setTimeout(() => {
            setError("");
            setShow(false);
          }, 3000);
        });
    }, 500);
  };

  return (
    <Fragment>
      <div class={`col-sm-3 mb-3 `} style={{ cursor: "pointer" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setRedirect(true)}>
        {redirect && <Navigate to={`/todo/${props._id}`} />}
        <div class={`card ${isHover ? "shadow rounded" : ""}`}>
          <div class="card-body">
            <h5 class={`card-title text-start ${style.missionCard}`}>{props.goal}</h5>
            <p class={`card-text text-start ${style.missionCard}`}>{props.missions && props.missions.length !== 0 ? props.missions[0].mission : "-"}</p>

            <p className={`card-text text-end ${valiDate(props.deadline, props.status, 0)} fw-semibold ${isHover ? "d-none" : ""}`}>{valiDate(props.deadline, props.status, 1)}</p>
            <div class={`text-start  ${isHover ? "" : "d-none"}`}>
              <button
                className="btn btn-primary mx-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModalShow(true);
                }}
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-primary mx-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(true);
                }}
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal show={show} onHide={() => setShow(false)} deleteTodos={deleteTodos} alert={alert} error={error} />
      <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} goal={props.goal} status={props.status} missions={props.missions} deadline={props.deadline} _id={props._id} />
    </Fragment>
  );
};

// DeleteTodos

function DeleteModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">CONFIRMATION</Modal.Title>
      </Modal.Header>
      {props.alert && <div className="alert alert-success fs-5 mx-2">{props.alert}</div>}
      {props.error && <div className="alert alert-danger fs-5 mx-2">{props.error}</div>}
      {!props.error && !props.alert && (
        <Modal.Body className="">
          <h4>Delete Todos</h4>
          <p>Are you sure want to delete this Todos ?</p>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button onClick={props.deleteTodos} variant="primary">
          Confirm
        </Button>
        <Button onClick={props.onHide} variant="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Edit Todos
function EditModal(props) {
  const [goal, setGoal] = useState(props.goal);
  const [date, setDate] = useState(props.deadline);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const oncGoal = (e) => {
    const value = e.target.value;
    setGoal(value);
    setAlert("");
    setError("");
  };

  const oncDate = (e) => {
    const value = e.target.value;
    setDate(value);
    setAlert("");
    setError("");
  };

  const resetButton = () => {
    setAlert("");
    setError("");
    setGoal(props.goal);
    setDate(props.deadline);
    props.onHide();
  };

  const submit = () => {
    if (!goal || !date) {
      return setError("Semua field harus diisi !");
    }
    if (!valiDate(date)) {
      return setError("Tanggal deadline sudah berlalu");
    }
    axios
      .put(`http://localhost:8080/api/vi/todos/${props._id}`, {
        goal: goal,
        deadline: date,
      })
      .then((res) => {
        if (res.data.status) {
          setAlert(res.data.message);
        } else {
          setError(res.data.message);
        }
        setTimeout(() => {
          setAlert("");
          setError("");
          props.onHide();
        }, 2000);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" backdrop="static" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Goals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert && <div className="alert alert-success text-center">{alert}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label fw-semibold fs-5">
            Goals
          </label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Type your goals here...." value={goal} onChange={oncGoal} />
        </div>
        <div className="mb-5">
          <label for="exampleFormControlInput1" className="form-label fw-semibold fs-5">
            Deadline
          </label>
          <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="add a deadline..." value={date} onChange={oncDate} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={submit}>
          Edit
        </Button>
        <Button
          onClick={() => {
            resetButton();
          }}
          variant="primary"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cards;
