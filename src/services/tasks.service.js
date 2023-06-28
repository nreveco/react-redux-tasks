import http from "../http-common";

class TasksDataService {
  getAll() {
    return http.get("/tasks");
  }

  get(identifier) {
    return http.get(`/tasks/${identifier}`);
  }

  create(data) {
    return http.post("/tasks", data);
  }

  update(identifier, data) {
    console.log(data);
    return http.put(`/tasks/${identifier}`, data);
  }

  delete(identifier) {
    return http.delete(`/tasks/${identifier}`);
  }

  findByTitle(){
    return true;
  }
}

export default new TasksDataService();