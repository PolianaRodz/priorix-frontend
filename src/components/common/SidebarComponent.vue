<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <nav class="main-nav">
        <RouterLink to="/kanban" class="nav-link" title="Quadro Kanban">
          <LayoutGrid :size="35" />
        </RouterLink>
        <RouterLink to="/reports" class="nav-link" title="Relatórios">
          <BarChart3 :size="35" />
        </RouterLink>
      </nav>

      <SidebarAI />
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { LayoutGrid, BarChart3 } from "lucide-vue-next"; 
import SidebarAI from "./SidebarAI.vue";
</script>

<style scoped>
.sidebar {
  width: 10rem;
  background-color: rgba(99, 99, 99, 0.1);
  border-right: 0.0625rem solid #a0a0a0;
  padding: 1rem 0 6rem 0; 
  box-sizing: border-box;
  min-height: 100vh;
  position: sticky;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 50;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}

.main-nav {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  color: #756b86;
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  background-color: #e2e8f0;
  color: #262038;
}

.nav-link.router-link-active {
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(236, 239, 241, 0) 70%
  );
}
</style>