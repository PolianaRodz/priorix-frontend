<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/icons/logo-eficaz.svg" alt="Logo eficaz tecnologia" />
    </div>

    <div class="navbar-right">
      <button class="icon-button" aria-label="Notificações">
        <BellIcon :size="22" color="#8A94A6" />
      </button>

      <div class="divider"></div>

      <div class="user-profile-container" v-on-click-outside="closeDropdown">
        <div class="user-trigger" @click="toggleDropdown">
          <UserAvatar
            :name="currentUser?.name"
            :size="42"
            class="navbar-avatar-style"
          />

          <span class="navbar-username">
            {{ currentUser?.name || "Usuário" }}
          </span>

          <ChevronDownIcon
            :size="20"
            color="#8A94A6"
            class="chevron-icon"
            :class="{ rotated: showDropdown }"
          />
        </div>

        <transition name="fade-menu">
          <div v-if="showDropdown" class="dropdown-position">
            <UserProfileMenu @close="closeDropdown" />
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { vOnClickOutside } from "@vueuse/components";
import { BellIcon, ChevronDownIcon } from "lucide-vue-next";
import UserAvatar from "@/components/common/UserAvatar.vue";
import UserProfileMenu from "@/components/common/layout/UserProfileMenu.vue";
const authStore = useAuthStore();
const showDropdown = ref(false);
const currentUser = computed(() => authStore.user);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function closeDropdown() {
  showDropdown.value = false;
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgb(8, 15, 20) 0%, rgb(25, 75, 95) 100%);
  color: #d1d1d1;
  padding: 0.75rem 1.5rem;
  height: 4.8rem;
  box-sizing: border-box;
  position: relative;
  isolation: isolate;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  z-index: 100;
}

.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/imgs/navbar-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.05;
  z-index: -1;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1.7rem;
}

.divider {
  width: 1.5px;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.2);
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-button:hover {
  transform: scale(1.1);
}

.user-profile-container {
  position: relative;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.user-trigger:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.navbar-avatar-style {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-username {
  font-weight: 600;
  font-size: 0.95rem;
  color: #edf2f7;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  transition: transform 0.2s;
  opacity: 0.8;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-position {
  position: absolute;
  top: 130%;
  right: 0;
  z-index: 200;
}

.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
