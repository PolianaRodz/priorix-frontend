<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <input
      v-model="name"
      id="name"
      type="text"
      placeholder="Digite seu nome..."
      required
    />
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
      <span v-if="loading">Registrando...</span>
      <span v-else>Registrar-se</span>
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ loading: Boolean });
const emit = defineEmits(["submit"]);

const name = ref("");
const email = ref("");
const password = ref("");

function handleSubmit() {
  emit("submit", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
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
  color: #2d3748;
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
  margin-top: 0.5rem;
}
</style>
