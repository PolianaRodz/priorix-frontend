<template>
  <BaseModal @close="$emit('close')">
    <div class="modal-content">
      <h3>Adicionar Nova Tarefa</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="task-title">Título da Tarefa</label>
          <input
            id="task-title"
            v-model="newTask.title"
            type="text"
            required
            placeholder="Ex: Corrigir bug na home"
          />
        </div>

        <div class="form-group">
          <label for="task-priority">Prioridade</label>
          <select id="task-priority" v-model="newTask.priority.name">
            <option v-for="name in priorityNames" :key="name">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')">Cancelar</button>
          <button type="submit">Salvar Tarefa</button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
// 1. Importamos o nosso novo composable
import { usePriority } from "../composables/usePriority";
// 2. Importamos o nosso BaseModal
//    (Ajuste o caminho se você moveu o TaskModal para 'features/kanban')
import BaseModal from "./base/BaseModal.vue";

// 3. Extraímos as funções e listas
const { priorityNames, getColorForPriority } = usePriority();

const emit = defineEmits(["close", "save"]);

const newTask = ref({
  title: "",
  priority: { name: "Baixa Prioridade", color: "#1976D2" },
});

// 4. O priorityColorMap local FOI REMOVIDO DAQUI.

function handleSubmit() {
  // 5. Usamos nossa função centralizada
  newTask.value.priority.color = getColorForPriority(
    newTask.value.priority.name
  );

  emit("save", {
    ...newTask.value,
    id: Date.now(),
    comments: 0,
    attachments: 0,
    assignee: null,
  });
}
</script>

<style scoped>
/* MUDANÇA AQUI: 
  O estilo .modal-overlay foi REMOVIDO,
  pois o BaseModal agora cuida disso.
*/

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 30rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #2b6cb0;
  color: white;
}
</style>
