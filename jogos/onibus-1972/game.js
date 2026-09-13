/* =====================================================================
   ÔNIBUS 1972 — MOTOR NARRATIVO RECURSIVO HUMANO & DRAMÁTICO (2005)
   ===================================================================== */

// Base Data: Humanized Clues Definition
const CLUES = {
  depoimento_valdinete: {
    id: "depoimento_valdinete",
    title: "Testemunho de Valdinete",
    icon: "👁️",
    desc: "Valdinete desabafou com Beredito, revelando ter visto Janeto fotografando a rota do 1972 às 23h."
  },
  codigo_radio_louise: {
    id: "codigo_radio_louise",
    title: "Frequência Secreta de Louise",
    icon: "📻",
    desc: "Código de rádio de Louise. Ela confessou que buscava frequências do pai desaparecido em 1972."
  },
  video_restaurado_peter: {
    id: "video_restaurado_peter",
    title: "Vídeo Restaurado por Peter",
    icon: "📼",
    desc: "Peter venceu a insegurança e restaurou o vídeo mostrando a ação desesperada de Janeto."
  },
  caderno_rotas_janeto: {
    id: "caderno_rotas_janeto",
    title: "Caderno Confiado por Brinidite",
    icon: "🗺️",
    desc: "Brinidite superou a ansiedade e entregou o caderno de rotas que encontrou no corredor."
  },
  laudo_bagageiro_edilias: {
    id: "laudo_bagageiro_edilias",
    title: "Laudo de Confiança de Edilias",
    icon: "🔍",
    desc: "Edilias confiou em Beredito (apesar do medo de seu B.O. antigo) e entregou a perícia da trava."
  },
  mandado_seguranca: {
    id: "mandado_seguranca",
    title: "Mandado Humano de Beredito",
    icon: "⚖️",
    desc: "Mandado expedido por Beredito unindo justiça rigorosa e assistência social à família de Janeto."
  }
};

// Base Data: Endings Definition
const ENDINGS = {
  ending1: {
    id: "ending1",
    code: "FINAL 1",
    title: "Justiça Humana & Redenção (Vitória Perfeita)",
    badge: "⚖️",
    desc: "Vitória completa! Beredito deteve Janeto em flagrante, mas garantiu suporte médico para sua filha e ajudou Frederico a superar o luto. A viagem para a Serra da Lua foi um marco de superação!"
  },
  ending2: {
    id: "ending2",
    code: "FINAL 2",
    title: "Quebra de Confiança (Erro de Acusação)",
    badge: "❌",
    desc: "Acusar Edilias injustamente por causa de seu B.O. antigo destruiu sua confiança. Janeto fugiu e o relógio acionou o laço temporal!"
  },
  ending3: {
    id: "ending3",
    code: "FINAL 3",
    title: "Fuga Desesperada pela Serra",
    badge: "⛰️",
    desc: "Pressionado sem acolhimento, Janeto fugiu para a montanha por causa da filha. Beredito e Frederico iniciam uma perseguição na serra!"
  },
  ending4: {
    id: "ending4",
    code: "FINAL 4",
    title: "A Anomalia de 1972 (Final Secreto)",
    badge: "🌌",
    desc: "Frederico compreendeu que o experimento não trará seu irmão de volta, mas o perdão do passado encerrou o laço temporal!"
  },
  ending5: {
    id: "ending5",
    code: "FINAL 5",
    title: "Fuga do Espião",
    badge: "🚨",
    desc: "Janeto fugiu assustado na escuridão, mas deixou o caderno de rotas caindo no pátio da garagem."
  },
  ending6: {
    id: "ending6",
    code: "FINAL 6",
    title: "O Relógio 00:00 (Reinício Policial)",
    badge: "🌀",
    desc: "Ao ser encurralado, Janeto acionou a ignição do 1972, disparando o laço temporal de 2005. O tempo reseta preservando todas as memórias!"
  },
  ending7: {
    id: "ending7",
    code: "FINAL 7",
    title: "Confissão e Acordo sob Custódia",
    badge: "🌟",
    desc: "Com o acolhimento empático de Beredito, Janeto confessou em lágrimas suas motivações e concordou em colaborar sob custódia."
  }
};

// Base Data: Story Nodes (Matriz Não-Linear Humana)
const NODES = {
  node01: {
    id: "node01",
    chapter: "CENTRAL DE INVESTIGAÇÃO (2005)",
    title: "O Posto Policial de Beredito",
    time: "00:00 AM",
    location: "📍 Garagem Municipal - Mesa de Beredito",
    camera: "CAM 00 &bull; CENTRAL DE COMANDO",
    avatars: ["Policial Beredito", "Chico", "Tony"],
    text: `
      <p>Na madrugada de <strong>2005</strong>, o <strong>Policial Beredito</strong> instalou a central na guarita da garagem.</p>
      <p>O <strong>Ônibus 1972</strong> está pronto para a viagem de <strong>Bernadete</strong>, mas a tentativa de roubo da mochila do passageiro <strong>Frederico</strong> abalou a todos.</p>
      <p>Beredito sabe que há contradições e segredos entre os passageiros. Escolha qual setor da garagem investigar:</p>
    `,
    choices: [
      {
        text: "💼 Investigar a área do bagageiro com Edilias e escutar Frederico.",
        target: "node_trama1"
      },
      {
        text: "📼 Ir à Sala de Rádio e Câmeras CRT falar com o estudante Peter.",
        target: "node_trama2"
      },
      {
        text: "📻 Interrogar os passageiros no salão do ônibus (Janeto, Louise e Brinidite).",
        target: "node_trama3"
      },
      {
        text: "🌲 Conversar com a moradora Valdinete e examinar o perímetro da figueira.",
        target: "node_trama4"
      },
      {
        text: "⚖️ [EXPEDIR MANDADO HUMANO] Unir as provas e resolver o caso com justiça e compaixão!",
        target: "node_expedir_mandado",
        reqClue: "video_restaurado_peter"
      }
    ]
  },

  // FRENTE 1: BAGAGEIRO & MOCHILA DE FREDERICO / EDILIAS
  node_trama1: {
    id: "node_trama1",
    chapter: "INVESTIGAÇÃO NO BAGAGEIRO",
    title: "O Dossiê e a Trava do Bagageiro",
    time: "00:05 AM",
    location: "📍 Bagageiro do Ônibus 1972",
    camera: "CAM 04 &bull; BAGAGEIRO",
    avatars: ["Policial Beredito", "Frederico", "Edilias"],
    text: `
      <p>No bagageiro, <strong>Frederico</strong> abraça a mochila preta com lágrimas nos olhos:</p>
      <blockquote>"Seu Beredito... essa mochila tem relatórios do governo, mas para mim é a chance de reescrever o passado. Meu irmão morreu na Serra da Lua e eu sinto que a culpa foi minha todos esses anos..."</blockquote>
      <p>O mecânico <strong>Edilias</strong> recua tenso, suando frio:</p>
      <blockquote>"Seu Beredito, eu tenho um B.O. antigo de quando era jovem... Por favor, não me incrimine! Eu só estava lubrificando a trava para o Tony!"</blockquote>
    `,
    choices: [
      {
        text: "🤝 Garantir total proteção e imunidade a Edilias para obter o laudo pericial honesto.",
        target: "node_trama1_edilias_confianca",
        addClue: "laudo_bagageiro_edilias"
      },
      {
        text: "❤️ Acolher o sofrimento de Frederico e demonstrar compreensão sobre a perda de seu irmão.",
        target: "node_trama1_frederico_luto"
      },
      {
        text: "⬅️ Voltar ao Posto Principal de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama1_edilias_confianca: {
    id: "node_trama1_edilias_confianca",
    chapter: "PERÍCIA DO BAGAGEIRO",
    title: "A Confiança Restabelecida de Edilias",
    time: "00:08 AM",
    location: "📍 Bagageiro do 1972",
    camera: "CAM 04 &bull; PERÍCIA",
    avatars: ["Policial Beredito", "Edilias"],
    text: `
      <p>Aliviado com o respeito de Beredito, Edilias usou sua lupa profissional e emitiu a perícia:</p>
      <blockquote>"Obrigado por me ouvir, Beredito. A trava não foi violada por alguém da equipe. O corte foi cirúrgico, feito por uma lâmina externa militar!"</blockquote>
    `,
    choices: [
      {
        text: "⬅️ Voltar ao Posto Principal com o laudo de confiança de Edilias!",
        target: "node01"
      }
    ]
  },

  node_trama1_frederico_luto: {
    id: "node_trama1_frederico_luto",
    chapter: "ACOLHIMENTO E CONFIANÇA",
    title: "O Desabafo de Frederico",
    time: "00:09 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM 05 &bull; ACOLHIMENTO",
    avatars: ["Policial Beredito", "Frederico"],
    text: `
      <p>Beredito colocou a mão no ombro de Frederico:</p>
      <blockquote>"Frederico, a culpa daquele acidente não foi sua. Proteger esta mochila com responsabilidade é a melhor forma de honrar a memória do seu irmão."</blockquote>
      <p>Frederico suspirou emocionado e concordou em entregar os trechos do dossiê para a perícia de Beredito.</p>
    `,
    choices: [
      {
        text: "⬅️ Voltar ao Posto Principal.",
        target: "node01"
      }
    ]
  },

  // FRENTE 2: SALA CRT & GRAVAÇÃO DE PETER
  node_trama2: {
    id: "node_trama2",
    chapter: "SALA DE MONITORAMENTO CRT",
    title: "O Dilema do Aluno Peter",
    time: "00:07 AM",
    location: "📍 Sala de Monitoramento CRT",
    camera: "CAM 01 &bull; TERMINAL",
    avatars: ["Policial Beredito", "Peter"],
    text: `
      <p>Na sala de rádio, o jovem <strong>Peter</strong> encarava a tela trêmula do monitor CRT:</p>
      <blockquote>"Seu Beredito... o vídeo das 23:55 foi tomado por ruído de rádio. Tenho pavor de tentar arrumar e apagar tudo de vez... não quero decepcionar a professora Bernadete!"</blockquote>
    `,
    choices: [
      {
        text: "📻 [SE TIVER RÁDIO DE LOUISE] Entregar o código de frequência de Louise para encorajar Peter!",
        target: "node_trama2_restaurado",
        reqClue: "codigo_radio_louise"
      },
      {
        text: "Encorajar Peter com palavras de apoio e confiança antes da tentativa.",
        target: "node01"
      }
    ]
  },

  node_trama2_restaurado: {
    id: "node_trama2_restaurado",
    chapter: "PERÍCIA DE VÍDEO RESTAURADA",
    title: "O Sucesso de Peter na Câmera 04",
    time: "00:10 AM",
    location: "📍 Sala CRT",
    camera: "CAM 04 &bull; VÍDEO NÍTIDO",
    avatars: ["Policial Beredito", "Peter"],
    text: `
      <p>Inspirado pelo apoio de Beredito e com a frequência de Louise, Peter aplicou o filtro. A imagem ficou cristalina, revelando o rosto tenso de <strong>Janeto</strong> segurando a ferramenta!</p>
      <blockquote>"Eu consegui, Seu Beredito! O vídeo está salvo!" — exultou Peter com um sorriso.</blockquote>
    `,
    choices: [
      {
        text: "Adicionar o vídeo restaurado ao dossiê de Beredito.",
        target: "node01",
        addClue: "video_restaurado_peter"
      }
    ]
  },

  // FRENTE 3: INTERROGATÓRIO DOS PASSAGEIROS
  node_trama3: {
    id: "node_trama3",
    chapter: "INTERROGATÓRIO NO SALÃO",
    title: "Depoimentos no Salão do Ônibus",
    time: "00:09 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM 05 &bull; INTERROGATÓRIO",
    avatars: ["Policial Beredito", "Janeto", "Louise", "Brinidite"],
    text: `
      <p>No salão, <strong>Louise</strong> segurava o transmissor de rádio com as mãos trêmulas:</p>
      <blockquote>"Seu Beredito... eu sintonizava a frequência <strong>FREQ-107.5</strong> porque era o canal militar que meu pai usava antes de desaparecer em 1972..."</blockquote>
      <p><strong>Brinidite</strong> entregou seu diário pessoal com timidez:</p>
      <blockquote>"Eu tenho muita ansiedade e escrevo tudo para me acalmar. Anotei aqui que o <strong>Janeto</strong> passou semanas anotando a rota do 1972..."</blockquote>
      <p><strong>Janeto</strong> olhava para o chão com os olhos vermelhos de desespero.</p>
    `,
    choices: [
      {
        text: "Acolher Louise e Brinidite, guardando suas revelações com absoluto sigilo.",
        target: "node01",
        addClue: "caderno_rotas_janeto",
        addClue2: "codigo_radio_louise"
      },
      {
        text: "👁️ [SE TIVER DEPOIMENTO DE VALDINETE] Confrontar Janeto com empatia sobre suas motivações reais!",
        target: "node_trama3_desesperado",
        reqClue: "depoimento_valdinete"
      },
      {
        text: "⬅️ Voltar ao Posto Principal de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama3_desesperado: {
    id: "node_trama3_desesperado",
    chapter: "REVELAÇÕES DE JANETO",
    title: "O Desabafo de Janeto",
    time: "00:14 AM",
    location: "📍 Salão do 1972",
    camera: "CAM 05 &bull; DESABAFO",
    avatars: ["Policial Beredito", "Janeto"],
    text: `
      <p>Confrontado sem violência por Beredito, Janeto caiu em prantos:</p>
      <blockquote>"Seu Beredito... minha filha está internada na capital precisando de uma cirurgia urgente! Uma corporação me prometeu dinheiro se eu entregasse a mochila do experimento! Eu não sou um monstro... eu só estava desesperado!"</blockquote>
    `,
    choices: [
      {
        text: "⬅️ Voltar ao Posto Principal para organizar o cerco garantindo ajuda à filha de Janeto.",
        target: "node01"
      }
    ]
  },

  // FRENTE 4: ESCUTA DA FIGUEIRA E VALDINETE
  node_trama4: {
    id: "node_trama4",
    chapter: "PERÍMETRO DA FIGUEIRA",
    title: "Depoimento de Valdinete e o Perímetro",
    time: "00:11 AM",
    location: "📍 Área da Figueira",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Policial Beredito", "Valdinete", "João", "Amélia"],
    text: `
      <p>A moradora <strong>Valdinete</strong> sorriu ao ver Beredito escutá-la com atenção:</p>
      <blockquote>"Muito obrigada por me ouvir, Seu Beredito. Há anos ninguém na cidade conversava comigo... Eu vi o Janeto tirando fotos do ônibus às 23h."</blockquote>
      <p>João Alegria e Amélia organizaram a mochila falsa de isca e a rede na figueira.</p>
    `,
    choices: [
      {
        text: "Agradecer o depoimento crucial de Valdinete e preparar as armadilhas.",
        target: "node01",
        addClue: "depoimento_valdinete"
      },
      {
        text: "⚖️ [SE TIVER MANDADO] Executar a Operação Policial Empática!",
        target: "node_cerco_flagrante",
        reqClue: "mandado_seguranca"
      },
      {
        text: "⬅️ Voltar ao Posto Principal de Beredito.",
        target: "node01"
      }
    ]
  },

  // EXPEDIÇÃO DO MANDADO HUMANO
  node_expedir_mandado: {
    id: "node_expedir_mandado",
    chapter: "DECISÃO DE JUSTIÇA HUMANA",
    title: "O Mandado Humano de Beredito",
    time: "00:16 AM",
    location: "📍 Guarita de Beredito",
    camera: "CAM 00 &bull; MANDADO HUMANO",
    avatars: ["Policial Beredito"],
    text: `
      <p>Com as provas cruzadas e os dramas humanos compreendidos, o Policial Beredito expediu o mandado de prisão de Janeto, solicitando simultaneamente o encaminhamento social para a cirurgia de sua filha.</p>
      <blockquote>"A lei será cumprida, mas a dignidade humana será preserved!" — afirmou Beredito.</blockquote>
    `,
    choices: [
      {
        text: "🚀 Ir para a Figueira e efetuar a captura humanizada de Janeto! (Final 1)",
        target: "node_cerco_flagrante",
        addClue: "mandado_seguranca"
      }
    ]
  },

  // CERCO FINAL
  node_cerco_flagrante: {
    id: "node_cerco_flagrante",
    chapter: "CLÍMAX DA OPERAÇÃO",
    title: "A Captura e Redenção na Figueira",
    time: "00:22 AM",
    location: "📍 Figueira Centenária",
    camera: "CAM 06 &bull; FLAGRANTE",
    avatars: ["Policial Beredito", "Janeto", "Frederico"],
    text: `
      <p>João correu com a mochila falsa de isca e Janeto foi retido suavemente pela rede de Amélia.</p>
      <p>Beredito aproximou-se sem sacar a arma, oferecendo a mão para ajudá-lo a se levantar:</p>
      <blockquote>"Janeto, o crime não salvará sua filha. Nós vamos protegê-la pela via legal."</blockquote>
    `,
    choices: [
      {
        text: "⚖️ Efetuar a Prisão Humana e salvar o experimento de Frederico! (Final 1)",
        target: "node_ending1"
      },
      {
        text: "Permitir o desabafo completo de Janeto com Frederico e Bernadete. (Final 7)",
        target: "node_ending7"
      }
    ]
  },

  // RESET RECURSIVO
  node_loop_trigger: {
    id: "node_loop_trigger",
    chapter: "LAÇO TEMPORAL 2005",
    title: "O Eco do Relógio do Experimento",
    time: "00:25 AM",
    location: "📍 Painel do Ônibus 1972",
    camera: "CAM 00 &bull; ANOMALIA RECURSIVA",
    avatars: ["Relógio Quântico 1972"],
    text: `
      <p>A tensão fez com que Janeto girasse a chave do motor do 1972. A ressonância do experimento temporal disparou o alarme quântico!</p>
      <p>O tempo reseta para as 00:00 de 2005, preservando todas as pontes emocionais e laudos no caderno de Beredito!</p>
    `,
    isLoopReset: true,
    choices: [
      {
        text: "🌀 Reiniciar o Loop de 2005 (Preservando Vínculos e Evidências)",
        target: "node01"
      }
    ]
  },

  // ENDINGS
  node_ending1: {
    id: "node_ending1",
    chapter: "DESFECHO POLICIAL E HUMANO",
    title: "FINAL 1 — Justiça Humana & Redenção",
    time: "00:35 AM",
    location: "📍 Garagem Municipal - Superação",
    camera: "CAM OK &bull; REDENÇÃO 2005",
    avatars: ["Policial Beredito", "Janeto", "Frederico", "Edilias"],
    endingId: "ending1",
    text: `
      <p>⚖️ <strong>VITÓRIA DE JUSTIÇA E EMPATIA!</strong></p>
      <p>O Policial Beredito conduziu o caso com maestria humanitária: Janeto foi detido para responder pelo ato, mas Beredito acionou o fundo social da polícia para custear a cirurgia de sua filha!</p>
      <p>Frederico encontrou paz em relação ao luto de seu irmão, Edilias teve seu passado perdoado e a professora Bernadete liderou uma expedição inesquecível na Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência / Explorar Outras Histórias", target: "node01", isRestart: true }
    ]
  },

  node_ending7: {
    id: "node_ending7",
    chapter: "DESFECHO SECCIONAL",
    title: "FINAL 7 — Confissão e Acordo sob Custódia",
    time: "01:00 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM OK &bull; CUSTÓDIA",
    avatars: ["Policial Beredito", "Janeto", "Frederico"],
    endingId: "ending7",
    text: `
      <p>🌟 <strong>FINAL SECRETO DE CUSTÓDIA COLABORATIVA!</strong></p>
      <p>Sensibilizado pela história de Frederico e pela empatia de Beredito, Janeto entregou os nomes dos contratantes da capital e concordou em colaborar na expedição sob custódia oficial!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência Narrativa", target: "node01", isRestart: true }
    ]
  }
};

// Application State Management (GameEngine Class)
class GameEngine {
  constructor() {
    this.state = {
      loop: 1,
      currentNodeId: "node01",
      clues: new Set(),
      visitedNodes: new Set(["node01"]),
      unlockedEndings: new Set(),
      soundEnabled: true,
      showLoopFeedback: false
    };

    this.audioCtx = null;
    this.init();
  }

  init() {
    this.loadStorage();
    this.bindEvents();
    this.initParticles();
    this.render();
  }

  loadStorage() {
    try {
      const saved = localStorage.getItem("onibus1972_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.loop = parsed.loop || 1;
        this.state.currentNodeId = parsed.currentNodeId || "node01";
        this.state.clues = new Set(parsed.clues || []);
        this.state.visitedNodes = new Set(parsed.visitedNodes || ["node01"]);
        this.state.unlockedEndings = new Set(parsed.unlockedEndings || []);
        this.state.soundEnabled = parsed.soundEnabled !== undefined ? parsed.soundEnabled : true;
      }
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }

  saveStorage() {
    try {
      const data = {
        loop: this.state.loop,
        currentNodeId: this.state.currentNodeId,
        clues: Array.from(this.state.clues),
        visitedNodes: Array.from(this.state.visitedNodes),
        unlockedEndings: Array.from(this.state.unlockedEndings),
        soundEnabled: this.state.soundEnabled
      };
      localStorage.setItem("onibus1972_state", JSON.stringify(data));
    } catch (e) {
      console.warn("Save storage error:", e);
    }
  }

  bindEvents() {
    // Sound button
    const btnSound = document.getElementById("btnSound");
    if (btnSound) {
      btnSound.addEventListener("click", () => {
        this.state.soundEnabled = !this.state.soundEnabled;
        const icon = document.getElementById("soundIcon");
        if (icon) icon.textContent = this.state.soundEnabled ? "📻" : "🔇";
        this.saveStorage();
      });
    }

    // Modal Toggles
    const btnGraph = document.getElementById("btnGraphToggle");
    if (btnGraph) {
      btnGraph.addEventListener("click", () => {
        this.openModal("graphModal");
        this.renderGraph();
      });
    }

    const btnNotebook = document.getElementById("btnNotebookToggle");
    if (btnNotebook) {
      btnNotebook.addEventListener("click", () => {
        this.openModal("notebookModal");
        this.renderNotebook();
      });
    }

    // Close Modal buttons
    document.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", () => this.closeAllModals());
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.closeAllModals();
      });
    });

    // Modal Tabs
    document.querySelectorAll(".tab-btn").forEach(tab => {
      tab.addEventListener("click", (e) => {
        const targetTab = e.target.getAttribute("data-tab");
        document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        e.target.classList.add("active");
        const pane = document.getElementById(targetTab);
        if (pane) pane.classList.add("active");
      });
    });

    // Reset Progress
    const btnReset = document.getElementById("btnResetProgress");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja resetar todo o progresso do diário de bordo?")) {
          localStorage.removeItem("onibus1972_state");
          location.reload();
        }
      });
    }

    // Keyboard Shortcuts (1-9)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllModals();
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const buttons = document.querySelectorAll(".choice-btn");
        if (buttons[num - 1] && !buttons[num - 1].disabled) {
          buttons[num - 1].click();
        }
      }
    });
  }

  // Web Audio Synth
  playSound(type) {
    if (!this.state.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "click") {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "loop") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === "clue") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      console.warn("Audio synth warning:", e);
    }
  }

  selectChoice(choice) {
    this.playSound("click");

    // Add clues if applicable
    if (choice.addClue) {
      this.state.clues.add(choice.addClue);
      this.playSound("clue");
    }
    if (choice.addClue2) {
      this.state.clues.add(choice.addClue2);
    }

    const targetNode = NODES[choice.target];
    if (!targetNode) return;

    // Check if target is a Loop Reset
    if (targetNode.isLoopReset || choice.target === "node_loop_trigger") {
      this.state.loop++;
      this.state.showLoopFeedback = true;
      this.state.currentNodeId = "node01";
      this.playSound("loop");
    } else {
      this.state.currentNodeId = choice.target;
      if (!choice.isRestart) {
        this.state.showLoopFeedback = false;
      }
    }

    // Record Visited
    this.state.visitedNodes.add(this.state.currentNodeId);

    // Record Ending if reached
    if (targetNode.endingId) {
      this.state.unlockedEndings.add(targetNode.endingId);
    }

    this.saveStorage();
    this.render();

    // Scroll to top of story
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const node = NODES[this.state.currentNodeId] || NODES["node01"];

    // Update Header Dashboard Widgets
    const loopDisp = document.getElementById("loopDisplay");
    if (loopDisp) loopDisp.textContent = `Loop #${this.state.loop}`;

    const clockDisp = document.getElementById("clockTime");
    if (clockDisp) clockDisp.textContent = node.time || "00:00";

    const clueCnt = document.getElementById("clueCount");
    if (clueCnt) clueCnt.textContent = this.state.clues.size;

    const tabClueCnt = document.getElementById("tabClueCount");
    if (tabClueCnt) tabClueCnt.textContent = this.state.clues.size;
    
    const unlockedCount = this.state.unlockedEndings.size;
    const endDisp = document.getElementById("endingsDisplay");
    if (endDisp) endDisp.textContent = `${unlockedCount} / 7`;

    const tabEndCnt = document.getElementById("tabEndingCount");
    if (tabEndCnt) tabEndCnt.textContent = `${unlockedCount}/7`;

    const progressPct = Math.round((this.state.visitedNodes.size / Object.keys(NODES).length) * 100);
    const pBar = document.getElementById("progressBar");
    if (pBar) pBar.style.width = `${progressPct}%`;

    const pPct = document.getElementById("progressPercent");
    if (pPct) pPct.textContent = `${progressPct}% Esclarecido`;

    // Render Scene Column Badges & SVG Illustration
    const locBadge = document.getElementById("locationBadge");
    if (locBadge) locBadge.textContent = node.location || "📍 Garagem Municipal";

    const camBadge = document.getElementById("cameraBadge");
    if (camBadge) camBadge.innerHTML = `${node.camera || 'REC &bull; CAM 04'}`;

    const sTime = document.getElementById("sceneTimeBadge");
    if (sTime) sTime.textContent = `🕒 ${node.time || '00:00'}`;

    // Avatars
    const avatarsContainer = document.getElementById("activeAvatars");
    if (avatarsContainer) {
      avatarsContainer.innerHTML = (node.avatars || [])
        .map(av => `<span class="avatar-pill">${av}</span>`)
        .join("");
    }

    // SVG / Real Image Illustration Generator
    this.renderSceneSVG(node);

    // Quick Inventory Tags
    const quickInvTags = document.getElementById("quickInvTags");
    if (quickInvTags) {
      if (this.state.clues.size === 0) {
        quickInvTags.innerHTML = `<em class="empty-inv-msg">Nenhuma pista coletada neste loop ainda.</em>`;
      } else {
        quickInvTags.innerHTML = Array.from(this.state.clues)
          .map(id => {
            const c = CLUES[id];
            return c ? `<span class="clue-chip">${c.icon} ${c.title}</span>` : "";
          })
          .join("");
      }
    }

    // Story Sheet
    const chBadge = document.getElementById("chapterBadge");
    if (chBadge) chBadge.textContent = node.chapter || "CAPÍTULO";

    const nTitle = document.getElementById("nodeTitle");
    if (nTitle) nTitle.textContent = node.title || "";

    const nText = document.getElementById("nodeText");
    if (nText) nText.innerHTML = node.text || "";

    // Loop Feedback Banner
    const loopBanner = document.getElementById("loopFeedback");
    if (loopBanner) {
      if (this.state.showLoopFeedback && node.id === "node01") {
        loopBanner.classList.remove("hidden");
      } else {
        loopBanner.classList.add("hidden");
      }
    }

    // Choices
    const choicesList = document.getElementById("choicesList");
    if (choicesList) {
      choicesList.innerHTML = "";

      (node.choices || []).forEach((c, idx) => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        
        let isReqMet = true;
        let reqTagHtml = "";
        if (c.reqClue) {
          isReqMet = this.state.clues.has(c.reqClue);
          const reqClueObj = CLUES[c.reqClue];
          reqTagHtml = `<span class="choice-req-tag">${isReqMet ? '✔ Exige: ' : '🔒 Requer: '} ${reqClueObj ? reqClueObj.title : 'Pista'}</span>`;
          if (isReqMet) btn.classList.add("has-req");
        }

        if (!isReqMet) btn.disabled = true;

        btn.innerHTML = `
          <span class="choice-key">[${idx + 1}]</span>
          <span class="choice-text">${c.text}</span>
          ${reqTagHtml}
        `;

        btn.addEventListener("click", () => this.selectChoice(c));
        choicesList.appendChild(btn);
      });
    }
  }

  // Dynamic Graphic Illustration & Image Scene Renderer
  renderSceneSVG(node) {
    const container = document.getElementById("sceneIllustration");
    if (!container) return;

    let imageSrc = "assets/images/capa-onibus-1972.png";
    let sceneLabel = "CAM 04 &bull; GARAGEM NOTURNA";

    if (node.id.includes("trama1") || node.id.includes("banco19") || node.id.includes("ending4")) {
      imageSrc = "assets/images/banco-secreto.png";
      sceneLabel = "CAM 05 &bull; BAGAGEIRO DO 1972";
    } else if (node.id.includes("trama4") || node.id.includes("confronto") || node.id.includes("flagrante") || node.id.includes("ending1")) {
      imageSrc = "assets/images/armadilha-figueira.png";
      sceneLabel = "CAM 06 &bull; FIGUEIRA CENTENÁRIA";
    }

    container.innerHTML = `
      <div class="scene-img-wrapper" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
        <img src="${imageSrc}" alt="${node.title}" class="scene-real-img" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9) contrast(1.1);
          animation: subtleZoom 12s ease-in-out infinite alternate;
          transition: opacity 0.5s ease-in-out;
        " />
        <div class="scene-vignette" style="
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at center, transparent 40%, rgba(4, 8, 18, 0.85) 100%),
                      linear-gradient(180deg, rgba(8, 13, 26, 0.4) 0%, transparent 30%, rgba(8, 13, 26, 0.8) 100%);
          pointer-events: none;
        "></div>
        <div class="scene-scanlines" style="
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px);
          pointer-events: none;
          opacity: 0.7;
        "></div>
        <div class="hud-corner-tl" style="position: absolute; top: 12px; left: 12px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--cyan-radio); letter-spacing: 0.1em;">
          SYS.1972 // ONLINE
        </div>
        <div class="hud-corner-br" style="position: absolute; bottom: 12px; right: 12px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--amber-farol); letter-spacing: 0.1em;">
          ${sceneLabel}
        </div>
      </div>
    `;
  }

  // Render Clues & Endings Modal
  renderNotebook() {
    const cluesGrid = document.getElementById("cluesGrid");
    if (cluesGrid) {
      cluesGrid.innerHTML = Object.values(CLUES).map(clue => {
        const isUnlocked = this.state.clues.has(clue.id);
        return `
          <div class="clue-card ${isUnlocked ? '' : 'locked'}">
            <span class="clue-icon">${isUnlocked ? clue.icon : '🔒'}</span>
            <h4 class="clue-title">${isUnlocked ? clue.title : 'Pista Bloqueada'}</h4>
            <p class="clue-desc">${isUnlocked ? clue.desc : 'Explore as frentes de investigação para revelar este elemento.'}</p>
          </div>
        `;
      }).join("");
    }

    const endingsList = document.getElementById("endingsList");
    if (endingsList) {
      endingsList.innerHTML = Object.values(ENDINGS).map(ending => {
        const isUnlocked = this.state.unlockedEndings.has(ending.id);
        return `
          <div class="ending-card ${isUnlocked ? 'unlocked' : ''}">
            <div class="ending-badge">${isUnlocked ? ending.badge : '❓'}</div>
            <div class="ending-info">
              <h4>${ending.code}: ${isUnlocked ? ending.title : 'Desfecho Oculto'}</h4>
              <p>${isUnlocked ? ending.desc : 'Tome decisões nos laços temporais para desbloquear este final.'}</p>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // Render Recursive Node Graph
  renderGraph() {
    const container = document.getElementById("graphCanvasContainer");
    if (!container) return;
    const nodeList = Object.values(NODES);

    let html = `<div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">`;
    nodeList.forEach(n => {
      const isVisited = this.state.visitedNodes.has(n.id);
      const isCurrent = n.id === this.state.currentNodeId;
      
      html += `
        <div style="
          background: ${isCurrent ? 'rgba(251, 191, 36, 0.15)' : isVisited ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.03)'};
          border: 1px solid ${isCurrent ? '#fbbf24' : isVisited ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
          padding: 0.85rem 1.25rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div>
            <strong style="color: ${isCurrent ? '#fbbf24' : isVisited ? '#f8fafc' : '#64748b'}; font-size: 0.95rem;">
              ${n.title} (${n.chapter})
            </strong>
            <small style="display: block; color: #94a3b8; font-size: 0.75rem;">${n.location}</small>
          </div>
          <span style="
            font-size: 0.75rem; 
            font-family: var(--font-mono); 
            padding: 3px 8px; 
            border-radius: 4px;
            background: ${isCurrent ? '#fbbf24' : isVisited ? '#38bdf8' : '#334155'};
            color: ${isCurrent || isVisited ? '#000' : '#94a3b8'};
            font-weight: 600;
          ">
            ${isCurrent ? '📍 NÓ ATUAL' : isVisited ? '✔ VISITADO' : '🔒 INEXPLORADO'}
          </span>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");
  }

  closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
  }

  // Particle background logic
  initParticles() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }
}

// Global Instantiate on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  window.gameEngine = new GameEngine();
});
