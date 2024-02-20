import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/mainpage";
import Input from "./components/input";
import Dashboard from "./components/dashboard";
import Todo from "./components/todo";
import About from "./components/about";
import Login from "./components/login";
import Reset from "./components/reset";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset/:id/:newPassword" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo/:id" element={<Todo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
