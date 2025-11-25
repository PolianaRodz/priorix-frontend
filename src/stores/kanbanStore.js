import { defineStore } from "pinia";
import kanbanService from "../services/kanbanService";
import {
  formatTaskPayload,
  enrichTaskWithPriority,
} from "../utils/taskNormalizers";
import { COLUMN_ID, PRIORITY_ID } from "../constants/systemConstants";
import { getRandomGradient } from "../utils/colorUtils";

export const useKanbanStore = defineStore("kanban", {
  state: () => ({
    projectUsers: [],
    columns: [],
    projectTitle: localStorage.getItem("kanbanProjectTitle") || "PROJETO 1",
    priorities: [
      {
        id: PRIORITY_ID.LOW,
        name: "Baixa Prioridade",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
      },
      {
        id: PRIORITY_ID.MEDIUM,
        name: "Média Prioridade",
        gradient: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
      },
      {
        id: PRIORITY_ID.HIGH,
        name: "Alta Prioridade",
        gradient: "linear-gradient(to right, #ff0844 0%, #ffb199 100%)",
      },
    ],
    isStateInitialized: false,
    iaResponse: "",
    iaError: "",
    loadingIa: false,
  }),

  actions: {
    async initializeStore() {
      if (this.isStateInitialized) return;

      try {
        const data = await kanbanService.getBoardData();
        this.projectUsers = data.users;

        const enrichedTasks = data.tasks.map((task) =>
          enrichTaskWithPriority(task, this.priorities)
        );

        this.columns = data.columns.map((status) => ({
          id: status.id,
          title: status.name,
          gradientStyle: getRandomGradient(),
          tasks: enrichedTasks.filter((task) => task.statusId === status.id),
        }));

        this.isStateInitialized = true;
      } catch (error) {
        console.error(error);
      }
    },

    async addColumn(title) {
      if (!title?.trim()) return;
      try {
        const response = await kanbanService.createColumn(title.trim());
        this.columns.push({
          id: response.data.id,
          title: response.data.name,
          gradientStyle: getRandomGradient(),
          tasks: response.data.tasks || [],
        });
      } catch (error) {
        console.error(error);
      }
    },

    async renameColumn({ columnId, newTitle }) {
      if (!newTitle?.trim()) return;
      const column = this.columns.find((c) => c.id === columnId);
      if (!column) return;

      try {
        await kanbanService.renameColumn(column.id, newTitle.trim());
        column.title = newTitle.trim();
      } catch (error) {
        console.error(error);
      }
    },

    async addNewTask({ task, columnTitle }) {
      const targetColumn = this.columns.find((c) => c.title === columnTitle);
      if (!targetColumn) return;

      const taskData = {
        ...task,
        statusId: targetColumn.id,
        dueDate: task.dueDate || new Date().toISOString(),
      };

      const priorityId = task.priority || PRIORITY_ID.LOW;
      const responsibleId = task.responsibleUserId;

      const payload = formatTaskPayload(taskData, priorityId, responsibleId);

      try {
        const response = await kanbanService.createTask(payload);
        const savedTask = enrichTaskWithPriority(
          response.data,
          this.priorities
        );
        targetColumn.tasks.push(savedTask);
      } catch (error) {
        console.error(error);
      }
    },

    async updateTask({ taskId, updatedTask }) {
      try {
        const priorityId =
          typeof updatedTask.priority === "object"
            ? updatedTask.priority.id
            : Number(updatedTask.priority);

        const responsibleId =
          typeof updatedTask.responsibleUserId === "object"
            ? updatedTask.responsibleUserId?.id
            : Number(updatedTask.responsibleUserId);

        const payload = formatTaskPayload(
          updatedTask,
          priorityId,
          responsibleId
        );

        const response = await kanbanService.updateTask(payload);
        const savedTask = enrichTaskWithPriority(
          response.data,
          this.priorities
        );

        for (const column of this.columns) {
          const idx = column.tasks.findIndex((t) => t.id === taskId);
          if (idx !== -1) {
            column.tasks[idx] = { ...column.tasks[idx], ...savedTask };
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTask(taskId) {
      if (!taskId) return;

      try {
        await kanbanService.deleteTask(taskId);

        for (const column of this.columns) {
          const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            break;
          }
        }
      } catch (error) {
        console.error(error);
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

      taskToMove.statusId = targetColumn.id;

      targetColumn.tasks.push(taskToMove);

      await this.updateTask({ taskId, updatedTask: taskToMove });
    },

    async assignTask({ userId, taskId, columnId }) {
      const column = this.columns.find((c) => c.id === columnId);
      const task = column?.tasks.find((t) => t.id === taskId);
      if (!task) return;

      const originalAssignee = task.responsibleUserId;
      task.responsibleUserId = userId;

      try {
        await kanbanService.assignTask(taskId, userId);
      } catch (error) {
        console.error(error);
        task.responsibleUserId = originalAssignee;
      }
    },

    async generateAISuggestion(task) {
      this.iaError = "";
      this.iaResponse = "";
      this.loadingIa = true;

      try {
        const response = await kanbanService.analyzeTask(
          task.title,
          task.description
        );
        this.iaResponse = response.data;
      } catch (error) {
        console.error(error);
        this.iaError = "Erro ao consultar IA.";
      } finally {
        this.loadingIa = false;
      }
    },

    resetAI() {
      this.iaResponse = "";
      this.iaError = "";
      this.loadingIa = false;
    },

    setProjectTitle(newTitle) {
      if (!newTitle || !newTitle.trim()) return;
      this.projectTitle = newTitle.trim();
      localStorage.setItem("kanbanProjectTitle", this.projectTitle);
    },
  },

  getters: {
    tasksTodo: (state) =>
      state.columns.find((c) => c.id === COLUMN_ID.TODO)?.tasks || [],

    tasksInProgress: (state) =>
      state.columns.find((c) => c.id === COLUMN_ID.IN_PROGRESS)?.tasks || [],

    completedTasks: (state) =>
      state.columns.find((c) => c.id === COLUMN_ID.DONE)?.tasks || [],

    totalTasks: (state) => state.columns.flatMap((c) => c.tasks).length,

    averageCompletionTime(state) {
      const doneTasks =
        state.columns.find((c) => c.id === COLUMN_ID.DONE)?.tasks || [];
      const tasksWithTime = doneTasks.filter(
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
        if (task.statusId === COLUMN_ID.DONE) {
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
        const isProgressColumn = column.id === COLUMN_ID.IN_PROGRESS;

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
