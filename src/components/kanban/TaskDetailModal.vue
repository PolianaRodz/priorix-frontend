<template>
  <div class="modal-overlay" @click.self="saveAndClose">
    <div class="modal-content" v-if="editableTask.id">
      <button class="close-btn" @click="saveAndClose"><X :size="24" /></button>

      <div class="modal-layout">
        <div class="main-content">
          <TaskDetailHeader v-model="editableTask.title" />

          <TaskDetailDescription v-model="editableTask.description" />

          <TaskDetailAI :task="editableTask" />
        </div>

        <div class="sidebar-content">
          <TaskDetailSidebar
            v-model:assignee="editableTask.responsibleUserId"
            v-model:priority="editableTask.priority"
            v-model:deadline="editableTask.dueDate"
            :projectUsers="props.projectUsers"
            :priorities="props.priorities"
          />
        </div>
      </div>

      <div class="modal-footer">
        <div class="action-group">
          
          <button class="delete-btn" @click="showDeleteConfirmation">
            <Trash2 :size="18" />
            <span>Excluir</span>
          </button>

          <div class="vertical-divider"></div>

          <button class="save-btn" @click="saveAndClose">
            Salvar Alterações
          </button>
          
        </div>
      </div>

      <div v-if="isDeleteConfirmationOpen" class="confirmation-overlay">
        <div class="confirmation-box">
          <h3>Excluir Tarefa?</h3>
          <p>Esta ação é permanente e não pode ser desfeita.</p>
          
          <div class="confirmation-actions">
            <button class="btn-cancel-delete" @click="isDeleteConfirmationOpen = false">
              Cancelar
            </button>
            <button class="btn-confirm-delete" @click="confirmDelete">
              Sim, Excluir
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { X, Trash2 } from "lucide-vue-next"; 
import TaskDetailHeader from "./task-detail/TaskDetailHeader.vue";
import TaskDetailDescription from "./task-detail/TaskDetailDescription.vue";
import TaskDetailSidebar from "./task-detail/TaskDetailSidebar.vue";
import TaskDetailAI from "./task-detail/TaskDetailAI.vue";

const props = defineProps({
  task: { type: Object, required: true },
  projectUsers: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => [] },
});

const emit = defineEmits(["close", "updateTask", "deleteTask"]);
const editableTask = ref({ checklist: [] });
const isDeleteConfirmationOpen = ref(false);

watch(
  () => props.task,
  (newTask) => {
    editableTask.value = JSON.parse(JSON.stringify(newTask));

    if (!editableTask.value.checklist) {
      editableTask.value.checklist = [];
    }

    if (editableTask.value.dueDate) {
      editableTask.value.dueDate = editableTask.value.dueDate.split("T")[0];
    }

    if (props.priorities && props.priorities.length > 0 && editableTask.value.priority) {
      if (typeof editableTask.value.priority === "number") {
        const priorityId = editableTask.value.priority;
        const foundPriority = props.priorities.find((p) => p.id === priorityId);
        editableTask.value.priority = foundPriority || null;
      }
    } else {
      editableTask.value.priority = null;
    }
  },
  { immediate: true }
);

function showDeleteConfirmation() {
  isDeleteConfirmationOpen.value = true;
}

function confirmDelete() {
  emit("deleteTask", editableTask.value.id);
  isDeleteConfirmationOpen.value = false;
}

function saveAndClose() {
  const taskToEmit = JSON.parse(JSON.stringify(editableTask.value));
  
  if (taskToEmit.priority && typeof taskToEmit.priority === "object") {
    taskToEmit.priority = taskToEmit.priority.id;
  }
  
  emit("updateTask", taskToEmit);
  emit("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: linear-gradient(135deg, #c2c2c2 0%, #dadada 100%);
  width: 90%;
  max-width: 900px;
  height: 70%;
  border-radius: 0.75rem;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: popIn 0.2s ease-out forwards;
  transform: scale(0.95);
}

.modal-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/imgs/background-img.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.08; 
  z-index: -1; 
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
  transition: transform 0.2s;
}
.close-btn:hover {
  color: #1a202c;
  transform: scale(1.1);
}

.modal-layout {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 0.5rem;
}
.main-content {
  flex: 2;
}
.sidebar-content {
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding-top: 1.5rem;
  margin-top: auto;
  border-top: 1px solid rgba(136, 136, 136, 0.404);
}

.action-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vertical-divider {
  width: 1px;
  height: 24px;
  background-color: #cbd5e0;
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: #718096; 
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.delete-btn:hover {
  color: #2b6cb0; 
  background-color: rgba(43, 108, 176, 0.1); 
}

.save-btn {
  background: linear-gradient(
    135deg, 
    rgb(151, 151, 151) 0%,   
    rgb(91, 101, 105) 100%  
  );
  color: rgb(255, 255, 255);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
  background: linear-gradient(
    135deg, 
    rgb(160, 160, 160) 0%,   
    rgb(25, 59, 71) 100%  
  );
}

.confirmation-overlay {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(117, 117, 117, 0.123);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  border-radius: 0.75rem; 
  animation: fadeIn 0.2s ease-out;
}

.confirmation-box {
  background: rgb(247, 247, 247);
  padding: 2rem 3rem; 
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 350px;
  border: 1px solid #e2e8f0;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.confirmation-box h3 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 700;
}

.confirmation-box p {
  margin: 0 0 1.5rem 0;
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.4;
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-cancel-delete {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  background: rgb(247, 247, 247);
  color: #4a5568;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-cancel-delete:hover {
  background-color: #f7fafc;
  border-color: #a0aec0;
}

.btn-confirm-delete {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #6d5858;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-confirm-delete:hover {
  background-color: #490404;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>