<template>
  <div class="reports-view">
    <KanbanBoardTitle
      :title="store.projectTitle"
      subtitle="Relatórios"
      @update-title="store.setProjectTitle"
    />

    <div class="reports-content" id="report-content-area">
      <div class="actions-bar" data-html2canvas-ignore="true">
        <button class="btn-export" @click="exportToPDF" :disabled="isExporting">
          <span v-if="!isExporting">Exportar Relatório (PDF)</span>
          <span v-else>Gerando PDF...</span>
        </button>
      </div>

      <div class="summary-cards">
        <div class="summary-card glass-panel">
          <span class="value">{{ store.totalTasks }}</span>
          <span class="label">Total de Tarefas</span>
        </div>
        <div class="summary-card glass-panel">
          <span class="value">{{ store.projectUsers.length }}</span>
          <span class="label">Membros do time</span>
        </div>
        <div class="summary-card glass-panel">
          <span class="value">{{ store.completedTasks.length }}</span>
          <span class="label">Tarefas entregues</span>
        </div>
        <div class="summary-card glass-panel">
          <span class="value">{{ store.productivityBySprint.length }}</span>
          <span class="label">Sprints concluídas</span>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-container large glass-panel">
          <h3>DESEMPENHO DA EQUIPE</h3>

          <div class="team-grid-scroll">
            <div
              v-for="member in store.teamWorkload"
              :key="member.id"
              class="member-card-mini"
            >
              <div class="member-header">
                <UserAvatar :name="member.name" :size="36" />
                <span class="member-name">{{ member.name }}</span>
              </div>

              <div class="member-stats-row">
                <div class="mini-stat">
                  <strong>{{ member.totalTasks }}</strong>
                  <small>Tasks</small>
                </div>
                <div class="vertical-line"></div>
                <div class="mini-stat">
                  <strong>{{ member.tasksInProgress }}</strong>
                  <small>Em Prog.</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container full-height-right glass-panel">
          <h3>STATUS GERAL</h3>
          <div class="chart-wrapper">
            <ProgressChart
              :todo="store.tasksTodo.length"
              :in-progress="store.tasksInProgress.length"
              :done="store.completedTasks.length"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useKanbanStore } from "../stores/kanbanStore";
import ProgressChart from "../components/charts/ProgressChart.vue";
import KanbanBoardTitle from "../components/kanban/KanbanBoardTitle.vue";
import UserAvatar from "@/components/common/UserAvatar.vue";
import html2pdf from "html2pdf.js";

const store = useKanbanStore();
const isExporting = ref(false);

const formattedAvgTime = computed(() => {
  const avgDays = store.averageCompletionTime;
  if (avgDays === 0) return "N/A";
  return `${avgDays.toFixed(1)} dias`;
});

function calculateTaskDuration(task) {
  if (!task.createdAt || !task.completedAt) return "N/A";
  const start = new Date(task.createdAt).getTime();
  const end = new Date(task.completedAt).getTime();
  const days = (end - start) / (1000 * 60 * 60 * 24);
  return `${days.toFixed(1)} dias`;
}

function exportToPDF() {
  isExporting.value = true;
  const originalElement = document.getElementById("report-content-area");
  const clone = originalElement.cloneNode(true);
  clone.classList.add("pdf-mode");
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.width = "1400px";
  container.appendChild(clone);
  document.body.appendChild(container);

  const opt = {
    margin: 0.3,
    filename: `Relatorio_${store.projectTitle || "Projeto"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: 1400,
    },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf()
    .set(opt)
    .from(clone)
    .save()
    .then(() => {
      document.body.removeChild(container);
      isExporting.value = false;
    });
}
</script>

<style scoped>
.reports-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #2d3748;
}

.reports-content {
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.btn-export {
  background: linear-gradient(135deg, #636c75, #06182e);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-export:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  filter: brightness(1.1);
}

.btn-export:disabled {
  background: #718096;
  cursor: not-allowed;
  transform: none;
}

.glass-panel {
  background-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.75rem;
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.glass-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/imgs/background-texture.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.03;
  z-index: -1;
  pointer-events: none;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.65);
}

.summary-card .value {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary-card .label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #586474;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.charts-grid {
  display: grid;
  grid-template-columns: 65% 1fr;
  grid-template-rows: 1fr;
  gap: 1.5rem;
  min-height: 550px;
}

.chart-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.chart-container.large {
  grid-column: 1 / 2;
  height: 100%;
}

.chart-container.full-height-right {
  grid-column: 2 / 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chart-wrapper {
  position: relative;
  flex-grow: 1;
  width: 100%;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  margin-bottom: 1.2rem;
  font-size: 1rem;
  font-weight: 800;
  color: #2d3748;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.team-grid-scroll {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  padding: 0.5rem 0.2rem;
  flex-grow: 1;
  max-height: 600px;
}

.member-card-mini {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
}

.member-card-mini:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.member-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-stats-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0.6rem;
  border-radius: 0.5rem;
}

.mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-stat strong {
  font-size: 1.1rem;
  color: #2d3748;
}

.mini-stat small {
  font-size: 0.65rem;
  font-weight: 700;
  color: #718096;
  text-transform: uppercase;
}

.vertical-line {
  width: 1px;
  height: 24px;
  background-color: #cbd5e0;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.pdf-mode {
  background-color: #ffffff !important;
  color: #000000 !important;
  padding: 0.5rem !important;
  height: auto !important;
  overflow: visible !important;
}

.pdf-mode :deep(.chart-container.full-height-right) {
  display: none !important;
}

.pdf-mode :deep(.charts-grid) {
  display: block !important;
}

.pdf-mode :deep(.glass-panel) {
  background: #ffffff !important;
  backdrop-filter: none !important;
  box-shadow: none !important;
  border: 1px solid #cccccc !important;
  border-radius: 4px !important;
}

.pdf-mode :deep(.glass-panel::before) {
  display: none !important;
}

.pdf-mode :deep(h3),
.pdf-mode :deep(.label),
.pdf-mode :deep(.mini-stat small) {
  color: #333333 !important;
  font-weight: bold !important;
}

.pdf-mode :deep(.value),
.pdf-mode :deep(.mini-stat strong) {
  color: #000000 !important;
  -webkit-text-fill-color: initial !important;
  background: none !important;
}

.pdf-mode :deep(.team-grid-scroll) {
  overflow: visible !important;
  max-height: none !important;
  display: grid;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 10px !important;
}

.pdf-mode :deep(.member-card-mini) {
  page-break-inside: avoid;
  background-color: #f9f9f9 !important;
  border: 1px solid #ddd !important;
  box-shadow: none !important;
}
</style>
