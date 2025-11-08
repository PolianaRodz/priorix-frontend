<template>
  <div class="app-container">
    <Sidebar />

    <div class="main-content">
      <Navbar />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

// Este import está correto, DESDE QUE
// os arquivos existam em 'src/components/layout/'
// e se chamem 'Navbar.vue' e 'Sidebar.vue'
import Navbar from "./components/layout/Navbar.vue";
import Sidebar from "./components/layout/Sidebar.vue";
</script>

<style>
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

.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex-grow: 1;
  background-color: #edf2f7;
  overflow-y: auto;
}
</style>
