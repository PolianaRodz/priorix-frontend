<template>
  <div class="kanban-view">
    <header class="view-header">
      <h1>PROJETO 1</h1>
    </header>

    <div class="columns-container">
      <KanbanColumn
        v-for="column in store.columns"
        :key="column.id"
        :columnId="column.id"
        :title="column.title"
        :tasks="column.tasks"
        :projectUsers="store.projectUsers"
        @addNewTask="store.addNewTask"
        @moveTask="store.handleMoveTask"
        @openTaskDetail="openDetailModal"
        @openAssigneePopup="
          (event, task) => openAssigneePopup(event, task, column)
        "
        @deleteColumn="handleDeleteColumn"
      />
    </div>

    <TaskDetailModal
      v-if="selectedTask"
      :task="selectedTask"
      :projectUsers="store.projectUsers"
      :currentUser="store.currentUser"
      @close="closeDetailModal"
      @updateTask="handleUpdateTask"
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

    <CreateColumnModal
      v-if="isAddColumnModalOpen"
      @cancel="isAddColumnModalOpen = false"
      @confirm="createNewColumn"
    />

    <button class="add-column-fab" @click="isAddColumnModalOpen = true">
      +
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
//
// MUDANÇA 1:
// O caminho da store estava errado. O 'stores' está na raiz 'src/',
// então usamos o atalho '@/'
//
import { useKanbanStore } from "@/stores/kanbanStore";
import { vOnClickOutside } from "@vueuse/components";

//
// MUDANÇA 2:
// Os caminhos dos componentes foram corrigidos
// para bater com a sua estrutura de pastas
//
import KanbanColumn from "@/features/kanban/components/KanbanColumn.vue";
import TaskDetailModal from "@/features/kanban/modals/TaskDetailModal.vue";
import CreateColumnModal from "@/features/kanban/modals/CreateColumnModal.vue";

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

function openDetailModal(task) {
  selectedTask.value = task;
}

function closeDetailModal() {
  selectedTask.value = null;
}

function handleUpdateTask(updatedTask) {
  store.updateTask({ taskId: updatedTask.id, updatedTask: updatedTask });
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

function handleDeleteColumn(columnId) {
  store.deleteColumn(columnId);
}

const isAddColumnModalOpen = ref(false);

function createNewColumn(newTitle) {
  store.addColumn(newTitle);
  isAddColumnModalOpen.value = false;
}
</script>

<style scoped>
/* Nenhum estilo precisou ser alterado */
.kanban-view {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.view-header {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.columns-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-grow: 1;
  overflow-x: auto;
  padding-bottom: 1rem;
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
  background-color: #2b6cb0;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
  z-index: 50;
  display: flex;
  padding-top: 2.5px;
  justify-content: center;
}

.add-column-fab:hover {
  background-color: #2c5282;
}
</style>
