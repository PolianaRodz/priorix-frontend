<template>
  <AuthCardBase>
    <h2 class="title">{{ isRegistering ? "Crie uma conta." : "Login" }}</h2>

    <p class="login-link">
      <span v-if="isRegistering">
        Já tem uma conta?
        <a href="#" @click.prevent="$emit('toggle-mode')"> Login</a>
      </span>
      <span v-else>
        Não tem uma conta?
        <a href="#" @click.prevent="$emit('toggle-mode')"> Crie uma</a>
      </span>
    </p>

    <form class="auth-form" @submit.prevent="handleSubmit">
      <input
        v-if="isRegistering"
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

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <button type="submit" class="register-btn" :disabled="isLoading">
        <span v-if="isLoading">{{
          isRegistering ? "Registrando..." : "Entrando..."
        }}</span>
        <span v-else>{{ isRegistering ? "Registrar-se" : "Entrar" }}</span>
      </button>
    </form>
  </AuthCardBase>
</template>

<script setup>
import { ref } from "vue";
import AuthCardBase from "../common/AuthCardBase.vue";

const props = defineProps({
  isRegistering: Boolean,
  isLoading: Boolean,
  errorMessage: String,
});

const emit = defineEmits(["submit-form", "toggle-mode"]);

const name = ref("");
const email = ref("");
const password = ref("");

function handleSubmit() {
  const formData = {
    email: email.value,
    password: password.value,
  };

  if (props.isRegistering) {
    formData.name = name.value;
  }

  emit("submit-form", formData);
}
</script>

<style scoped>
.title {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 5px;
  color: #2d3748;
}
.login-link {
  font-size: 0.9rem;
  color: #717b84;
  margin-bottom: 30px;
}
.login-link a {
  text-decoration: none;
  font-weight: 900;
  color: #233951c4;
}
.title,
.login-link {
  text-align: center;
}
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
  background-color: rgba(248, 249, 250, 0.481);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.register-btn {
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
.register-btn:hover {
  background-color: #52555a;
}
.register-btn:disabled {
  background-color: #9fadbc;
  cursor: not-allowed;
}
.error-message {
  color: #d9534f;
  background-color: #fdf7f7;
  border: 1px solid #d9534f;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
