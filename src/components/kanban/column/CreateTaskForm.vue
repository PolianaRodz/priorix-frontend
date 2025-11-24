<template>
  <form @submit.prevent="handleSubmit" class="create-form">
    <div class="form-group">
      <textarea
        v-model="title"
        placeholder="Digite um título para este card..."
        rows="2"
        required
        class="form-textarea"
        ref="titleInput"
      ></textarea>
    </div>

    <div class="form-group">
      <textarea
        v-model="description"
        placeholder="Adicione uma descrição (opcional)..."
        rows="3"
        class="form-textarea"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="task-priority">Prioridade</label>
      <select id="task-priority" v-model="priorityName" class="form-select">
        <option>Baixa Prioridade</option>
        <option>Média Prioridade</option>
        <option>Alta Prioridade</option>
      </select>
    </div>
    <div class="form-actions">
      <button type="submit" class="submit-btn">Adicionar Card</button>
      <button type="button" class="cancel-btn" @click="$emit('cancel')">
        <X :size="18" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { X } from "lucide-vue-next";

const emit = defineEmits(["createTask", "cancel"]);

const title = ref("");
const description = ref("");
const priorityName = ref("Baixa Prioridade");

const titleInput = ref(null);
onMounted(() => {
  titleInput.value?.focus();
});

function handleSubmit() {
  if (!title.value.trim()) return;

  const priorityMap = {
    "Baixa Prioridade": 1,
    "Média Prioridade": 2,
    "Alta Prioridade": 3
  };

  const priorityInt = priorityMap[priorityName.value] || 1;

  emit("createTask", {
    title: title.value,
    description: description.value,
    priority: priorityInt, 
  });

  title.value = "";
  description.value = "";
  priorityName.value = "Baixa Prioridade";
}
</script>

<style scoped>
.create-form {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 0.75rem;
}
.form-textarea,
.form-select {
  width: 100%;
  border: 1px solid #cbd5e0;
  resize: vertical;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 0.25rem;
  outline: none;
  font-family: inherit;
}
.form-textarea:focus,
.form-select:focus {
  border-color: #4299e1;
}
label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #718096;
  margin-bottom: 0.25rem;
  display: block;
}
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
button {
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit-btn {
  padding: 0.5rem 1rem;
  background-color: #2b6cb0;
  color: white;
}
.cancel-btn {
  background: none;
  color: #718096;
  padding: 0.5rem;
}
</style>