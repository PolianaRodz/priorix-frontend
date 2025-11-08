// Salve em: src/composables/usePriority.js

import { readonly } from "vue";

// 1. A lógica de cores, agora em um único lugar.
const priorityColorMap = {
  "Baixa Prioridade": "#1976D2",
  "Média Prioridade": "#FBC02D",
  "Alta Prioridade": "#D32F2F",
};

// 2. Os nomes, também em um único lugar.
const priorityNames = [
  "Baixa Prioridade",
  "Média Prioridade",
  "Alta Prioridade",
];

// O 'default' para caso algo dê errado
const defaultColor = "#8A94A6";

// 3. Criamos o "composable"
export function usePriority() {
  // Uma função "getter" segura
  const getColorForPriority = (priorityName) => {
    return priorityColorMap[priorityName] || defaultColor;
  };

  // Expomos as listas como "readonly" para que não possam ser modificadas
  const colors = readonly(priorityColorMap);
  const names = readonly(priorityNames);

  // 4. Expomos as ferramentas que os componentes precisam
  return {
    priorityColors: colors,
    priorityNames: names,
    getColorForPriority,
  };
}
