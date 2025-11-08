<template>
  <BaseModal @close="cancel">
    <h2 class="modal-title">{{ title }}</h2>
    <p class="modal-message">{{ message }}</p>
    <div class="modal-actions">
      <button class="btn cancel" @click="cancel">Cancelar</button>
      <button class="btn confirm" @click="confirm">Confirmar</button>
    </div>
  </BaseModal>
</template>

<script setup>
// 1. Importamos o BaseModal
//    (Lembre-se de ajustar o caminho se o seu BaseModal não estiver em './base/')
import BaseModal from "@/components/base/BaseModal.vue";

const props = defineProps({
  title: String,
  message: String,
});
const emit = defineEmits(["confirm", "cancel"]);

function confirm() {
  emit("confirm");
}
function cancel() {
  emit("cancel");
}
</script>

<style scoped>
/* 2. REMOVEMOS os estilos de .modal-overlay e .modal-content.
     Mantemos apenas os estilos específicos deste modal.
*/
.modal-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.modal-message {
  margin-bottom: 1.5rem;
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
}
.btn.cancel {
  background-color: #e2e8f0;
}
.btn.confirm {
  background-color: #e53e3e;
  color: white;
}
</style>
