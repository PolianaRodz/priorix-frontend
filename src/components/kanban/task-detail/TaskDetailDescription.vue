<template>
  <div class="description-wrapper">
    <div class="description-header">Descrição</div>
    
    <textarea
      class="description-box"
      placeholder="Dica da Priorix: Para uma priorização mais precisa, inclua o objetivo final da tarefa, o prazo (se houver) e o impacto esperado."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.description-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.description-header {
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

.description-box {
  width: 100%;
  padding: 1rem;
  background-color: rgba(245, 245, 245, 0.5); 
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #5a5a5a79;
  resize: none;
  box-sizing: border-box;
  min-height: 250px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #202020;
}

.description-box:focus {
  outline: none;
  background-color: rgb(223, 223, 223); 
  border-color: #4a5568;
}
</style>