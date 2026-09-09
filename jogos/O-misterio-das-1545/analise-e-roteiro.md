# O Mistério das 15:45 — análise e roteiro corrigido

## Problemas encontrados na versão original

1. **Todos os suspeitos apareciam na abertura.** O primeiro nó já oferecia botões para investigar Maria, Tayonara e Garcia. A investigação funcionava como uma lista de diálogos, e não como descoberta de uma cena.
2. **O final podia ser alcançado por uma única pista.** O caminho `vitrine → laboratório → acusar Garcia` encerrava o caso sem testemunho, horário, álibi, chave, motivo ou recuperação do medalhão.
3. **A conclusão inventava uma cópia da chave.** Nenhuma cena encontrava ou demonstrava essa cópia, embora o final a tratasse como fato.
4. **O medalhão era recuperado fora de cena.** O final dizia que o objeto havia sido recuperado, mas o jogador nunca descobria seu esconderijo.
5. **A característica física virava prova de culpa.** Rádio, roupa escura e dificuldade para caminhar coincidiam com o vulto e apontavam diretamente para Garcia, sem fontes independentes.
6. **A análise do tecido não tinha cadeia lógica.** O laboratório comparava a fibra ao paletó sem o jogador observar ou recolher uma amostra de Garcia.
7. **O álibi de Tayonara era contraditório.** O texto mencionava uma falha no registro, enquanto a pista adicionada dizia que uma turma inteira confirmava sua presença.
8. **Os locais eram estáticos.** Voltar ao salão, a Maria, a Garcia ou à vitrine repetia o mesmo conteúdo, mesmo após novas descobertas.
9. **Não existiam hipóteses alternativas reais.** Somente Garcia podia ser acusado e não havia consequência para uma interpretação precipitada.
10. **Reiniciar não limpava o caso.** O botão do final voltava à primeira cena, mas preservava todas as pistas da partida anterior.
11. **Faltava autoridade para a investigação.** Não era explicado por que o protagonista podia acessar câmera, laboratório, administração e registros internos.
12. **A linha temporal era insuficiente.** O roteiro não estabelecia quando o medalhão foi visto pela última vez, quando a chave saiu ou quando Garcia realmente entrou no depósito.

## Correções implementadas

- O jogo começa na Galeria Aurora, com vitrine, relógio e corredor — sem entregar nomes.
- A diretora Helena autoriza o registro de horários e acompanha o acesso às áreas técnicas.
- Maria, Tayonara e Garcia são descobertos durante a exploração.
- Semelhanças físicas servem apenas para orientar uma comparação.
- O tecido exige observação do rasgo e análise na conservação.
- O álibi de Tayonara é confirmado por câmera contínua e lista escolar.
- O álibi de Garcia é comparado a dois registros: retirada da chave e leitor do depósito.
- A caixa metálica descrita por Maria recebe número, ficha, destino e responsável.
- O medalhão é encontrado dentro da caixa 8, atrás do relógio principal.
- A reconstrução ocorre antes da confissão.
- Acusações erradas explicam quais provas foram ignoradas e permitem retornar.
- Um reinício cria um estado completamente novo.

## Estado narrativo

O objeto `state` guarda:

- `evidence[]`: doze evidências confirmadas;
- `people[]`: pessoas encontradas durante a investigação;
- `visits{}`: quantidade de visitas a cada cena;
- `coatObserved`: se o rasgo do paletó foi observado;
- `garciaConfronted`: se os dois horários já foram apresentados a Garcia;
- `mistakes`: quantidade de hipóteses acusatórias erradas;
- `solved`: se o caso foi encerrado.

## Linha do tempo corrigida

| Horário | Evento |
|---|---|
| 15:40 | Última conferência do Medalhão de Aurora. |
| 15:42 | Garcia retira a chave de emergência. |
| 15:44 | Maria e a câmera registram uma caixa seguindo para a ala técnica. |
| 15:45 | A vitrine é aberta com a chave correta e fechada 38 segundos depois. |
| 15:46 | O alarme aparece na portaria. |
| 15:50 | A chave é devolvida. |
| 15:51 | O crachá de Garcia entra no depósito pela primeira vez. |

## Cadeia da solução

```text
Vitrine intacta + controle da chave
→ Garcia tinha acesso no intervalo exato

Depoimento de Garcia + leitor do depósito
→ o álibi é objetivamente falso

Relato de Maria + reflexo da câmera
→ a caixa percorreu a ala técnica às 15:44

Fibra da vitrine + rasgo do paletó
→ Garcia teve contato com a dobradiça

Livro da caixa 8 + medalhão recuperado
→ o objeto foi escondido no recipiente reservado por Garcia

Todos os horários reunidos
→ reconstrução antes da confissão
```

## Cenas recursivas principais

- **Salão central:** primeira preservação, retorno com pistas parciais, retorno com a caixa recuperada e acesso à reconstrução.
- **Vitrine:** fibra sem identificação; depois, fibra com correspondência confirmada.
- **Corredor:** primeiro reconhecimento; depois, cruzamento entre testemunho, câmera e registros.
- **Maria:** relato inicial sem rosto; revisita com imagem independente.
- **Câmera:** gravação isolada; revisita com o depoimento de Maria.
- **Garcia:** álibi inicial; tensão com um registro; contradição com dois registros; retorno após a recuperação.
- **Administração:** oportunidade registrada; revisita orientada pela descrição da caixa.
- **Depósito:** horário isolado; revisita transformando o horário em contradição.
- **Galeria dos Relógios:** recuperação do medalhão; revisita com a prova preservada.

## Finais

- **Caso solucionado:** as seis provas centrais demonstram o percurso e recuperam o medalhão.
- **Relatório completo:** todas as doze evidências foram registradas e nenhuma pessoa foi acusada antes da reconstrução.

As hipóteses erradas sobre Maria e Tayonara não são becos sem saída: apresentam a falha lógica e devolvem o jogador ao quadro ou ao salão.
