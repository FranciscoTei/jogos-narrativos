# Roteiro Oficial: A Vila das Jóias

> **Documento de Acompanhamento — 6º Ano**  
> **Tema:** Mistério e investigação (Vila das Joias, 1995)  
> **Estrutura:** narrativa recursiva com revisitas condicionais e 6 desfechos  
> **Protagonista:** Isaac, com Belle como parceira de investigação

## Ficha técnica

- **Título público:** A Vila das Jóias
- **Autoria:** Lucas, Samuel, Israel e Talita
- **Identidade visual:** cartografia noturna de uma vila de lapidadores, com verde-esmeralda, ametista, cobre e elementos de diário de exploração.
- **Interface:** cenário em destaque, escolhas centrais, caderno de pistas, mapa, salvamento e painel de progresso.

---

## 1. Premissa

Em 1995, a coleção histórica da Vila das Joias desaparece durante a madrugada. Uma janela lateral foi quebrada, mas as vitrines foram abertas com uma ferramenta de precisão. Isaac e Belle seguem pegadas até o antigo Posto de Emergência P2, onde encontram uma joia deixada de propósito com riscos que formam “P3” em Código Morse.

O jogador não recebe a explicação do crime no prólogo. Descobre, junto com Isaac, que Mike roubou a coleção para procurar uma peça artificial ligada à Mina Perdida e que Jack coordenou a fuga por rádio. A joia usada como mensagem era justamente a peça procurada.

## 2. Regras narrativas

### Perspectiva do investigador

- A abertura mostra apenas sons e acontecimentos que qualquer morador poderia perceber.
- O plano, a identidade e o objetivo dos criminosos são descobertos durante a investigação.
- Suspeita não vale como prova: uma acusação fraca recebe um aviso antes de produzir um final ruim.

### Recursividade

- Informações obtidas em um local abrem perguntas em outro.
- Maisie só recorda o aparelho luminoso depois que Isaac encontra equipamentos de rádio.
- A Biblioteca explica P3 depois que o código e a rota norte são conhecidos.
- A oficina de Jack reage às pistas de Maisie, da Biblioteca e do esconderijo.
- A casa abandonada muda para “Local Isolado” depois que a coleção é recolhida.
- O salão muda quando a coleção retorna.

### Custódia da joia

- A joia pode ficar com Isaac, no Salão ou na Delegacia.
- Se não estiver com Isaac, Piper ou o inspetor precisa autorizar e acompanhar a transferência.
- Depois do exame, a joia fica lacrada na Relojoaria.
- A peça só é aberta após radiografia e autorização conjunta de Piper e do inspetor.

---

## 3. Estado do jogo

| Variável | Função |
| :--- | :--- |
| `clues[]` | Guarda as 25 pistas possíveis. |
| `visited[]` | Registra os locais visitados. |
| `gemLocation` | `delegacia`, `salao`, `isaac` ou `relojoaria`. |
| `turns` | Controla a passagem da manhã para o fim da tarde. |
| `threatSeen` | Informa se já ocorreu a tentativa de recuperar a joia. |
| `invasionReviewed` | Evita repetir o laudo do arrombamento da Delegacia. |
| `gemTransferAuthorized` | Registra a transferência oficial da joia. |
| `maisieLevel` | Controla as etapas do depoimento de Maisie. |
| `jessieLevel` | Controla a análise do Código Morse. |
| `piperLevel` | Controla a pesquisa nos inventários. |
| `coltTalked` | Registra o depoimento de Colt. |
| `jackLevel` | Controla a investigação na oficina. |
| `libraryLevel` | Controla a pesquisa histórica. |
| `salaoVisits` | Altera o texto das revisitas ao salão. |
| `hideoutStage` | Controla a exploração do esconderijo. |
| `collectionRecovered` | Muda definitivamente a casa e o salão após a apreensão. |
| `ended` | Informa se a partida terminou. |

---

## 4. Pistas

| # | ID | Descoberta |
|---:|---|---|
| 1 | `marks` | A armação da joia contém riscos deliberados. |
| 2 | `morseCode` | Os riscos significam “P3” em Morse. |
| 3 | `maisieWitness` | Maisie viu uma pessoa com uma bolsa pesada. |
| 4 | `secondFigure` | Havia uma segunda pessoa vigiando a esquina. |
| 5 | `routeNorth` | A pessoa com a bolsa seguiu para o norte. |
| 6 | `maisieDevice` | A segunda pessoa carregava um rádio com luz âmbar. |
| 7 | `coltAbsent` | Colt deixou o posto durante o roubo. |
| 8 | `coltReason` | Um ruído metálico no beco serviu como distração. |
| 9 | `jessieLocks` | As fechaduras foram manipuladas com precisão; as vitrines não foram quebradas. |
| 10 | `piperNoRecord` | Uma joia não possui origem mineral registrada. |
| 11 | `inventoryCode` | Piper fornece o código do arquivo dos fundadores. |
| 12 | `mineSealed` | A mina foi fechada ainda contendo riquezas. |
| 13 | `foundersPhrase` | “O caminho permanece onde nenhuma pedra nasceu da terra.” |
| 14 | `p3Meaning` | P3 é o terceiro posto da rota de emergência, perto das casas abandonadas. |
| 15 | `jackRadio` | Jack possui um rádio de ondas curtas. |
| 16 | `jackMorse` | Jack mantém uma tabela de Morse na oficina. |
| 17 | `jackLied` | Jack revela saber o significado de P3 antes de Isaac explicá-lo. |
| 18 | `jackDeviceMatch` | O rádio de Jack corresponde ao aparelho e ao canal registrados nas outras pistas. |
| 19 | `gemTargeted` | Alguém tenta recuperar especificamente a joia marcada. |
| 20 | `hideoutFound` | A casa do norte foi usada como esconderijo. |
| 21 | `mikeReceipts` | Recibos ligam Mike aos materiais do esconderijo. |
| 22 | `gemsAllTested` | As peças foram pesadas e testadas; venda não era o objetivo. |
| 23 | `radioNote` | As anotações citam “7,18”, “receptor J” e uma luz pulsante. |
| 24 | `syntheticGem` | A joia marcada é uma imitação antiga de resina mineral. |
| 25 | `mapRevealed` | Uma cápsula dentro da peça guarda o mapa da mina. |

---

## 5. Cadeias de investigação

### Localizar o esconderijo

```text
Maisie: bolsa → segunda figura → rota norte
→ casas abandonadas → coleção recuperada
```

### Resolver P3

```text
joia marcada → Jessie decodifica Morse
+ rota norte → Biblioteca: mapa dos postos
→ P2 era o local da joia; P3 era o próximo encontro
```

### Provar a participação de Mike

```text
rota norte → esconderijo → recibos em nome de Mike
+ coleção testada + tentativa de recuperar a peça
```

### Provar a participação de Jack

```text
rádio + tabela de Morse + significado de P3
→ Jack revela conhecimento que Isaac não contou

Maisie: rádio com luz âmbar
+ esconderijo: frequência 7,18 e “receptor J”
+ oficina: mesmo canal e mesma luz
→ ligação física com Jack
```

### Identificar a joia artificial

```text
Piper: ausência de origem mineral
+ Biblioteca: frase dos fundadores
→ suspeita
→ transferência oficial da joia
→ exame físico de Jessie
→ confirmação da resina mineral
```

### Final 100%

```text
todas as 24 pistas anteriores ao mapa
→ acusação de Mike e Jack
→ radiografia oficial
→ abertura autorizada
→ mapa revelado
→ mensagem controlada em 7,18
→ captura e Mina Perdida
```

Se alguma pista anterior estiver faltando, o jogo informa quantas questões ainda não foram verificadas e permite voltar à investigação. Assim, “Final 100%” significa realmente 25 de 25 pistas.

---

## 6. Desfechos

| Desfecho | Condição | Resultado |
|---|---|---|
| **Pessoa errada** | Ignorar o alerta do inspetor e insistir contra Jessie ou Colt | A coleção fica segura, mas os criminosos fogem. |
| **Acusação apressada** | Insistir contra Jack sem ligação física | Jack é liberado e os dois criminosos fogem. |
| **Parcial** | Provar Mike, mas não fechar a participação de Jack | Mike é preso; o segundo envolvido não é legalmente identificado. |
| **Caso resolvido** | Prender Mike e Jack sem identificar a joia artificial | O roubo é resolvido; o motivo permanece desconhecido. |
| **Caso encerrado** | Confirmar a joia artificial, mas preservá-la | Os dois são presos; a peça permanece lacrada. |
| **Final 100%** | Obter todas as pistas, abrir a peça e usar o rádio como isca | Os dois são presos, o mapa é encontrado e a mina é preservada. |

## 7. Coerência do final perfeito

Os mandados são preparados enquanto Mike e Jack permanecem sob vigilância. A polícia não depende de uma coincidência para capturá-los: usa o transmissor apreendido no esconderijo para enviar uma mensagem controlada na frequência 7,18. Os dois respondem à isca e são presos juntos na rota norte. A condenação acontece semanas depois, apoiada pelo conjunto das provas, e não instantaneamente.
