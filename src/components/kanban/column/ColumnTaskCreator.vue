<template>
  <CreateTaskForm
    v-if="isCreatingTask"
    @createTask="handleCreateTask"
    @cancel="isCreatingTask = false"
  />
  <button v-else class="add-card-btn" @click="isCreatingTask = true">
    <Plus :size="16" /> Add Card
  </button>
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import CreateTaskForm from "./CreateTaskForm.vue";

const props = defineProps({
  columnTitle: String,
});
const emit = defineEmits(["add-new-task"]);

const isCreatingTask = ref(false);

function handleCreateTask(newTask) {
  emit("add-new-task", { task: newTask, columnTitle: props.columnTitle });
  isCreatingTask.value = false;
}
</script>

<style scoped>
.add-card-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  z-index: 1;
  justify-content: center;
}
.add-card-btn:hover {
  background-color: #cbd5e0;
}
</style>
