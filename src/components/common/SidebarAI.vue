<template>
  <div class="ai-wrapper">
    <div class="ai-container">
      <div class="ai-icon-wrapper">
        <img :src="aiIcon" alt="Priorix AI" class="ai-image" />
      </div>

      <div class="ai-popover">
        <div class="popover-header">

          <strong>Olá! Sou a Priorix.</strong>
        </div>
        <p class="popover-text"> 
          Posso sugerir a melhor ordem de execução para suas tarefas!
        </p>
        <div class="popover-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import aiIcon from "@/assets/icons/priorix-icon.png";
</script>

<style scoped>
.ai-wrapper {
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.ai-container {
  position: relative;
}

.ai-icon-wrapper {
  width: 5rem;
  height: 5rem;
  
  background: linear-gradient(
    135deg, 
    rgb(14, 34, 48) 0%,   
    rgb(28, 57, 68) 100%  
  );

  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.ai-image {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.ai-container:hover .ai-icon-wrapper {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(55, 129, 179, 0.4);
  border-color: #493acc;
}

.ai-popover {
  position: absolute;
  left: 5.8rem; 
  bottom: 0;
  width: 260px;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  text-align: left;
  color: #2d3748;
  z-index: 100;
}

.ai-container:hover .ai-popover {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.popover-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #2d3748;
}

.popover-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #4a5568;
  margin: 0;
}

.popover-arrow {
  position: absolute;
  left: -6px;
  bottom: 2rem; 
  
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  border-left: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}
</style>