import api from "./api";

export default {
  async getBoardData() {
    const [status, users, tasks] = await Promise.all([
      api.get("/Status"),
      api.get("/User"),
      api.get("/Task"),
    ]);
    return {
      columns: status.data,
      users: users.data,
      tasks: tasks.data,
    };
  },

  createColumn(name) {
    return api.post("/Status", { Name: name, Tasks: [] });
  },

  renameColumn(id, name) {
    return api.put("/Status", { Id: id, Name: name });
  },

  createTask(payload) {
    return api.post("/Task", payload);
  },

  updateTask(payload) {
    return api.put("/Task", payload);
  },

  deleteTask(id) {
    return api.delete(`/Task/${id}`);
  },

  assignTask(taskId, userId) {
    return api.patch(`/Task/${taskId}/assign`, { userId });
  },

  analyzeTask(title, description) {
    return api.post(
      "/Gemini/analyze",
      { title, description },
      { timeout: 100000 }
    );
  },
};
