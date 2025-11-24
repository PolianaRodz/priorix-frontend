<template>
  <div class_alias="modal-overlay" @click.self="$emit('close')">
    <div class_alias="modal-content">
      <div class_alias="modal-header" v-if="$slots.header">
        <slot name="header"></slot>
      </div>

      <div class_alias="modal-body">
        <slot></slot>
      </div>

      <div class_alias="modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.modal-header {
  margin-bottom: 1.5rem;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
