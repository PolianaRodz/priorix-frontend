<template>
  <div class="menu-card">
    <div class="active-account">
      <UserAvatar :name="authStore.user?.name" :size="44" />

      <div class="account-info">
        <span class="user-name">
          {{ authStore.user?.name || "Usuário" }}
        </span>

        <span class="user-email" :title="authStore.user?.email">
          {{ authStore.user?.email || "email@exemplo.com" }}
        </span>
      </div>
    </div>

    <div class="divider"></div>

    <button class="menu-item logout" @click="handleLogout">
      <span class="item-text">Sair</span>
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import UserAvatar from "@/components/common/UserAvatar.vue";
const authStore = useAuthStore();
const emit = defineEmits(["close"]);

function handleLogout() {
  authStore.logout();
  emit("close");
}
</script>

<style scoped>
.menu-card {
  background-color: #e2e2e2f1;
  border-radius: 16px;
  padding: 16px;
  width: 260px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #111;
  cursor: default;
  border: 1px solid #e2e2e2;
  gap: 12px;
}

.active-account {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
}

.account-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.user-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.user-email {
  font-size: 0.8rem;
  color: #767676;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.divider {
  height: 1.5px;
  background-color: #47474748;
  width: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  text-align: left;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #d8d8d8;
}

.item-text {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.menu-item:hover .item-text {
  color: #000;
}
</style>
