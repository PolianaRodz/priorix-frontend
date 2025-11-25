<template>
  <div class="login-page-container">
    <LoginComponent />

    <div class="auth-card-wrapper">
      <AuthCardComponent
        :is-registering="isRegistering"
        :is-loading="authStore.authStatus === 'loading'"
        :error-message="authStore.authError"
        @submit-form="handleSubmit"
        @toggle-mode="isRegistering = !isRegistering"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import LoginComponent from "../components/auth/LoginComponent.vue";
import AuthCardComponent from "../components/auth/AuthCardComponent.vue";

const authStore = useAuthStore();
const isRegistering = ref(false);

async function handleSubmit(formData) {
  try {
    if (isRegistering.value) {
      await authStore.registerUser(formData);
      isRegistering.value = false;
      
    } else {
      await authStore.loginUser(formData);
    }
  } catch (error) {
    console.error("Falha na autenticação (View):", error.message);
  }
}
</script>

<style scoped>
.login-page-container {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.auth-card-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(55px, -50%);
  z-index: 20;
}
</style>