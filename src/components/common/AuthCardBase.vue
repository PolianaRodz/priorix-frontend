<template>
  <div class="auth-card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.auth-card {
  width: 360px; 
  min-height: 425px; 
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.15);
  background-color: transparent;
  padding: 30px; 
  
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  z-index: 10;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: stretch; 
}

.auth-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  background-image: url("@/assets/imgs/background-texture-black.jpg");
=======
  background-image: url("../assets/imgs/background-texture-black.jpg");
>>>>>>> 078cf9d6a62896aa48411a2becd8498f340af150
  background-size: 105% 105%;
  background-position: center top;
  background-repeat: no-repeat;
  opacity: 0.1;
  z-index: -2;
}
.auth-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(139, 139, 139, 0.85) 100%
  );
  z-index: -1;
}
</style>