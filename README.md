<div align="center">

  # Priorix - Frontend
  ### Gestão de Tarefas Inteligente com Kanban & IA.

  ![LOGO](src/assets/imgs/projeto.gif)

</div>

---

## Sobre o Projeto

O **Priorix** é uma aplicação de gerenciamento de projetos baseada na metodologia **Kanban**, desenvolvida para otimizar o fluxo de trabalho de equipes modernas. 

Diferente de um Kanban comum, o sistema conta com a **Priorix AI**, uma assistente inteligente integrada que auxilia na priorização e refinamento de tarefas, garantindo que o time foque no que realmente importa. A plataforma oferece também uma dashboard de relatórios visuais e exportação de dados.

---

## Contexto Acadêmico: Clean Code & Arquitetura

Este projeto foi desenvolvido não apenas para entregar funcionalidade, mas para aplicar na prática conceitos fundamentais estudados na graduação, com foco em **Qualidade de Software** e **Manutenibilidade**.

### Arquitetura de Software
Adotamos uma arquitetura modular baseada em componentes e separação de responsabilidades (SoC), garantindo um código desacoplado e testável:

* **Service Layer Pattern:** Toda a comunicação com a API (Axios) está isolada na pasta `/services`, separando a lógica de negócios da interface.
* **State Management (Pinia):** Gerenciamento centralizado do estado (Tasks, Auth, Users) na pasta `/stores`, evitando "prop drilling" e garantindo consistência dos dados.
* **Composables:** Lógica reutilizável (como o Drag & Drop em `useKanbanDragDrop.js`) extraída para hooks personalizados.
* **Atomic Design (Adaptado):** Componentes visuais quebrados em partes menores e reutilizáveis (botões, modais, cards) na pasta `/components/common`.

### Clean Code
Buscamos escrever um código legível e autoexplicativo:
* **Nomes Significativos:** Variáveis e funções com propósitos claros (ex: `handleMoveTask`, `enrichTaskWithPriority`).
* **Funções Pequenas:** Métodos focados em uma única responsabilidade.
* **DRY (Don't Repeat Yourself):** Reutilização de estilos e lógica através de componentes e utilitários.

---

## Exemplos

Para garantir a manutenibilidade e escalabilidade, aplicamos padrões de projeto que isolam responsabilidades. Abaixo, alguns exemplos reais do nosso código:

### - Composables (Lógica Reutilizável)
Em vez de misturar a lógica complexa de *Drag and Drop* dentro do componente visual, nós a extraímos para um **Composable**. Isso deixa o componente `KanbanColumn` limpo e focado apenas em renderizar a tela.

```javascript
// src/composables/useKanbanDragDrop.js
export function useKanbanDragDrop() {
  const store = useKanbanStore();

  async function handleDrop(event, targetColumnTitle) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");

    if (taskId) {
      await store.handleMoveTask({
        taskId: parseInt(taskId),
        targetColumnTitle: targetColumnTitle,
      });
    }
  }

  return { handleDragStart, handleDragEnd, handleDrop };
}

```
### - Service Layer (Camada de Serviço)
Para desacoplar a aplicação de detalhes da API (endpoints, configurações do Axios), centralizamos as requisições em serviços. Isso facilita a manutenção e testes, pois os componentes e stores não precisam saber "como" os dados são buscados.

```javascript
// src/services/kanbanService.js
import api from "./api";

export default {
  // Método com nome semântico e responsabilidade única
  async getBoardData() {
    const [status, users, tasks] = await Promise.all([
      api.get("/Status"),
      api.get("/User"),
      api.get("/Task"),
    ]);
    return {
      columns: status.data,
      users: users.data,
      tasks: tasks.data,
    };
  },

  // Isolamento da integração com a IA 
  analyzeTask(title, description) {
    return api.post("/Gemini/analyze", { title, description });
  },
};

```

### - Gerenciamento de Estado (Pinia Store)
Utilizamos o Pinia para manter o estado da aplicação consistente e centralizado. A Store atua como a fonte única da verdade, gerenciando as regras de negócio e a comunicação com os serviços, evitando que os componentes fiquem sobrecarregados com lógica.

```javascript
// src/stores/kanbanStore.js
actions: {
  async generateAISuggestion(task) {
    this.loadingIa = true; 
    this.iaError = "";

    try {
      // A Store consome o serviço, abstraindo a complexidade para o componente
      const response = await kanbanService.analyzeTask(task.title, task.description);
      this.iaResponse = response.data;
    } catch (error) {
      this.iaError = "Erro ao consultar IA.";
    } finally {
      this.loadingIa = false;
    }
  },
}
```

### - Padronização de Dados (Utils)
Para evitar que os componentes visuais fiquem sobrecarregados com lógica de tratamento de dados, extraímos as regras de formatação para funções utilitárias puras.

Isso garante o **Princípio da Responsabilidade Única**: o componente cuida da interface, e a função utilitária garante que os dados enviados para a API estejam corretos.

```javascript
// src/utils/taskNormalizers.js
// Função pura que padroniza o objeto antes de enviar para o Backend
export function formatTaskPayload(task, priorityId, responsibleId) {
  return {
    id: task.id || 0,
    title: task.title,
    description: task.description || "", // Garante string vazia se for nulo

```

### - Encapsulamento de Lógica (Getters)
Em vez de escrever filtros complexos e repetitivos dentro dos templates Vue (v-for="task in tasks.filter(...)), utilizamos Getters no Pinia com nomes semânticos. Isso deixa o HTML limpo e a lógica de negócio testável e centralizada.

``` JavaScript

// src/stores/kanbanStore.js
getters: {
  // O componente pede "tasksTodo", ele não precisa saber COMO filtrar.
  tasksTodo: (state) =>
    state.columns.find((c) => c.id === COLUMN_ID.TODO)?.tasks || [],

  completedTasks: (state) =>
    state.columns.find((c) => c.id === COLUMN_ID.DONE)?.tasks || [],
    
  // ...
},

```

## Funcionalidades Principais

Quadro Kanban Interativo:
- Drag and Drop fluído para movimentação de cards entre colunas.
- Criação dinâmica de colunas e tarefas.
- Edição rápida de títulos e renomeação de colunas.
  
Assistente Priorix AI:
- Sugestão automática de prioridade baseada no conteúdo da tarefa.
- Refinamento inteligente de descrições de tarefas mal detalhadas.
  
Relatórios & Métricas:
- Dashboard visual com gráficos de produtividade e status (Chart.js).
- Métricas de desempenho individual e da equipe.
- Exportação de Relatórios em PDF.
  
Gestão de Acesso:
- Autenticação segura (Login e Registro).
- Atribuição de responsáveis com avatar nos cards.

---

## Stack Tecnológica

Ferramentas modernas escolhidas para garantir performance e experiência de desenvolvimento:

* **Core:** [Vue 3](https://vuejs.org/) (Composition API)
* **Build:** [Vite](https://vitejs.dev/)
* **Estado:** [Pinia](https://pinia.vuejs.org/)
* **Roteamento:** [Vue Router](https://router.vuejs.org/)
* **Http Client:** [Axios](https://axios-http.com/)
* **Visualização de Dados:** [Vue-Chartjs](https://vue-chartjs.org/)
* **PDF Engine:** [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
* **Ícones:** [Lucide Vue](https://lucide.dev/)

---

## Como Rodar o Projeto 
Para o funcionamento completo do sistema (Login, Kanban e IA), é necessário rodar tanto o **Frontend** quanto o **Backend**.



```bash
# Clone o repositório - frontend
git clone https://github.com/PolianaRodz/priorix-frontend.git

# Entre na pasta do projeto
cd priorix-frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

```

```bash
# Clone o repositório - backend
git clone https://github.com/Luiz-Eder/Priorix.git

# Entre na pasta e rode o projeto
cd priorix-backend
dotnet run

```

---
**Integrantes do Projeto:**

Poliana Rodriguez - 2000444

Eder Luiz - 1971959

Daniele Borges - 1989236

Barbara Rebecchi - 1987862

Otavio augusto - 1999877

Vinicius Miguel - 2002638

Caio Garbin -1988521

---

<div align="center">

  <img src="src/assets/icons/priorix-icon.png" alt="Logo Priorix" width="100">

</div>
