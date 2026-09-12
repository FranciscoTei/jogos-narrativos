/* ===================================================
   ÔNIBUS 1972 — MOTOR DE JOGO NARRATIVO RECURSIVO
   =================================================== */

// Base Data: Clues Definition (Ano 2005)
const CLUES = {
  depoimento_valdinete: {
    id: "depoimento_valdinete",
    title: "Testemunho de Valdinete",
    icon: "👁️",
    desc: "Valdinete confirma ter visto Janeto rondando a garagem com uma caixa de ferramentas antes das 00:00."
  },
  laudo_edilias: {
    id: "laudo_edilias",
    title: "Laudo da Trava Adulterada (Edilias)",
    icon: "🔧",
    desc: "O mecânico Edilias provou ao Policial Beredito que a fechadura do Banco 19 foi violada por alguém interno."
  },
  bilhete_janeto: {
    id: "bilhete_janeto",
    title: "Bilhete Rasurado de Janeto (Brinidite)",
    icon: "📜",
    desc: "Entregue pela passageira Brinidite. Revela que Janeto planejava roubar o relicário da Serra da Lua."
  },
  apito_joao: {
    id: "apito_joao",
    title: "Apito Esportivo de João",
    icon: "🔊",
    desc: "Usado por João Alegria para guiá-los com precisão militar até a área da armadilha."
  },
  rede_amelia: {
    id: "rede_amelia",
    title: "Rede de Caça de Amélia",
    icon: "🕸️",
    desc: "Instalada por Amélia na figueira centenária. Garante a contenção de Janeto em flagrante."
  },
  mandado_beredito: {
    id: "mandado_beredito",
    title: "Mandado Policial de Beredito",
    icon: "⚖️",
    desc: "Expedido pelo Policial Beredito após Peter extrair as filmagens dos gravadores do ônibus."
  }
};

// Base Data: Endings Definition
const ENDINGS = {
  ending1: {
    id: "ending1",
    code: "FINAL 1",
    title: "Prisão Oficial de Janeto (Vitória Perfeita Policial)",
    badge: "⚖️",
    desc: "Flagrante perfeito! João atraiu Janeto, a rede de Amélia o prendeu na figueira e o Policial Beredito efetuou a prisão oficial. A professora Bernadete e os alunos seguiram para a Serra da Lua em paz!"
  },
  ending2: {
    id: "ending2",
    code: "FINAL 2",
    title: "Fuga Prematura de Janeto",
    badge: "🚨",
    desc: "As luzes acendidas precipitadamente assustaram Janeto, que fugiu pela mata deixando a caixa de ferramentas para trás."
  },
  ending3: {
    id: "ending3",
    code: "FINAL 3",
    title: "Perseguição na Serra da Lua",
    badge: "⛰️",
    desc: "Janeto escapou do pátio rumo às montanhas. O Policial Beredito, o motorista Tony e os alunos sobem no 1972 para uma perseguição oficial na serra!"
  },
  ending4: {
    id: "ending4",
    code: "FINAL 4",
    title: "O Relógio 00:00 (Reinício Policial)",
    badge: "🌀",
    desc: "Ao tentar escapar, Janeto acionou o painel do 1972, disparando o laço temporal de 2005. O tempo reseta mantendo todos os laudos no caderno de Beredito!"
  },
  ending5: {
    id: "ending5",
    code: "FINAL 5",
    title: "Confissão de Janeto e Redenção (Final Secreto)",
    badge: "🌟",
    desc: "Confrontado por Beredito e Frederico, Janeto confessa em lágrimas que buscava o diário de seu avô. Beredito autoriza que ele viaje sob custódia policial!"
  }
};

// Base Data: Story Nodes (Caso de 2005)
const NODES = {
  node01: {
    id: "node01",
    chapter: "PRÓLOGO (2005)",
    title: "O Alerta das 00:00 na Garagem",
    time: "00:00 AM",
    location: "📍 Garagem Municipal - Guarita",
    camera: "CAM 01 &bull; PÁTIO",
    avatars: ["Chico (Guardinha)", "Tony (Motorista)"],
    text: `
      <p>Na gelada madrugada de <strong>2005</strong>, o guardinha <strong>Chico</strong> observava os monitores CRT da garagem municipal.</p>
      <p>O lendário <strong>Ônibus 1972</strong> estava preparado para levar a professora <strong>Bernadete</strong> e seus alunos na aula de campo para a Serra da Lua. Subitamente, às 00:00, o alarme de segurança disparou!</p>
      <p>No monitor 04, um vulto encapuzado tentava violar a tranca do Banco 19. Chico ligou para o motorista <strong>Tony</strong> e acionou a Polícia Militar local.</p>
    `,
    choices: [
      {
        text: "Notificar o motorista Tony e aguardar a chegada do Policial Beredito.",
        target: "node02"
      },
      {
        text: "Inspecionar o pátio com a moradora local Valdinete antes da polícia chegar.",
        target: "node01_stealth",
        addClue: "depoimento_valdinete"
      }
    ]
  },

  node01_stealth: {
    id: "node01_stealth",
    chapter: "CAPÍTULO I",
    title: "Depoimento da Testemunha Valdinete",
    time: "00:03 AM",
    location: "📍 Pátio Externo",
    camera: "CAM 04 &bull; LATERAL 1972",
    avatars: ["Chico (Guardinha)", "Valdinete"],
    text: `
      <p>Acompanhado da moradora local <strong>Valdinete</strong>, o guardinha Chico se esgueirou até os pneus de reserva.</p>
      <p>Valdinete apontou para a sombra perto da porta do ônibus:</p>
      <blockquote>"Chico, eu conheço aquele casado azul! É o <strong>Janeto</strong>! Vi ele rondando a garagem às 23h carregando uma chave de fenda!"</blockquote>
      <p>Com essa testemunha crucial, Chico correu para encontrar a patrulha policial.</p>
    `,
    choices: [
      {
        text: "Entregar o testemunho de Valdinete ao Policial Beredito.",
        target: "node02"
      }
    ]
  },

  node02: {
    id: "node02",
    chapter: "CAPÍTULO I",
    title: "A Chegada do Policial Beredito",
    time: "00:06 AM",
    location: "📍 Pátio da Garagem - Viatura 2005",
    camera: "CAM 02 &bull; VIATURA",
    avatars: ["Policial Beredito", "Tony", "Edilias"],
    text: `
      <p>A viatura da Polícia Militar encostou com as luzes giratórias ligadas. O <strong>Policial Beredito</strong> desembarcou com sua prancheta de inquérito.</p>
      <p>O mecânico assistente <strong>Edilias</strong> aproximou-se de Beredito e apontou para a trava do 1972:</p>
      <blockquote>"Seu Policial Beredito! Examinei a trava do Banco 19. Ela foi adulterada por dentro antes da meia-noite! Alguém dos passageiros facilitou a entrada!"</blockquote>
    `,
    choices: [
      {
        text: "Reunir todos os passageiros dentro do 1972 para o interrogatório oficial de Beredito.",
        target: "node03",
        addClue: "laudo_edilias"
      },
      {
        text: "Tony liga os faróis do ônibus para tentar flagrar o invasor na escuridão.",
        target: "node02_farois"
      }
    ]
  },

  node02_farois: {
    id: "node02_farois",
    chapter: "CAPÍTULO I",
    title: "Fuga Prematura do Suspeito",
    time: "00:08 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM 04 &bull; FACHADA",
    avatars: ["Policial Beredito", "Tony"],
    text: `
      <p>Tony acendeu os faróis altos do 1972. Assustado com o clarão, o suspeito cortou a cerca e fugiu para o matagal.</p>
      <p>O Policial Beredito recolheu a caixa de ferramentas abandonada, mas o mandante continuou à solta...</p>
    `,
    choices: [
      {
        text: "Registrar a fuga parcial de Janeto no boletim de ocorrência. (Conclui com Final 2)",
        target: "node_ending2"
      }
    ]
  },

  node03: {
    id: "node03",
    chapter: "CAPÍTULO II",
    title: "Interrogatório Policial no Ônibus 1972",
    time: "00:12 AM",
    location: "📍 Interior do Ônibus 1972",
    camera: "CAM 05 &bull; INTERROGATÓRIO",
    avatars: ["Policial Beredito", "Bernadete", "Janeto", "Brinidite", "Frederico"],
    text: `
      <p>O Policial Beredito reuniu a professora <strong>Bernadete</strong>, os passageiros <strong>Janeto</strong>, <strong>Louise</strong>, <strong>Brinidite</strong>, <strong>Peter</strong>, <strong>Frederico</strong> e os alunos no salão do ônibus.</p>
      <p>A passageira <strong>Brinidite</strong> ergueu a mão e entregou um papel rasurado:</p>
      <blockquote>"Policial Beredito! Encontrei este bilhete caído no corredor. Contém os horários do Banco 19 e a assinatura de <strong>Janeto</strong>!"</blockquote>
      <p>Pressionado pelas evidências, <strong>Frederico</strong> confessou: <em>"É verdade, Beredito! O Janeto me ofereceu dinheiro para deixar a porta destravada!"</em></p>
      <p>Vendo a situação, <strong>João Alegria</strong> e <strong>Amélia</strong> apresentaram o plano de captura!</p>
    `,
    choices: [
      {
        text: "Aprovar a corrida de isca de João Alegria para atrair Janeto até a figueira.",
        target: "node04_joao",
        addClue: "bilhete_janeto",
        addClue2: "apito_joao"
      },
      {
        text: "Armar a rede de caça de Amélia nos galhos da figueira sob vigilância de Louise.",
        target: "node04_amelia",
        addClue: "bilhete_janeto",
        addClue2: "rede_amelia"
      },
      {
        text: "⚖️ [LAUDO DE EDILIAS] Beredito e Peter analisam os gravadores para expedir o Mandado de Prisão!",
        target: "node03_banco19",
        reqClue: "laudo_edilias"
      }
    ]
  },

  node03_banco19: {
    id: "node03_banco19",
    chapter: "CAPÍTULO RECURSIVO",
    title: "O Mandado de Prisão de Beredito",
    time: "00:15 AM",
    location: "📍 Banco 19 - Perícia Policial",
    camera: "CAM 05 &bull; BANCO 19",
    avatars: ["Policial Beredito", "Peter", "Janeto"],
    text: `
      <p>Utilizando o notebook da viatura, o aluno de tecnologia <strong>Peter</strong> auxiliou o Policial Beredito a recuperar a gravação do circuito interno.</p>
      <p>As imagens mostravam claramente <strong>Janeto</strong> abrindo o compartimento metálico sob o Banco 19 para retirar o relicário histórico de 1972!</p>
      <blockquote>"Com este laudo e o vídeo, expedirei o mandado de prisão em flagrante por furtar o patrimônio da expedição de Bernadete!" — declarou o Policial Beredito.</blockquote>
    `,
    choices: [
      {
        text: "Executar a Operação Policial de Flagrante com Beredito, João e Amélia!",
        target: "node04_plano_mestre",
        addClue: "mandado_beredito"
      }
    ]
  },

  node04_joao: {
    id: "node04_joao",
    chapter: "CAPÍTULO III",
    title: "Operação Isca de João Alegria",
    time: "00:17 AM",
    location: "📍 Pátio Central da Garagem",
    camera: "CAM 03 &bull; PÁTIO",
    avatars: ["João Alegria", "Janeto"],
    text: `
      <p>João Alegria vestiu a jaqueta refletiva e apitou forte diante de Janeto no pátio!</p>
      <blockquote>"Ei, Janeto! O Policial Beredito já tem suas digitais! Vem pegar o mapa se for capaz!" — provocou João, correndo em direção à figueira!</blockquote>
      <p>Desesperado para não ser preso, Janeto correu atrás de João no escuro!</p>
    `,
    choices: [
      {
        text: "Guiar Janeto direto para a área do buraco e rede de Amélia.",
        target: "node05_confronto"
      },
      {
        text: "Janeto tenta invadir a cabine do motorista Tony.",
        target: "node_loop_trigger"
      }
    ]
  },

  node04_amelia: {
    id: "node04_amelia",
    chapter: "CAPÍTULO III",
    title: "Armadilha de Amélia e Louise",
    time: "00:18 AM",
    location: "📍 Figueira Centenária",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Amélia", "Louise", "Chico"],
    text: `
      <p>Sob a supervisão de <strong>Louise</strong> no rádio de emergência, Amélia e Chico camuflaram o buraco na figueira e içaram a rede de caça.</p>
    `,
    choices: [
      {
        text: "Sincronizar o sinal de apito de João com a roldana da rede.",
        target: "node05_confronto"
      }
    ]
  },

  node04_plano_mestre: {
    id: "node04_plano_mestre",
    chapter: "CAPÍTULO POLICIAL",
    title: "O Cerco Perfeito de Beredito",
    time: "00:20 AM",
    location: "📍 Pátio da Figueira",
    camera: "CAM MESTRE &bull; FLAGRANTE",
    avatars: ["Policial Beredito", "Janeto", "João", "Amélia"],
    text: `
      <p>Com o Mandado Policial assinado por Beredito, a isca de João e a armadilha de Amélia, a equipe cercou Janeto na figueira!</p>
    `,
    choices: [
      {
        text: "Beredito efetua a Prisão Oficial em Flagrante de Janeto! (Final 1)",
        target: "node_ending1"
      },
      {
        text: "Permitir que a Professora Bernadete e Frederico ouçam a confissão de Janeto. (Final 5)",
        target: "node_ending5"
      }
    ]
  },

  node05_confronto: {
    id: "node05_confronto",
    chapter: "CLÍMAX DE 2005",
    title: "O Flagrante Policial na Figueira",
    time: "00:22 AM",
    location: "📍 Sob a Figueira",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Policial Beredito", "Janeto", "Amélia", "João"],
    text: `
      <p>Janeto correu cego de raiva atrás do apito de João Alegria e pisou direto na grama falsa de Amélia!</p>
      <p>Ao afundar na vala, a rede despencou dos galhos e o Policial Beredito deu voz de prisão com a sirene ligada!</p>
    `,
    choices: [
      {
        text: "⚖️ [EXIGE MANDADO OU REDE] Policial Beredito encerra o caso de 2005 com prisão oficial! (Final 1)",
        target: "node_ending1",
        reqClue: "rede_amelia"
      },
      {
        text: "Janeto tenta escapar pelos arbustos rumo à Serra da Lua. (Final 3)",
        target: "node_ending3"
      },
      {
        text: "Janeto corre para a cabine e aciona o motor do 1972.",
        target: "node_loop_trigger"
      }
    ]
  },

  node_loop_trigger: {
    id: "node_loop_trigger",
    chapter: "LAÇO TEMPORAL 2005",
    title: "O Eco do Relógio de 2005",
    time: "00:25 AM",
    location: "📍 Painel do Ônibus 1972",
    camera: "CAM 00 &bull; LOOP ANOMALY",
    avatars: ["Relógio Quântico 1972"],
    text: `
      <p>Na tentativa desesperada de fuga, Janeto girou a chave mestra no painel do 1972. O circuito quântico do ônibus vintage apitou forte!</p>
      <p>O tempo retrocedeu para as 00:00 de 2005, mas todas as provas e o laudo do Policial Beredito continuam salvos no seu caderno!</p>
    `,
    isLoopReset: true,
    choices: [
      {
        text: "🌀 Reiniciar o Loop de 2005 (Mantendo Evidências do Policial Beredito)",
        target: "node01"
      }
    ]
  },

  // ENDINGS
  node_ending1: {
    id: "node_ending1",
    chapter: "DESFECHO POLICIAL",
    title: "FINAL 1 — Prisão Oficial de Janeto",
    time: "00:35 AM",
    location: "📍 Garagem Municipal - Prisão",
    camera: "CAM OK &bull; PRISÃO 2005",
    avatars: ["Policial Beredito", "Janeto", "Bernadete", "Tony"],
    endingId: "ending1",
    text: `
      <p>⚖️ <strong>VITÓRIA POLICIAL PERFEITA!</strong></p>
      <p>O Policial Beredito algemou o culpado <strong>Janeto</strong> em flagrante na figueira!</p>
      <p>Com o laudo do mecânico Edilias, o depoimento de Valdinete e o bilhete recolhido por Brinidite, o crime de 2005 foi totalmente desmantelado. A professora Bernadete, o motorista Tony e toda a turma embarcaram felizes no 1972 rumo à Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Jogar Novamente / Testar Outros Caminhos", target: "node01", isRestart: true }
    ]
  },

  node_ending2: {
    id: "node_ending2",
    chapter: "DESFECHO PARCIAL",
    title: "FINAL 2 — Fuga Prematura de Janeto",
    time: "00:30 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM OK &bull; BOLETIM",
    avatars: ["Policial Beredito", "Chico"],
    endingId: "ending2",
    text: `
      <p>🚨 <strong>VITÓRIA PARCIAL!</strong></p>
      <p>Janeto conseguiu fugir antes do cerco policial de Beredito, mas deixou a caixa de ferramentas e o ônibus seguro para a viagem de Bernadete.</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Loop de 2005 para Prender Janeto em Flagrante", target: "node01", isRestart: true }
    ]
  },

  node_ending3: {
    id: "node_ending3",
    chapter: "DESFECHO DE AVENTURA",
    title: "FINAL 3 — Perseguição na Serra da Lua",
    time: "00:40 AM",
    location: "📍 Estrada da Serra da Lua",
    camera: "CAM 07 &bull; PERSEGUIÇÃO",
    avatars: ["Policial Beredito", "Tony", "João Alegria"],
    endingId: "ending3",
    text: `
      <p>⛰️ <strong>PERSEGUIÇÃO POLICIAL NA SERRA!</strong></p>
      <p>Janeto escapou rumo às montanhas. O Policial Beredito entra no 1972 com o motorista Tony e os alunos para iniciar uma caçada policial na Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Tentar Novamente a Captura na Garagem", target: "node01", isRestart: true }
    ]
  },

  node_ending5: {
    id: "node_ending5",
    chapter: "DESFECHO SECCIONAL",
    title: "FINAL 5 — Confissão de Janeto e Redenção",
    time: "01:00 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM OK &bull; REDENÇÃO",
    avatars: ["Policial Beredito", "Janeto", "Bernadete", "Frederico"],
    endingId: "ending5",
    text: `
      <p>🌟 <strong>FINAL SECRETO DE REDENÇÃO!</strong></p>
      <p>Confrontado por Beredito, Frederico e a professora Bernadete, Janeto chorou e confessou que tentava recuperar o diário de seu falecido avô, fundador do 1972.</p>
      <p>Sensibilizado, o Policial Beredito autorizou que Janeto acompanhasse a expedição sob custódia policial, ajudando os alunos na Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência Narrativa de 2005", target: "node01", isRestart: true }
    ]
  }
};

// Application State Management
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
        document.getElementById("soundIcon").textContent = this.state.soundEnabled ? "🔊" : "🔇";
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
        if (confirm("Tem certeza que deseja resetar todo o progresso do jogo?")) {
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
    document.getElementById("loopDisplay").textContent = `Loop #${this.state.loop}`;
    document.getElementById("clockTime").textContent = node.time || "00:00";
    document.getElementById("clueCount").textContent = this.state.clues.size;
    document.getElementById("tabClueCount").textContent = this.state.clues.size;
    
    const unlockedCount = this.state.unlockedEndings.size;
    document.getElementById("endingsDisplay").textContent = `${unlockedCount} / 5`;
    document.getElementById("tabEndingCount").textContent = `${unlockedCount}/5`;

    const progressPct = Math.round((this.state.visitedNodes.size / Object.keys(NODES).length) * 100);
    document.getElementById("progressBar").style.width = `${progressPct}%`;
    document.getElementById("progressPercent").textContent = `${progressPct}% Esclarecido`;

    // Render Scene Column Badges & SVG Illustration
    document.getElementById("locationBadge").textContent = node.location || "📍 Garagem Municipal";
    document.getElementById("cameraBadge").innerHTML = `${node.camera || 'REC &bull; CAM 04'}`;
    document.getElementById("sceneTimeBadge").textContent = `🕒 ${node.time || '00:00'}`;

    // Avatars
    const avatarsContainer = document.getElementById("activeAvatars");
    avatarsContainer.innerHTML = (node.avatars || [])
      .map(av => `<span class="avatar-pill">${av}</span>`)
      .join("");

    // SVG Illustration Generator
    this.renderSceneSVG(node);

    // Quick Inventory Tags
    const quickInvTags = document.getElementById("quickInvTags");
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

    // Story Sheet
    document.getElementById("chapterBadge").textContent = node.chapter || "CAPÍTULO";
    document.getElementById("nodeTitle").textContent = node.title || "";
    document.getElementById("nodeText").innerHTML = node.text || "";

    // Loop Feedback Banner
    const loopBanner = document.getElementById("loopFeedback");
    if (this.state.showLoopFeedback && node.id === "node01") {
      loopBanner.classList.remove("hidden");
    } else {
      loopBanner.classList.add("hidden");
    }

    // Choices
    const choicesList = document.getElementById("choicesList");
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

  // Dynamic Graphic Illustration & Image Scene Renderer
  renderSceneSVG(node) {
    const container = document.getElementById("sceneIllustration");
    let imageSrc = "assets/images/capa-onibus-1972.png";
    let sceneLabel = "CAM 04 &bull; GARAGEM NOTURNA";

    if (node.id.includes("banco19") || node.id.includes("plano_mestre") || node.id.includes("ending5")) {
      imageSrc = "assets/images/banco-secreto.png";
      sceneLabel = "CAM 05 &bull; COMPARTIMENTO DO BANCO 19";
    } else if (node.id.includes("amelia") || node.id.includes("confronto") || node.id.includes("ending1") || node.id.includes("ending3")) {
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
        <div class="hud-corner-tl" style="position: absolute; top: 12px; left: 12px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--cyan-accent); letter-spacing: 0.1em;">
          SYS.1972 // ONLINE
        </div>
        <div class="hud-corner-br" style="position: absolute; bottom: 12px; right: 12px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--gold-primary); letter-spacing: 0.1em;">
          ${sceneLabel}
        </div>
      </div>
    `;
  }

  // Render Clues & Endings Modal
  renderNotebook() {
    // Render Clues
    const cluesGrid = document.getElementById("cluesGrid");
    cluesGrid.innerHTML = Object.values(CLUES).map(clue => {
      const isUnlocked = this.state.clues.has(clue.id);
      return `
        <div class="clue-card ${isUnlocked ? '' : 'locked'}">
          <span class="clue-icon">${isUnlocked ? clue.icon : '🔒'}</span>
          <h4 class="clue-title">${isUnlocked ? clue.title : 'Pista Bloqueada'}</h4>
          <p class="clue-desc">${isUnlocked ? clue.desc : 'Explore os caminhos e laços temporais para desbloquear esta evidência.'}</p>
        </div>
      `;
    }).join("");

    // Render Endings
    const endingsList = document.getElementById("endingsList");
    endingsList.innerHTML = Object.values(ENDINGS).map(ending => {
      const isUnlocked = this.state.unlockedEndings.has(ending.id);
      return `
        <div class="ending-card ${isUnlocked ? 'unlocked' : ''}">
          <div class="ending-badge">${isUnlocked ? ending.badge : '❓'}</div>
          <div class="ending-info">
            <h4>${ending.code}: ${isUnlocked ? ending.title : 'Desfecho Oculto'}</h4>
            <p>${isUnlocked ? ending.desc : 'Tome decisões diferentes nos loops temporais para desbloquear este final.'}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Recursive Node Graph
  renderGraph() {
    const container = document.getElementById("graphCanvasContainer");
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

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
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
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
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
