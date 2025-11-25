<template>
  <div 
    class="ai-wrapper" 
    @mouseenter="handleMouseEnter" 
    @mouseleave="handleMouseLeave"
    @focusin="handleMouseEnter"
    @focusout="handleMouseLeave"
  >
    <div 
      class="ai-container"
      tabindex="0"
      role="button"
      aria-label="Assistente Priorix AI"
      aria-haspopup="true"
      :aria-expanded="showBubble"
      @click="toggleLock" 
      @keydown="handleKeyInteraction"
    >
      <div class="ai-icon-wrapper" :class="{ 'active': showBubble || isLocked }">
        <img :src="aiIcon" alt="" aria-hidden="true" class="ai-image" />
      </div>

      <transition name="fade-slide">
        <div v-if="showBubble || isLocked" class="ai-popover glass-theme">
          
          <button v-if="isLocked" class="close-btn" @click.stop="isLocked = false">×</button>

          <div v-if="!showDetails" class="popover-content">
            <div class="popover-header">
              {{ currentContent.title }}
            </div>
            
            <p class="popover-text">
              {{ currentContent.intro }}
            </p>
            
            <button class="btn-more" @click.stop="toggleDetails">
              Saiba mais
            </button>
          </div>

          <div v-else class="popover-content details-mode">
            <div class="popover-header">
              {{ currentContent.title }}
            </div>
            
            <p class="popover-text">
              {{ currentContent.details }}
            </p>
            
            <button class="btn-more" @click.stop="toggleDetails">
              Voltar
            </button>
          </div>

          <div class="popover-arrow glass-theme"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import aiIcon from "@/assets/icons/priorix-icon.png";

const route = useRoute(); 

const HIDE_DELAY = 1500;
const RESET_DELAY = 1200;

const showBubble = ref(false);
const showDetails = ref(false);
const isLocked = ref(false);
let leaveTimeout = null;

const contentData = {
  reports: {
    title: "Relatórios",
    intro: "Analisei os dados de desempenho da sua equipe e gerei estes gráficos para você.",
    details: "O gráfico de Equipe mostra a carga de trabalho individual. Use o botão 'Exportar PDF' no topo para gerar um documento formal desta análise."
  },
  default: {
    title: "Priorix",
    intro: "Olá! Eu sou Priorix, sua inteligência artificial para automação de tarefas e sua assistente.",
    details: "Digite a descrição e clique em Priorizar. Eu avalio a tarefa, indico a prioridade e proponho uma descrição aprimorada para o seu card."
  }
};

const currentContent = computed(() => {
  return contentData[route.name] || contentData.default;
});

function toggleLock() {
  isLocked.value = !isLocked.value;
  if (!isLocked.value) {
    showBubble.value = false;
    showDetails.value = false;
  }
}

function handleMouseEnter() {
  if (leaveTimeout) clearTimeout(leaveTimeout);
  showBubble.value = true;
}

function handleMouseLeave() {
  if (!isLocked.value) {
    leaveTimeout = setTimeout(() => {
      showBubble.value = false;
      setTimeout(() => { 
        if (!showBubble.value) showDetails.value = false; 
      }, RESET_DELAY);
    }, HIDE_DELAY);
  }
}

function handleKeyInteraction(event) {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault();
    toggleLock();
  }
  if (event.key === 'Escape') {
    isLocked.value = false;
    showBubble.value = false;
  }
}

function toggleDetails() {
  showDetails.value = !showDetails.value;
}

onUnmounted(() => {
  if (leaveTimeout) clearTimeout(leaveTimeout);
});
</script>

<style scoped>
.ai-wrapper {
  --bg-glass: rgba(0, 22, 39, 0.95);
  --border-glass: rgba(255, 255, 255, 0.15);
  --text-primary: #ffffff;
  --text-secondary: #cbd5e0;
  --accent-color: #90cdf4;
  --shadow-color: rgba(0, 0, 0, 0.5);
  
  --icon-size: 5rem;
  --popover-left-pos: 5.8rem;
  
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center; 
  position: relative;
}

.ai-container {
  position: relative;
  cursor: pointer;
  outline: none;
}

.ai-container:focus-visible .ai-icon-wrapper {
  box-shadow: 0 0 0 3px var(--accent-color), 0 0 15px rgba(163, 173, 228, 0.5);
}

.ai-icon-wrapper {
  width: var(--icon-size);
  height: var(--icon-size);
  background: linear-gradient(135deg, rgb(14, 34, 48) 0%, rgb(28, 57, 68) 100%);
  border-radius: 25%; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 20;
}

.ai-icon-wrapper.active,
.ai-container:hover .ai-icon-wrapper {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(163, 173, 228, 0.5);
  border-color: #334e61;
}

.ai-image {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.glass-theme {
  background: var(--bg-glass); 
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.ai-popover {
  position: absolute;
  left: var(--popover-left-pos); 
  bottom: 0;
  width: 280px; 
  padding: 1.25rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px var(--shadow-color);  
  z-index: 100;
  transform-origin: bottom left;
}

.ai-popover::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -1.5rem;
  width: 1.5rem;
  background: transparent;
  z-index: 1;
}

.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Lato', sans-serif;
  font-style: italic;
  font-weight: 900;    
  font-size: 1rem;   
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: 0.02em;
}

.popover-text {
  text-align: center;
  font-size: 0.85rem;  
  font-weight: 400;    
  line-height: 1.5;
  color: var(--text-secondary);       
  margin: 0 0 0.75rem 0;
}

.btn-more {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  font-style: italic;
  color: var(--text-primary);
  margin-left: auto;
}

.btn-more:hover {
  color: var(--accent-color);
  text-decoration: underline;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
}
.close-btn:hover {
  color: white;
}

.popover-arrow {
  position: absolute;
  left: -6px;
  bottom: 2rem;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  border-left: 1px solid var(--border-glass);
  border-bottom: 1px solid var(--border-glass);
  border-top: none; 
  border-right: none;
  z-index: -1;
}

.fade-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
}

.details-mode {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>