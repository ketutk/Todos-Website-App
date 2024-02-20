import { useState, useEffect } from "react";
import axios from "axios";
import InputModal from "../subcomponents/modalinput";
import styles from "../style/style.module.css";
import Cards from "../subcomponents/cards";
import PaginatedItems from "../subcomponents/paginate";
import LoadingSpin from "../subcomponents/spinner";
import MissionList from "../subcomponents/missionlist";
import { Link, useParams, Navigate } from "react-router-dom";
import progressBar from "../helpers/progress.helper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Todo = () => {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [mission, setMission] = useState("");
  const [oldMission, setOldMission] = useState("");
  const [missionId, setMissionId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");

  const [shouldRefetch, setShouldRefetch] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/vi/todos/${id}`);
        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        // Reset shouldRefetch after fetching data
        setShouldRefetch(false);
      }
    };
    if (shouldRefetch) {
      fetchData();
    }
  }, [shouldRefetch]);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleRefetch = () => {
    setShouldRefetch(true);
  };
  const onChangeMission = (e) => {
    const value = e.target.value;
    setMission(value);
  };

  const checkMission = (idMission) => {
    axios
      .put("http://localhost:8080/api/vi/todos/mission/check", {
        _id: id,
        _idMission: idMission,
      })
      .then((res) => {
        console.log(res);
        setShouldRefetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMission = (mission) => {
    if (mission !== "") {
      axios
        .post(`http://localhost:8080/api/vi/todos/mission/${id}`, {
          mission,
          status: false,
        })
        .then((res) => {
          console.log(res);
          setMission("");
          setShouldRefetch(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteMission = (missionId) => {
    setShow(true);
    setMissionId(missionId);
  };
  const editMission = (missionId, mission) => {
    setShowEdit(true);
    setMissionId(missionId);
    setOldMission(mission);
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
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-outline-light w-100 mt-2">Back to Dashboard</button>
            </Link>
            <button
              className="btn btn-primary btn-danger w-100 mt-4"
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
                  <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                    <li class="nav-item">
                      <a class="nav-link active text-light" aria-current="page" href="#">
                        Back to Dasboard
                      </a>
                    </li>
                  </Link>
                  <button
                    className="btn btn-light w-100 mt-2"
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
          <div className="col-12 bg-body-secondary m-0 p-0">
            <div className="row flex-column align-items-center m-0 p-0 " style={{ height: "100vh" }}>
              <div className="col-lg-11 bg-white my-lg-4 my-2 rounded text-start text-dark" style={{ height: "24vh" }}>
                <div className="mx-3 my-lg-2 my-3">
                  <h2 className={`${styles.missionList}`}>{data.goal}</h2>
                  <label>
                    <b>Status :</b> {data.status}
                  </label>
                  <br />
                  <label>
                    <b>Deadline :</b> {data.deadline}
                  </label>
                  <br />
                  <span className="fw-bold">Progress : </span>
                  <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-info" style={{ width: `${data.missions ? `${progressBar(data.missions)}%` : "0%"}` }}>
                      {`${data.missions ? `${progressBar(data.missions)}%` : "0%"}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-11 bg-white rounded" style={{ height: "66vh" }}>
                <h2 className="mt-2">Missions</h2>
                <div className="overflow-y-scroll overflow-x-hidden mx-lg-5 w-lg-75" style={{ height: "80%" }}>
                  <ul class="list-group text-start fs-4 ">
                    {data && data.missions && data.missions.length === 0 && <div className="alert alert-danger text-center">Belum memiliki misi apapun, silahkan tambah misi</div>}
                    {data &&
                      data.missions &&
                      data.missions.length !== 0 &&
                      data.missions.map((item) => {
                        return <MissionList data={item} checkMission={checkMission} deleteMission={deleteMission} editMission={editMission} />;
                      })}

                    <div class="input-group border border-primary rounded mb-3">
                      <input type="text" class="form-control fs-5" placeholder="Add Mission here" aria-label="Add Mission here" aria-describedby="button-addon2" value={mission} onChange={onChangeMission} />
                      <button class={`btn ${mission ? "btn-primary" : "btn-outline-primary"} px-5`} type="button" id="button-addon2" disabled={mission ? false : true} onClick={() => addMission(mission)}>
                        Add
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DeleteModal show={show} onHide={() => setShow(false)} id={id} missionId={missionId} setShouldRefetch={setShouldRefetch} setMissionId={setMissionId} />
          <EditModal show={showEdit} onHide={() => setShowEdit(false)} id={id} missionId={missionId} mission={oldMission} setShouldRefetch={setShouldRefetch} setMissionId={setMissionId} />
          <div id="footer" className="col-12 bg-primary d-lg-none text-light py-2 pt-2 fixed-bottom">
            Version 1.0
          </div>
        </div>
      </div>
    </div>
  );
};

function EditModal(props) {
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [mission, setMission] = useState(props.mission);
  useEffect(() => {
    setMission(props.mission || "");
  }, [props.mission]);

  const onChangeMission = (e) => {
    const value = e.target.value;
    setMission(value);
  };
  const editMission = (missionId) => {
    console.log(props.id);
    console.log(missionId);
    axios
      .put(`http://localhost:8080/api/vi/todos/mission/${props.id}`, {
        _idMission: missionId,
        mission,
      })
      .then((res) => {
        console.log(res);
        setAlert("Berhasil mengedit");
        props.setShouldRefetch(true);
        props.setMissionId("");
        setMission("");
      })
      .catch((err) => {
        console.log(err);
        setError("Gagal mengedit");
      });
  };
  const onHide = () => {
    setAlert("");
    setError("");
    setMission("");
    props.onHide();
  };
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        {!alert && !error && (
          <div class="input-group border border-primary rounded">
            <input type="text" class="form-control fs-5" placeholder="Edit Mission here" aria-label="Add Mission here" aria-describedby="button-addon2" value={mission} onChange={onChangeMission} />
          </div>
        )}
        {alert && <div className="alert alert-success fs-5">{alert}</div>}
        {error && <div className="alert alert-danger fs-5">{error}</div>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => editMission(props.missionId)} variant="primary">
          Edit
        </Button>
        <Button onClick={onHide} variant="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function DeleteModal(props) {
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const deleteMission = (missionId) => {
    console.log(props.id);
    console.log(missionId);
    axios
      .delete(`http://localhost:8080/api/vi/todos/mission?_id=${props.id}&_idMission=${missionId}`)
      .then((res) => {
        setAlert("Berhasil menghapus");
        props.setShouldRefetch(true);
        props.setMissionId("");
      })
      .catch((err) => {
        console.log(err);
        setError("Gagal menghapus");
      });
  };
  const onHide = () => {
    setAlert("");
    setError("");
    props.onHide();
  };
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">CONFIRMATION</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        {!alert && !error && <h3 className="">Anda yakin ingin menghapus ?</h3>}
        {alert && <div className="alert alert-success fs-5">{alert}</div>}
        {error && <div className="alert alert-danger fs-5">{error}</div>}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => deleteMission(props.missionId)} variant="primary">
          Confirm
        </Button>
        <Button onClick={onHide} variant="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Todo;
