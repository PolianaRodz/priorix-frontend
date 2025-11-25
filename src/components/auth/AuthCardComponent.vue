<template>
  <AuthCardBase>
    <h2 class="title">{{ title }}</h2>

    <p class="toggle-link">
      <span v-if="isRegistering">
        Já tem uma conta?
        <a href="#" @click.prevent="toggleMode">Login</a>
      </span>
      <span v-else>
        Não tem uma conta?
        <a href="#" @click.prevent="toggleMode">Crie uma</a>
      </span>
    </p>

    <component
      :is="activeComponent"
      :loading="isLoading"
      @submit="handleFormSubmit"
    >
      <template #error>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </template>
    </component>
  </AuthCardBase>
</template>

<script setup>
import { computed } from "vue";
import AuthCardBase from "../common/AuthCardBase.vue";
import LoginForm from "./forms/LoginForm.vue";
import RegisterForm from "./forms/RegisterForm.vue";

const props = defineProps({
  isRegistering: Boolean,
  isLoading: Boolean,
  errorMessage: String,
});

const emit = defineEmits(["submit-form", "toggle-mode"]);

const title = computed(() =>
  props.isRegistering ? "Crie uma conta." : "Login"
);
const activeComponent = computed(() =>
  props.isRegistering ? RegisterForm : LoginForm
);

function toggleMode() {
  emit("toggle-mode");
}

function handleFormSubmit(formData) {
  emit("submit-form", formData);
}
</script>

<style scoped>
.title {
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 5px;
  color: #2d3748;
  text-align: center;
}
.toggle-link {
  font-size: 0.9rem;
  color: #717b84;
  margin-bottom: 30px;
  text-align: center;
}
.toggle-link a {
  text-decoration: none;
  font-weight: 900;
  color: #233951c4;
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
