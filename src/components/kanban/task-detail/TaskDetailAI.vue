<template>
  <button class="btn-priorizar" @click="gerarSugestao" :disabled="loadingIa">
    <span v-if="loadingIa" class="loading-text">Priorizando</span>
    <img v-else :src="priorizarLogo" alt="Priorizar" class="full-logo-img" />
  </button>

  <div class="ai-wrapper" v-if="iaResponse || iaError">
    <div class="ai-header-styled">Priorix</div>

    <div class="ai-content-box">
      <p v-if="iaError" class="ai-error">⚠ {{ iaError }}</p>
      
      <div v-if="iaResponse && !iaError">
        <p class="ai-text">{{ iaResponse }}</p>
        
        <button class="btn-apply" @click="aplicarSugestao">
          Usar esta descrição
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useKanbanStore } from "../../../stores/kanbanStore";
import priorizarLogo from "@/assets/imgs/priorizar.png";

const props = defineProps({
  task: { type: Object, required: true },
});

const store = useKanbanStore();

const loadingIa = computed(() => store.loadingIa);
const iaResponse = computed(() => store.iaResponse);
const iaError = computed(() => store.iaError);

function gerarSugestao() {
  store.generateAISuggestion(props.task);
}

function aplicarSugestao() {
  if (store.iaResponse) {
    props.task.description = store.iaResponse;
  }
}
</script>

<style scoped>
.btn-priorizar {
  background: linear-gradient(
    135deg, 
    rgb(14, 34, 48) 0%,   
    rgb(28, 57, 68) 100%  
  );
  color: white;
  border: none;
  
  width: auto;
  min-width: 200px;
  max-width: 300px;
  margin: 1.5rem auto 1rem auto; 
  height: 55px; 
  padding: 0 2rem; 
  
  border-radius: 50px;
  cursor: pointer;
  
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-priorizar:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 15px rgba(55, 129, 179, 0.3);
}

.btn-priorizar:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  transform: none;
  filter: grayscale(0.5);
}

.full-logo-img {
  height: 55px; 
  width: auto;
  display: block;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
}

.loading-text {
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-block;
  animation: pulseFade 1.5s ease-in-out infinite;
}

@keyframes pulseFade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-text::after {
  content: ''; 
  animation: typingDots 1.5s steps(4, end) infinite;
  display: inline-block;
  width: 14px; 
  text-align: left;
}

@keyframes typingDots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

.ai-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
  animation: fadeIn 0.3s ease-in;
}

.ai-header-styled {
  background-color: #b6b6b6b4;
  color: #00000098;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: 1px solid #7e7e7e8c;
  border-bottom: none;
}

.ai-content-box {
  width: 100%;
  padding: 1rem;
  background-color: rgba(245, 245, 245, 0.5); 
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: 1px solid #5a5a5a79;
  box-sizing: border-box;
  min-height: 100px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #202020;
}

.ai-text {
  white-space: pre-wrap;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn-apply {
  background: linear-gradient(
    135deg, 
    rgb(14, 34, 48) 0%,   
    rgb(28, 57, 68) 100%  
  );
  
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.btn-apply:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(55, 129, 179, 0.3);
}

.ai-error {
  color: #e53e3e;
  font-weight: 600;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>