import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTasks, deleteTasks } from "../slices/tasks";
import TasksDataService from "../services/tasks.service";
import { withRouter } from '../common/with-router';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTasks = this.removeTasks.bind(this);

    this.state = {
      currentTasks: {
        identifier: null,
        creationDate: "",
        description: "",
        active: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTasks(this.props.router.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTasks: {
        ...prevState.currentTasks,
        description: description,
      },
    }));
  }

  onChangeCreationDate(e) {
    const creationDate = e.target.value;

    this.setState((prevState) => ({
      currentTasks: {
        ...prevState.currentTasks,
        creationDate: creationDate,
      },
    }));
  }

  getTasks(id) {
    TasksDataService.get(id)
      .then((response) => {
        this.setState({
          currentTasks: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      identifier: this.state.currentTasks.identifier,
      creationDate: this.state.currentTasks.creationDate,
      description: this.state.currentTasks.description,
      active: status,
    };

    this.props
      .updateTasks({ identifier: this.state.currentTasks.identifier, data })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTasks: {
            ...prevState.currentTasks,
            active: status,
          },
        }));

        this.setState({ message: "El estado fue cambiado con exito!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateTasks({ identifier: this.state.currentTasks.identifier, data: this.state.currentTasks })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "La tarea fue actualizada con exito!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTasks() {
    this.props
      .deleteTasks({ identifier: this.state.currentTasks.identifier })
      .then(() => {
        //this.props.router.navigate('/tasks');
        window.location.href = 'http://localhost:8081/tasks';
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTasks } = this.state;

    return (
      <div>
        {currentTasks ? (
          <div className="edit-form">
            <h4>Tarea</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Fecha creación</label>
                <input
                  type="date"
                  className="form-control"
                  id="creationDate"
                  value={currentTasks.creationDate}
                  onChange={this.onChangeCreationDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTasks.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Vigente:</strong>
                </label>
                {currentTasks.active ? "true" : "false"}
              </div>
            </form>

            {currentTasks.active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(0)}
              >
                No vigente
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(1)}
              >
                Vigente
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTasks}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Modificar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor selecciona tarea...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateTasks, deleteTasks })(withRouter(Tasks));
