<template>
  <div
    class="avatar-circle"
    :style="{
      width: size + 'px',
      height: size + 'px',
      fontSize: size * 0.35 + 'px',
    }"
  >
    {{ initials }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, default: "" },
  size: { type: Number, default: 40 },
});

const initials = computed(() => {
  if (!props.name) return "?";
  return props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
});
</script>

<style scoped>
.avatar-circle {
  background: linear-gradient(135deg, #9188aa, #245677);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 2px 5px rgba(43, 108, 176, 0.3);
  user-select: none;
  flex-shrink: 0;
}
</style>
