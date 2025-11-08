<template>
  <BaseModal @close="cancel">
    <div class="modal-content">
      <h2 class="modal-title">Criar Nova Coluna</h2>
      <input
        v-model="columnTitle"
        placeholder="Digite o nome da coluna"
        class="modal-input"
        @keyup.enter="confirm"
        ref="titleInput"
      />
      <div class="modal-actions">
        <button class="btn cancel" @click="cancel">Cancelar</button>
        <button
          class="btn confirm"
          @click="confirm"
          :disabled="!columnTitle.trim()"
        >
          Criar
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseModal from "@/components/base/BaseModal.vue"; // Ajuste o caminho se necessário

const columnTitle = ref("");
const titleInput = ref(null);
const emit = defineEmits(["confirm", "cancel"]);

function confirm() {
  if (columnTitle.value.trim()) {
    emit("confirm", columnTitle.value.trim());
    columnTitle.value = "";
  }
}

function cancel() {
  emit("cancel");
  columnTitle.value = "";
}

onMounted(() => {
  titleInput.value?.focus();
});
</script>

<style scoped>
/* E agora os estilos do .modal-content 
  voltaram para cá, onde eles pertencem.
*/
.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

.modal-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn.cancel {
  background-color: #e2e8f0;
  color: #2d3748;
}

.btn.confirm {
  background-color: #2b6cb0;
  color: white;
}
.btn.confirm:disabled {
  background-color: #90cdf4;
  cursor: not-allowed;
}
</style>
