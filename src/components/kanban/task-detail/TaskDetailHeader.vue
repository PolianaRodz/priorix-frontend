<template>
  <input
    type="text"
    class="task-main-title"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.task-main-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  background: none;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.25rem;
  transition: all 0.2s ease-in-out;
  color: #2d3748;
}
.task-main-title:hover {
  border-color: #e2e8f0;
}
.task-main-title:focus {
  outline: none;
  border-color: #4299e1;
  background-color: white;
}
</style>
