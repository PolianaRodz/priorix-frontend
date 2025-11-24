<template>
  <CardBase>
    <div class="bola-decor-1-marketing"></div>
    <div class="bola-decor-2-marketing"></div>
    <div class="text-block">
      <h1 class="main-title">
        Sua Lista de Tarefas
        <span class="title-line-2">Mais Inteligente.</span>
        <img
          src="@/assets/icons/priorix-icon.png"
          alt="Logo da IA"
          class="priorix-logo-image"
        />
      </h1>
      <h2 class="sub-title">A IA que Define o Próximo Passo.</h2>
      
      <p class="description-text">
        Nosso quadro Kanban é projetado para evitar <strong>bloqueios</strong> e o acúmulo de
        trabalho. Monitore cada etapa da entrega em tempo real, limite o
        trabalho em progresso e priorize a conclusão, não o início.
      </p>

      <p class="description-text-ai">
        Automatizamos a parte mais difícil: a priorização. Nossa IA monitora o
        fluxo do seu time, identifica <strong>obstáculos</strong> e sugere automaticamente a ordem
        de execução, assegurando que o trabalho em andamento se mova rápido e
        constante, do 'A Fazer' ao 'Concluído'.
      </p>
    </div>
    
    <img
      src="@/assets/imgs/logo-login.png"
      alt="Logo do Sistema"
      class="marketing-logo-image"
    />
  </CardBase>
</template>

<script setup>
import CardBase from "../common/CardBase.vue";
</script>

<style scoped>
/* Seus estilos mantidos... */
.marketing-logo-image {
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 80px;
  height: auto;
  z-index: 5;
}

.text-block {
  z-index: 5;
  position: relative;
  padding-top: 45px;
  padding-left: 40px;
}

.main-title {
  font-size: 1.9rem;
  font-weight: 650;
  color: #132c3c;
  margin: 0;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.title-line-2 {
  font-size: 2.5rem;
  font-weight: 700;
  display: block;
  font-weight: 900;
}

.sub-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffffa9;
  padding-top: 48px;
  right: -135px;
  display: inline-block;
  margin-top: 0.1rem;
  position: relative;
  z-index: 5;
  padding-bottom: 5px;
  right: -115px;
}

.sub-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -50px;
  width: calc(100% + 50px);
  height: 0.2px;
  background-color: #dbdbdb52;
}

.description-text {
  font-size: 1rem;
  font-weight: 550;
  margin-top: 0.4rem;
  color: #ffffffb0;
  position: relative;
  z-index: 5;
  display: block;
  line-height: 1.5;
  border-radius: 8px;
  max-width: 45%;
  text-align: right;
  right: -25px;
}

.description-text-ai {
  font-size: 0.9rem;
  font-weight: 900;
  color: #ffffffad;
  line-height: 1.3;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  z-index: 5;
  margin-top: 1.5rem; 
  text-align: left;
  left: -10px;
  max-width: 40%;
}

.priorix-logo-image {
  position: absolute;
  z-index: 15;
  width: 70px;
  top: 142px;
  left: 97px;
  filter: drop-shadow(0 4px 6px rgba(255, 255, 255, 0.8));
}

:deep(.marketing-block-center) {
  justify-content: flex-start;
}

.bola-decor-1-marketing {
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(40px);
  z-index: 2;
  bottom: 240px;
  right: 370px;
  width: 420px;
  height: 390px;
  background: radial-gradient(circle, #21424e, #21424e);
}

.bola-decor-2-marketing {
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
  filter: blur(40px);
  z-index: 1;
  bottom: 5px;
  right: 495px;
  width: 420px;
  height: 390px;
  background: radial-gradient(circle, #07548c, #8371bf);
}
</style>