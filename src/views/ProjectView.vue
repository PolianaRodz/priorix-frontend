<template>
  <CardBase>
    <div class="project-deco-1"></div>
    <div class="project-deco-2"></div>

    <div class="project-onboarding-wrapper">
      <AuthCardBase>
        <h2 class="title">Bem-vindo!</h2>
        <p class="subtitle">Vamos começar a trabalhar juntos.</p>

        <form class="auth-form" @submit.prevent="handleOnboarding">
          <div class="form-group">
            <label class="form-label" for="team-name"
              >Qual é o nome do seu time?</label
            >
            <input
              v-model="teamName"
              id="team-name"
              type="text"
              placeholder="Digite o nome do seu quadro..."
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="team-email"
              >Quem mais está na sua equipe?</label
            >
            <input
              v-model="teamEmail"
              id="team-email"
              type="email"
              placeholder="Digite o email..."
            />
          </div>

          <div class="checkbox-group">
            <input v-model="noInvite" id="no-invite" type="checkbox" />
            <label for="no-invite">Não adicionar ninguém por enquanto.</label>
          </div>

          <button type="submit" class="submit-btn">Continuar</button>
        </form>
      </AuthCardBase>

      <div class="right-text-block">
        <h1 class="main-title">
          Construa Seu
          <span class="title-line-2">Primeiro Projeto.</span>
        </h1>
        <p class="panel-description">
          Em apenas alguns passos, seu time estará operando em máxima
          eficiência. Não perca tempo com reuniões de priorização; vamos focar
          na execução imediata das tarefas de maior impacto.
        </p>

        <ProjectCarousel />
      </div>
    </div>
  </CardBase>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CardBase from "@/components/common/CardBase.vue";
import AuthCardBase from "@/components/common/AuthCardBase.vue";
import ProjectCarousel from "../components/auth/ProjectCarousel.vue";

const router = useRouter();
const teamName = ref("");
const teamEmail = ref("");
const noInvite = ref(false);

function handleOnboarding() {
  console.log("Iniciando onboarding com:", {
    team: teamName.value,
    email: teamEmail.value,
    skipInvite: noInvite.value,
  });
  router.push({ name: "kanban" });
}
</script>

<style scoped>
:deep(.marketing-block-center) {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.project-onboarding-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 80px;
  width: 100%;
  z-index: 5;
}

.right-text-block {
  max-width: 400px;
  z-index: 5;
  align-self: flex-start;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-title {
  font-size: 2rem;
  font-weight: 550;
  color: #3e0f3e;
  margin: 0;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.title-line-2 {
  font-size: 2.4rem;
  font-weight: 900;
  display: block;
}

.title {
  font-size: 2rem;
  font-weight: 900;
  color: #3c0a3c;
  text-align: center;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 0.9rem;
  color: #717b84;
  margin-bottom: 35px;
  text-align: center;
}

.panel-description {
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.3;
  color: #ffffff92;
  text-align: left;
  margin-top: 1rem;
  margin-left: -45px;
  padding-right: 95px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5b4a68;
  margin-bottom: 6px;
  text-align: left;
}

.auth-form input[type="text"],
.auth-form input[type="email"] {
  padding: 12px;
  border: 1px solid #5e547e6a;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: rgba(196, 196, 196, 0.215);
  transition: all 0.2s;
  color: #0b285a;
}

.auth-form input[type="text"]::placeholder,
.auth-form input[type="email"]::placeholder {
  color: #5050509d;
}

.auth-form input[type="text"]:focus,
.auth-form input[type="email"]:focus {
  outline: none;
  border-color: #553c9a;
  background-color: rgba(248, 249, 250, 0.481);
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.2);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 1px;
}
.checkbox-group input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  background-color: rgba(196, 196, 196, 0.536);
  border: 1px solid #0000006a;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.checkbox-group input:checked {
  background-color: #553c9a;
  border-color: #553c9a;
}

.checkbox-group input:checked::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid rgb(255, 255, 255);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-group input:focus-visible {
  outline: none;
  border-color: #553c9a;
  box-shadow: 0 0 0 2px rgba(107, 70, 193, 0.2);
}
.checkbox-group label {
  font-size: 0.8rem;
  color: #404d58;
  cursor: pointer;
}

.submit-btn {
  background-color: #75127c;
  color: rgba(255, 255, 255, 0.59);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.2s;
  margin-top: 2rem;
}

.submit-btn:hover {
  background-color: #3a062f;
}

.project-deco-1 {
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(40px);
  z-index: 2;
  bottom: 240px;
  left: 370px;
  width: 420px;
  height: 390px;
  background: radial-gradient(circle, #3f214e, #4e213a);
}
.project-deco-2 {
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
  filter: blur(40px);
  z-index: 1;
  bottom: 25px;
  left: 495px;
  width: 420px;
  height: 390px;
  background: radial-gradient(circle, #8c077f, #bf71a8);
}
</style>
