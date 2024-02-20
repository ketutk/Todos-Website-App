import styles from "../style/style.module.css";
import { useState } from "react";

const MissionList = (props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const { mission, status, _id } = props.data;
  return (
    <li className={`list-group-item list-group-item-action list-group-item-primary my-3 rounded d-flex align-items-center justify-content-between`} style={{ width: "100%" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="text-start d-flex align-items-center" style={{ maxWidth: "90%" }}>
        <input
          className="form-check-input me-1"
          type="checkbox"
          value=""
          id={`checkbox`}
          role="button"
          checked={status}
          onClick={() => {
            console.log(_id);
            props.checkMission(_id);
          }}
        />
        <span className={`form-check-label mx-2 pe-none ${styles.missionList}`} htmlFor={`checkbox`}>
          {mission}
        </span>
      </div>
      <div className={`text-end d-flex align-items-center ${isHover ? "" : "invisible"}`} style={{ position: "absolute", right: "5px" }}>
        <button className="btn btn-primary mx-2" onClick={() => props.editMission(_id, mission)}>
          <i class="fa fa-edit"></i>
        </button>
        <button className="btn btn-primary" onClick={() => props.deleteMission(_id)}>
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default MissionList;
