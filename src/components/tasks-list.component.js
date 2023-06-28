import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveTasks,
} from "../slices/tasks";
import { Link } from "react-router-dom";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTasks = this.setActiveTasks.bind(this);
    
    this.state = {
      currentTasks: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveTasks();
  }

  refreshData() {
    this.setState({
      currentTasks: null,
      currentIndex: -1,
    });
  }

  setActiveTasks(Tasks, index) {
    this.setState({
      currentTasks: Tasks,
      currentIndex: index,
    });
  }

  render() {
    const { currentTasks, currentIndex } = this.state;
    const { tasks } = this.props;
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Listado de tareas</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map((tasks, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTasks(tasks, index)}
                  key={index}
                >
                  {tasks.description}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTasks ? (
            <div>
              <h4>Tareas</h4>
              <div>
                <label>
                  <strong>Fecha creación:</strong>
                </label>{" "}
                {currentTasks.creationDate}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTasks.description}
              </div>
              <div>
                <label>
                  <strong>Vigente:</strong>
                </label>{" "}
                {currentTasks.active ? "Vigente" : "No vigente"}
              </div>

              <Link
                to={"/tasks/" + currentTasks.identifier}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona tarea para previsualizar...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, {
  retrieveTasks,
})(TasksList);
