import axios from "axios";
import { useState } from "react";
const Input = () => {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState("");

  const oncGoal = (e) => {
    const value = e.target.value;
    setGoal(value);
  };
  const oncMission = (e) => {
    const value = e.target.value;
    setMission(value);
  };
  const oncDate = (e) => {
    const value = e.target.value;
    setDate(value);
  };
  const submit = () => {
    const data = {
      goal: goal,
      missions: [{ mission: mission, status: false }],
      deadline: date,
      status: "ongoing",
    };
    axios
      .post("http://localhost:8080/api/vi/todos", data)
      .then((res) => {
        setAlert(res.data.message);
        setGoal("");
        setMission("");
        setDate("");
      })
      .catch((err) => {
        setAlert(err);
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-5">
        <div className="text-start">
          <h1>Input Data</h1>
          {alert && <div className="alert alert-success">{alert}</div>}
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Goals
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Masukkan goals anda" value={goal} onChange={oncGoal} />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Mission
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Masukkan misi anda" value={mission} onChange={oncMission} />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Deadline
            </label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={date} onChange={oncDate} />
          </div>
          <button className="btn btn-success w-100" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Input;
