# Roteiro Oficial: Ônibus 1972 (Jogo Narrativo Recursivo)

> **Documento de Acompanhamento — Oficina de Jogos Narrativos**  
> **Tema:** Mistério, Aventura e Laço Temporal na Garagem de Ônibus  
> **Estrutura:** Narrativa recursiva com retenção de pistas entre loops, 5 desfechos e múltiplos caminhos  
> **Protagonistas:** Sr. Chico (Guarda), Teny / Antônio (Motorista), João Alegria, Amélia e a Turma do 1972  

---

## 1. Ficha Técnica

- **Título Público:** Ônibus 1972
- **Autores:** Grupo de Estudantes & Orientação Pedagógica
- **Identidade Visual:** Garagem noturna retrô, faróis amarelos reluzentes, vapor da serra, ciano tecnológico e diário de bordo digital.
- **Mecânica Principal:** *Recursividade Temporal com Memória Conservada*. Se o plano de captura falhar, o relógio do painel do 1972 retrocede para 00:00, mas o jogador **mantém os itens e evidências** encontrados na tentativa anterior, liberando novas opções de diálogo e estratégias avançadas.

---

## 2. Premissa Expandida

Em uma pacata cidade do interior, o lendário ônibus número **1972** está preparado para levar uma turma de estudantes em uma aguardada aula de campo na **Serra da Lua**. À meia-noite da véspera da viagem, enquanto a cidade dorme, o guarda noturno **Senhor Chico** escuta o bipe agudo do alarme das câmeras da garagem.

Ao verificar os monitores, Chico descobre dois suspeitos encapuzados tentando arrombar as portas do Ônibus 1972 com um alicate industrial. Em vez de agir sozinho no escuro, Chico liga para **Teny** (apelido de Antônio, o experiente motorista).

Teny acorda secretamente os alunos alojados na sede da escola vizinha à garagem. Reunidos no escuro do ônibus, **João Alegria** propõe usar um corredor rápido como **isca**, atraindo a dupla para a área externa, enquanto **Amélia** projeta uma **armadilha dupla**: um buraco camuflado com grama falsa associado a uma rede oculta nos galhos da figueira.

Entretanto, Carlão e Pietrão não são ladrões comuns de peças: eles buscam uma **antiga relíquia da Serra da Lua** escondida no compartimento secreto do banco 19 do ônibus desde o ano de 1972!

---

## 3. Personagens

1. **Senhor Chico**: Guarda noturno atencioso, conhece cada canto da garagem e possui a chave mestra dos holofotes.
2. **Teny (Antônio)**: O respeitado motorista do Ônibus 1972, calmo sob pressão e mestre em mecânica vintage.
3. **João Alegria**: Aluno destemido e veloz, especialista em manobras de distração ("Operação Isca").
4. **Amélia**: Aluna estrategista e engenhosa, mestre em nós de corda e armadilhas ambientais.
5. **Carlão & Pietrão**: A dupla de invasores noturnos. Pietrão carrega as ferramentas e Carlão guarda o mapa secreto.

---

## 4. Estrutura de Pistas & Inventário Recursivo

Ao longo dos loops temporais, o jogador pode coletar 6 itens/pistas que **permanecem salvos** mesmo se a rodada reiniciar:

| ID da Pista | Nome | Efeito no Jogo |
| :--- | :--- | :--- |
| `alicate_codificado` | Alicate de Pietrão | Revela que os invasores não queriam destruir o motor, apenas abrir a tranca do banco 19. |
| `mapa_serra_lua` | Mapa de 1972 | Encontrado sob o estofamento do banco 19. Desbloqueia o diálogo de rendição com Carlão. |
| `lanterna_chico` | Lanterna de Alta Potência | Permite cegar Pietrão durante a perseguição na figueira. |
| `rede_reforcada` | Rede de Caça de Amélia | Garante 100% de sucesso na captura se o buraco estiver coberto. |
| `apito_joao` | Apito Esportivo de João | Usado para guiar a isca com precisão militar no escuro. |
| `plano_mestre_docs` | Esquema das Armadilhas | Requisito para desbloquear o **Final Mestre (Final 1)**. |

---

## 5. Grafo dos Nós Narrativos

```
[Nó 01: O Alerta na Garagem]
       ├──> Escolha A: Sr. Chico vai investigar com a lanterna. (Risco de ser visto)
       └──> Escolha B: Sr. Chico liga imediatamente para Teny. (Caminho Principal)
              ↓
[Nó 02: O Chamado de Meia-Noite]
       ├──> Escolha A: Teny liga os faróis do ônibus para assustá-los. (Fuga Prematura -> Loop 00:00)
       └──> Escolha B: Teny acorda a turma em silêncio. (Avança para Reunião)
              ↓
[Nó 03: O Conselho do Ônibus 1972]
       ├──> Ouvir João Alegria: Estratégia da Isca. (Ativa Modificador de Distração)
       ├──> Ouvir Amélia: Estratégia do Buraco e Rede. (Ativa Modificador de Captura)
       └──> [SE TIVER MAPA] Revelar o Segredo do Banco 19 antes da ação!
              ↓
[Nó 04: A Preparação das Armadilhas]
       ├──> Combinação Perfeita: Isca de João + Buraco de Amélia + Holofote de Chico.
       └──> Erro de Sincronia: Executar armadilha sem cobrir o buraco. (Falha de Captura -> Loop 00:00)
              ↓
[Nó 05: O Confronto com Carlão e Pietrão]
       ├──> Opção 1: Acionar a armadilha no momento exato! -> [FINAL 1: Captura Perfeita]
       ├──> Opção 2: Confrontar verbalmente usando o Mapa de 1972 -> [FINAL 5: A Verdade Revelada]
       └──> Opção 3: Cercar apenas Pietrão enquanto Carlão foge -> [FINAL 3: A Perseguição na Serra]
```

---

## 6. Os 5 Finais do Jogo

1. **Final 1 — Plano Mestre Impecável (Vitória Perfeita)**:
   A isca de João atrai a dupla para a figueira; o buraco camuflado por Amélia faz Pietrão tropeçar e a rede suspensa prende Carlão. O grupo recupera o mapa intacto e parte para a viagem da Serra da Lua como verdadeiros heróis!

2. **Final 2 — O Alarme de Emergência (Vitória Parcial)**:
   Os invasores são assustados pelos holofotes de Chico e fogem deixando o alicate para trás. O ônibus fica seguro, mas o mistério de 1972 permanece sem solução.

3. **Final 3 — A Trilha da Serra da Lua (Final Aberto)**:
   Pietrão é capturado na armadilha, mas Carlão escapa com metade do mapa em direção às montanhas. Teny e os alunos decidem usar a aula de campo para seguir as pistas na Serra.

4. **Final 4 — O Laço do Relógio 00:00 (Reinício Recursivo)**:
   Carlão consegue ligar o motor do ônibus, mas o circuito de segurança aciona o relógio do 1972. O tempo reseta para a meia-noite, e o jogador acorda com a memória e os itens da rodada anterior!

5. **Final 5 — A Sociedade do Ônibus 1972 (Final Secreto)**:
   Ao descobrir que Carlão era o antigo mecânico de 1972 tentando recuperar o diário de seu falecido pai, Teny e o grupo propõem uma aliança, transformando a expedição à Serra da Lua em uma missão arqueológica conjunta!