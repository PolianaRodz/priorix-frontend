import { useKanbanStore } from "@/stores/kanbanStore";

export function useKanbanDragDrop() {
  const store = useKanbanStore();

  function handleDragStart(event, task) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("taskId", task.id.toString());
      event.dataTransfer.effectAllowed = "move";
      const target = event.target;
      setTimeout(() => {
        target.style.opacity = "0.4";
      }, 0);
    }
  }

  function handleDragEnd(event) {
    event.target.style.opacity = "1";
  }

  async function handleDrop(event, targetColumnTitle) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");

    if (taskId) {
      await store.handleMoveTask({
        taskId: parseInt(taskId),
        targetColumnTitle: targetColumnTitle,
      });
    }
  }

  return {
    handleDragStart,
    handleDragEnd,
    handleDrop,
  };
}
