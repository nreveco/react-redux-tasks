import React, { Component } from "react";
import { connect } from "react-redux";
import { createTasks } from "../slices/tasks";

class AddTasks extends Component {
  constructor(props) {
    super(props);
    this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeActive = this.onChangeActive.bind(this);
    this.saveTasks = this.saveTasks.bind(this);
    this.newTasks = this.newTasks.bind(this);

    this.state = {
      identifier: null,
      creationDate: "",
      description: "",
      active: false,
      submitted: false,
    };
  }

  onChangeCreationDate(e) {
    this.setState({
      creationDate: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeActive(e) {
    this.setState({
      active: e.target.value,
    });
  }

  saveTasks() {
    const { creationDate, description, active } = this.state;

    this.props
      .createTasks({ creationDate, description, active })
      .unwrap()
      .then((data) => {
        this.setState({
          identifier: data.identifier,
          creationDate: data.creationDate,
          description: data.description,
          active: data.active,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTasks() {
    this.setState({
      identifier: null,
      creationDate: "",
      description: "",
      active: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Se ha creado la tarea correctamente!</h4>
            <button className="btn btn-success" onClick={this.newTasks}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="creationDate">creationDate</label>
              <input
                type="date"
                className="form-control"
                id="creationDate"
                required
                value={this.state.creationDate}
                onChange={this.onChangeCreationDate}
                name="creationDate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className='form-group mb-2'>
                <label className='form-label'>Vigente</label> 
                    <select 
                        name='active'
                        className='form-control'
                        value={this.state.active}
                        onChange={this.onChangeActive}>
                          <option value="-1">Seleccione</option>
                          <option value="1">true</option>
                          <option value="0">false</option>
                    </select>
            </div>

            <button onClick={this.saveTasks} className="btn btn-success">
              Agregar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTasks })(AddTasks);
