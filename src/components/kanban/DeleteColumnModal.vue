<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <h2 class="modal-title">Excluir Coluna</h2>
    </template>

    <p class="modal-message">
      Tem certeza que deseja excluir esta coluna? Todas as tarefas nela serão
      perdidas.
    </p>

    <template #footer>
      <div class="modal-actions">
        <button class="btn cancel" @click="$emit('close')">Cancelar</button>
        <button class="btn confirm" @click="$emit('confirm')">Confirmar</button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "../common/BaseModal.vue";

defineEmits(["close", "confirm"]);
</script>

<style scoped>
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.modal-message {
  margin-bottom: 1.5rem;
  color: #4a5568;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
}

.btn.cancel {
  background-color: #e2e8f0;
  color: #2d3748;
}
.btn.cancel:hover {
  background-color: #cbd5e0;
}

.btn.confirm {
  background-color: #e53e3e;
  color: white;
}
.btn.confirm:hover {
  background-color: #c53030;
}
</style>
