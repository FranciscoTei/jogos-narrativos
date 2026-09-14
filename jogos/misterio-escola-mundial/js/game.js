/**
 * Motor de Jogo — Ramificações Narrativas com Múltiplos Suspeitos
 * O Mistério da Escola — 100% Offline
 */
(() => {
  'use strict';

  const SAVE_KEY = 'misterio_escola_save_v2';
  const { IMAGES, CLUE_CATALOG, SUSPECT_DEFINITIONS, CONNECTION_RULES } = window.StoryData;
  const Sound = window.SoundEngine;

  // --- Elementos DOM ---
  const el = {
    cover: document.getElementById('cover'),
    game: document.getElementById('game'),
    start: document.getElementById('startGame'),
    resume: document.getElementById('resumeGame'),
    audio: document.getElementById('bgm'),
    audioBtn: document.getElementById('audioBtn'),
    restart: document.getElementById('restartBtn'),
    sceneImage: document.getElementById('sceneImage'),
    sceneLocation: document.getElementById('sceneLocation'),
    sceneChapter: document.getElementById('sceneChapter'),
    sceneTitle: document.getElementById('sceneTitle'),
    sceneText: document.getElementById('sceneText'),
    choices: document.getElementById('choices'),
    clueCount: document.getElementById('clueCount'),
    visitedCount: document.getElementById('visitedCount'),
    evidenceCount: document.getElementById('evidenceCount'),
    caseStatus: document.getElementById('caseStatus'),
    suspects: document.getElementById('suspectsPanel'),
    clues: document.getElementById('cluesPanel'),
    evidence: document.getElementById('evidencePanel'),
    connections: document.getElementById('connectionsPanel'),
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Estado do Jogo ---
  const state = {
    clues: new Set(),
    visited: new Set(),
    events: new Set(),
    revealedSuspects: new Set(),
    alertedSuspect: false,
    bluntConfrontation: false,
    route: 'prologue',
    ended: false
  };

  const has = (id) => state.clues.has(id);
  const count = (ids) => ids.filter(has).length;

  function evidenceStatus() {
    return {
      helena: has('helena_note') && has('fake_ambulance_note'),
      teachers: has('carla_auto_part') && has('gate_camera_van'),
      passage: has('shelf6_photo') && has('lab_old_key') && has('augusto_blueprint'),
      enrique: has('enrique_contradiction') && has('mario_suspicious_call')
    };
  }

  function canOpenPassage() {
    return has('shelf6_photo') && has('lab_old_key') && has('augusto_blueprint');
  }

  function allEvidenceComplete() {
    const ev = evidenceStatus();
    return ev.helena && ev.teachers && ev.passage && ev.enrique;
  }

  function getCaseStatus() {
    if (state.ended) return 'Caso encerrado';
    if (canOpenPassage()) return 'A Estante 6 pode ser destravada';
    if (state.clues.size > 0) return 'Investigação em andamento';
    return 'Início da investigação';
  }

  // --- Sistema de Persistência (localStorage) ---
  const Storage = {
    save() {
      if (state.ended) {
        Storage.clear();
        return;
      }
      const data = {
        clues: Array.from(state.clues),
        visited: Array.from(state.visited),
        events: Array.from(state.events),
        revealedSuspects: Array.from(state.revealedSuspects || []),
        alertedSuspect: state.alertedSuspect,
        bluntConfrontation: state.bluntConfrontation,
        route: state.route,
        ended: state.ended
      };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        Storage.updateResumeButton();
      } catch (e) {}
    },

    load() {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        state.clues = new Set(data.clues || []);
        state.visited = new Set(data.visited || []);
        state.events = new Set(data.events || []);
        state.revealedSuspects = new Set(data.revealedSuspects || []);
        state.alertedSuspect = Boolean(data.alertedSuspect);
        state.bluntConfrontation = Boolean(data.bluntConfrontation);
        state.route = data.route || 'prologue';
        state.ended = Boolean(data.ended);
        return true;
      } catch (e) {
        return false;
      }
    },

    clear() {
      try {
        localStorage.removeItem(SAVE_KEY);
        Storage.updateResumeButton();
      } catch (e) {}
    },

    hasSave() {
      try {
        return Boolean(localStorage.getItem(SAVE_KEY));
      } catch (e) {
        return false;
      }
    },

    updateResumeButton() {
      if (el.resume) {
        if (Storage.hasSave()) el.resume.classList.remove('hidden');
        else el.resume.classList.add('hidden');
      }
    }
  };

  // --- Notificações Toast ---
  function showToast(title, subtitle) {
    if (!el.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<strong>🔍 ${title}</strong><span>${subtitle}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function addClue(id) {
    if (CLUE_CATALOG[id] && !state.clues.has(id)) {
      state.clues.add(id);
      Sound.playSfx('clue');
      const [title, desc] = CLUE_CATALOG[id];
      showToast(title, desc);
      Storage.save();
    }
    updatePanels();
  }

  // --- Atualização de Painéis do Dossiê ---
  function updatePanels() {
    el.clueCount.textContent = String(state.clues.size);
    el.visitedCount.textContent = String(state.visited.size);

    const ev = evidenceStatus();
    const evCount = Object.values(ev).filter(Boolean).length;
    if (el.evidenceCount) el.evidenceCount.textContent = `${evCount}/4`;

    el.caseStatus.textContent = getCaseStatus();

    // Suspeitos
    const revealedSuspects = SUSPECT_DEFINITIONS.filter(s => s.isRevealedCondition(has, state));
    revealedSuspects.forEach(s => {
      if (!state.revealedSuspects.has(s.id)) {
        state.revealedSuspects.add(s.id);
        if (state.route !== 'prologue' && state.route !== 'helena_day') {
          showToast('Novo Suspeito Registrado', `${s.name} foi adicionado(a) ao Dossiê.`);
        }
      }
    });

    el.suspects.innerHTML = revealedSuspects.length ? revealedSuspects.map(s => {
      const facts = s.getFacts(has);
      return `
        <article class="dossier-card">
          <h3>${s.name}</h3>
          <p>${s.base}</p>
          ${facts.length ? `<ul>${facts.map(f => `<li>${f}</li>`).join('')}</ul>` : '<p>Nenhum dado adicional confirmado.</p>'}
        </article>
      `;
    }).join('') : '<div class="dossier-card"><p>🔍 Nenhum suspeito foi identificado nesta fase da investigação. Continue explorando a escola para registrar suspeitos.</p></div>';

    // Pistas
    const ids = Array.from(state.clues);
    el.clues.innerHTML = ids.length ? ids.map(id => {
      const [title, desc, tag] = CLUE_CATALOG[id] || [id, '', '🔍 Indício'];
      return `
        <div class="clue-chip">
          <div class="clue-header">
            <strong>${title}</strong>
            <span class="clue-tag">${tag}</span>
          </div>
          <span>${desc}</span>
        </div>
      `;
    }).join('') : '<div class="dossier-card"><p>Nenhuma pista registrada ainda.</p></div>';

    // Provas
    const rows = [
      ['helena', 'Helena', 'Compreender a simulação do mal-estar e desmascarar o falso bilhete da ambulância.'],
      ['teachers', 'Professores', 'Relacionar a peça mecânica de Carla ao furgão branco visto no portão.'],
      ['passage', 'Passagem', 'Obter a foto da Estante 6, a chave do laboratório e a planta de Augusto.'],
      ['enrique', 'Responsáveis', 'Identificar o autor do esquema e provar a participação de seu cúmplice interno.']
    ];
    el.evidence.innerHTML = rows.map(([key, name, desc]) => `
      <div class="evidence-row ${ev[key] ? 'complete' : ''}">
        <span class="evidence-dot" aria-hidden="true"></span>
        <div><strong>${name}</strong><span>${desc}</span></div>
      </div>
    `).join('') + `<div class="dossier-card"><p>${allEvidenceComplete() ? 'As quatro áreas possuem evidências suficientes para uma conclusão completa.' : 'O jogo não declara culpados ou inocentes. Use as pistas para formar sua própria hipótese.'}</p></div>`;

    // Conexões
    if (el.connections) {
      const connectionsList = CONNECTION_RULES.filter(rule => rule.condition(has, count));
      el.connections.innerHTML = connectionsList.length ? connectionsList.map(c => `
        <div class="connection-card">
          <strong>${c.title}</strong>
          <p>${c.text}</p>
        </div>
      `).join('') : '<div class="dossier-card"><p>Continue investigando e reunindo pistas para desbloquear deduções e conexões entre os fatos.</p></div>';
    }
  }

  // --- Renderização de Cenas com Animação ---
  function renderScene({route, chapter, title, location, image, paragraphs, choices}) {
    state.route = route;
    if (location) state.visited.add(location);
    Storage.save();

    el.sceneImage.classList.add('fade-out');
    el.sceneText.classList.add('fade-out');

    setTimeout(() => {
      el.sceneChapter.textContent = chapter;
      el.sceneTitle.textContent = title;
      el.sceneLocation.textContent = location;
      el.sceneImage.src = image;
      el.sceneImage.alt = `Cenário: ${location}`;
      el.sceneText.innerHTML = paragraphs.map(p => {
        if (p.startsWith('>')) return `<div class="quote">${p.slice(1).trim()}</div>`;
        return `<p>${p}</p>`;
      }).join('');

      el.choices.innerHTML = '';
      choices.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `choice-btn ${c.className || ''}`.trim();
        btn.disabled = Boolean(c.disabled);
        const keyHint = idx < 9 ? `<span class="key-hint">[${idx + 1}]</span>` : '';
        btn.innerHTML = `${keyHint}${c.label}${c.note ? `<span class="choice-note">${c.note}</span>` : ''}`;
        btn.addEventListener('click', () => {
          Sound.playSfx('click');
          Sound.startBgm();
          c.action();
        });
        el.choices.appendChild(btn);
      });

      el.sceneImage.classList.remove('fade-out');
      el.sceneText.classList.remove('fade-out');
    }, 120);

    updatePanels();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function go(route) {
    const fn = routes[route];
    if (!fn) {
      console.error('Rota inexistente:', route);
      return routes.prologue();
    }
    fn();
  }

  // =====================================================================
  //  ESTRUTURA NARRATIVA — MÚLTIPLOS SUSPEITOS E RAMIFICAÇÕES
  // =====================================================================
  const routes = {

    // ---------------------------------------------------------------
    //  PRÓLOGO E CAPÍTULO 1
    // ---------------------------------------------------------------

    prologue() {
      renderScene({
        route: 'prologue',
        chapter: 'Prólogo',
        title: 'O Mistério da Escola Mundial',
        location: 'Escola Mundial',
        image: IMAGES.outside,
        paragraphs: [
          'O ano de 2023 trouxe uma sombra sobre a Escola Mundial que ninguém conseguia explicar. Primeiro foi o professor Marcelo, de Matemática, que simplesmente não apareceu numa segunda-feira de março. A coordenação disse que ele pediu licença médica, mas nenhum aluno viu o documento e os colegas dele pareciam tão surpresos quanto todos.',
          'Três semanas depois, a professora Carla, de Ciências, também desapareceu. Desta vez nem um comunicado foi enviado aos pais. Apenas um aviso seco no mural: "Professora Carla afastada por tempo indeterminado." Os corredores que antes enchiam de risadas agora carregam um silêncio pesado, interrompido apenas por sussurros sobre maldições e fantasmas.',
          'Alguns alunos juram ter ouvido passos na ala antiga do prédio — aquela que foi interditada após o incêndio de 2018 e que deveria estar completamente vazia. Outros contam que viram luzes piscando nas janelas cobertas de poeira. A diretora Olívia insiste que são apenas histórias, mas fecha a porta da sala dela com força quando alguém insiste no assunto. O inspetor de segurança do turno da tarde, um homem chamado Mário, passou a rondar os corredores com uma frequência que ninguém lembra de ter visto antes.',
          'Pietra Santos e Júlia Mendes, alunas do terceiro ano e amigas inseparáveis, se recusam a aceitar explicações vagas. Nas últimas semanas, elas anotaram cada detalhe estranho num caderno secreto: os horários em que o portão lateral ficava aberto sem motivo, o furgão branco que aparecia no estacionamento em dias aleatórios, o velho zelador Augusto andando sozinho perto da ala interditada de madrugada, e as expressões tensas dos funcionários mais antigos. Hoje, quarta-feira, elas sentem que algo está prestes a acontecer.'
        ],
        choices: [
          { label: 'Iniciar a quarta-feira de Helena', action: () => go('helena_day') }
        ]
      });
    },

    helena_day() {
      renderScene({
        route: 'helena_day',
        chapter: 'Capítulo 1',
        title: 'O Dia em que Helena Sumiu',
        location: 'Sala de aula',
        image: IMAGES.classroom,
        paragraphs: [
          'A aula de Português começa às 14h, mas Helena chega atrasada. Quando entra na sala, Pietra percebe imediatamente que algo está errado. A professora, normalmente tão composta e articulada, tem olheiras fundas e as mãos tremem levemente enquanto abre o livro didático sobre a mesa. Ela evita olhar diretamente para os alunos.',
          'Helena tenta conduzir a aula normalmente, mas sua voz falha mais de uma vez. A cada poucos minutos ela olha para o corredor pela porta entreaberta, como se esperasse alguém — ou temesse que alguém aparecesse. Pietra cutuca Júlia e aponta discretamente: Helena está guardando um papel dobrado entre as páginas do livro, com movimentos apressados e nervosos.',
          '>— Eu não estou me sentindo bem — diz Helena de repente, interrompendo sua própria explicação sobre advérbios. Sua voz sai fina, quase um sussurro. — Vou até a diretoria. Façam os exercícios da página 47.',
          'Helena sai da sala apressada, deixando seu celular e uma pilha de papéis sobre a mesa. Os minutos passam. Cinco. Dez. Quinze. Ela não volta. O murmúrio na sala cresce. Uma funcionária da limpeza passa pelo corredor empurrando o carrinho e, quando um aluno pergunta sobre Helena, responde sem parar: "Vi ela saindo pelo portão lateral, tinha um homem esperando num carro branco. O inspetor Mário estava lá perto, parado, olhando. Achei estranho ele não ter feito nada."',
          'O burburinho explode. Mais uma professora sumiu. Pietra sente o coração disparar no peito. Júlia aperta sua mão por baixo da carteira e sussurra, com os olhos arregalados: "É agora, Pietra. Se não fizermos nada agora, vai ser tarde demais." As duas trocam um olhar decidido. A investigação começa aqui.'
        ],
        choices: [
          {
            label: 'Examinar com cuidado a mesa de Helena antes que alguém mexa nos papéis',
            action: () => go('route_start_desk')
          },
          {
            label: 'Ir até o portão lateral verificar o homem que a funcionária mencionou',
            action: () => go('route_trap_enrique')
          },
          {
            label: 'Ir à Diretoria cobrar explicações da diretora Olívia',
            action: () => go('route_blunt_director')
          }
        ]
      });
    },

    // ===============================================================
    //  ROTA C — CONFRONTO NO PORTÃO (caminho do final ruim)
    // ===============================================================

    route_trap_enrique() {
      state.alertedSuspect = true;
      addClue('gate_camera_van');
      renderScene({
        route: 'route_trap_enrique',
        chapter: 'Capítulo 1',
        title: 'O Homem do Furgão',
        location: 'Portão lateral',
        image: IMAGES.gate,
        paragraphs: [
          'Pietra puxa Júlia pelo braço e as duas descem as escadas correndo, desviando de alunos que conversam nos corredores. O coração bate tão forte que Pietra sente o pulso nas têmporas. A funcionária disse portão lateral — e é para lá que elas vão, sem pensar duas vezes.',
          'Ao passar pelo corredor do térreo, Pietra quase esbarra no inspetor Mário, que está parado perto da saída com os braços cruzados, observando o movimento com uma expressão que ela não sabe interpretar — seria preocupação ou vigilância? Ele não tenta impedi-las, mas seus olhos acompanham cada passo até elas virarem a esquina.',
          'No estacionamento de terra batida ao lado do muro, um furgão branco de carga está estacionado com o motor ligado. Não tem logotipo, não tem placa visível da posição delas. A traseira do veículo está entreaberta e, dentro da cabine, um homem de meia-idade com camisa social amassada e barba por fazer digita algo no celular com urgência. Ele não percebe as alunas se aproximando.',
          '>— Ei! — grita Pietra, batendo com a palma da mão no vidro do passageiro. O som ecoa pelo estacionamento vazio. — O que você está fazendo aqui? Onde está a professora Helena?',
          'O homem se assusta e quase derruba o celular. Seus olhos se arregalam por um instante — medo? surpresa? culpa? — antes de se recompor. Ele abre a janela apenas alguns centímetros e responde com uma voz forçadamente calma, mas Pietra percebe que suas mãos apertam o volante com força.',
          '>— Eu sou o marido da Helena. Ela passou mal e eu vim buscá-la. Já fomos ao hospital, está tudo bem — ele diz, mas não olha nos olhos de nenhuma das duas. Seu pé direito já está no acelerador.',
          'Antes que Pietra consiga formular a próxima pergunta, o homem engata a marcha. O furgão arranca levantando uma nuvem de poeira vermelha que obriga as alunas a cobrir o rosto. Em questos segundos, o veículo atravessa o portão aberto e desaparece na rua. Pietra tenta ler a placa, mas a poeira e a distância tornam impossível. Quando o ar se limpa, resta apenas o silêncio e duas marcas profundas de pneu na terra.'
        ],
        choices: [
          {
            label: 'Correr atrás do furgão pela rua',
            action: () => go('trap_chase')
          },
          {
            label: 'Ficar e anotar tudo que conseguiram observar',
            action: () => go('trap_observe')
          }
        ]
      });
    },

    trap_chase() {
      renderScene({
        route: 'trap_chase',
        chapter: 'Capítulo 1',
        title: 'Perseguição Frustrada',
        location: 'Rua da escola',
        image: IMAGES.outside,
        paragraphs: [
          'Pietra dispara pelo portão com Júlia logo atrás. A calçada é irregular e cheia de buracos; Júlia quase torce o pé num desnível. O furgão branco já virou a esquina da Rua das Acácias e o som do motor se perde entre o barulho do trânsito da avenida principal.',
          'Quando chegam à esquina, ofegantes, não há sinal do veículo. A rua está ocupada por motos estacionadas, uma mercearia com toldo verde e um cachorro vira-lata que as observa com indiferença. O furgão poderia ter seguido em qualquer direção.',
          '>— Perdemos ele — ofega Júlia, apoiando as mãos nos joelhos. O suor escorre pela testa. — Pietra, ele disse que era marido da Helena. Mas se fosse verdade, por que fugir desse jeito? Por que não mostrar o rosto, não dar uma explicação decente?',
          'Pietra olha para trás, para o portão da escola que agora parece distante. Um arrepio percorre suas costas apesar do calor das três da tarde. O porteiro nem parece ter notado a saída apressada das alunas. Mas Pietra repara que, de volta ao portão, a silhueta do inspetor Mário está parada na sombra do muro, observando a rua. Quando ele percebe que ela o viu, desvia o olhar e volta para dentro.',
          '>— Aquele não era um carro de quem vai ao hospital buscar a esposa — diz Pietra, limpando a poeira do rosto. — Era um furgão de carga. Sem placa visível, sem logo, com a traseira aberta. Helena não foi levada numa ambulância, Jú. Foi levada naquele furgão. E aquele homem sabe que nós vimos.',
          'As duas se olham em silêncio por um momento que parece durar uma eternidade. Depois, sem precisar combinar, começam a caminhar de volta para a escola. As respostas não estão na rua — estão lá dentro, nos corredores, nas salas, nos segredos que alguém está tentando esconder.'
        ],
        choices: [
          {
            label: 'Voltar à sala de Helena para procurar pistas na mesa dela',
            action: () => go('trap_classroom')
          }
        ]
      });
    },

    trap_observe() {
      renderScene({
        route: 'trap_observe',
        chapter: 'Capítulo 1',
        title: 'O Rastro na Terra',
        location: 'Portão lateral',
        image: IMAGES.gate,
        paragraphs: [
          'O silêncio que se instala após a partida do furgão é quase ensurdecedor. A poeira vermelha ainda paira no ar como uma cortina fina, e o cheiro de escapamento se mistura ao calor da tarde. Pietra fica parada, respirando pesado, olhando para o ponto onde o furgão desapareceu.',
          'Júlia puxa um caderninho do bolso da saia do uniforme e começa a anotar freneticamente, a caneta tremendo entre os dedos. Enquanto escreve, murmura para si mesma: "Furgão branco, sem logotipo, cabine única, traseira de carga, placa começando com K ou R... homem entre 40 e 50 anos, camisa social clara, barba por fazer, aliança na mão esquerda..."',
          'Pietra se agacha e examina o chão onde o furgão estava estacionado. As marcas de pneu são fundas, profundas demais para um veículo vazio — como se estivesse carregando algo pesado. Perto do meio-fio, entre a terra e o asfalto, algo brilha com um reflexo metálico. É um pequeno parafuso hexagonal, novinho, sem ferrugem. Pietra o recolhe e guarda no bolso da calça.',
          '>— Ele mentiu — diz Pietra, se levantando e mostrando o parafuso a Júlia. — Disse que era marido da Helena e que ela passou mal. Mas nenhum marido foge assim quando fazem perguntas sobre a esposa. E esse furgão não é carro de família — é veículo de carga.',
          'O porteiro finalmente desliga o telefone e olha para as alunas com desconfiança, levantando uma sobrancelha. Pietra inventa uma desculpa rápida sobre ter deixado cair um caderno no estacionamento e as duas se afastam antes que ele faça mais perguntas. Ao voltar para dentro, passam pelo inspetor Mário, que está encostado na parede perto da porta de serviço, falando ao celular em voz muito baixa. Ele para de falar no instante em que percebe as alunas e guarda o aparelho no bolso com um gesto rápido.',
          '>— Precisamos ver o que a Helena deixou na mesa — sussurra Júlia, fechando o caderninho. — Ela guardou algo no livro durante a aula, eu vi. Se aquele homem levou ela à força, as respostas estão nos papéis que ficaram para trás.'
        ],
        choices: [
          {
            label: 'Voltar à sala de Helena para investigar a mesa',
            action: () => go('trap_classroom')
          }
        ]
      });
    },

    trap_classroom() {
      addClue('helena_note');
      renderScene({
        route: 'trap_classroom',
        chapter: 'Capítulo 2',
        title: 'A Mesa Revirada',
        location: 'Sala de aula',
        image: IMAGES.classroom,
        paragraphs: [
          'Quando Pietra e Júlia chegam ao segundo andar, o corredor já está quase vazio — o sinal do intervalo tocou enquanto elas estavam no portão. A porta da sala 204 está entreaberta e uma réstia de luz alaranjada do sol da tarde atravessa as cortinas empoeiradas.',
          'A sala está vazia, mas algo está errado. A mesa de Helena, que antes tinha uma pilha organizada de papéis e o celular prateado, agora está em desordem. Os papéis foram espalhados, alguns caíram no chão, e o celular desapareceu. Alguém esteve ali nos poucos minutos em que elas estavam no portão. Alguém rápido, que sabia exatamente o que procurar.',
          'Júlia se ajoelha e vasculha os papéis no chão com dedos ágeis. Entre folhas de exercícios, provas corrigidas com caneta vermelha e uma lista de chamada, ela encontra um papel dobrado em quatro que caiu debaixo da cadeira — provavelmente escapou de quem revirou a mesa. É uma anotação na letra caprichada de Helena.',
          '>— Olha isso — Júlia estende o papel para Pietra com as mãos tremendo. Na folha, em tinta azul, há uma lista de nomes e horários. "Marcelo — desapareceu 13/março, visto última vez 17h corredor leste." "Carla — desapareceu 3/abril, laboratório trancado." E, sublinhado duas vezes: "18h — Biblioteca, Estante 6. Verificar pessoalmente."',
          'Pietra pega o bilhete e o dobra com cuidado, guardando no bolso interno do fichário e pressionando a mão por cima para garantir que não caia. Um frio percorre seu estômago apesar do calor abafado da sala. Helena não "passou mal". Helena estava investigando os desaparecimentos de Marcelo e Carla. Ela havia marcado uma verificação na Estante 6 da biblioteca. E foi silenciada antes que pudesse completar o que começou.',
          '>— Quem mexeu nessa mesa sabia exatamente o que procurar — diz Pietra, olhando para o corredor deserto. Sua voz é baixa mas firme. — Levaram o celular, arrancaram páginas do caderno. Quem fez isso teve acesso à sala durante o intervalo. Alguém de dentro da escola. Precisamos agir agora, antes que não sobre nada.'
        ],
        choices: [
          {
            label: 'Seguir para os corredores da ala leste, onde Helena mencionou Marcelo',
            action: () => go('trap_corridors')
          },
          {
            label: 'Ir direto à biblioteca procurar a Estante 6',
            action: () => go('trap_library')
          }
        ]
      });
    },

    trap_corridors() {
      renderScene({
        route: 'trap_corridors',
        chapter: 'Capítulo 2',
        title: 'Sons na Escuridão',
        location: 'Corredores',
        image: IMAGES.corridor,
        paragraphs: [
          'Os corredores da ala leste ficam progressivamente mais escuros à medida que Pietra e Júlia avançam. As últimas salas de aula deram lugar a depósitos de material e salas administrativas fechadas com cadeado. As luzes fluorescentes aqui piscam com um zumbido irritante, projetando sombras que dançam nas paredes descascadas.',
          'Júlia aperta o passo ao lado de Pietra. Os sapatos delas ecoam no piso de cerâmica gasto. No final do corredor, onde a placa desbotada indica "Ala Oeste — Interditada", uma porta de aço pesada bloqueia a passagem. É a entrada da ala antiga, fechada desde o incêndio de 2018.',
          'As duas param diante da porta. E então ouvem. Não uma, mas duas vozes abafadas vindas do outro lado — uma grossa, áspera, dando ordens curtas, e outra mais aguda respondendo com pressa. Algo pesado sendo arrastado pelo chão de concreto. Depois, um baque metálico. O clique de um trinco.',
          '>— Você está ouvindo isso? — Júlia agarra o braço de Pietra com tanta força que vai deixar marca. — São duas pessoas. Tem gente trabalhando lá dentro.',
          'Pietra encosta o ouvido na superfície fria da porta. Os sons continuam: mais arrasto, um rangido de porta interna. A voz mais aguda diz algo que Pietra quase entende: "...as caixas... antes que..." O resto se perde no eco do concreto. Pietra tenta a maçaneta — trancada. Examina o cadeado e percebe que é novo, reluzente, completamente diferente do cadeado enferrujado que lembra ter visto ali semanas atrás. Alguém trocou a fechadura recentemente.',
          '>— Não vamos conseguir entrar por aqui — diz Pietra entre os dentes, frustrada, dando um tapa na porta de aço. O som metálico ecoa pelo corredor. Do outro lado, os ruídos param por um segundo. Depois recomeçam, mais rápidos. — Mas a Helena escreveu "Estante 6" no bilhete. A biblioteca. Talvez exista outra entrada.'
        ],
        choices: [
          {
            label: 'Ir à biblioteca procurar a Estante 6',
            action: () => go('trap_library')
          },
          {
            label: 'Desviar pelo laboratório — pode haver pistas sobre Carla',
            action: () => go('trap_lab')
          }
        ]
      });
    },

    trap_library() {
      renderScene({
        route: 'trap_library',
        chapter: 'Capítulo 3',
        title: 'Marcas no Chão',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'A biblioteca está estranhamente vazia para um dia de semana. As mesas de estudo, normalmente ocupadas por alunos com cadernos abertos e mochilas jogadas, estão desertas. A bibliotecária não está no balcão — há apenas um aviso escrito à mão com caneta azul: "Volto em 15 minutos." O silêncio aqui é diferente do corredor; é o silêncio denso de um lugar que guarda segredos entre milhares de páginas.',
          'Pietra e Júlia caminham entre as fileiras de estantes, conferindo os números nas placas laterais. Seção 1, Didáticos. Seção 3, Literatura. Seção 5, Ciências. E finalmente, no fundo da biblioteca, encostada na parede dos fundos: Seção 6, História. Uma estante pesada de madeira maciça, repleta de enciclopédias grossas e livros de capa dura cobertos por uma fina camada de pó.',
          'À primeira vista, parece uma estante perfeitamente comum. Mas Júlia se agacha e aponta para o chão com olhos arregalados. Há marcas semicirculares no piso de cerâmica, arranhões em arco que só poderiam ter sido feitos pela base da estante sendo girada ou empurrada para o lado. E as marcas são recentes — a poeira ao redor foi claramente perturbada, com pegadas parciais visíveis na camada de sujeira.',
          '>— Alguém moveu esta estante, Pietra. E não foi há muito tempo — Júlia passa o dedo pelas marcas, sentindo as ranhuras no piso. — A Helena sabia. Por isso escreveu "Estante 6" no bilhete. Ela descobriu que tem algo atrás daqui.',
          'Pietra tenta empurrar a estante, primeiro com as mãos, depois apoiando o ombro. A estante não cede um milímetro — são centenas de quilos de madeira e livros. Parece haver algum mecanismo oculto, uma trava ou alavanca que elas não conseguem identificar. Os minutos se arrastam enquanto tentam puxar livros, pressionar painéis, verificar cada centímetro da madeira. Nada.',
          'Nos fundos da estante, Pietra nota um espaço vazio entre os livros. Na prateleira do meio, onde deveria haver um volume grande, há apenas um retângulo limpo na poeira — alguém retirou um livro dali muito recentemente. A etiqueta colada na madeira, quase ilegível, diz: "Acervo Fotográfico — História do Prédio". Esse livro, ou o que estava dentro dele, já foi levado.'
        ],
        choices: (() => {
          const c = [];
          if (!state.visited.has('Laboratório de Ciências')) {
            c.push({
              label: 'Ir ao laboratório de Ciências antes que limpem lá também',
              action: () => go('trap_lab')
            });
          }
          c.push({
            label: 'Procurar o velho Augusto nos jardins — ele conhece a escola toda',
            action: () => go('trap_augusto')
          });
          return c;
        })()
      });
    },

    trap_lab() {
      addClue('carla_auto_part');
      renderScene({
        route: 'trap_lab',
        chapter: 'Capítulo 3',
        title: 'Sombras no Laboratório',
        location: 'Laboratório de Ciências',
        image: IMAGES.lab,
        paragraphs: [
          'O laboratório de Ciências está com as luzes apagadas. A porta não está trancada — Pietra a empurra devagar e o rangido das dobradiças ecoa no ambiente escuro. As persianas estão fechadas e apenas finas listras de luz da tarde atravessam as frestas, desenhando linhas douradas sobre as bancadas de mármore.',
          'Era aqui que Carla dava aulas. Suas coisas pessoais foram removidas semanas atrás pela coordenação, mas o laboratório ainda cheira a produtos químicos e desinfetante. Os armários de vidro estão parcialmente abertos, como se alguém tivesse vasculhado o conteúdo às pressas.',
          'Júlia contorna a bancada principal e se abaixa. Debaixo de um banco, semiescondida pela perna metálica da mesa, há uma peça mecânica — um componente que parece pertencer a algum tipo de veículo. É pesada, metálica, com resquícios de graxa preta. Não tem nada a ver com equipamentos de laboratório escolar.',
          '>— Olha isso aqui — Júlia levanta a peça sob a luz de uma fresta na persiana. — Isso é peça de motor. De veículo grande. O que isso estava fazendo no laboratório da Carla?',
          'Pietra pega a peça e a examina. Tem um número de série parcialmente raspado e a marca de um fabricante de autopeças. Seu estômago se contrai. A peça de carro, o furgão branco no portão, os sons de coisas sendo arrastadas na ala antiga — tudo começa a se conectar de uma forma que ela não gosta.',
          'De repente, passos. Vindos do corredor. Pesados, ritmados, como botas de uniforme. As duas se entreolham em pânico e se abaixam atrás da bancada, prendendo a respiração. Uma sombra escura passa pela fresta debaixo da porta — alguém de uniforme, pelo formato dos ombros e a postura rígida. Os passos continuam, se afastam em direção à ala interditada. Pietra solta o ar devagar. Quem quer que fosse, parecia ter um destino específico.'
        ],
        choices: (() => {
          const c = [];
          if (!state.visited.has('Biblioteca')) {
            c.push({
              label: 'Ir à biblioteca conferir a Estante 6 que Helena mencionou',
              action: () => go('trap_library')
            });
          }
          c.push({
            label: 'Procurar o Sr. Augusto nos jardins',
            action: () => go('trap_augusto')
          });
          return c;
        })()
      });
    },

    trap_augusto() {
      addClue('augusto_blueprint');
      renderScene({
        route: 'trap_augusto',
        chapter: 'Capítulo 4',
        title: 'O Aviso do Velho Augusto',
        location: 'Jardins da escola',
        image: IMAGES.outside,
        paragraphs: [
          'Augusto está sentado no banco de cimento perto do bebedouro dos jardins, mas não está descansando. O velho zelador, que trabalha na escola há mais de trinta anos e conhece cada centímetro do prédio, está inquieto. Suas mãos enrugadas apertam um molho de chaves antigas e seus olhos não param de se mover, vigiando o pátio.',
          'Quando vê Pietra e Júlia se aproximando com expressões tensas, ele se levanta devagar e faz sinal para que falem baixo. Antes que elas digam qualquer coisa, ele se inclina e fala num sussurro áspero, com o hálito de café.',
          '>— Eu vi, meninas. Vi o homem do furgão. Ele voltou, não faz meia hora, e foi direto para a ala antiga. Entrou pela porta de serviço dos fundos, aquela que todo mundo acha que está soldada. Estava carregando caixas para fora. Caixas pesadas. E sabe quem abriu a porta pra ele? O inspetor. O Mário. Vi os dois conversando perto do portão lateral antes disso.',
          'Augusto puxa do bolso do macacão um papel amarelado, dobrado e redobrado tantas vezes que as dobras parecem prestes a rasgar. É uma planta arquitetônica antiga, desenhada à mão, do prédio original da escola. Ele aponta com o dedo grosso para uma passagem marcada a lápis que conecta a biblioteca à ala antiga.',
          '>— Essa passagem — ele toca o papel com reverência — foi construída nos anos 60 como saída de emergência. Fica atrás da Estante 6 na biblioteca. Tem uma alavanca escondida na lateral. Mas se eles estão lá dentro tirando as coisas, vão trancar tudo quando terminarem. Vocês não têm muito tempo.',
          'Pietra pega a planta com cuidado. A passagem está claramente marcada: um corredor estreito que sai por trás da estante e desce meio andar até a ala interditada. Augusto as olha com preocupação genuína nos olhos, os lábios comprimidos. Ele quer ajudar, mas é um homem de setenta anos com artrite nos joelhos. Pietra agradece e as duas saem correndo de volta ao prédio.'
        ],
        choices: [
          {
            label: 'Correr para a biblioteca e tentar a alavanca da Estante 6',
            action: () => go('trap_passage_entry')
          },
          {
            label: 'Pedir ao Augusto que ligue para a polícia enquanto vocês vão à passagem',
            action: () => go('trap_augusto_police')
          }
        ]
      });
    },

    trap_augusto_police() {
      renderScene({
        route: 'trap_augusto_police',
        chapter: 'Capítulo 4',
        title: 'O Telefone que Demora',
        location: 'Jardins da escola',
        image: IMAGES.outside,
        paragraphs: [
          '>— Sr. Augusto, o senhor pode ligar para a polícia? Agora? — Pietra segura as mãos do velho zelador. — Tem algo muito errado acontecendo na ala antiga. Precisamos de ajuda.',
          'Augusto assente com a cabeça, preocupado, e puxa do bolso um celular antigo com a tela rachada. Ele disca o número com dedos lentos enquanto as alunas aguardam, roendo as unhas. A ligação cai. Ele tenta de novo. Demora quatro toques até alguém atender.',
          'Pietra ouve fragmentos da conversa. Augusto tenta explicar a situação, mas do outro lado parece haver ceticismo. "Barulhos numa ala interditada da escola? O senhor tem certeza? Vamos enviar uma viatura quando possível, pode levar de vinte a trinta minutos..."',
          '>— Vinte minutos — repete Júlia, com desespero nos olhos. — Em vinte minutos eles limpam tudo e somem. Pietra, não podemos esperar.',
          'Augusto cobre o telefone com a mão e olha para elas: "Vão. Eu fico aqui na linha com a polícia e oriento eles quando chegarem. Mas tomem cuidado, pelo amor de Deus." As duas acenam e correm em direção à biblioteca. Cada segundo conta agora.'
        ],
        choices: [
          {
            label: 'Correr para a biblioteca e entrar pela passagem',
            action: () => go('trap_passage_entry')
          }
        ]
      });
    },

    trap_passage_entry() {
      renderScene({
        route: 'trap_passage_entry',
        chapter: 'Capítulo 5',
        title: 'A Estante se Move',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'De volta à biblioteca, Pietra corre direto para a Estante 6. Com a planta de Augusto aberta sobre a mesa mais próxima, ela procura a alavanca que o zelador descreveu: "lateral esquerda, na altura da terceira prateleira, um puxador que parece um suporte de livro."',
          'Os dedos de Pietra percorrem a lateral da estante, sentindo cada imperfeição na madeira. Nada. Nada. E então — ali. Um pedaço de metal frio, diferente da madeira ao redor, disfarçado como um suporte decorativo. Ela o puxa para baixo.',
          'Um clique metálico ecoa dentro da parede. A estante inteira estremece e começa a deslizar para o lado sobre trilhos escondidos no piso, revelando uma abertura retangular na parede. Uma corrente de ar frio e úmido escapa da escuridão, carregando cheiro de mofo, poeira e algo mais — óleo de motor.',
          'O corredor revelado é estreito, com paredes de concreto bruto cobertas de teias de aranha. Não há iluminação. A escuridão é absoluta depois de dois metros. Júlia liga a lanterna do celular e o feixe de luz tremula na mão dela, revelando degraus que descem em curva.',
          '>— Helena estava aqui — sussurra Júlia, apontando para o chão do corredor. Na poeira acumulada há pegadas frescas. Muitas. De sapatos diferentes — ao menos dois tamanhos distintos. E marcas de arrasto, como se caixas tivessem sido puxadas por ali. — E não estava sozinha.',
          'Pietra respira fundo. O ar é pesado, viciado. Cada instinto dela grita para voltar, chamar um adulto, esperar a polícia. Mas Helena pode estar ali embaixo. E quem está limpando as provas pode terminar a qualquer minuto. As duas descem os degraus em silêncio, o celular iluminando um passo de cada vez.'
        ],
        choices: [
          {
            label: 'Descer pela passagem seguindo as pegadas',
            action: () => go('trap_deposit')
          }
        ]
      });
    },

    trap_deposit() {
      renderScene({
        route: 'trap_deposit',
        chapter: 'Capítulo 5',
        title: 'O Depósito Esvaziado',
        location: 'Ala interditada',
        image: IMAGES.restricted,
        paragraphs: [
          'Após descer doze degraus em espiral, o corredor se alarga e as alunas entram numa sala ampla de teto baixo. O que veem faz as duas pararem em seco, os olhos tentando processar a cena sob a luz fraca do celular.',
          'A sala foi um depósito. Foi. As prateleiras de metal estão quase vazias agora — restam apenas algumas caixas de papelão abertas, com peças metálicas espalhadas dentro. No chão, marcas de arrasto formam trilhas na poeira grossa, desenhando o mapa de dezenas de caixas que foram removidas às pressas. Plástico bolha rasgado, fita adesiva, pedaços de isopor.',
          'Pietra ilumina os cantos da sala. Num canto, garrafas de água vazias e embalagens de comida empilhadas — alguém ficou aqui por tempo prolongado. No outro, um colchão fino jogado no chão com um cobertor amassado. Um balde. Um rolo de corda. O coração de Pietra dispara.',
          '>— Alguém estava preso aqui — a voz de Júlia é um fio. Ela aponta para a parede onde, arranhada no concreto com algo pontiagudo, há marcas de contagem. Dias. Quase trinta traços. — Pietra, olha. Quase um mês de marcas.',
          'No fundo da sala, há uma porta de aço com um visor de vidro embaçado. Pietra se aproxima e tenta espiar através do vidro sujo. A escuridão do outro lado é completa. Ela tenta a maçaneta — gira. A porta está destrancada. Alguém a abriu recentemente e não se preocupou em fechar de volta.',
          '>— Se Helena estava aqui, já foi movida — diz Pietra, a voz trêmula de frustração e medo. — Quem veio limpar o depósito levou ela junto. Nós demos tempo para fazerem isso quando fomos confrontá-los no portão.'
        ],
        choices: [
          {
            label: 'Abrir a porta e verificar o que há do outro lado',
            action: () => go('trap_final_room')
          },
          {
            label: 'Fotografar tudo que resta antes de abrir a porta',
            action: () => go('trap_photograph')
          }
        ]
      });
    },

    trap_photograph() {
      renderScene({
        route: 'trap_photograph',
        chapter: 'Capítulo 5',
        title: 'Registros Tardios',
        location: 'Ala interditada',
        image: IMAGES.restricted,
        paragraphs: [
          'Júlia saca o celular e começa a fotografar freneticamente. O flash ilumina a sala em estouros brancos — as caixas restantes, as peças metálicas, o colchão, as marcas de contagem na parede, as trilhas de arrasto no chão. Cada clique da câmera soa como um grito no silêncio subterrâneo.',
          'Pietra recolhe uma das peças metálicas de dentro de uma caixa aberta. É uma maçaneta de porta automotiva, ainda com a etiqueta de um fabricante que ela não reconhece. Outra caixa tem retrovisores embalados em plástico. São peças de carro. Dezenas delas.',
          '>— Isso é um depósito de peças roubadas — Pietra olha para Júlia com uma compreensão que gela o sangue. — Alguém estava usando a escola como esconderijo. A ala interditada, que ninguém visita. E os professores que descobriram...',
          'Ela não termina a frase. Não precisa. As marcas no colchão, a corda, as embalagens de comida. Marcelo. Carla. Helena. Não sumiram — foram presos aqui por quem queria proteger o esquema. E quem quer que fosse, precisava de acesso por dentro da escola para operar.',
          'As fotos de Júlia são borradas pela pressa e pela luz ruim, mas é o que têm. Pietra guarda a peça no bolso e se vira para a porta de aço no fundo. É hora de ver o que está do outro lado.'
        ],
        choices: [
          {
            label: 'Abrir a porta dos fundos',
            action: () => go('trap_final_room')
          }
        ]
      });
    },

    trap_final_room() {
      renderScene({
        route: 'trap_final_room',
        chapter: 'Capítulo 5',
        title: 'A Sala Vazia',
        location: 'Sala secreta',
        image: IMAGES.secret,
        paragraphs: [
          'Pietra empurra a porta de aço. Ela abre com um gemido longo de dobradiças enferrujadas. O feixe de luz do celular revela uma sala menor, mais claustrofóbica. Paredes de concreto bruto, sem janelas, sem ventilação além de um tubo fino no teto.',
          'A sala está vazia. Completamente vazia. Mas esteve ocupada até poucos minutos atrás — a poeira no chão mostra marcas frescas de sapatos, os contornos de objetos que foram removidos, um retângulo limpo onde um colchão estava. No ar paira um resíduo de perfume feminino misturado ao cheiro de concreto úmido. Helena esteve aqui.',
          'No centro do chão, jogado como se tivesse caído durante a pressa, há um lenço de seda lilás. Pietra o reconhece imediatamente — Helena usava esse lenço todos os dias, amarrado no pescoço. Ela o pega e o aperta nas mãos, sentindo o tecido macio entre os dedos trementes.',
          'Debaixo do lenço, um pedaço de papel rasgado. Letras maiúsculas, escritas com pressa e raiva em caneta preta: "PAREM DE PROCURAR."',
          '>— Chegamos tarde — a voz de Júlia quebra. Lágrimas escorrem pelo rosto dela enquanto ilumina cada canto da sala vazia, procurando algo, qualquer coisa. — Eles tiraram ela daqui. Eram pelo menos dois — as pegadas, as vozes que ouvimos. Quando fomos confrontá-los no portão, demos tempo para voltarem e limpar tudo.',
          'Pietra fica em silêncio por um longo momento, segurando o lenço de Helena. Depois, devagar, se senta no chão frio de concreto. A sirene distante de uma viatura policial começa a se aproximar. Augusto deve ter conseguido convencer a polícia. Mas quando os policiais descerem esses degraus, o que vão encontrar? Um depósito quase vazio, fotos borradas, e um bilhete de ameaça. Sem Helena. Sem Marcelo. Sem Carla. Sem provas suficientes para prender quem fez isso.'
        ],
        choices: [
          {
            label: 'Esperar a polícia chegar',
            action: () => go('ending_bad')
          }
        ]
      });
    },

    // ===============================================================
    //  ROTA B — CONFRONTO COM A DIRETORA (caminho do final incompleto)
    // ===============================================================

    route_blunt_director() {
      state.bluntConfrontation = true;
      addClue('olivia_key_log');
      renderScene({
        route: 'route_blunt_director',
        chapter: 'Capítulo 1',
        title: 'Tempestade na Diretoria',
        location: 'Sala da diretora Olívia',
        image: IMAGES.director,
        paragraphs: [
          'Pietra marcha pelo corredor com Júlia tentando acompanhar o passo. A raiva ferve no peito. Primeiro Marcelo, depois Carla, agora Helena — e a diretora fica sentada na sala dela como se nada estivesse acontecendo? Chega. Alguém nesta escola precisa dar explicações.',
          'A porta da diretoria está fechada. Pietra bate duas vezes, forte, e entra sem esperar resposta. Olívia está ao telefone, com a expressão tensa de quem discute algo sério. Ao ver as alunas invadindo sua sala, seus olhos se arregalam de surpresa e depois se estreitam de irritação. Ela desliga o telefone com pressa — Pietra percebe que ela esconde um envelope pardo debaixo de uma pasta antes de se levantar.',
          '>— O que significa isso? — Olívia se levanta, apoiando ambas as mãos na mesa. — Vocês não podem entrar assim na minha sala. Voltem para a aula imediatamente.',
          '>— A Helena sumiu — diz Pietra, sem recuar um centímetro. — Assim como o Marcelo e a Carla. Três professores desapareceram desta escola e a senhora fica aí sentada fingindo que é "afastamento médico". O que está acontecendo? O que a senhora está escondendo?',
          'O rosto de Olívia se contorce entre indignação e algo que Pietra não consegue identificar — medo? culpa? frustração? A diretora contorna a mesa e fecha a porta da sala com um estalo seco. Quando se vira para as alunas, sua voz é controlada mas cortante.',
          '>— Vocês não fazem ideia do que estão falando. Eu estou fazendo o que posso, dentro das minhas limitações. A polícia já foi notificada, os pais foram informados segundo o protocolo. Agora, se não quiserem uma suspensão, voltem para suas salas e deixem os adultos resolverem isso.',
          'Enquanto Olívia gesticula, Júlia percebe algo na mesa da diretora: um caderno de registros aberto na página da biblioteca, com anotações de quem retirou a chave nos últimos meses. Num relance, ela vê que o nome "Mário" aparece várias vezes nas colunas de sexta-feira à noite. E ao lado do caderno, uma chave antiga com uma etiqueta que diz "Biblioteca — Acervo Reservado". Júlia memoriza o que consegue antes que Olívia perceba o olhar. A diretora pega o telefone interno e digita um ramal: "Mário? Venha à minha sala. Agora."'
        ],
        choices: [
          {
            label: 'Sair antes que o inspetor Mário chegue e investigar por conta própria',
            action: () => go('blunt_hub')
          }
        ]
      });
    },

    blunt_hub() {
      // Confronto com Mário acontece automaticamente na primeira vez
      if (!state.events.has('mario_confronted') && state.clues.size >= 2) {
        return go('blunt_mario_confrontation');
      }

      const choices = [];

      if (!state.visited.has('Biblioteca')) {
        choices.push({
          label: 'Ir à biblioteca antes que alguém feche',
          action: () => go('blunt_library')
        });
      }
      if (!state.visited.has('Laboratório de Ciências')) {
        choices.push({
          label: 'Verificar o laboratório de Ciências',
          action: () => go('blunt_lab')
        });
      }
      if (!state.visited.has('Jardins da escola')) {
        choices.push({
          label: 'Procurar o Sr. Augusto nos jardins',
          action: () => go('blunt_augusto')
        });
      }

      if (canOpenPassage()) {
        choices.unshift({
          label: 'Ir à Estante 6 e abrir a passagem agora',
          action: () => go('blunt_passage')
        });
      }

      if (choices.length === 0) {
        choices.push({
          label: 'Tentar abrir a Estante 6 com o que têm',
          action: () => go('blunt_passage')
        });
      }

      renderScene({
        route: 'blunt_hub',
        chapter: 'Capítulo 2',
        title: 'Sob Vigilância',
        location: 'Corredores',
        image: IMAGES.corridor,
        paragraphs: [
          'Pietra e Júlia se esgueiram pelos corredores tentando parecer naturais, mas é difícil quando se sabe que a inspetoria está de olho. O inspetor Mário, um homem de ombros largos com uniforme escuro e expressão de granito, já passou por elas duas vezes na última hora, cada vez mais devagar, cada vez olhando por mais tempo.',
          'O confronto com Olívia foi um erro tático — agora a administração sabe que elas estão bisbilhotando, e Mário foi designado pessoalmente para vigiá-las. Cada movimento precisa ser calculado. Não vão ter o luxo de examinar as coisas com calma.',
          '>— Precisamos ser rápidas — sussurra Júlia, encostada na parede ao lado do bebedouro, fingindo beber água. — Entrar, pegar o que precisamos e sair antes que o Mário perceba. Sem chamar atenção.',
          'Pietra assente. Algo no comportamento de Mário a incomoda. Um inspetor seguindo ordens da diretora vigiaria as alunas, sim — mas não com aquela intensidade, não com aquele olhar de quem tem algo pessoal em jogo. Ele não está apenas cumprindo ordens. Ele parece estar protegendo algo.'
        ],
        choices
      });
    },

    blunt_mario_confrontation() {
      state.events.add('mario_confronted');
      addClue('mario_suspicious_call');
      renderScene({
        route: 'blunt_mario_confrontation',
        chapter: 'Capítulo 2',
        title: 'O Inspetor que Sabe Demais',
        location: 'Corredores',
        image: IMAGES.corridor,
        paragraphs: [
          'As alunas dobram o corredor do segundo andar e quase trombam com o inspetor Mário. Ele está parado no meio do caminho, braços cruzados, bloqueando a passagem com a presença física de um armário. Seu olhar é duro, os lábios comprimidos.',
          '>— A diretora mandou vocês voltarem para a sala — diz Mário, com uma voz que não admite discussão. Seu tom vai além de um inspetor cumprindo ordens. Há urgência ali, quase desespero. — Não têm nada para fazer nesses corredores. Voltem. Agora.',
          'Pietra sustenta o olhar dele sem piscar. Júlia, ao lado, sente a tensão no ar como eletricidade estática. Mário não é um homem velho ou frágil — é alto, forte, e está claramente nervoso. Os dedos da mão esquerda tamborilam na coxa, e ele olha para o corredor da ala antiga com uma frequência que não combina com quem deveria estar apenas vigiando alunas.',
          '>— A gente só está indo ao banheiro — mente Pietra com um sorriso simpático que não chega aos olhos. — Já vamos voltar.',
          'Mário hesita. Por um instante, algo cruza seu rosto — medo? — antes de pigarrear e se afastar dois passos, abrindo espaço para elas passarem. "Cinco minutos", rosna, e fica parado ali, observando.',
          'As alunas contornam o corredor e se escondem no banheiro feminino. Pietra cola o ouvido na porta. Passos. Mário se afasta. E então, sua voz, abafada pela distância mas ainda audível: ele está no celular. Pietra ouve fragmentos entre o eco do corredor: "...elas estão fuçando..." e depois, mais baixo, quase um sussurro: "...a entrega de hoje... precisa trancar a ala antes das seis..." O som dos passos se afasta até sumir.',
          'Pietra olha para Júlia com os olhos arregalados. Júlia entendeu. Mário não é apenas um inspetor seguindo ordens. Ele está envolvido.'
        ],
        choices: [
          {
            label: 'Voltar aos corredores com cuidado redobrado',
            action: () => go('blunt_hub')
          }
        ]
      });
    },

    blunt_library() {
      addClue('shelf6_photo');
      renderScene({
        route: 'blunt_library',
        chapter: 'Capítulo 2',
        title: 'Busca Apressada',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'Júlia finge ir ao banheiro e desvia pela escada lateral até a biblioteca. A bibliotecária está ocupada carimbando devoluções no balcão e mal ergue os olhos quando Júlia entra e se dirige à seção de história nos fundos.',
          'Na Estante 6, Júlia age rápido. Seus dedos percorrem as lombadas dos livros, puxando e empurrando. Atrás de um volume grosso de "História do Brasil Colonial", encontra o que procura: uma fotografia antiga, em preto e branco, que mostra a planta baixa da escola com a passagem entre a biblioteca e a ala oeste claramente marcada.',
          'A foto é de 1965, da inauguração do prédio. No verso, alguém escreveu a lápis: "Saída de emergência — acesso pela Estante 6, alavanca lateral esquerda, altura da 3ª prateleira." Júlia guarda a foto dentro do fichário e examina a lateral da estante. Há marcas no chão — arranhões em arco — que confirmam que a estante foi movida recentemente.',
          'Mas não há tempo para investigar mais. Passos pesados se aproximam pelo corredor — Mário. Júlia reconhece o ritmo das botas dele. Ela pega um livro aleatório da prateleira, abre numa página qualquer e finge ler com concentração. Mário aparece na porta da biblioteca, varre o ambiente com os olhos, e fixa o olhar nela por três longos segundos antes de continuar andando. Júlia espera meio minuto com o coração na boca antes de fechar o livro e sair.',
          'Do lado de fora, ela se encosta na parede e respira fundo. Tem a foto. Agora precisa da chave e da planta. E cada minuto que passa é um minuto a mais para quem está limpando as provas na ala antiga.'
        ],
        choices: [
          { label: 'Voltar aos corredores e planejar o próximo passo', className: 'secondary', action: () => go('blunt_hub') }
        ]
      });
    },

    blunt_lab() {
      addClue('lab_old_key');
      addClue('carla_auto_part');
      renderScene({
        route: 'blunt_lab',
        chapter: 'Capítulo 2',
        title: 'O Armário de Carla',
        location: 'Laboratório de Ciências',
        image: IMAGES.lab,
        paragraphs: [
          'Pietra espera Mário virar o corredor e então corre para o laboratório. A porta está destrancada — a professora substituta que usa a sala às quartas não veio hoje. Dentro, o laboratório está silencioso e meio escuro, com as persianas abaixadas.',
          'Pietra vai direto ao armário de suprimentos no fundo da sala, aquele que era de Carla. Abre a porta metálica com um puxão e vasculha as prateleiras. Atrás de uma caixa de béqueres, seus dedos tocam algo frio e pesado: uma chave de latão antigo, grossa, com uma etiqueta de papel amarelada que diz "Ala Oeste — Manutenção."',
          'No mesmo armário, jogada no fundo como se alguém a tivesse escondido às pressas, há uma peça metálica que Pietra reconhece como sendo automotiva — parece um componente de suspensão ou chassis de veículo pesado. Tem graxa nas roscas e um número de série parcialmente raspado.',
          '>— O que uma peça de carro estava fazendo no armário da professora de Ciências? — murmura Pietra para si mesma, guardando a chave e a peça nos bolsos da calça. A resposta óbvia é que Carla encontrou essa peça e guardou como prova. E por isso desapareceu.',
          'O som de uma porta batendo no corredor faz Pietra se sobressaltar. Ela fecha o armário com cuidado, confere que não deixou nada fora do lugar, e sai do laboratório andando com a postura mais casual que consegue fingir. O peso da chave e da peça metálica nos bolsos é reconfortante e assustador ao mesmo tempo.'
        ],
        choices: [
          { label: 'Voltar aos corredores', className: 'secondary', action: () => go('blunt_hub') }
        ]
      });
    },

    blunt_augusto() {
      addClue('augusto_blueprint');
      renderScene({
        route: 'blunt_augusto',
        chapter: 'Capítulo 2',
        title: 'O Mapa do Velho Zelador',
        location: 'Jardins da escola',
        image: IMAGES.outside,
        paragraphs: [
          'Pietra encontra Augusto nos jardins, podando um arbusto com tesouras enferrujadas. O velho zelador percebe imediatamente que algo está errado pela expressão no rosto da aluna. Ele larga a tesoura e se aproxima, limpando as mãos no macacão.',
          '>— Você está com cara de quem mexeu em vespeiro, menina — diz Augusto, baixo. — Ouvi o pessoal da inspetoria comentando que duas alunas invadiram a sala da Olívia. Foram vocês?',
          'Pietra confirma com um aceno tenso e explica rapidamente o que descobriram: os professores desaparecidos, a Estante 6, a peça automotiva no armário de Carla. Augusto escuta sem interromper, mas sua expressão muda de preocupada para sombria.',
          '>— Eu sabia que algo estava errado — ele diz finalmente, puxando do bolso uma planta arquitetônica antiga, dobrada em tantas vezes que o papel quase se desfaz. — Essa é a planta original da passagem secreta. Construída nos anos 60. Eu guardo ela desde que fui zelador-chefe. A alavanca fica na lateral esquerda da Estante 6, terceira prateleira. Mas cuidado, menina. Cuidado de verdade.',
          'Pietra pega a planta e agradece. Augusto a segura pelo ombro antes que ela saia correndo. Seus olhos estão sérios, quase assustados. "Eu faço rondas à noite perto da ala antiga. Já vi coisas. Vi o inspetor Mário abrindo a porta de serviço para alguém de fora, mais de uma vez. E vi a Olívia recebendo envelopes de um homem que eu não reconheci no estacionamento. Tem muita gente envolvida nisso, menina. Não façam nada sem pensar." Pietra promete que sim e volta correndo para dentro. Mas ambas sabem que pensar é um luxo que o tempo não permite mais.'
        ],
        choices: [
          { label: 'Voltar aos corredores', className: 'secondary', action: () => go('blunt_hub') }
        ]
      });
    },

    blunt_passage() {
      renderScene({
        route: 'blunt_passage',
        chapter: 'Capítulo 3',
        title: 'A Corrida Contra o Relógio',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'Pietra e Júlia se encontram na entrada da biblioteca ofegantes. Mário está no andar de cima, o que lhes dá uma janela de minutos. Com a foto, a chave e a planta em mãos, elas vão direto para a Estante 6.',
          'Pietra encontra a alavanca exatamente onde Augusto descreveu: lateral esquerda, terceira prateleira, disfarçada como um suporte de livro. Ela puxa. O clique metálico ressoa pela biblioteca vazia. A estante estremece e desliza para o lado, revelando a passagem escura.',
          'O ar que escapa da abertura é frio e tem cheiro de mofo e óleo de motor. A escuridão é total depois de dois metros. Júlia ilumina com o celular — degraus de concreto descendo em espiral. Pegadas frescas na poeira. O coração de ambas bate forte demais.',
          '>— Sem tempo para fotos detalhadas — diz Pietra, já descendo. — O Mário vai perceber que sumimos e pode trancar a biblioteca. Precisamos ir agora.',
          'As duas descem às pressas, tropeçando nos degraus irregulares. A pressa que as move é a mesma pressa que as impede de fazer o que deveriam: documentar cada prova, cada marca, cada pista. Elas sabem disso. Mas Helena pode estar ali embaixo, e cada segundo conta.'
        ],
        choices: [
          {
            label: 'Entrar na sala e resgatar quem estiver lá',
            action: () => go('ending_good_incomplete')
          }
        ]
      });
    },

    // ===============================================================
    //  ROTA A — INVESTIGAÇÃO DISCRETA (caminho do final 100%)
    // ===============================================================

    route_start_desk() {
      addClue('helena_note');
      renderScene({
        route: 'route_start_desk',
        chapter: 'Capítulo 1',
        title: 'Análise Silenciosa',
        location: 'Sala de aula',
        image: IMAGES.classroom,
        paragraphs: [
          'Enquanto o burburinho sobre o sumiço de Helena cresce na sala, Pietra faz um sinal discreto para Júlia e as duas se movem naturalmente em direção à mesa da professora, fingindo recolher cadernos. Os outros alunos estão ocupados demais conversando entre si para notar.',
          'Com movimentos calculados, Pietra examina a pilha de papéis sobre a mesa. Entre provas corrigidas e folhas de exercício, ela encontra o livro de Português aberto — e ali, dobrado entre as páginas do capítulo de advérbios, está o papel que Helena guardou durante a aula. Pietra o desliza para dentro do fichário com a naturalidade de quem recolhe material escolar.',
          'No banheiro feminino três minutos depois, as duas abrem o papel sob a luz branca do teto. É uma anotação na letra caprichada de Helena: uma lista de nomes, datas e observações. "Marcelo — desapareceu 13/março, último avistamento 17h corredor leste, armário violado." "Carla — desapareceu 3/abril, peça estranha encontrada no laboratório, medo." E no final, sublinhado duas vezes em caneta vermelha: "18h — Biblioteca, Estante 6. Verificar pessoalmente. Não confiar em ninguém."',
          '>— Helena estava investigando os desaparecimentos — sussurra Júlia, os olhos arregalados. — Ela tinha marcado uma verificação na Estante 6 da biblioteca. E escreveu "não confiar em ninguém." Pietra, ela sabia que corria perigo.',
          'Pietra dobra o papel com cuidado e o guarda num bolso com zíper. As engrenagens na cabeça dela giram rápido. Helena foi silenciada antes de completar sua investigação. Mas ela deixou um mapa: a Estante 6 na biblioteca. "Não confiar em ninguém" — isso significa que Helena suspeitava de alguém dentro da escola. Um professor? Um funcionário? A própria diretora? Se agirem com inteligência — sem chamar atenção, sem alertar ninguém — podem terminar o que Helena começou.',
          '>— Biblioteca — diz Pietra, lavando as mãos para disfarçar caso alguém entre. — Vamos seguir o rastro da Helena. Mas devagar, com cuidado. Ninguém pode saber o que estamos fazendo.'
        ],
        choices: [
          {
            label: 'Ir à biblioteca discretamente para investigar a Estante 6',
            action: () => go('perfect_library')
          }
        ]
      });
    },

    perfect_library() {
      addClue('shelf6_photo');
      renderScene({
        route: 'perfect_library',
        chapter: 'Capítulo 2',
        title: 'A Fotografia Escondida',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'Pietra e Júlia entram na biblioteca como se fossem estudar para a prova de história — mochilas nas costas, cadernos na mão, expressões neutras. A bibliotecária ergue os olhos, reconhece as alunas, e volta a organizar fichas sem suspeitar de nada. Perfeito.',
          'Elas se instalam na mesa mais próxima da Estante 6, no fundo da biblioteca, e abrem os cadernos como cortina de fumaça. Enquanto Júlia finge anotar algo, Pietra examina a estante com atenção clínica, prateleira por prateleira.',
          'Na segunda prateleira, entre dois volumes grossos de enciclopédia, Pietra percebe que um livro está ligeiramente mais recuado que os outros. Ela o puxa e, atrás dele, encontra uma fotografia em preto e branco, do tamanho de uma carta, protegida por um envelope plástico. A foto mostra a planta baixa da escola na inauguração de 1965, com a passagem secreta claramente marcada a caneta entre a biblioteca e a ala oeste.',
          'No verso da foto, alguém escreveu a lápis em letra miúda: "Saída de emergência — acesso pela Estante 6, alavanca lateral esquerda, altura da 3ª prateleira. Mecanismo hidráulico." Pietra fotografa a foto com o celular e a guarda de volta no envelope.',
          '>— Olha o chão, Pietra — Júlia se agachou e aponta para a base da estante. Marcas semicirculares no piso de cerâmica, arranhões em arco que só poderiam ser feitos pela estante sendo girada. A poeira ao redor foi perturbada recentemente. — Alguém tem movido esta estante. E não é a bibliotecária.',
          'Pietra anota tudo no caderno disfarçado de anotações de aula. A foto, as marcas, a passagem. Para abrir a estante, precisam da alavanca — que segundo a foto, está na lateral. Mas também precisam entender por que alguém tem usado essa passagem. O bilhete de Helena mencionava Marcelo e Carla. E uma peça estranha no laboratório.'
        ],
        choices: (() => {
          const c = [
            {
              label: 'Ir ao laboratório investigar a peça que Helena mencionou',
              action: () => go('perfect_lab')
            },
            {
              label: 'Procurar o Sr. Augusto, o velho zelador que conhece a escola toda',
              action: () => go('perfect_augusto')
            }
          ];
          if (!has('mario_suspicious_call')) {
            c.push({
              label: 'Investigar um barulho suspeito vindo do corredor da ala interditada',
              action: () => go('perfect_mario_encounter')
            });
          }
          return c;
        })()
      });
    },

    perfect_mario_encounter() {
      addClue('mario_suspicious_call');
      renderScene({
        route: 'perfect_mario_encounter',
        chapter: 'Capítulo 2',
        title: 'A Ligação no Corredor',
        location: 'Corredores',
        image: IMAGES.corridor,
        paragraphs: [
          'Pietra e Júlia caminham pelo corredor do primeiro andar quando ouvem uma voz vinda da curva perto da ala interditada. Não é uma conversa casual entre funcionários — é uma voz tensa, abafada, de alguém falando ao celular e tentando não ser ouvido. As alunas se entreolham e, sem combinar, se encostam na parede, cada uma de um lado da quina.',
          'É o inspetor Mário. Ele está de costas, encostado na porta de aço da ala antiga, com o celular pressionado contra o ouvido. Sua postura é a de quem vigia os dois lados do corredor — mas não percebeu as alunas se aproximando por trás.',
          '>— ...a entrega de hoje tem que sair antes das seis — a voz de Mário ecoa baixa pelo corredor vazio. — Eu sei que ela passou mal na aula, mas não muda nada. As caixas precisam estar no furgão até o fim da tarde. Eu abro a porta dos fundos às cinco e meia, como sempre. A chave da biblioteca eu devolvo amanhã de manhã...',
          'Pietra sente o sangue gelar nas veias. Sem respirar, ela ergue o celular acima da quina da parede e grava um vídeo tremido de Mário falando ao telefone. A qualidade é péssima — ele está de costas e o áudio é abafado pela distância — mas é prova suficiente de que o inspetor de segurança da escola está envolvido em algo que envolve entregas, a ala antiga e a chave da biblioteca.',
          'Mário desliga o celular e se vira. Por um instante terrível, Pietra acha que ele a viu — mas seus olhos passam por cima da quina sem focar. Ele guarda o celular no bolso, ajusta o cinto do uniforme, e caminha na direção oposta com passos decididos. As alunas esperam trinta segundos eternos antes de soltar o ar.',
          '>— Ele abriu a porta para alguém — sussurra Júlia, com a voz tremendo. — Ele tem a chave da biblioteca. Pietra, o inspetor de segurança da escola está ajudando quem está fazendo isso. Helena escreveu "não confiar em ninguém" por um motivo.'
        ],
        choices: (() => {
          const c = [];
          if (!has('lab_old_key')) {
            c.push({ label: 'Ir ao laboratório de Ciências investigar a peça', action: () => go('perfect_lab') });
          }
          if (!has('augusto_blueprint')) {
            c.push({ label: 'Procurar o Sr. Augusto nos jardins', action: () => go('perfect_augusto') });
          }
          if (!has('gate_camera_van')) {
            c.push({ label: 'Verificar as câmeras na portaria', action: () => go('perfect_gate') });
          }
          if (c.length === 0) {
            c.push({ label: 'Continuar a investigação', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_lab() {
      addClue('lab_old_key');
      addClue('carla_auto_part');
      renderScene({
        route: 'perfect_lab',
        chapter: 'Capítulo 2',
        title: 'O Segredo de Carla',
        location: 'Laboratório de Ciências',
        image: IMAGES.lab,
        paragraphs: [
          'O laboratório de Ciências está vazio neste horário — a professora substituta só tem aula às sextas. Pietra e Júlia entram com naturalidade, como se fossem buscar material para um trabalho. A sala cheira a desinfetante e produtos químicos velhos, e as bancadas de mármore refletem a luz fraca que entra pelas persianas semiabaixadas.',
          'Helena mencionou no bilhete que Carla havia encontrado uma "peça estranha" no laboratório. Se Carla era organizada como Pietra lembra, teria guardado a peça como prova. O armário de suprimentos no fundo era o território dela. Pietra abre a porta metálica devagar, evitando o rangido.',
          'Atrás de uma caixa de béqueres na segunda prateleira, seus dedos tocam algo inesperado: uma chave de latão grosso, antiga, diferente de qualquer chave moderna. A etiqueta de papel amarelada, quase ilegível, diz "Ala Oeste — Serviço". E no fundo do mesmo compartimento, embrulhada num papel de seda, uma peça metálica pesada — um componente mecânico com graxa nas roscas e um número de série parcialmente raspado.',
          '>— Carla guardou isso aqui de propósito — diz Júlia, examinando a peça sob a luz da janela. Ela vira o componente e seus olhos se arregalam. — Pietra, isso é uma peça de suspensão de veículo comercial. Furgão ou caminhonete de carga. Eu sei porque meu tio tem uma oficina. Isso não veio de um carro de passeio.',
          'Pietra sente as conexões se formando na mente como fios sendo puxados. A funcionária da limpeza disse que Helena foi levada num veículo que parecia uma ambulância ou um furgão. Carla encontrou uma peça de furgão dentro da escola. A estante da biblioteca tem marcas de uso recente. Alguém está transportando coisas para dentro da ala interditada. Peças de veículos.',
          'Pietra fotografa a peça e a chave antes de guardá-las com cuidado. Se essa chave abre algo na ala antiga, pode ser a mesma fechadura que tranca os segredos que Helena queria expor. Elas precisam de mais informações antes de agir.'
        ],
        choices: (() => {
          const c = [];
          if (!has('gate_camera_van')) {
            c.push({ label: 'Ir à portaria analisar as gravações das câmeras', action: () => go('perfect_gate') });
          }
          if (!has('augusto_blueprint')) {
            c.push({ label: 'Procurar o Sr. Augusto para obter a planta da passagem', action: () => go('perfect_augusto') });
          }
          if (!has('mario_suspicious_call')) {
            c.push({ label: 'Investigar um barulho no corredor da ala interditada', action: () => go('perfect_mario_encounter') });
          }
          if (c.length === 0) {
            c.push({ label: 'Continuar a investigação', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_gate() {
      addClue('gate_camera_van');
      addClue('fake_ambulance_note');
      renderScene({
        route: 'perfect_gate',
        chapter: 'Capítulo 3',
        title: 'As Imagens que Não Mentem',
        location: 'Portaria',
        image: IMAGES.gate,
        paragraphs: [
          'A portaria da escola é um cubículo de vidro no portão principal, onde o Sr. Dimas passa os dias alternando entre ler jornal e conferir crachás. Pietra se aproxima com um sorriso simpático e uma história convincente: "Estamos fazendo um trabalho sobre segurança escolar para a feira de ciências. Podemos ver como funcionam as câmeras?"',
          'Dimas, lisonjeado por alguém se interessar pelo seu trabalho, gira o monitor para as alunas e começa a explicar o sistema com orgulho. São quatro câmeras: portão principal, portão lateral, estacionamento de funcionários e corredor da entrada. A gravação fica salva por 30 dias.',
          'Júlia pede para ver as gravações do portão lateral das últimas semanas. Dimas navega pelo sistema com familiaridade. E ali, nos vídeos granulados mas legíveis, aparece um padrão: um furgão branco sem logotipo aparece repetidamente — sextas-feiras à noite, sábados de manhã cedo, duas quartas-feiras. Sempre o mesmo veículo, sempre estacionando no mesmo ponto junto ao muro lateral. E sempre o mesmo homem saindo da cabine, abrindo a traseira, e descarregando caixas pesadas que leva para dentro da escola.',
          '>— Esse aí é o Enrique — diz Dimas, apontando para a tela com naturalidade. — Ex-marido da professora Helena. Ele aparece de vez em quando, acho que traz coisas pra ela. — Dimas coça a cabeça. — Mas confesso que achava estranho ele vir nuns horários malucos. E outra coisa: toda vez que ele aparecia, o Mário, o inspetor da tarde, estava de plantão. Mesmo nos dias que não era escala dele. Achei coincidência na época, mas agora que você pergunta...',
          'Pietra fotografa a tela do monitor disfarçadamente enquanto Júlia distrai Dimas. Depois, ela pergunta sobre o registro de hoje. Dimas folheia o caderno de ocorrências e mostra: "Hoje às 14h20, veículo de emergência estacionou no portão lateral para socorro médico da professora Helena. Bilhete deixado pelo condutor." Ele mostra o bilhete — escrito à mão, sem timbre de hospital, sem identificação. Uma farsa.',
          'As peças se encaixam: Enrique usava o furgão para descarregar mercadoria, Mário garantia o acesso nos horários certos, e o bilhete falso serviu para justificar a presença do veículo hoje. Mas quem está por trás? Enrique, Mário, ou alguém acima deles?'
        ],
        choices: (() => {
          const c = [];
          if (!has('enrique_contradiction')) {
            c.push({ label: 'Investigar mais sobre Enrique', action: () => go('perfect_enrique') });
          }
          if (!has('augusto_blueprint')) {
            c.push({ label: 'Procurar o Sr. Augusto para obter a planta da passagem', action: () => go('perfect_augusto') });
          }
          if (!has('olivia_donation_receipt')) {
            c.push({ label: 'Investigar a secretaria — verificar os registros financeiros da escola', action: () => go('perfect_secretaria') });
          }
          if (c.length === 0) {
            c.push({ label: 'Ir à Estante 6 com todas as provas reunidas', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_secretaria() {
      addClue('olivia_donation_receipt');
      renderScene({
        route: 'perfect_secretaria',
        chapter: 'Capítulo 3',
        title: 'O Dinheiro que Compra Silêncio',
        location: 'Secretaria',
        image: IMAGES.archive,
        paragraphs: [
          'A secretaria administrativa fica no térreo, atrás da recepção. A porta está entreaberta e dona Fátima, a secretária, está no corredor conversando com uma mãe de aluno sobre transferência de matrícula. Pietra aproveita a janela e entra na sala com passos de gato, enquanto Júlia fica na porta vigiando.',
          'A sala é um labirinto de arquivos, pastas e gavetas metálicas. Pietra não sabe exatamente o que procura — mas depois de ouvir Mário no telefone e ver o envelope que Olívia escondeu, sabe que há algo financeiro errado nesta escola. Ela abre a gaveta de "Correspondências" e folheia com rapidez.',
          'Na terceira pasta, entre recibos de manutenção e notas de material de limpeza, ela encontra: três comprovantes de depósito bancário de uma empresa chamada "Auto Express Ltda", todos feitos no fundo discricionário da diretoria. Os valores são altos e redondos — R$ 5.000, R$ 8.000, R$ 5.000 — e as datas coincidem com os meses em que os professores desapareceram.',
          '>— "Auto Express" — Pietra murmura o nome, sentindo o estômago se contrair. Uma empresa de autopeças fazendo doações para uma escola? Os mesmos meses em que peças automotivas estavam sendo armazenadas na ala antiga? Isso não é doação. É pagamento. Alguém estava comprando o silêncio da diretoria.',
          'Pietra fotografa os três comprovantes e fecha a gaveta exatamente como encontrou. Fátima ainda está no corredor. Júlia faz um sinal de que está tudo limpo e as duas se afastam.',
          'No corredor, Pietra compartilha as fotos com Júlia. A pergunta agora é: Olívia sabia o que estava acontecendo e aceitou dinheiro para fechar os olhos? Ou ela está envolvida diretamente nos desaparecimentos? As provas financeiras não respondem isso — mas mostram que a diretora tem motivos para querer que ninguém investigue a ala antiga.'
        ],
        choices: (() => {
          const c = [];
          if (!has('enrique_contradiction')) {
            c.push({ label: 'Investigar as contradições de Enrique', action: () => go('perfect_enrique') });
          }
          if (!has('augusto_blueprint')) {
            c.push({ label: 'Procurar o Sr. Augusto', action: () => go('perfect_augusto') });
          }
          if (!has('olivia_key_log')) {
            c.push({ label: 'Verificar os registros de chave na diretoria', action: () => go('perfect_director') });
          }
          if (canOpenPassage() && allEvidenceComplete()) {
            c.push({ label: 'Ir à Estante 6 com as provas completas', action: () => go('perfect_open_passage') });
          }
          if (c.length === 0) {
            c.push({ label: 'Continuar a investigação', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_augusto() {
      addClue('augusto_blueprint');
      renderScene({
        route: 'perfect_augusto',
        chapter: 'Capítulo 3',
        title: 'A Memória das Paredes',
        location: 'Jardins da escola',
        image: IMAGES.outside,
        paragraphs: [
          'O Sr. Augusto está no canto dos jardins, sentado no banco de cimento que é seu posto de observação há trinta anos. Quando Pietra e Júlia se sentam ao lado dele e começam a falar sobre a passagem secreta, o velho zelador não parece surpreso. Na verdade, ele parece aliviado — e ao mesmo tempo, estranhamente culpado.',
          '>— Eu sabia que alguém ia perguntar algum dia — diz Augusto, tirando os óculos de leitura e limpando com a barra da camisa. Ele hesita antes de continuar, como quem mede as palavras. — Essa escola tem segredos que a maioria das pessoas esqueceu. Mas eu não. Eu ajudei a construir metade dessas paredes.',
          'Ele puxa do bolso interno do macacão uma planta arquitetônica que parece ter a mesma idade dele. O papel amarelado está dobrado em oito e as linhas de lápis são finas mas legíveis. Augusto a abre sobre o banco e aponta com o dedo grosso para a passagem marcada entre a biblioteca e a ala oeste.',
          '>— Foi construída como rota de emergência nos anos 60, quando o prédio era usado como centro comunitário — explica, traçando o caminho com o dedo. — A entrada é pela Estante 6 na biblioteca. Tem uma alavanca na lateral esquerda, na altura da terceira prateleira. Quando puxa, o mecanismo hidráulico desliza a estante para o lado e revela a passagem. Desce meio andar até a ala oeste.',
          'Pietra pergunta se ele sabe de alguma movimentação estranha na ala interditada. Augusto desvia o olhar por um momento antes de responder. "Nos últimos meses, eu ouço barulhos à noite quando faço a ronda. Coisas sendo arrastadas. Motor de carro no fundo. Eu vi o inspetor Mário abrindo a porta de serviço para um homem de furgão branco, mais de uma vez. Reportei à Olívia e ela me mandou ficar longe." Ele faz uma pausa longa. "Eu deveria ter insistido. Deveria ter ido à polícia. Mas tive medo de perder o emprego. Agora três professores sumiram e eu carrego isso na consciência."',
          'Pietra fotografa a planta e agradece. Augusto segura a mão dela antes de se levantar, os olhos sérios por trás dos óculos grossos. "Vocês têm coragem, meninas. Mas tenham também prudência. Documentem tudo. Fotografem tudo. Se o que eu suspeito é verdade, vocês vão precisar de provas que ninguém possa contestar."'
        ],
        choices: (() => {
          const c = [];
          if (!has('enrique_contradiction')) {
            c.push({ label: 'Investigar as contradições de Enrique', action: () => go('perfect_enrique') });
          }
          if (!has('olivia_key_log')) {
            c.push({ label: 'Verificar os registros na diretoria com discrição', action: () => go('perfect_director') });
          }
          if (!has('mario_suspicious_call')) {
            c.push({ label: 'Investigar o inspetor Mário nos corredores', action: () => go('perfect_mario_encounter') });
          }
          if (canOpenPassage() && allEvidenceComplete()) {
            c.push({ label: 'Ir à Estante 6 e abrir a passagem', action: () => go('perfect_open_passage') });
          }
          if (c.length === 0) {
            c.push({ label: 'Continuar a investigação', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_director() {
      addClue('olivia_key_log');
      renderScene({
        route: 'perfect_director',
        chapter: 'Capítulo 3',
        title: 'O Registro Revelador',
        location: 'Sala da diretora Olívia',
        image: IMAGES.director,
        paragraphs: [
          'Pietra e Júlia esperam o momento certo. Quando Olívia sai para uma reunião com a coordenação, Júlia entra na diretoria com a desculpa de deixar um requerimento de segunda chamada. A secretária da diretoria, dona Fátima, está ao telefone e mal percebe a presença da aluna.',
          'Na mesa de Olívia, entre pastas organizadas por cor e um porta-retratos da família, Júlia encontra o que procura: o caderno de registros de chaves da escola. É um caderno pautado onde cada retirada de chave é anotada à mão com data, hora, nome e destino.',
          'Júlia folheia as páginas rapidamente, os olhos varrendo as entradas. E ali, nas últimas semanas, um padrão emerge: a chave da biblioteca foi retirada fora do horário de funcionamento em quatro ocasiões. Às sextas-feiras à noite. O nome ao lado de cada entrada é o mesmo: "Mário R. — Inspeção noturna." Mas a biblioteca não precisa de inspeção noturna. Nunca precisou.',
          'Ela fotografa as páginas relevantes com o celular no modo silencioso e fecha o caderno exatamente na posição em que encontrou. Na mesma mesa, parcialmente escondido sob uma pasta, há um envelope pardo sem remetente. Júlia o abre com dedos trêmulos: dentro, um recibo de serviço de uma empresa chamada "Auto Express Ltda" e um bilhete manuscrito que diz apenas "Ref. mês de abril — tudo em ordem." Ela fotografa e recoloca tudo no lugar.',
          'No corredor, ela compartilha as fotos com Pietra. A conexão é clara: Mário usava a chave da biblioteca fora do horário para acessar a passagem da Estante 6. Olívia sabia — ou pelo menos tinha os registros diante dos olhos — e não fez nada. Estava recebendo dinheiro para não fazer nada.'
        ],
        choices: (() => {
          const c = [];
          if (!has('enrique_contradiction')) {
            c.push({ label: 'Confrontar as contradições de Enrique com sutileza', action: () => go('perfect_enrique') });
          }
          if (!has('olivia_donation_receipt')) {
            c.push({ label: 'Investigar os registros financeiros na secretaria', action: () => go('perfect_secretaria') });
          }
          if (canOpenPassage() && allEvidenceComplete()) {
            c.push({ label: 'Ir à Estante 6 e abrir a passagem com as provas completas', action: () => go('perfect_open_passage') });
          }
          if (c.length === 0) {
            c.push({ label: 'Continuar reunindo provas', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_enrique() {
      addClue('enrique_contradiction');
      renderScene({
        route: 'perfect_enrique',
        chapter: 'Capítulo 4',
        title: 'O Fio da Mentira',
        location: 'Portão lateral',
        image: IMAGES.gate,
        paragraphs: [
          'As gravações das câmeras mostram um homem chegando à escola em horários incompatíveis com visitas normais. A peça automotiva encontrada no laboratório liga o furgão ao depósito. O bilhete falso da ambulância não tem carimbo de hospital. Mas Pietra sabe que precisam de mais — precisam demonstrar que ele mentiu, que suas versões não se sustentam.',
          'Na saída da escola, Pietra avista o furgão branco estacionado a dois quarteirões, parcialmente escondido atrás de uma árvore. O homem das gravações está na cabine, falando ao celular. Ela o reconhece das imagens — mesma camisa, mesma postura. Ele voltou. Está vigiando a escola.',
          'Pietra se aproxima casualmente, como quem passa pela calçada. Quando está a poucos metros, finge tropeçar e se apoia no capô do furgão. O homem abaixa a janela, irritado.',
          '>— O senhor é o marido da professora Helena, não é? — pergunta Pietra com um sorriso inocente. — Ela está melhor? A gente ficou preocupado quando ela passou mal na aula.',
          'O homem congela por um instante. "Sim, está no hospital, não é nada grave." Pietra assente e pergunta em qual hospital, porque a turma quer mandar flores. Ele gagueja: "No... Santa Casa. Não, no Municipal. Quer dizer, ela já teve alta." Cada correção é uma mentira que se desfaz. Pietra memoriza cada palavra, cada contradição, cada desvio de olhar.',
          'Júlia, a poucos metros, filma discretamente pelo celular parcialmente escondido na bolsa. A placa do furgão, o rosto do homem, suas respostas contraditórias. Quando Pietra se despede com um "melhoras para a Helena" e se afasta, as duas têm o que precisavam: prova documentada de que ele mente sobre o paradeiro de Helena, sobre o hospital, sobre tudo. Mas é ele o responsável por tudo, ou apenas mais uma peça no esquema?'
        ],
        choices: (() => {
          const c = [];
          if (canOpenPassage() && allEvidenceComplete()) {
            c.push({ label: 'Ir à biblioteca e abrir a passagem secreta', action: () => go('perfect_open_passage') });
          } else {
            if (!has('augusto_blueprint')) {
              c.push({ label: 'Obter a planta com o Sr. Augusto', action: () => go('perfect_augusto') });
            }
            if (!has('shelf6_photo')) {
              c.push({ label: 'Investigar a biblioteca', action: () => go('perfect_library') });
            }
            if (!has('lab_old_key')) {
              c.push({ label: 'Buscar a chave no laboratório', action: () => go('perfect_lab') });
            }
            if (!has('mario_suspicious_call')) {
              c.push({ label: 'Investigar o inspetor Mário', action: () => go('perfect_mario_encounter') });
            }
          }
          if (c.length === 0) {
            c.push({ label: 'Ir à Estante 6', action: () => go('perfect_open_passage') });
          }
          return c;
        })()
      });
    },

    perfect_open_passage() {
      renderScene({
        route: 'perfect_open_passage',
        chapter: 'Capítulo Final',
        title: 'A Estante se Abre',
        location: 'Biblioteca',
        image: IMAGES.library,
        paragraphs: [
          'Pietra e Júlia esperam a biblioteca esvaziar. Às 17h40, a bibliotecária anuncia o fechamento e sai pela porta principal, trancando-a de fora. Mas as alunas estão escondidas atrás da estante de periódicos, respirando em silêncio. Quando os passos se afastam e o corredor fica em silêncio, elas se movem.',
          'Com a planta de Augusto aberta sobre a mesa, Pietra localiza a alavanca na lateral esquerda da Estante 6, exatamente onde o zelador descreveu. Seus dedos encontram o metal frio — um puxador disfarçado como suporte decorativo. Ela olha para Júlia, que confirma com um aceno. Pietra puxa.',
          'O mecanismo emite um clique profundo que reverbera dentro da parede. A estante inteira estremece, e com um sussurro hidráulico surpreendentemente suave para algo tão antigo, desliza para o lado sobre trilhos ocultos no piso. A passagem se abre: um retângulo de escuridão na parede, com degraus de concreto descendo em curva.',
          'O ar que escapa é frio e viciado, carregando cheiros de mofo, poeira antiga e algo industrial — óleo de motor, graxa, plástico. Júlia ilumina com o celular. Na poeira do primeiro degrau, há pegadas frescas em múltiplas direções. Este caminho tem sido muito usado.',
          'Antes de descer, Pietra fotografa a passagem aberta, os trilhos no chão, a alavanca. Júlia filma um panorama de 360 graus. Cada prova documentada é uma peça que não poderá ser contestada. Então, com o celular na mão e o coração na garganta, as duas amigas descem os degraus em direção à verdade que três professores pagaram caro para descobrir.'
        ],
        choices: [
          {
            label: 'Descer pela passagem documentando cada passo',
            action: () => go('perfect_deposit')
          }
        ]
      });
    },

    perfect_deposit() {
      renderScene({
        route: 'perfect_deposit',
        chapter: 'Capítulo Final',
        title: 'O Depósito Revelado',
        location: 'Ala interditada',
        image: IMAGES.restricted,
        paragraphs: [
          'Após doze degraus em espiral, a passagem desemboca numa sala ampla de teto baixo iluminada por gambiarras de fios elétricos improvisados com lâmpadas amarelas. O que Pietra e Júlia veem as faz parar em seco, boquiabertas.',
          'A sala inteira é um depósito de peças automotivas. Prateleiras metálicas industriais se estendem do chão ao teto, carregadas de caixas de papelão etiquetadas: "Retrovisores", "Alternadores", "Módulos de injeção", "Catalisadores". Dezenas de caixas, talvez centenas. No centro, um espaço aberto onde caixas maiores — motores, painéis inteiros — estão empilhadas sobre pallets de madeira. O cheiro de graxa e plástico novo é avassalador.',
          'Pietra começa a fotografar sistematicamente. Cada prateleira, cada etiqueta, cada número de série. Júlia filma em vídeo contínuo, narrando baixinho o que vê: datas nas caixas, marcas de fabricantes, notas fiscais jogadas dentro de uma caixa aberta. Os números não batem — peças com notas de origens diferentes, quantidades incompatíveis. É receptação. Um esquema organizado de armazenamento de peças roubadas.',
          'No fundo da sala, três portas. Uma está aberta e revela um corredor que leva à porta de serviço externa — por onde o furgão carregava e descarregava. A segunda tem um cadeado novo. A terceira está entreaberta, e de trás dela vem um som que faz o coração de Pietra disparar: uma voz feminina, abafada, chamando.',
          '>— Tem alguém aí? Por favor... — a voz é fraca mas reconhecível. Helena.'
        ],
        choices: [
          {
            label: 'Fotografar o depósito e depois abrir a porta',
            action: () => go('ending_100')
          }
        ]
      });
    },

    // ===============================================================
    //  FINAIS
    // ===============================================================

    ending_bad() {
      state.ended = true;
      Storage.clear();
      renderScene({
        route: 'ending_bad',
        chapter: 'Epílogo',
        title: 'O Caso que Esfriou',
        location: 'Escola Mundial',
        image: IMAGES.secret,
        paragraphs: [
          'A polícia chega vinte e oito minutos depois do chamado de Augusto. Dois policiais descem pela passagem com lanternas e encontram Pietra e Júlia sentadas no chão da sala vazia, o lenço de Helena nas mãos de Pietra, o bilhete de ameaça ensacado no fichário de Júlia.',
          'O depósito foi esvaziado. As caixas, as peças, os colchões, as garrafas — tudo removido com eficiência assustadora nos minutos em que as alunas estavam no portão e nos corredores. Duas pessoas trabalhando em coordenação — uma de dentro, uma de fora — conseguiram limpar semanas de evidências em menos de uma hora. Restam apenas marcas de arrasto na poeira, algumas peças soltas esquecidas nos cantos, e o cheiro persistente de óleo de motor.',
          'Nos dias seguintes, a investigação policial avança devagar. As fotos borradas de Júlia ajudam a confirmar que o espaço foi usado como depósito, mas sem flagrante, sem vítimas presentes e sem a carga, o caso se torna circunstancial. O homem do furgão desaparece — seu apartamento é encontrado vazio. O inspetor de segurança, Mário, pede demissão no dia seguinte e muda de cidade. Ninguém consegue provar a conexão.',
          'A escola fecha a ala antiga permanentemente, desta vez com concreto. Olívia dá uma coletiva de imprensa breve onde usa a palavra "incidente" sete vezes e "medidas preventivas" quatro. Os pais de Marcelo, Carla e Helena aparecem na televisão pedindo respostas que ninguém tem.',
          'Pietra guarda o lenço de Helena numa caixa no armário do quarto. Às vezes, à noite, ela olha para a caixa e pensa em tudo que poderia ter feito diferente. Se tivesse examinado a mesa primeiro. Se tivesse sido mais paciente. Se não tivesse corrido para o portão naquele primeiro impulso. Se tivesse prestado mais atenção ao inspetor que observava tudo em silêncio. As perguntas giram sem resposta, como as engrenagens de um relógio quebrado.',
          'O mistério da Escola Mundial permanece sem solução.'
        ],
        choices: [
          { label: 'Recomeçar a investigação', action: resetGame }
        ]
      });
    },

    ending_good_incomplete() {
      state.ended = true;
      Storage.clear();
      renderScene({
        route: 'ending_good_incomplete',
        chapter: 'Epílogo',
        title: 'Resgate Incompleto',
        location: 'Ala interditada',
        image: IMAGES.secret,
        paragraphs: [
          'No fundo da passagem, Pietra e Júlia encontram o depósito: prateleiras de peças automotivas, caixas empilhadas, o cheiro denso de graxa e poeira. E atrás da última porta, sentada num colchão fino com os pulsos machucados de corda, está Helena. Viva.',
          '>— Meninas... — Helena mal consegue falar, a voz rouca de desidratação e dias sem uso. Lágrimas escorrem pelo rosto sujo. — Vocês vieram. Eu achei que ninguém ia vir.',
          'Pietra e Júlia a ajudam a se levantar. Helena está fraca mas consciente, e começa a falar rápido: "Enrique. Meu ex-marido. Ele montou tudo. Mas não sozinho — alguém aqui dentro abria as portas para ele, emprestava as chaves, vigiava os corredores. Marcelo e Carla descobriram e ele os trancou numa sala dos fundos. Eu tentei investigar sozinha e ele me pegou também. Vocês precisam chamar a polícia agora."',
          'A polícia chega em quinze minutos. Marcelo e Carla são encontrados numa sala adjacente, debilitados mas vivos. Os três professores são levados ao hospital. Mas quando a perícia começa a documentar o depósito, percebe-se o problema: a pressa de Pietra e Júlia não permitiu uma documentação fotográfica adequada antes do resgate. E durante a confusão, o cúmplice interno — quem quer que fosse — teve tempo de fugir pela porta de serviço.',
          'Enrique é preso duas semanas depois numa blitz rodoviária, mas sem o volume completo de provas e sem a identificação do cúmplice, a acusação é mais fraca do que deveria. Ele responde por sequestro, mas a rede de receptação que usava a escola nunca é completamente desmantelada. O inspetor Mário pede transferência para outra cidade. Olívia se aposenta antecipadamente. As perguntas sobre quem ajudou de dentro nunca são totalmente respondidas.',
          'Pietra e Júlia são homenageadas pela escola e pelas famílias dos professores. Helena, recuperada, as abraça no dia em que volta a dar aula. Mas Pietra sabe, no fundo, que a verdade completa escapou por entre os dedos. Se tivessem tido mais tempo, mais calma, mais provas documentadas... o resultado poderia ter sido diferente.'
        ],
        choices: [
          { label: 'Recomeçar a investigação', action: resetGame }
        ]
      });
    },

    ending_100() {
      state.ended = true;
      Storage.clear();
      renderScene({
        route: 'ending_100',
        chapter: 'Epílogo',
        title: 'A Verdade Construída',
        location: 'Sala secreta',
        image: IMAGES.secret,
        paragraphs: [
          'Pietra termina de fotografar cada prateleira, cada caixa, cada nota fiscal espalhada pelo depósito. Júlia grava um vídeo panorâmico de sete minutos com narração detalhada. Então, juntas, elas abrem a porta de trás.',
          'Helena está sentada num colchão fino, os olhos fundos de quem não vê luz natural há dias. Quando reconhece as alunas, o rosto dela se desfaz em lágrimas silenciosas. Ao lado, numa sala adjacente acessada por uma porta interna, Marcelo e Carla estão sentados lado a lado, magros e pálidos, mas vivos. Os três professores foram mantidos ali — alimentados com o mínimo, presos com cordas, silenciados com ameaças.',
          '>— Vocês conseguiram — sussurra Helena, apertando as mãos de Pietra entre as dela, tremendo. — Eu tentei, mas ele me pegou antes. Vocês terminaram o que eu comecei.',
          'Pietra liga para o 190 do celular de Júlia e dá o endereço com voz firme. Enquanto esperam, Helena conta tudo: Enrique, seu ex-marido, montou o esquema de receptação de peças automotivas usando a ala interditada como depósito. Mas ele nunca teria conseguido sozinho. O inspetor Mário era o homem de dentro — abria as portas, emprestava as chaves, garantia que ninguém se aproximasse nos horários de entrega. E Olívia? "Ela não sabia dos sequestros", diz Helena com amargura, "mas sabia do depósito. Aceitou dinheiro de uma empresa fantasma para fechar os olhos. Quando Marcelo desapareceu, ela preferiu acreditar nas desculpas do Enrique a admitir que era cúmplice."',
          'A polícia chega em doze minutos. Desta vez, encontram tudo: o depósito intacto, os professores resgatados com vida, e um dossiê fotográfico meticuloso nos celulares das alunas — cada peça, cada nota fiscal, cada prova do esquema. Enrique é preso no mesmo dia, localizado pela placa do furgão que Pietra fotografou. Mário é detido na saída da escola tentando fugir com uma mochila cheia de documentos que pretendia destruir. Olívia é afastada do cargo e responde por encobrimento.',
          'Na semana seguinte, Helena volta à sala de aula. Antes de abrir o livro, ela olha para Pietra e Júlia sentadas na primeira fileira e sorri — um sorriso cansado mas genuíno. "Hoje vamos falar sobre narrativas de investigação", anuncia. "E eu conheço duas alunas que podem dar uma aula sobre o assunto." A turma inteira se vira para olhar as duas amigas, e pela primeira vez em semanas, os corredores da Escola Mundial voltam a ter o som que sempre deveriam ter tido: risadas.'
        ],
        choices: [
          { label: 'Jogar novamente e explorar outros caminhos', action: resetGame }
        ]
      });
    }
  };

  // --- Reset ---
  function resetGame() {
    Sound.playSfx('click');
    Storage.clear();
    state.clues.clear();
    state.visited.clear();
    state.events.clear();
    state.revealedSuspects.clear();
    state.alertedSuspect = false;
    state.bluntConfrontation = false;
    state.ended = false;
    state.route = 'prologue';
    updatePanels();
    go('prologue');
  }

  // --- Inicialização ---
  function init() {
    Sound.init(el.audio, el.audioBtn);

    el.start.addEventListener('click', () => {
      Sound.playSfx('click');
      Storage.clear();
      state.clues.clear();
      state.visited.clear();
      state.events.clear();
      state.revealedSuspects.clear();
      state.alertedSuspect = false;
      state.bluntConfrontation = false;
      state.ended = false;
      el.cover.classList.add('hidden');
      el.game.classList.remove('hidden');
      Sound.startBgm();
      go('prologue');
    });

    if (el.resume) {
      el.resume.addEventListener('click', () => {
        Sound.playSfx('click');
        if (Storage.load()) {
          el.cover.classList.add('hidden');
          el.game.classList.remove('hidden');
          Sound.startBgm();
          go(state.route || 'prologue');
        }
      });
    }

    el.audioBtn.addEventListener('click', () => Sound.toggleBgm());
    el.restart.addEventListener('click', resetGame);

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.playSfx('tab');
        document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetPanel = document.getElementById(`${btn.dataset.tab}Panel`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (el.game.classList.contains('hidden')) return;

      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        const btns = el.choices.querySelectorAll('.choice-btn');
        if (btns[idx] && !btns[idx].disabled) {
          btns[idx].click();
        }
      } else if (e.key.toLowerCase() === 'm') {
        Sound.toggleBgm();
      } else if (e.key.toLowerCase() === 'r') {
        if (confirm('Deseja reiniciar a investigação? Todo o progresso não salvo será perdido.')) {
          resetGame();
        }
      }
    });

    Storage.updateResumeButton();
    updatePanels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
