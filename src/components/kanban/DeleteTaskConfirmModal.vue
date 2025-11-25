<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>
      <h3 class="modal-title">Excluir Tarefa</h3>
    </template>

    <div class="modal-body">
      <p>
        Tem certeza que deseja excluir esta tarefa? <br />
        <span class="warning">Essa ação não pode ser desfeita.</span>
      </p>
    </div>

    <template #footer>
      <div class="modal-actions">
        <button class="btn cancel" @click="$emit('cancel')">Cancelar</button>
        <button class="btn confirm" @click="$emit('confirm')">
          Sim, Excluir
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "../common/BaseModal.vue";
defineEmits(["cancel", "confirm"]);
</script>

<style scoped>
.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}
.modal-body p {
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.5;
}
.warning {
  color: #e53e3e;
  font-weight: 500;
  font-size: 0.875rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
}
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}
.btn.cancel {
  background-color: #edf2f7;
  color: #4a5568;
}
.btn.cancel:hover {
  background-color: #e2e8f0;
}
.btn.confirm {
  background-color: #e53e3e;
  color: white;
}
.btn.confirm:hover {
  background-color: #c53030;
}
</style>