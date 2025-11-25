import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import KanbanView from "../views/KanbanView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "auth",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../views/ProjectView.vue"),
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "kanban",
          name: "kanban",
          component: KanbanView,
        },
        {
          path: "reports",
          name: "reports",
          component: () => import("../views/ReportsView.vue"),
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("../views/SettingsView.vue"),
        },
      ],
    },
  ],
});

export default router;