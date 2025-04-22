# Gerenciador de Tarefas

Este é um projeto de **Gerenciador de Tarefas** desenvolvido em **React** com integração a uma API REST para armazenamento e manipulação de dados. O aplicativo permite criar, listar, marcar como concluídas e excluir tarefas, além de gerenciar tarefas pendentes em caso de falha de conexão.

![Interface do Gerenciador de Tarefas](src\assets\amostra.png)

## 📋 Funcionalidades

- **Criar tarefas**: Adicione novas tarefas com descrições personalizadas.
- **Listar tarefas**: Visualize todas as tarefas criadas em uma interface organizada.
- **Concluir tarefas**: Marque tarefas como concluídas com apenas um clique.
- **Excluir tarefas**: Remova tarefas indesejadas da lista.
- **Gerenciamento offline**: Tarefas não enviadas devido a falhas de conexão são armazenadas localmente e reenviadas automaticamente quando possível.
- **Contador de tarefas**: Veja o número total de tarefas criadas e concluídas.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **React Hook Form**: Para gerenciamento de formulários.
- **Axios**: Para realizar chamadas HTTP à API.
- **UUID**: Para geração de identificadores únicos para as tarefas.
- **Lucide React**: Para ícones modernos e elegantes.
- **CSS**: Para estilização da interface.

## 🚀 Pré-requisitos

- Node.js instalado na máquina.
- Rode npx json-server db.server em `http://localhost:3000` isso dará suporte às rotas:
  - `GET /tasks`: Retorna todas as tarefas.
  - `POST /tasks`: Cria uma nova tarefa.
  - `DELETE /tasks/:id`: Exclui uma tarefa específica.

🗂️ Estrutura do Código
State Management: Utiliza hooks (useState, useEffect) para gerenciar o estado das tarefas e listas pendentes.

Pendências Offline: Tarefas e exclusões são armazenadas em arrays separados (pendingTasks e pendingDeletes) e reenviadas automaticamente quando a conexão é restabelecida.

Requisições HTTP: Implementadas com axios para realizar operações de CRUD na API.



