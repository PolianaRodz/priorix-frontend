<template>
  <div 
    class="ai-wrapper" 
    @mouseenter="handleInteractionStart" 
    @mouseleave="handleInteractionEnd"
    @focusin="handleInteractionStart"
    @focusout="handleInteractionEnd"
  >
    <div 
      class="ai-container"
      tabindex="0"
      role="button"
      aria-label="Assistente Priorix AI"
      aria-haspopup="true"
      :aria-expanded="showBubble"
      @keydown="handleKeyInteraction"
    >
      <div class="ai-icon-wrapper" :class="{ 'active': showBubble }">
        <img :src="aiIcon" alt="" aria-hidden="true" class="ai-image" />
      </div>

      <transition name="fade-slide">
        <div v-if="showBubble" class="ai-popover glass-theme">
          
          <div v-if="!showDetails" class="popover-content">
            <div class="popover-header">
              Priorix
            </div>
            <p class="popover-text">
              Olá! Eu sou Priorix, sua inteligência artificial para automação de tarefas e sua assistente.
            </p>
            <button class="btn-more" @click.stop="toggleDetails">
              Saiba mais
            </button>
          </div>

          <div v-else class="popover-content details-mode">
            <div class="popover-header">
              Priorix
            </div>
            <p class="popover-text">
              Digite a descrição e clique em Priorizar. Eu avalio a tarefa, indico a prioridade e proponho uma descrição aprimorada para o seu card.
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
import { ref, onUnmounted } from 'vue';
import aiIcon from "@/assets/icons/priorix-icon.png";

const HIDE_DELAY = 1500;
const RESET_DELAY = 1200;

const showBubble = ref(false);
const showDetails = ref(false);
let leaveTimeout = null;

function handleInteractionStart() {
  if (leaveTimeout) clearTimeout(leaveTimeout);
  showBubble.value = true;
}

function handleInteractionEnd(event) {
  if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
    return;
  }

  leaveTimeout = setTimeout(() => {
    showBubble.value = false;
    setTimeout(() => { 
      if (!showBubble.value) showDetails.value = false; 
    }, RESET_DELAY);
  }, HIDE_DELAY);
}

function handleKeyInteraction(event) {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault();
    showBubble.value = !showBubble.value;
  }
  if (event.key === 'Escape') {
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
  cursor: help;
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
  transition: all 1.2s ease-out;
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