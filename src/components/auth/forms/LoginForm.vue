<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <input
      v-model="email"
      id="email"
      type="email"
      placeholder="Digite seu email..."
      required
    />
    <input
      v-model="password"
      id="password"
      type="password"
      placeholder="Digite sua senha..."
      required
    />
    <slot name="error"></slot>
    <button type="submit" class="action-btn" :disabled="loading">
      <span v-if="loading">Entrando...</span>
      <span v-else>Entrar</span>
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ loading: Boolean });
const emit = defineEmits(["submit"]);

const email = ref("");
const password = ref("");

function handleSubmit() {
  emit("submit", { email: email.value, password: password.value });
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.auth-form input {
  padding: 12px;
  border: 1px solid #5e547e6a;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: rgba(196, 196, 196, 0.215);
  transition: all 0.2s;
  color: #2d3748;
}
.auth-form input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.action-btn {
  background-color: #19212e;
  color: rgba(255, 255, 255, 0.742);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}
.action-btn:hover {
  background-color: #52555a;
}
.action-btn:disabled {
  background-color: #9fadbc;
  cursor: not-allowed;
}
</style>
