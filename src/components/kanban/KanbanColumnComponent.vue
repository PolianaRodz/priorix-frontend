<template>
  <div class="kanban-column" @dragover.prevent @drop="onDrop">
    <div
      class="column-color-bar"
      :style="{ background: props.gradientStyle }"
    ></div>

    <div class="column-header">
      <ColumnHeaderRename
        :modelValue="props.title"
        :columnId="props.columnId"
        @save-rename="emit('renameColumn', $event)"
      />
      </div>

    <div class="cards-container">
      <TaskCardComponent
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :projectUsers="projectUsers"
        @openTaskDetail="(task) => $emit('openTaskDetail', task)"
        @openAssigneePopup="(event) => $emit('openAssigneePopup', event, task)"
      />
    </div>

    <ColumnTaskCreator
      :columnTitle="props.title"
      @add-new-task="emit('addNewTask', $event)"
    />
  </div>
</template>

<script>
function getRandomGradient() {
  const h1 = Math.floor(Math.random() * 360);
  const h2 = (h1 + 40 + Math.floor(Math.random() * 50)) % 360;
  const s = 75 + Math.floor(Math.random() * 20); 
  const l = 45 + Math.floor(Math.random() * 15); 

  return `linear-gradient(135deg, hsl(${h1}, ${s}%, ${l}%), hsl(${h2}, ${s}%, ${l}%))`;
}
</script>

<script setup>
import TaskCardComponent from "./TaskcardComponent.vue";
import ColumnHeaderRename from "./column/ColumnHeaderRename.vue";
import ColumnTaskCreator from "./column/ColumnTaskCreator.vue";

const props = defineProps({
  columnId: { type: [String, Number], required: true },
  title: String,
  tasks: Array,
  projectUsers: { type: Array, default: () => [] },
  gradientStyle: {
    type: String,
    default: () => getRandomGradient(),
  },
});

const emit = defineEmits([
  "addNewTask",
  "moveTask",
  "openTaskDetail",
  "openAssigneePopup",
  "renameColumn",
]);

function onDrop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("taskId");
  if (taskId) {
    emit("moveTask", {
      taskId: parseInt(taskId),
      targetColumnTitle: props.title,
    });
  }
}
</script>

<style scoped>
.kanban-column {
  background-color: rgba(255, 255, 255, 0.384);
  backdrop-filter: blur(2px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  min-width: 20rem;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  isolation: isolate;
}

.kanban-column::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/imgs/background-texture.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.05;  
  z-index: -1;
  border-radius: inherit;
}

.column-color-bar {
  height: 10px;
  margin-top: -1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  position: relative;
  z-index: 2;
}
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 0.5rem;
  min-height: 32px;
}
.cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  min-height: 50px;
  position: relative;
  z-index: 1;
}
</style>