import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTasks from "./components/add-tasks.component";
import Tasks from "./components/tasks.component";
import TasksList from "./components/tasks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link className="navbar-brand">
            Aplicación para generacion de tareas
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="http://localhost:8081/tasks" className="nav-link">
                Listado de tareas
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar tarea
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TasksList/>} />
            <Route path="/tasks" element={<TasksList/>} />
            <Route path="/add" element={<AddTasks/>} />
            <Route path="/tasks/:id" element={<Tasks/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
