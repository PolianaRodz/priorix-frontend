<template>
  <div class="marketing-block-center">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.marketing-block-center {
  background: linear-gradient(145deg, #eae9e9, #afaaaa);
  position: relative;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 950px;
  height: 650px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  z-index: 10;
  overflow: hidden;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
}
</style>
