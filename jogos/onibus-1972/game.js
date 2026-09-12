/* ===================================================
   ÔNIBUS 1972 — MOTOR DE JOGO NARRATIVO RECURSIVO
   =================================================== */

// Base Data: Clues Definition (O Experimento do Governo - 2005)
const CLUES = {
  mochila_experimento: {
    id: "mochila_experimento",
    title: "Mochila do Experimento (Frederico)",
    icon: "🎒",
    desc: "A mochila de Frederico contendo relatórios governamentais confidenciais da Serra da Lua."
  },
  mapa_rota_janeto: {
    id: "mapa_rota_janeto",
    title: "Mapa da Rota Monitorada (Brinidite)",
    icon: "🗺️",
    desc: "Caderno encontrado por Brinidite provando que Janeto monitorava os horários e paradas do Ônibus 1972."
  },
  laudo_bagageiro: {
    id: "laudo_bagageiro",
    title: "Laudo do Bagageiro (Edilias)",
    icon: "🔍",
    desc: "Perícia do mecânico Edilias confirmando a tentativa de corte na alça da mochila no compartimento do ônibus."
  },
  apito_joao: {
    id: "apito_joao",
    title: "Apito Esportivo de João",
    icon: "🔊",
    desc: "Usado por João Alegria para atrair o espião Janeto usando uma mochila de isca."
  },
  rede_amelia: {
    id: "rede_amelia",
    title: "Rede de Caça de Amélia",
    icon: "🕸️",
    desc: "Armadilha de contenção instalada por Amélia na figueira centenária."
  },
  mandado_beredito: {
    id: "mandado_beredito",
    title: "Mandado de Segurança Nacional",
    icon: "⚖️",
    desc: "Expedido pelo Policial Beredito após Peter extrair as gravações do monitoramento de Janeto."
  }
};

// Base Data: Endings Definition
const ENDINGS = {
  ending1: {
    id: "ending1",
    code: "FINAL 1",
    title: "Prisão de Janeto por Espionagem (Vitória Perfeita)",
    badge: "⚖️",
    desc: "Flagrante de segurança nacional! João atraiu Janeto com a mochila falsa, a rede de Amélia o prendeu na figueira e o Policial Beredito efetuou a prisão oficial. Os documentos do governo foram salvos e a expedição de Bernadete seguiu segura!"
  },
  ending2: {
    id: "ending2",
    code: "FINAL 2",
    title: "Fuga do Espião",
    badge: "🚨",
    desc: "Janeto assustou-se com os holofotes de Tony e fugiu na escuridão, mas deixou caindo no pátio o caderno com as rotas monitoradas do 1972."
  },
  ending3: {
    id: "ending3",
    code: "FINAL 3",
    title: "Perseguição na Rota da Serra",
    badge: "⛰️",
    desc: "Janeto arrancou uma página do dossiê e fugiu para a montanha. O Policial Beredito, o motorista Tony e Frederico entram no 1972 para uma caçada policial!"
  },
  ending4: {
    id: "ending4",
    code: "FINAL 4",
    title: "O Relógio 00:00 (Reinício Policial)",
    badge: "🌀",
    desc: "Ao ser encurralado, Janeto acionou o painel do 1972, disparando o laço temporal de 2005. O tempo reseta mantendo todos os documentos e provas no diário do Policial Beredito!"
  },
  ending5: {
    id: "ending5",
    code: "FINAL 5",
    title: "Confissão de Janeto e Custódia (Final Secreto)",
    badge: "🌟",
    desc: "Confrontado por Beredito e Frederico com o dossiê, Janeto confessa que tentava impedir um colapso temporal. Beredito autoriza que ele viaje sob custódia policial!"
  }
};

// Base Data: Story Nodes (Caso do Experimento 2005)
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
      <p>O lendário <strong>Ônibus 1972</strong> estava pronto para a aula de campo da professora <strong>Bernadete</strong>. Mas havia um segredo: o passageiro <strong>Frederico</strong> carregava em sua mochila os documentos confidenciais de um <strong>Experimento do Governo</strong> ligado às anomalias da Serra da Lua.</p>
      <p>Às 00:00, o alarme disparou! Um indivíduo tentava violar a trava do bagageiro para furtar a mochila! Chico acionou o motorista <strong>Tony</strong> e a Polícia Militar.</p>
    `,
    choices: [
      {
        text: "Notificar o motorista Tony e aguardar a chegada do Policial Beredito.",
        target: "node02"
      },
      {
        text: "Inspecionar o pátio com a testemunha Valdinete antes da polícia chegar.",
        target: "node01_stealth",
        addClue: "mochila_experimento"
      }
    ]
  },

  node01_stealth: {
    id: "node01_stealth",
    chapter: "CAPÍTULO I",
    title: "O Monitoramento da Rota do 1972",
    time: "00:03 AM",
    location: "📍 Pátio Externo - Bagageiro do 1972",
    camera: "CAM 04 &bull; BAGAGEIRO",
    avatars: ["Chico (Guardinha)", "Valdinete"],
    text: `
      <p>Acompanhado da moradora <strong>Valdinete</strong>, o guardinha Chico aproximou-se do bagageiro do 1972.</p>
      <p>Valdinete apontou para a sombra com uma câmera e um caderno:</p>
      <blockquote>"Chico! Aquele é o <strong>Janeto</strong>! Ele passou as últimas semanas no ponto central <strong>monitorando a rota exata deste ônibus</strong>! Ele descobriu que a mochila do experimento do governo estaria aqui hoje!"</blockquote>
    `,
    choices: [
      {
        text: "Entregar as informações do monitoramento ao Policial Beredito.",
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
    avatars: ["Policial Beredito", "Tony", "Edilias", "Frederico"],
    text: `
      <p>A viatura da Polícia Militar encostou na garagem. O <strong>Policial Beredito</strong> assumiu o comando das investigações de 2005.</p>
      <p>O mecânico <strong>Edilias</strong> e o passageiro <strong>Frederico</strong> mostraram a trava cortada:</p>
      <blockquote>"Policial Beredito! O espião tentou cortar a alça da minha mochila onde guardo os relatórios do Experimento do Governo!" — explicou Frederico.</blockquote>
      <blockquote>"Analisei as lâminas usadas! Foram cortes cirúrgicos feitos por alguém que acompanhava cada parada da rota!" — atestou Edilias.</blockquote>
    `,
    choices: [
      {
        text: "Reunir todos os passageiros no 1972 para o interrogatório oficial de Beredito.",
        target: "node03",
        addClue: "laudo_bagageiro"
      },
      {
        text: "Tony acende os faróis para tentar pegar o espião no flagra.",
        target: "node02_farois"
      }
    ]
  },

  node02_farois: {
    id: "node02_farois",
    chapter: "CAPÍTULO I",
    title: "Fuga do Espião Janeto",
    time: "00:08 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM 04 &bull; FACHADA",
    avatars: ["Policial Beredito", "Tony"],
    text: `
      <p>Tony acendeu os faróis do 1972. Assustado, Janeto saiu correndo e saltou a cerca, deixando cair o mapa com as anotações da rota do ônibus.</p>
      <p>A mochila do governo ficou segura, mas Janeto escapou na escuridão...</p>
    `,
    choices: [
      {
        text: "Registrar a ocorrência e recolher o mapa de rotas. (Conclui com Final 2)",
        target: "node_ending2"
      }
    ]
  },

  node03: {
    id: "node03",
    chapter: "CAPÍTULO II",
    title: "Interrogatório do Caso do Governo",
    time: "00:12 AM",
    location: "📍 Interior do Ônibus 1972",
    camera: "CAM 05 &bull; INTERROGATÓRIO",
    avatars: ["Policial Beredito", "Bernadete", "Janeto", "Brinidite", "Louise"],
    text: `
      <p>O Policial Beredito reuniu a professora <strong>Bernadete</strong>, <strong>Janeto</strong>, <strong>Louise</strong>, <strong>Brinidite</strong>, <strong>Peter</strong> e os alunos dentro do 1972.</p>
      <p>A passageira <strong>Brinidite</strong> entregou um caderno com anotações de horários:</p>
      <blockquote>"Policial Beredito! Encontrei este caderno no corredor com todos os horários e paradas do 1972 anotados por <strong>Janeto</strong>! Ele sabia exatamente em qual parada a mochila de Frederico entraria!"</blockquote>
      <p><strong>Louise</strong> acionou a frequência de rádio da polícia enquanto <strong>Peter</strong> ajudava a decodificar as gravações.</p>
    `,
    choices: [
      {
        text: "Aprovar a corrida de João Alegria usando uma mochila falsa de isca para atrair Janeto.",
        target: "node04_joao",
        addClue: "mapa_rota_janeto",
        addClue2: "apito_joao"
      },
      {
        text: "Instalar a rede de caça de Amélia na figueira para neutralizar o espião.",
        target: "node04_amelia",
        addClue: "mapa_rota_janeto",
        addClue2: "rede_amelia"
      },
      {
        text: "⚖️ [LAUDO DO BAGAGEIRO] Beredito analisa o dossiê para expedir o Mandado de Segurança Nacional!",
        target: "node03_banco19",
        reqClue: "laudo_bagageiro"
      }
    ]
  },

  node03_banco19: {
    id: "node03_banco19",
    chapter: "CAPÍTULO RECURSIVO",
    title: "Mandado de Segurança Nacional",
    time: "00:15 AM",
    location: "📍 Bagageiro do 1972 - Perícia",
    camera: "CAM 05 &bull; PERÍCIA",
    avatars: ["Policial Beredito", "Peter", "Frederico"],
    text: `
      <p>Com o auxílio de <strong>Peter</strong> e os relatórios de <strong>Frederico</strong>, o Policial Beredito comprovou a tentativa de roubo de segredos de estado.</p>
      <blockquote>"Com este laudo e o histórico de monitoramento de Janeto, este caso passa a ser enquadrado como crime de segurança nacional!" — decretou o Policial Beredito.</blockquote>
    `,
    choices: [
      {
        text: "Iniciar o cerco de flagrante policial com Beredito, João e Amélia!",
        target: "node04_plano_mestre",
        addClue: "mandado_beredito"
      }
    ]
  },

  node04_joao: {
    id: "node04_joao",
    chapter: "CAPÍTULO III",
    title: "Operação Isca com a Mochila Falsa",
    time: "00:17 AM",
    location: "📍 Pátio Central da Garagem",
    camera: "CAM 03 &bull; PÁTIO",
    avatars: ["João Alegria", "Janeto"],
    text: `
      <p>João Alegria correu pelo pátio segurando uma mochila preta idêntica e apitando forte!</p>
      <blockquote>"Ei, Janeto! Você passou semanas monitorando a rota do 1972, mas a mochila do experimento tá comigo! Vem pegar se tiver coragem!" — desafiou João!</blockquote>
      <p>Cego pelo desejo de obter os documentos do governo, Janeto disparou atrás de João rumo à figueira!</p>
    `,
    choices: [
      {
        text: "Guiar Janeto direto para a área da rede de Amélia.",
        target: "node05_confronto"
      },
      {
        text: "Janeto desvia tentando invadir o motor do 1972.",
        target: "node_loop_trigger"
      }
    ]
  },

  node04_amelia: {
    id: "node04_amelia",
    chapter: "CAPÍTULO III",
    title: "Armadilha de Amélia na Figueira",
    time: "00:18 AM",
    location: "📍 Figueira Centenária",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Amélia", "Louise", "Chico"],
    text: `
      <p>Amélia e Chico posicionaram a rede de caça nos galhos altos, enquanto Louise monitorava os rádios da polícia militar.</p>
    `,
    choices: [
      {
        text: "Sincronizar o apito de João com a liberação da rede.",
        target: "node05_confronto"
      }
    ]
  },

  node04_plano_mestre: {
    id: "node04_plano_mestre",
    chapter: "CAPÍTULO POLICIAL",
    title: "O Cerco Policial ao Espião",
    time: "00:20 AM",
    location: "📍 Pátio da Figueira",
    camera: "CAM MESTRE &bull; FLAGRANTE",
    avatars: ["Policial Beredito", "Janeto", "Frederico"],
    text: `
      <p>Com o mandado assinado, a isca de João e a armadilha de Amélia, a equipe encurralou o espião Janeto!</p>
    `,
    choices: [
      {
        text: "Policial Beredito efetua a Prisão por Espionagem em Flagrante! (Final 1)",
        target: "node_ending1"
      },
      {
        text: "Permitir que Frederico e Bernadete ouçam a confissão de Janeto. (Final 5)",
        target: "node_ending5"
      }
    ]
  },

  node05_confronto: {
    id: "node05_confronto",
    chapter: "CLÍMAX DE 2005",
    title: "O Flagrante na Figueira",
    time: "00:22 AM",
    location: "📍 Sob a Figueira",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Policial Beredito", "Janeto", "Amélia", "João"],
    text: `
      <p>Janeto correu atrás da mochila de João e afundou no buraco camuflado por Amélia!</p>
      <p>A rede despencou dos galhos e o Policial Beredito deu voz de prisão com a sirene policial ligada!</p>
    `,
    choices: [
      {
        text: "⚖️ [EXIGE MANDADO OU REDE] Policial Beredito encerra o caso com a recuperação do dossiê! (Final 1)",
        target: "node_ending1",
        reqClue: "rede_amelia"
      },
      {
        text: "Janeto tenta rasgar a rede e fugir rumo à montanha. (Final 3)",
        target: "node_ending3"
      },
      {
        text: "Janeto corre para a ignição do 1972.",
        target: "node_loop_trigger"
      }
    ]
  },

  node_loop_trigger: {
    id: "node_loop_trigger",
    chapter: "LAÇO TEMPORAL 2005",
    title: "O Eco do Relógio do Experimento",
    time: "00:25 AM",
    location: "📍 Painel do Ônibus 1972",
    camera: "CAM 00 &bull; LOOP ANOMALY",
    avatars: ["Relógio Quântico 1972"],
    text: `
      <p>Janeto ligou a chave mestra do 1972. A ressonância do experimento temporal contido na mochila disparou o alarme quântico!</p>
      <p>O tempo retrocedeu para as 00:00 de 2005, mas todas as provas e mapas da rota continuam guardados no caderno do Policial Beredito!</p>
    `,
    isLoopReset: true,
    choices: [
      {
        text: "🌀 Reiniciar o Loop de 2005 (Mantendo Evidências do Experimento)",
        target: "node01"
      }
    ]
  },

  // ENDINGS
  node_ending1: {
    id: "node_ending1",
    chapter: "DESFECHO POLICIAL",
    title: "FINAL 1 — Prisão de Janeto por Espionagem",
    time: "00:35 AM",
    location: "📍 Garagem Municipal - Flagrante",
    camera: "CAM OK &bull; PRISÃO 2005",
    avatars: ["Policial Beredito", "Janeto", "Frederico", "Bernadete"],
    endingId: "ending1",
    text: `
      <p>⚖️ <strong>VITÓRIA DE SEGURANÇA NACIONAL!</strong></p>
      <p>O Policial Beredito algemou <strong>Janeto</strong> em flagrante na figueira!</p>
      <p>Os documentos confidenciais do Experimento do Governo na mochila de Frederico foram recuperados intactos. A professora Bernadete, o motorista Tony e todos os passageiros embarcaram felizes no Ônibus 1972 rumo à Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Jogar Novamente / Testar Outras Decisões", target: "node01", isRestart: true }
    ]
  },

  node_ending2: {
    id: "node_ending2",
    chapter: "DESFECHO PARCIAL",
    title: "FINAL 2 — Fuga do Espião",
    time: "00:30 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM OK &bull; BOLETIM",
    avatars: ["Policial Beredito", "Chico"],
    endingId: "ending2",
    text: `
      <p>🚨 <strong>VITÓRIA PARCIAL!</strong></p>
      <p>Janeto fugiu na escuridão, mas deixou cair o mapa com as rotas monitoradas do 1972. A mochila do experimento ficou segura com Frederico.</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Loop de 2005 para Prender Janeto em Flagrante", target: "node01", isRestart: true }
    ]
  },

  node_ending3: {
    id: "node_ending3",
    chapter: "DESFECHO DE AVENTURA",
    title: "FINAL 3 — Perseguição na Rota da Serra",
    time: "00:40 AM",
    location: "📍 Estrada da Serra da Lua",
    camera: "CAM 07 &bull; PERSEGUIÇÃO",
    avatars: ["Policial Beredito", "Tony", "Frederico"],
    endingId: "ending3",
    text: `
      <p>⛰️ <strong>PERSEGUIÇÃO NA ROTA DA MONTANHA!</strong></p>
      <p>Janeto arrancou uma página do dossiê e fugiu. Beredito, Tony e Frederico sobem no 1972 para uma caçada policial na rota da serra!</p>
    `,
    choices: [
      { text: "🔄 Tentar Novamente a Captura na Garagem", target: "node01", isRestart: true }
    ]
  },

  node_ending5: {
    id: "node_ending5",
    chapter: "DESFECHO SECCIONAL",
    title: "FINAL 5 — Confissão de Janeto e Custódia",
    time: "01:00 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM OK &bull; CONFISSÃO",
    avatars: ["Policial Beredito", "Janeto", "Frederico", "Bernadete"],
    endingId: "ending5",
    text: `
      <p>🌟 <strong>FINAL SECRETO DE REDENÇÃO!</strong></p>
      <p>Janeto confessou que temia os perigos do experimento do governo e queria evitar um colapso na serra. Beredito autoriza que ele viaje sob custódia policial para auxiliar a equipe!</p>
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
