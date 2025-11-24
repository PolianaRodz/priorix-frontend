<template>
  <div class="sidebar-content">
    
    <div class="metadata-group">
      <label>Responsável</label>
      <select
        :value="assignee"
        @change="$emit('update:assignee', Number($event.target.value) || null)"
        class="value-select"
      >
        <option :value="null">Ninguém</option>
        <option v-for="user in projectUsers" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <div class="metadata-group">
      <label>Prioridade</label>
      
      <div class="custom-select" :class="{ open: isOpen }">
        
        <div 
          class="select-trigger" 
          @click="toggleDropdown"
          :style="currentPriority ? { background: currentPriority.gradient, border: 'none', color: 'white' } : {}"
        >
          <span>{{ currentPriority ? currentPriority.name : 'Selecione...' }}</span>
          
          <ChevronDown :size="18" class="arrow-icon" :class="{ rotated: isOpen }" />
        </div>

        <div v-if="isOpen" class="options-list">
          <div
            v-for="p in priorities"
            :key="p.id"
            class="option-item"
            :style="{ background: p.gradient }"
            @click="selectPriority(p)"
          >
            {{ p.name }}
            <span v-if="isSelected(p)" class="check-icon">✔</span>
          </div>
        </div>

      </div>
    </div>

    <div class="metadata-group">
      <label>Prazo</label>
      <input
        type="date"
        :value="deadline"
        @input="$emit('update:deadline', $event.target.value)"
        class="value-input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";

const props = defineProps({
  assignee: [Number, String, null],
  priority: { type: [Object, Number, String, null], default: null }, 
  deadline: [String, null],
  projectUsers: { type: Array, default: () => [] },
  priorities: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "update:assignee",
  "update:priority",
  "update:deadline",
]);


const isOpen = ref(false);
const currentPriority = computed(() => {
  if (!props.priority) return null;
  const currentId = (typeof props.priority === 'object') ? props.priority.id : Number(props.priority);
  return props.priorities.find(p => p.id === currentId);
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectPriority(priorityObject) {
  emit("update:priority", priorityObject);
  isOpen.value = false; 
}

function isSelected(p) {
  return currentPriority.value?.id === p.id;
}
</script>

<style scoped>



.metadata-group {
  margin-bottom: 1.5rem;
  position: relative; 
}

.metadata-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #718096;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value-select,
.value-input {
  width: 100%;
  background-color: rgb(221, 221, 221);
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #888888;
  color: #161616;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s;
}
.value-select:focus,
.value-input:focus {
  border-color: #333333;
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e0;
  background-color: rgb(240, 239, 239);
  color: #2d3748;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  min-height: 42px; 
}

.select-trigger:hover {
  filter: brightness(0.98); 
}

.arrow-icon {
  transition: transform 0.3s ease;
  opacity: 0.8;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.options-list {
  position: absolute;
  top: 110%; 
  left: 0;
  width: 100%;
  background: rgb(218, 218, 218);
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(124, 124, 124, 0.2); 
  z-index: 100; 
  overflow: hidden;
  border: 1px solid #909192;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.15s ease-out;
}

.option-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: filter 0.2s;
  border-bottom: 1px solid rgba(146, 146, 146, 0.295);
}

.option-item:last-child {
  border-bottom: none;
}

.option-item:hover {
  filter: brightness(1.1); 
}

.check-icon {
  background: rgba(255, 255, 255, 0.3);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>