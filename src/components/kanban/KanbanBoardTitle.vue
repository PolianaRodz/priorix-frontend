<template>
  <header class="project-bar">
    <div class="title-wrapper">
      <input
        v-if="isEditing"
        ref="inputRef"
        v-model="editableTitle"
        class="title-input"
        @blur="saveTitle"
        @keyup.enter="saveTitle"
      />

      <div
        v-else
        class="title-display"
        @click="startEditing"
        title="Clique para renomear o projeto"
      >
        <h1 class="project-title">{{ props.title }}</h1>
        <Pencil :size="16" class="edit-icon" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import { Pencil } from "lucide-vue-next";

const props = defineProps({
  title: { type: String, default: "Projeto Sem Nome" },
});

const emit = defineEmits(["update-title"]);

const isEditing = ref(false);
const editableTitle = ref(props.title);
const inputRef = ref(null);
watch(() => props.title, (newVal) => {
  editableTitle.value = newVal;
});

function startEditing() {
  isEditing.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
}

function saveTitle() {
  isEditing.value = false;
  if (editableTitle.value.trim()) {
    emit("update-title", editableTitle.value);
  } else {
    editableTitle.value = props.title; 
  }
}
</script>

<style scoped>
.project-bar {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  background-color: rgba(3, 3, 3, 0.151); 
  backdrop-filter: blur(2px);
  border-bottom: 1px solid rgba(124, 124, 124, 0.13);
  position: sticky;
  top: 0;
  z-index: 10;
}

.title-wrapper {
  display: flex;
  align-items: center;
  max-width: 50%;
}

.title-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.title-display:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.edit-icon {
  opacity: 0;
  color: #718096;
  transition: opacity 0.2s;
}

.title-display:hover .edit-icon {
  opacity: 1;
}

.project-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ffffffe7;
  letter-spacing: -0.02em;
  text-transform: uppercase; 
  text-shadow: 2px 3px 2px #3d3d3d48;
}

.title-input {
  font-size: 1.25rem;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 6px;
  border: 2px solid #4299e1;
  background-color: rgba(255, 255, 255, 0.9);
  color: #2d3748;
  outline: none;
  width: 100%;
  text-transform: uppercase;
}
</style>