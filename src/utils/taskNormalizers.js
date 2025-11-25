import { PRIORITY_ID } from "../constants/systemConstants";

export function formatTaskPayload(
  task,
  priorityId = PRIORITY_ID.LOW,
  responsibleId = null
) {
  return {
    id: task.id || 0,
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate,
    isCompleted: !!task.isCompleted,
    priority: Number(priorityId) || PRIORITY_ID.LOW,
    responsibleUserId: responsibleId > 0 ? Number(responsibleId) : null,

    statusId: Number(task.statusId),

    taskHistories: [],
    priorizationMetrics: [],
  };
}

export function enrichTaskWithPriority(task, prioritiesList) {
  const priorityObj =
    prioritiesList.find((p) => p.id === task.priority) || prioritiesList[0];
  return { ...task, priority: priorityObj };
}
