<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <slot />
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
/* Agora, este componente SÓ cuida do overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
