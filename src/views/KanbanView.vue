<template>
  <div class="kanban-view">
    
    <KanbanBoardTitle 
      :title="store.projectTitle" 
      subtitle="Quadro Kanban"
      @update-title="store.setProjectTitle" 
    />

    <div class="columns-container">
      <KanbanColumnComponent
        v-for="column in store.columns"
        :key="column.id"
        :columnId="column.id"
        :title="column.title"
        :tasks="column.tasks"
        :projectUsers="store.projectUsers"
        :gradientStyle="column.gradientStyle"
        @addNewTask="store.addNewTask"
        @moveTask="store.handleMoveTask"
        @openTaskDetail="openDetailModal"
        @openAssigneePopup="openAssigneePopup"
        @renameColumn="store.renameColumn"
        @deleteColumn="handleDeleteColumn"
      />
    </div>

    <TaskDetailModal
      v-if="selectedTask"
      :task="selectedTask"
      :projectUsers="store.projectUsers"
      :priorities="store.priorities"
      @close="closeDetailModal"
      @updateTask="handleUpdateTask"
      @deleteTask="handleDeleteTaskFromModal"
    />

    <AddColumnModal
      v-if="isAddColumnModalOpen"
      @close="isAddColumnModalOpen = false"
      @save="createNewColumn"
    />

    <div
      v-if="assigneePopup.isOpen"
      class="assignee-popup"
      :style="{
        top: `${assigneePopup.top}px`,
        left: `${assigneePopup.left}px`,
      }"
      v-on-click-outside="() => (assigneePopup.isOpen = false)"
    >
      <div
        v-for="user in store.projectUsers"
        :key="user.id"
        class="user-item"
        @click="assignTask(user.id)"
      >
        {{ user.name }}
      </div>
    </div>

    <button class="add-column-fab" @click="isAddColumnModalOpen = true">
      <img src="../assets/icons/soma.svg" alt="Ícone de soma" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useKanbanStore } from "../stores/kanbanStore";
import { vOnClickOutside } from "@vueuse/components";
import KanbanColumnComponent from "../components/kanban/KanbanColumnComponent.vue";
import TaskDetailModal from "../components/kanban/TaskDetailModal.vue";
import AddColumnModal from "../components/kanban/AddColumnModal.vue";
import KanbanBoardTitle from "../components/kanban/KanbanBoardTitle.vue";

const store = useKanbanStore();

onMounted(() => {
  store.initializeStore();
});

const selectedTask = ref(null);
const assigneePopup = ref({
  isOpen: false,
  taskId: null,
  columnId: null,
  top: 0,
  left: 0,
});
const isAddColumnModalOpen = ref(false);

function openDetailModal(task) {
  store.resetAI();
  selectedTask.value = task;
}

function closeDetailModal() {
  store.resetAI();
  selectedTask.value = null;
}

function handleUpdateTask(updatedTask) {
  store.updateTask({ taskId: updatedTask.id, updatedTask: updatedTask });
}

function handleDeleteTaskFromModal(taskId) {
  store.deleteTask(taskId); 
  closeDetailModal();       
}

function openAssigneePopup(event, task, column) {
  const buttonRect = event.currentTarget.getBoundingClientRect();
  assigneePopup.value = {
    isOpen: true,
    taskId: task.id,
    columnId: column.id,
    top: buttonRect.bottom + 8,
    left: buttonRect.left,
  };
}

function assignTask(userId) {
  store.assignTask({
    userId: userId,
    taskId: assigneePopup.value.taskId,
    columnId: assigneePopup.value.columnId,
  });
  assigneePopup.value.isOpen = false;
}

function createNewColumn(newTitle) {
  store.addColumn(newTitle);
  isAddColumnModalOpen.value = false;
}

function handleDeleteColumn(columnId) {
  store.deleteColumn(columnId);
}
</script>

<style scoped>
.kanban-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.columns-container {
  display: flex;
  gap: 1.5rem;
  flex-grow: 1;
  overflow-x: auto;
  justify-content: center;
  padding-bottom: 1rem;
  align-items: flex-start;
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
}

.assignee-popup {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  padding: 0.5rem;
}

.user-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
}

.user-item:hover {
  background-color: #f0f0f0;
}

.add-column-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg, 
    rgb(14, 34, 48) 0%,   
    rgb(28, 57, 68) 100%  
  );
  
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  z-index: 50;
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-column-fab img {
  width: 1.5rem;
  height: 1.5rem;
  filter: brightness(0) invert(1); 
}

.add-column-fab:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 15px rgba(55, 129, 179, 0.3);
}
</style>