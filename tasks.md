# Plano de Tarefas: Restauração e Correção do Ônibus 1972

## 🎯 Objetivo
Diagnosticar a interrupção do funcionamento do jogo **Ônibus 1972**, restaurar a classe `GameEngine` completa em `game.js`, validar todas as conexões do DOM no `index.html` e garantir uma execução não-linear fluida com suporte a pistas conservadas, imagens cinemáticas e modais.

---

## 📋 Lista de Tarefas (Task List)

- [x] **Tarefa 1: Diagnóstico e Criação do `tasks.md`**  
  - Diagnosticada a falta da classe `GameEngine` ao final do arquivo `game.js`.  
  - Criado o plano detalhado de etapas para acompanhamento contínuo.

- [x] **Tarefa 2: Restauração da classe `GameEngine` no `game.js`**  
  - Reimplementado o motor de jogo completo (`constructor`, `loadStorage`, `saveStorage`, `bindEvents`, `selectChoice`, `render`, `renderSceneSVG`, `renderNotebook`, `renderGraph`, `playSound`, `initParticles`).
  - Garantida a correta instanciação no evento `DOMContentLoaded`.

- [x] **Tarefa 3: Validação de Sintaxe JS e IDs do HTML**  
  - Executado `node --check` com sucesso.  
  - Confirmado que os seletores DOM de `index.html` correspondem aos elementos do `game.js`.

- [ ] **Tarefa 4: Verificação de Execução do Servidor Dev**  
  - Rodar o servidor HTTP local na porta 8085 e testar a interatividade das escolhas, laço temporal, diário de pistas e modais.

- [ ] **Tarefa 5: Salvamento e Commit no Repositório Git**  
  - Fazer o commit das correções validadas com mensagem clara de restauração.
