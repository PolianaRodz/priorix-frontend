<template>
  <div class="layout-base">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
html {
  height: 100%;
}

body {
  background: linear-gradient(to bottom, #ccd3d5, #ede8e8, #dfdfdf);
  isolation: isolate;
  position: relative;
  min-height: 100%;
}

body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../src/assets/imgs/background-img.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: -1;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  font: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.layout-base {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
