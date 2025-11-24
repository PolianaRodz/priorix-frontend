import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://localhost:7178/api";

export const useKanbanStore = defineStore("kanban", {
  state: () => ({
    projectUsers: [],
    columns: [],
    priorities: [
      { id: 1, name: "Baixa Prioridade", gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" },
      { id: 2, name: "Média Prioridade", gradient: "linear-gradient(to right, #f6d365 0%, #fda085 100%)" },
      { id: 3, name: "Alta Prioridade", gradient: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)" }
    ],
    isStateInitialized: false,
    
    iaResponse: "",
    iaError: "",
    loadingIa: false,
  }),

  actions: {
    async initializeStore() {
      if (this.isStateInitialized) return;

      console.log(`🔌 Conectando ao backend em: ${API_URL}`);

      try {
        const [statusResponse, usersResponse, tasksResponse] =
          await Promise.all([
            axios.get(`${API_URL}/Status`),
            axios.get(`${API_URL}/User`),
            axios.get(`${API_URL}/Task`),
          ]);

        this.projectUsers = usersResponse.data;

        const allTasks = tasksResponse.data;
    
        const enrichedTasks = allTasks.map(task => {
            const priorityObj = this.priorities.find(p => p.id === task.priority) || this.priorities[0];
            return { ...task, priority: priorityObj };
        });


        this.columns = statusResponse.data.map((status) => {
          const tasksForThisColumn = enrichedTasks.filter(
            (task) => task.statusId === status.id
          );
          return {
            id: status.id,
            title: status.name,
            tasks: tasksForThisColumn,
          };
        });

        this.isStateInitialized = true;
        console.log("✅ Dados principais carregados!");
      } catch (error) {
        console.error("❌ ERRO CRÍTICO: O quadro não carregou.", error);
        alert("Erro ao carregar o quadro. Verifique o console (F12).");
        return; 
      }
    },

    async addColumn(title) {
      if (!title || !title.trim()) return;
      try {
        const response = await axios.post(`${API_URL}/Status`, {
          Name: title.trim(),
          Tasks: [],
        });

        this.columns.push({
          id: response.data.id,
          title: response.data.name,
          tasks: response.data.tasks || [],
        });
      } catch (error) {
        console.error("❌ Erro ao adicionar coluna:", error);
      }
    },

    async renameColumn({ columnId, newTitle }) {
      if (!newTitle?.trim()) return;
      const column = this.columns.find((c) => c.id === columnId);
      if (!column) return;
      try {
        await axios.put(`${API_URL}/Status`, {
          Id: column.id,
          Name: newTitle.trim(),
        });
        column.title = newTitle.trim();
      } catch (error) {
        console.error("❌ Erro ao renomear coluna:", error);
      }
    },

    async deleteColumn(columnId) {
      try {
        await axios.delete(`${API_URL}/Status/${columnId}`);
        this.columns = this.columns.filter((c) => c.id !== columnId);
      } catch (error) {
        console.error("❌ Erro ao deletar coluna:", error);
      }
    },

    async deleteTask(taskId) {
      if (!taskId) return;

      try {
        await axios.delete(`${API_URL}/Task/${taskId}`);

        for (const column of this.columns) {
          const taskIndex = column.tasks.findIndex((t) => t.id === taskId);

          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            break;
          }
        }
      } catch (error) {
        console.error("❌ Erro ao deletar tarefa:", error);
      }
    },

    async addNewTask({ task, columnTitle }) {
      try {
        const targetColumn = this.columns.find((c) => c.title === columnTitle);
        if (!targetColumn) {
          console.error("❌ Coluna não encontrada:", columnTitle);
          return;
        }

        const taskData = {
          title: task.title || "Nova tarefa",
          description: task.description || "",
          dueDate: task.dueDate || new Date().toISOString(),
          isCompleted: false,
          priority: task.priority || 1, 
          responsibleUserId: (task.responsibleUserId && task.responsibleUserId > 0) 
                              ? task.responsibleUserId 
                              : null, 
          
          statusId: targetColumn.id,
          taskHistories: [],
          priorizationMetrics: []
        };

        console.log("📤 Enviando task limpa:", taskData);

        const response = await axios.post(`${API_URL}/Task`, taskData);
        const savedTask = response.data;
        savedTask.priority = this.priorities.find(p => p.id === savedTask.priority) || this.priorities[0];

        targetColumn.tasks.push(savedTask);
        console.log("✅ Tarefa criada com sucesso:", savedTask);

      } catch (error) {
        console.error("❌ Erro ao adicionar tarefa:", error.response?.data || error);
        alert("Erro ao criar tarefa. Verifique o console (F12) para detalhes.");
      }
    },

    async updateTask({ taskId, updatedTask }) {
      try {
        let priorityId = 0;
        if (updatedTask.priority && typeof updatedTask.priority === 'object') {
            priorityId = updatedTask.priority.id || 0;
        } else {
            priorityId = Number(updatedTask.priority) || 0;
        }

        let responsibleId = null;
        if (updatedTask.responsibleUserId) {
             if (typeof updatedTask.responsibleUserId === 'object') {
                 responsibleId = updatedTask.responsibleUserId.id;
             } else {
                 responsibleId = Number(updatedTask.responsibleUserId);
             }
             if (responsibleId <= 0) responsibleId = null;
        }

        const payload = {
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description || "",
          dueDate: updatedTask.dueDate,
          isCompleted: !!updatedTask.isCompleted,
          
          priority: priorityId || 1, 
          responsibleUserId: responsibleId,
          statusId: Number(updatedTask.statusId),
          
          taskHistories: [], 
          priorizationMetrics: [] 
        };

        console.log("📤 Enviando Payload BLINDADO:", JSON.stringify(payload, null, 2));

        const response = await axios.put(
          `${API_URL}/Task`,
          payload
        );
        
        const savedTask = response.data;
        const pId = Number(savedTask.priority);
        const priorityObj = this.priorities.find(p => p.id === pId) || this.priorities[0];
        savedTask.priority = priorityObj;

        for (const column of this.columns) {
          const idx = column.tasks.findIndex((t) => t.id === taskId);
          if (idx !== -1) {
            column.tasks[idx] = { ...column.tasks[idx], ...savedTask }; 
            break;
          }
        }
        console.log("✅ Tarefa atualizada com sucesso!");

      } catch (error) {
        console.error("❌ Erro ao atualizar tarefa:", error.response?.data || error);
      }
    },

    async handleMoveTask({ taskId, targetColumnTitle }) {
      let taskToMove, sourceColumn;

      for (const column of this.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          sourceColumn = column;
          taskToMove = { ...column.tasks[taskIndex] };
          break;
        }
      }

      const targetColumn = this.columns.find(
        (c) => c.title === targetColumnTitle
      );
      if (!taskToMove || !targetColumn || sourceColumn.id === targetColumn.id)
        return;

      sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
      targetColumn.tasks.push(taskToMove);

      taskToMove.statusId = targetColumn.id;
      
      if (typeof taskToMove.priority === 'object') {
          taskToMove.priority = taskToMove.priority.id;
      }

      await this.updateTask({ taskId, updatedTask: taskToMove });
    },

    async assignTask({ userId, taskId, columnId }) {
      const column = this.columns.find((c) => c.id === columnId);
      const task = column?.tasks.find((t) => t.id === taskId);
      if (!task) return;

      const originalAssignee = task.responsibleUserId;
      task.responsibleUserId = userId;

      try {
        await axios.patch(`${API_URL}/Task/${taskId}/assign`, { userId });
      } catch (error) {
        console.error("❌ Erro ao atribuir responsável:", error);
        task.responsibleUserId = originalAssignee;
      }
    },

    async generateAISuggestion(task) {
      this.iaError = "";
      this.iaResponse = "";
      this.loadingIa = true;

      try {
        const response = await axios.post(
          `${API_URL}/Gemini/analyze`,
          {
            title: task.title,
            description: task.description,
          },
          { timeout: 100000 }
        );
        this.iaResponse = response.data;
      } catch (error) {
        console.error("Erro IA:", error);
        if (error.response) {
          this.iaError =
            "Erro no servidor: " + JSON.stringify(error.response.data);
        } else if (error.code === "ERR_NETWORK") {
          this.iaError = "Não foi possível conectar ao servidor (CORS/HTTPS).";
        } else {
          this.iaError = "Falha ao gerar sugestão.";
        }
      } finally {
        this.loadingIa = false;
      }
    },
    
    resetAI() {
      this.iaResponse = "";
      this.iaError = "";
      this.loadingIa = false;
    },
  },

  getters: {
    tasksTodo: (state) => state.columns.find((c) => c.id === 1)?.tasks || [],

    tasksInProgress: (state) =>
      state.columns.find((c) => c.id === 2)?.tasks || [],

    completedTasks: (state) =>
      state.columns.find((c) => c.id === 9)?.tasks || [],

    totalTasks: (state) => state.columns.flatMap((c) => c.tasks).length,
    
    averageCompletionTime(state) {
      const tasksWithTime = this.completedTasks.filter(
        (t) => t.createdAt && t.completedAt
      );
      if (tasksWithTime.length === 0) return 0;

      const totalMilliseconds = tasksWithTime.reduce((sum, task) => {
        const start = new Date(task.createdAt).getTime();
        const end = new Date(task.completedAt).getTime();
        return sum + (end - start);
      }, 0);

      const avgMilliseconds = totalMilliseconds / tasksWithTime.length;
      return avgMilliseconds / (1000 * 60 * 60 * 24);
    },

    productivityBySprint(state) {
      const allTasks = state.columns.flatMap((c) => c.tasks);
      const sprints = {};

      allTasks.forEach((task) => {
        if (!task.sprint || !task.effort) return;
        if (!sprints[task.sprint]) {
          sprints[task.sprint] = { completedEffort: 0 };
        }
        if (this.completedTasks.some((doneTask) => doneTask.id === task.id)) {
          sprints[task.sprint].completedEffort += task.effort;
        }
      });

      return Object.keys(sprints).map((sprintNum) => ({
        sprint: `Sprint ${sprintNum}`,
        completed: sprints[sprintNum].completedEffort,
      }));
    },

    teamWorkload: (state) => {
      const workloadMap = {};
      state.projectUsers.forEach((user) => {
        workloadMap[user.id] = {
          ...user,
          totalTasks: 0,
          tasksInProgress: 0,
        };
      });

      state.columns.forEach((column) => {
        const isProgressColumn = column.id === 2;
        column.tasks.forEach((task) => {
          const userId = task.responsibleUserId;
          if (workloadMap[userId]) {
            workloadMap[userId].totalTasks++;

            if (isProgressColumn) {
              workloadMap[userId].tasksInProgress++;
            }
          }
        });
      });

      return Object.values(workloadMap);
    },
  },
});