<template>
  <h3 class="section-title">CHECKLIST</h3>
  <div class="checklist">
    <div v-for="item in modelValue" :key="item.id" class="check-item">
      <input type="checkbox" v-model="item.completed" />
      <input type="text" v-model="item.text" class="check-item-input" />
    </div>
  </div>
  <div class="add-checklist-item">
    <input
      type="text"
      v-model="newChecklistItemText"
      placeholder="Adicionar um item..."
      @keyup.enter="addItem"
    />
    <button @click="addItem">Adicionar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
});
const emit = defineEmits(["add-item"]);

const newChecklistItemText = ref("");

function addItem() {
  if (!newChecklistItemText.value.trim()) return;
  emit("add-item", newChecklistItemText.value);
  newChecklistItemText.value = "";
}
</script>

<style scoped>
.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: #4a5568;
}
.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.check-item-input {
  border: 1px solid transparent;
  background: none;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.25rem;
  transition: all 0.2s ease-in-out;
  color: #2d3748;
}
.check-item-input:hover {
  border-color: #e2e8f0;
}
.check-item-input:focus {
  outline: none;
  border-color: #4299e1;
  background-color: white;
}
.add-checklist-item {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.add-checklist-item input {
  flex-grow: 1;
  border: 1px solid #cbd5e0;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
.add-checklist-item button {
  background-color: #e2e8f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  color: #4a5568;
}
</style>
