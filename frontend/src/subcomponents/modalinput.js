import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import style from "../style/style.module.css";
import { useState } from "react";
import valiDate from "../helpers/validateDate";

function InputModal(props) {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState("");
  const [missions, setMissions] = useState([]);
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const oncGoal = (e) => {
    const value = e.target.value;
    setGoal(value);
    setAlert("");
    setError("");
  };
  const oncMission = (e) => {
    const value = e.target.value;
    setMission(value);
    setAlert("");
    setError("");
  };
  const oncDate = (e) => {
    const value = e.target.value;
    setDate(value);
    setAlert("");
    setError("");
  };

  const addMission = () => {
    const data = {
      mission: mission,
      status: false,
    };
    setMissions((old) => [...old, data]);
    setMission("");
  };

  const deleteMission = (value) => {
    const newData = missions.filter((e) => e.mission !== value);
    setMissions(newData);
  };

  const resetButton = () => {
    setAlert("");
    setError("");
    setGoal("");
    setMission("");
    setDate("");
    setMissions([]);
    props.onHide();
  };

  const submit = () => {
    if (!goal || missions.length === 0 || !date) {
      return setError("Semua field harus diisi !");
    }
    if (!valiDate(date)) {
      return setError("Tanggal deadline sudah berlalu");
    }
    const data = {
      goal: goal,
      missions: missions,
      deadline: date,
      status: "ongoing",
    };
    axios
      .post("http://localhost:8080/api/vi/todos", data)
      .then((res) => {
        if (res.data.status) {
          setAlert(res.data.message);
        } else {
          setError(res.data.message);
        }
        setGoal("");
        setMission("");
        setDate("");
        setMissions([]);
        setTimeout(() => {
          setAlert("");
          setError("");
        }, 2000);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" backdrop="static" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Goals</Modal.Title>
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
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label fw-semibold fs-5">
            Mission
          </label>
          {missions.map((e, i) => {
            if (e.mission) {
              return (
                <div className={`alert alert-primary ${style.mission}`} style={{ cursor: "pointer" }} onClick={() => deleteMission(e.mission)} key={i}>
                  {e.mission}
                </div>
              );
            }
          })}
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your missions to reach the goals...." value={mission} onChange={oncMission} />
          <button className="btn btn-primary mt-2" onClick={addMission}>
            Add Mission
          </button>
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
          Add
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

export default InputModal;
