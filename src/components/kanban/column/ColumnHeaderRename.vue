<template>
  <div v-if="isRenaming" class="input-wrapper">
    <input
      v-model="editableTitle"
      class="column-title-input"
      @blur="finishRename"
      @keyup.enter="finishRename"
      ref="titleInput"
    />
  </div>

  <div
    v-else
    class="title-display"
    @click="startRename"
    title="Clique para alterar o nome"
  >
    <h3 class="column-title">
      {{ editableTitle }}
    </h3>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";

const props = defineProps({
  modelValue: String,
  columnId: [String, Number],
});
const emit = defineEmits(["update:modelValue", "save-rename"]);

const isRenaming = ref(false);
const editableTitle = ref(props.modelValue);
const titleInput = ref(null);

watch(
  () => props.modelValue,
  (newTitle) => {
    editableTitle.value = newTitle;
  }
);

function startRename() {
  isRenaming.value = true;
  nextTick(() => {
    titleInput.value?.focus();
  });
}

function finishRename() {
  if (isRenaming.value) {
    isRenaming.value = false;
    if (editableTitle.value.trim()) {
      emit("update:modelValue", editableTitle.value);
      emit("save-rename", {
        columnId: props.columnId,
        newTitle: editableTitle.value,
      });
    } else {
      editableTitle.value = props.modelValue;
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.title-display {
  width: 100%;
  padding: 6px 8px; 
  border-radius: 6px;
  cursor: pointer; 
  transition: all 0.2s ease;
  border: 1px solid transparent; 
}

.title-display:hover {
  background-color: rgba(255, 255, 255, 0.8); 
  border-color: rgba(0, 0, 0, 0.1); 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05); 
}

.column-title {
  font-weight: 700;
  font-size: 1rem;
  color: #2d3748;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.column-title-input {
  font-size: 1rem;
  font-weight: 600;
  padding: 6px 8px;
  border-radius: 6px;
  border: 2px solid #4299e1;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background-color: white;
  color: #2d3748;
}
</style>