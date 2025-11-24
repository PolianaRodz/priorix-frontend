<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header-center">
        <h3>Nova Coluna</h3>
      </div>

      <div class="modal-body">
        <label for="columnName">Nome da Coluna</label>
        <input
          id="columnName"
          ref="inputRef"
          v-model="title"
          type="text"
          placeholder="Ex: Em Revisão, Arquivado..."
          @keyup.enter="save"
        />
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" @click="close">Cancelar</button>
        <button 
          class="btn-save" 
          @click="save" 
          :disabled="!title.trim()"
        >
          Adicionar
        </button>
      </div>
      
      <button class="close-icon-btn" @click="close">
        <X :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { X } from "lucide-vue-next";

const emit = defineEmits(["close", "save"]);
const title = ref("");
const inputRef = ref(null);

function close() {
  emit("close");
}

function save() {
  if (title.value.trim()) {
    emit("save", title.value);
    title.value = "";
  }
}

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  backdrop-filter: blur(4px); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: popIn 0.2s ease-out forwards;
  transform: scale(0.95);
}

.modal-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/imgs/background-texture-black.jpg");
  background-size: 300px; 
  background-position: center;
  background-repeat: repeat;
  opacity: 0.05; 
  z-index: 0;
  pointer-events: none;
}

.modal-header-center, .modal-body, .modal-footer, .close-icon-btn {
  position: relative;
  z-index: 10;
}

.modal-header-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.modal-header-center h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-body label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-left: 4px;
}

.modal-body input {
  padding: 0.85rem;
  border: 1px solid #a0aec0;
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 8px;
  font-size: 1rem;
  color: #2d3748;
  outline: none;
  transition: all 0.2s;
}

.modal-body input:focus {
  background-color: white;
  border-color: #2b6cb0;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  background: none;
  border: none;
  color: #718096;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border-radius: 50px;
  transition: color 0.2s;
}

.btn-cancel:hover {
  color: #e53e3e;
  background-color: rgba(0,0,0,0.03);
}

.btn-save {
  background: linear-gradient(
    135deg, 
    rgb(14, 34, 48) 0%,   
    rgb(28, 57, 68) 100%  
  );
  color: white;
  border: none;
  padding: 0.7rem 2rem; 
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: all 0.2s;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
}

.btn-save:disabled {
  background: #cbd5e0;
  color: #718096;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.close-icon-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  transition: color 0.2s;
}
.close-icon-btn:hover {
  color: #4a5568;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>