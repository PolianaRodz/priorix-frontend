<template>
  <div class="app-container">
    <transition name="fade">
      <NavbarComponent v-if="isRouterReady" />
    </transition>

    <div class="main-content-wrapper">
      <SidebarComponent :class="{ 'sidebar-hidden': !isRouterReady }" />

      <main>
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import NavbarComponent from "@/components/common/NavbarComponent.vue";
import SidebarComponent from "@/components/common/SidebarComponent.vue";

const isRouterReady = ref(false);
const router = useRouter();

onMounted(() => {
  router.isReady().then(() => {
    isRouterReady.value = true;
  });
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: transparent;
}

.main-content-wrapper {
  display: flex;
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
  background-color: transparent;
}

main {
  flex-grow: 1;
  overflow-y: auto;
  background-color: transparent;
}

.sidebar {
  width: 10rem;
  opacity: 1;
  transition: width 0.3s ease, opacity 0.3s ease;
  overflow: visible;
}
.sidebar.sidebar-hidden {
  width: 0;
  opacity: 0;
  padding: 1rem 0;
}

main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-track {
  background: transparent;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: padding-box;
}
main::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
