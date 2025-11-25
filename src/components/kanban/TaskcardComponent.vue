<template>
  <div
    class="task-card"
    draggable="true"
    @dragstart="handleDragStart($event, task)"
    @dragend="handleDragEnd"
    @click="$emit('openTaskDetail', task)"
  >
    <div class="card-header">
      <span
        v-if="task.priority"
        class="priority-tag"
        :style="{ background: task.priority.gradient || '#718096' }"
      >
        {{ task.priority.name || "Sem prioridade" }}
      </span>
    </div>

    <p class="task-title">{{ task.title }}</p>

    <div class="card-footer">
      <div class="actions">
        <button class="action-btn">
          <Plus :size="16" />
        </button>

        <button
          v-if="task.assignee"
          class="assignee"
          @click.stop="$emit('openAssigneePopup', $event)"
        >
          <img
            src="@/assets/imgs/user-icon.png"
            alt="Avatar"
            class="avatar-task-img"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from "lucide-vue-next";
import { useKanbanDragDrop } from "@/composables/useKanbanDragDrop";

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({
      comments: [],
      attachments: [],
      priority: null,
    }),
  },
  projectUsers: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["openTaskDetail", "openAssigneePopup"]);

// Padrão Humble Component: delegamos a lógica para o composable
const { handleDragStart, handleDragEnd } = useKanbanDragDrop();
</script>

<style scoped>
/* Mantenha o estilo existente exatamente como estava */
.task-card {
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: grab;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease-in-out;
  position: relative;
  isolation: isolate;
}

.task-card:active {
  cursor: grabbing;
}

.task-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #28292e;
  background-image: url("@/assets/imgs/background-texture.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: -1;
  border-radius: inherit;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 0.75rem;
}

.priority-tag {
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.task-title {
  font-size: 0.875rem;
  color: #2d3748;
  margin: 0;
  font-weight: 600;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #718096;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #718096;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #edf2f7;
  color: #2d3748;
}

.assignee {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-task-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
