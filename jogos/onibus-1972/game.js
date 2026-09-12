/* ===================================================
   ÔNIBUS 1972 — MOTOR DE JOGO NARRATIVO RECURSIVO
   =================================================== */

// Base Data: Clues Definition
const CLUES = {
  lanterna_chico: {
    id: "lanterna_chico",
    title: "Lanterna de Alta Potência",
    icon: "🔦",
    desc: "A pesada lanterna de foco duplo do Sr. Chico. Útil para iluminar a figueira ou cegar alvos na escuridão."
  },
  alicate_codificado: {
    id: "alicate_codificado",
    title: "Segredo das Trancas de 1972",
    icon: "🔧",
    desc: "Informação ouvida de Pietrão: os invasores não querem roubar peças do motor, mas abrir o cofre do banco 19."
  },
  apito_joao: {
    id: "apito_joao",
    title: "Apito Esportivo de João",
    icon: "🔊",
    desc: "Usado por João Alegria para emitir sinais sonoros de alta frequência durante a corrida de atração da isca."
  },
  rede_reforcada: {
    id: "rede_reforcada",
    title: "Rede de Caça de Amélia",
    icon: "🕸️",
    desc: "Rede trançada presa aos galhos da figueira com uma roldana de desengate rápido. Garante 100% de contenção."
  },
  mapa_serra_lua: {
    id: "mapa_serra_lua",
    title: "Mapa Secreto da Serra da Lua (1972)",
    icon: "📜",
    desc: "Encontrado sob a espuma do banco 19. Revela coordenadas antigas e a verdadeira motivação da invasão."
  },
  plano_mestre_docs: {
    id: "plano_mestre_docs",
    title: "Esquema do Cerco Perfeito",
    icon: "🎯",
    desc: "Combinação sincronizada da isca, armadilha, holofotes e revelação do segredo. Garante a vitória impecável."
  }
};

// Base Data: Endings Definition
const ENDINGS = {
  ending1: {
    id: "ending1",
    code: "FINAL 1",
    title: "Plano Mestre Impecável (Vitória Perfeita)",
    badge: "🏆",
    desc: "Sincronia total! João atraiu a dupla, a rede de Amélia os capturou intactos e Chico acendeu os holofotes. O mapa foi recuperado e a viagem para a Serra da Lua será inesquecível!"
  },
  ending2: {
    id: "ending2",
    code: "FINAL 2",
    title: "Alarme da Garagem (Fuga Prematura)",
    badge: "🚨",
    desc: "Os holofotes assustaram Carlão e Pietrão antes da captura. O ônibus ficou em segurança, mas o mistério de 1972 permaneceu sem solução."
  },
  ending3: {
    id: "ending3",
    code: "FINAL 3",
    title: "A Trilha da Serra da Lua (Perseguição)",
    badge: "⛰️",
    desc: "Pietrão caiu na armadilha, mas Carlão fugiu para a serra com metade do mapa. Teny e os alunos decidem usar a aula de campo para seguir as pistas na montanha!"
  },
  ending4: {
    id: "ending4",
    code: "FINAL 4",
    title: "O Laço Temporal das 00:00",
    badge: "🌀",
    desc: "Carlão conseguiu dar partida no 1972, acionando o alarme quântico do ônibus. O tempo resetou para meia-noite, mantendo suas memórias e evidências!"
  },
  ending5: {
    id: "ending5",
    code: "FINAL 5",
    title: "A Sociedade do Ônibus 1972 (Final Secreto)",
    badge: "🌟",
    desc: "Ao apresentar o Mapa de 1972, Teny descobre que Carlão era filho do mecânico original. Eles formam uma aliança histórica para explorar a Serra da Lua juntos!"
  }
};

// Base Data: Story Nodes
const NODES = {
  node01: {
    id: "node01",
    chapter: "PRÓLOGO",
    title: "O Alerta das 00:00",
    time: "00:00 AM",
    location: "📍 Garagem Municipal - Guarita",
    camera: "CAM 01 &bull; PÁTIO",
    avatars: ["Sr. Chico"],
    text: `
      <p>O silêncio da meia-noite na garagem municipal de São Pedro das Missões foi subitamente quebrado pelo <strong>bipe agudo e contínuo</strong> do sistema de vigilância.</p>
      <p>O guarda noturno, <strong>Senhor Chico</strong>, acordou sobressaltado da cadeira de balanço. Esfregando os olhos, ele olhou para o monitor CRT de fósforo verde da câmera 04. No canto inferior da tela, próximo ao lendário <strong>Ônibus 1972</strong> — o veículo escolhido para a aula de campo na Serra da Lua —, duas sombras encapuzadas tentavam forçar a tranca lateral com um cabo metálico.</p>
      <blockquote>"Mas o que é isso? Ninguém mexe no 1972 na minha guarda!" — resmungou Chico.</blockquote>
    `,
    choices: [
      {
        text: "Ligar imediatamente para o motorista Teny (Antônio) no alojamento vizinho.",
        target: "node02"
      },
      {
        text: "Pegar a lanterna de alta potência e ir inspecionar o pátio furtivamente.",
        target: "node01_chico_stealth",
        addClue: "lanterna_chico"
      }
    ]
  },

  node01_chico_stealth: {
    id: "node01_chico_stealth",
    chapter: "CAPÍTULO I",
    title: "Inspeção Furtiva nas Sombras",
    time: "00:03 AM",
    location: "📍 Pátio Externo - Próximo ao Ônibus 1972",
    camera: "CAM 04 &bull; LATERAL 1972",
    avatars: ["Sr. Chico"],
    text: `
      <p>Apertando o cabo emborrachado da sua pesada <strong>Lanterna de Alta Potência</strong>, o Sr. Chico se esgueirou por trás das pilastras da garagem.</p>
      <p>Com o coração acelerado, ele se aproximou a poucos metros da lateral do 1972. Escondido atrás dos pneus de reserva, Chico ouviu a voz grave de Pietrão resmungar:</p>
      <blockquote>"Rápido, Carlão! O alicate tá no ponto. A gente só precisa soltar a tranca do banco 19! O mapa tá escondido debaixo do estofamento desde 1972!"</blockquote>
      <p>Chico recuou em silêncio. Ele agora tinha certeza: <em>não era um furto comum, era uma busca por algo histórico!</em></p>
    `,
    choices: [
      {
        text: "Recuar sem ser visto e ligar urgentemente para o motorista Teny.",
        target: "node02",
        addClue: "alicate_codificado"
      }
    ]
  },

  node02: {
    id: "node02",
    chapter: "CAPÍTULO I",
    title: "O Chamado de Meia-Noite",
    time: "00:05 AM",
    location: "📍 Alojamento dos Estudantes",
    camera: "CAM 02 &bull; ALOJAMENTO",
    avatars: ["Teny (Motorista)"],
    text: `
      <p>O telefone fixo do alojamento tocou de forma estridente. <strong>Teny (Antônio)</strong>, o experiente motorista do 1972, atendeu no primeiro toque.</p>
      <blockquote>"Teny! É o Chico! Tem dois homens tentando arrombar a porta do 1972 com ferramentas!" — sussurrou o guarda.</blockquote>
      <p>Teny sentiu um calafrio. O Ônibus 1972 era seu orgulho e o transporte de dezenas de alunos no dia seguinte. Ele precisava tomar uma decisão estratégica rápida.</p>
    `,
    choices: [
      {
        text: "Acordar os alunos estrategistas (João Alegria e Amélia) em silêncio para criar um plano.",
        target: "node03"
      },
      {
        text: "Correr direto para o ônibus e acender os faróis altos para assustar a dupla.",
        target: "node02_farois"
      }
    ]
  },

  node02_farois: {
    id: "node02_farois",
    chapter: "CAPÍTULO I",
    title: "Fuga Prematura",
    time: "00:08 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM 04 &bull; FACHADA",
    avatars: ["Teny (Motorista)", "Sr. Chico"],
    text: `
      <p>Teny correu até o painel principal e ligou os holofotes centrais da garagem. Uma luz amarelada ofuscante cobriu o 1972.</p>
      <p>Assustados com o estouro de luz, Carlão e Pietrão saíram em disparada em direção ao matagal da figueira, derrubando o alicate no chão.</p>
      <p>O ônibus ficou a salvo, mas a dupla escapou sem revelar o verdadeiro motivo do arrombamento...</p>
    `,
    choices: [
      {
        text: "Registrar a ocorrência na garagem. (Conclui com Final 2)",
        target: "node_ending2"
      }
    ]
  },

  node03: {
    id: "node03",
    chapter: "CAPÍTULO II",
    title: "O Conselho Secreto no Ônibus 1972",
    time: "00:10 AM",
    location: "📍 Interior do Ônibus 1972",
    camera: "CAM 05 &bull; SALÃO INTERNO",
    avatars: ["Teny", "João Alegria", "Amélia"],
    text: `
      <p>Em poucos minutos, Teny, João Alegria, Amélia e o Sr. Chico estavam reunidos no escuro do salão do 1972, comunicando-se por gestos e sussurros.</p>
      <p><strong>João Alegria</strong> foi o primeiro a sugerir uma tática de mobilidade:</p>
      <blockquote>"Se a gente apenas assustar, eles voltam amanhã. Eu coloco minha jaqueta refletiva e sirvo de <strong>isca</strong>, atraindo eles para o pátio externo!"</blockquote>
      <p><strong>Amélia</strong> apontou para o corredor lateral:</p>
      <blockquote>"E enquanto eles perseguirem o João, eu e o Chico cobrimos o buraco da figueira com grama falsa e armamos a <strong>rede suspensa</strong> nos galhos altos!"</blockquote>
    `,
    choices: [
      {
        text: "Aprovar o plano da Isca de João Alegria e preparar o apito de corrida.",
        target: "node04_joao",
        addClue: "apito_joao"
      },
      {
        text: "Focar primeiro na construção da armadilha do buraco e rede de Amélia.",
        target: "node04_amelia",
        addClue: "rede_reforcada"
      },
      {
        text: "⚠️ [EVIDÊNCIA CONSERVADA] Inspecionar o estofamento do Banco 19 antes da ação!",
        target: "node03_banco19",
        reqClue: "alicate_codificado"
      }
    ]
  },

  node03_banco19: {
    id: "node03_banco19",
    chapter: "CAPÍTULO RECURSIVO",
    title: "O Segredo Revelado do Banco 19",
    time: "00:12 AM",
    location: "📍 Fileira 10 - Banco 19",
    camera: "CAM 05 &bull; BANCO 19",
    avatars: ["Teny", "Amélia"],
    text: `
      <p>Usando a informação mantida na memória do laço temporal, Teny puxou a costura reforçada sob o assentamento do <strong>Banco 19</strong>.</p>
      <p>Com um clique metálico seco, uma escotilha secreta de aço se abriu! Dentro havia uma cápsula de alumínio datada de <strong>1972</strong> contendo o <strong>Mapa Secreto da Serra da Lua</strong> e anotações originais dos fundadores!</p>
      <blockquote>"Eles não querem roubar nada... Carlão e Pietrão querem encontrar a mina de relíquias da serra!" — exclamou Amélia.</blockquote>
    `,
    choices: [
      {
        text: "Elaborar o Esquema do Cerco Perfeito (Plano Mestre).",
        target: "node04_plano_mestre",
        addClue: "mapa_serra_lua",
        addClue2: "plano_mestre_docs"
      }
    ]
  },

  node04_joao: {
    id: "node04_joao",
    chapter: "CAPÍTULO III",
    title: "Operação Isca de João Alegria",
    time: "00:15 AM",
    location: "📍 Pátio Central da Garagem",
    camera: "CAM 03 &bull; PÁTIO CENTRAL",
    avatars: ["João Alegria", "Carlão"],
    text: `
      <p>João Alegria ajustou o apito nos dentes e surgiu subitamente diante de Carlão e Pietrão na penumbra!</p>
      <blockquote>"Ei! Vocês dois aí! Querem carona pro presídio?" — provocou João, apitando forte e correndo em velocidade rumo à figueira!</blockquote>
      <p>Irritado, Pietrão gritou: <em>"Pega ele! Esse moleque viu a gente!"</em>. A dupla partiu em perseguição direta!</p>
    `,
    choices: [
      {
        text: "Guiar a perseguição diretamente para a área da rede de Amélia.",
        target: "node05_confronto"
      },
      {
        text: "João tenta desviar para o galpão de ferramentas sem avisar o grupo.",
        target: "node_loop_trigger"
      }
    ]
  },

  node04_amelia: {
    id: "node04_amelia",
    chapter: "CAPÍTULO III",
    title: "A Engenhosidade de Amélia",
    time: "00:16 AM",
    location: "📍 Área da Figueira Centenária",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Amélia", "Sr. Chico"],
    text: `
      <p>Com destreza incrível, Amélia e o Sr. Chico cavaram uma vala rasa sob a passagem estreita dos galhos, cobrindo-a com camuflagem de grama falsa.</p>
      <p>Acima, a <strong>Rede de Caça Reforçada</strong> foi içada na roldana da árvore, pronta para ser liberada ao menor sinal.</p>
    `,
    choices: [
      {
        text: "Esperar o apito de João Alegria para liberar a roldana da rede.",
        target: "node05_confronto"
      },
      {
        text: "Acionar a rede precocemente sem a isca posicionada.",
        target: "node_ending2"
      }
    ]
  },

  node04_plano_mestre: {
    id: "node04_plano_mestre",
    chapter: "CAPÍTULO MESTRE",
    title: "O Cerco Sincronizado",
    time: "00:18 AM",
    location: "📍 Entorno do Ônibus 1972",
    camera: "CAM MESTRE &bull; 1972",
    avatars: ["Teny", "João Alegria", "Amélia", "Sr. Chico"],
    text: `
      <p>Possuindo o <strong>Mapa da Serra da Lua</strong> e todas as evidências em mãos, a equipe atingiu a maestria tática total!</p>
      <p>João atraiu Pietrão para a vala camuflada de Amélia, enquanto Teny e Chico cercaram Carlão com a exibição do mapa original.</p>
    `,
    choices: [
      {
        text: "Capturar a dupla na armadilha perfeita e recuperar o legado intacto! (Final 1)",
        target: "node_ending1"
      },
      {
        text: "Confrontar Carlão pacificamente com o Diário Secreto de 1972. (Final 5)",
        target: "node_ending5"
      }
    ]
  },

  node05_confronto: {
    id: "node05_confronto",
    chapter: "CLÍMAX",
    title: "O Momento Decisivo na Figueira",
    time: "00:20 AM",
    location: "📍 Sob os Galhos da Figueira",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["João Alegria", "Amélia", "Pietrão", "Carlão"],
    text: `
      <p>Os passos pesados de Pietrão ecoaram sobre a relva. João Alegria deu um salto lateral preciso!</p>
      <p>Pietrão pisou direto sobre a grama falsa e afundou na vala! No segundo seguinte, Amélia puxou a corda de trava e a <strong>Rede de Caça</strong> despencou dos galhos da figueira, envolvendo o invasor!</p>
      <p>Carlão parou assustado a poucos passos de distância, hesitando entre lutar ou fugir para a serra!</p>
    `,
    choices: [
      {
        text: "⚡ [EXIGE REDE & APITO] Usar os holofotes de Chico para imobilizar Carlão também! (Final 1)",
        target: "node_ending1",
        reqClue: "rede_reforcada"
      },
      {
        text: "Cercar Pietrão enquanto Carlão foge para o matagal da montanha. (Final 3)",
        target: "node_ending3"
      },
      {
        text: "Tentar luta corporal desarmada na escuridão.",
        target: "node_loop_trigger"
      }
    ]
  },

  node_loop_trigger: {
    id: "node_loop_trigger",
    chapter: "LAÇO TEMPORAL",
    title: "O Eco do Relógio 00:00",
    time: "00:22 AM",
    location: "📍 Painel Digital do Ônibus 1972",
    camera: "CAM 00 &bull; LOOP ANOMALY",
    avatars: ["Relógio Quântico 1972"],
    text: `
      <p>Um erro de sincronia permitiu que Carlão girasse a chave mestra no painel do 1972. Ao ligar a ignição, o sistema vintage de relógio e ignição do ônibus emitiu um <strong>ressonante alarme cronológico</strong>!</p>
      <p>Os faróis piscaram em ciano e o ponteiro do tempo começou a rodar para trás com velocidade vertiginosa!</p>
      <blockquote>"O tempo tá voltando! Guardem as pistas!" — gritou a voz de Teny ecoando nas sombras.</blockquote>
    `,
    isLoopReset: true,
    choices: [
      {
        text: "🌀 Reiniciar o Loop às 00:00 (Conservando Evidências Coletadas)",
        target: "node01"
      }
    ]
  },

  // ENDINGS
  node_ending1: {
    id: "node_ending1",
    chapter: "DESFECHO",
    title: "FINAL 1 — Plano Mestre Impecável",
    time: "00:30 AM",
    location: "📍 Garagem Municipal - Vitória",
    camera: "CAM OK &bull; EXPOSIÇÃO",
    avatars: ["Teny", "João", "Amélia", "Chico"],
    endingId: "ending1",
    text: `
      <p>🎉 <strong>VITÓRIA PERFEITA!</strong></p>
      <p>Com a coordenação cirúrgica de João Alegria, Amélia, Sr. Chico e Teny, Carlão e Pietrão foram completamente neutralizados e contidos até a chegada da inspetoria!</p>
      <p>O <strong>Mapa Secreto de 1972</strong> foi preservado, liberando a rota mais fascinante para a aula de campo na Serra da Lua. Toda a turma comemorou o triunfo do trabalho em equipe!</p>
    `,
    choices: [
      { text: "🔄 Jogar Novamente / Explorar Outros Caminhos", target: "node01", isRestart: true }
    ]
  },

  node_ending2: {
    id: "node_ending2",
    chapter: "DESFECHO",
    title: "FINAL 2 — Alarme da Garagem",
    time: "00:25 AM",
    location: "📍 Garagem Municipal",
    camera: "CAM OK &bull; SEGURA",
    avatars: ["Sr. Chico", "Teny"],
    endingId: "ending2",
    text: `
      <p>🚨 <strong>VITÓRIA PARCIAL!</strong></p>
      <p>O acionamento precoce das luzes e alarmes colocou os invasores em fuga. O Ônibus 1972 ficou seguro para a viagem, porém o mistério do Banco 19 continuou oculto nas sombras.</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Loop para Descobrir o Segredo Oculto", target: "node01", isRestart: true }
    ]
  },

  node_ending3: {
    id: "node_ending3",
    chapter: "DESFECHO",
    title: "FINAL 3 — A Trilha da Serra da Lua",
    time: "00:35 AM",
    location: "📍 Entrada da Serra da Lua",
    camera: "CAM 07 &bull; TRILHA",
    avatars: ["Teny", "João Alegria"],
    endingId: "ending3",
    text: `
      <p>⛰️ <strong>FINAL ABERTO DE AVENTURA!</strong></p>
      <p>Pietrão foi detido na armadilha da figueira, mas Carlão conseguiu se embrenhar na mata da montanha levando parte das anotações.</p>
      <p>Teny e os alunos decidem transformar a aula de campo em uma emocionante expedição investigativa na Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Tentar Novamente para Capturar Ambos", target: "node01", isRestart: true }
    ]
  },

  node_ending5: {
    id: "node_ending5",
    chapter: "DESFECHO SECCIONAL",
    title: "FINAL 5 — A Sociedade do Ônibus 1972",
    time: "01:00 AM",
    location: "📍 Salão Principal de 1972",
    camera: "CAM OK &bull; SOCIEDADE",
    avatars: ["Teny", "Carlão", "Amélia"],
    endingId: "ending5",
    text: `
      <p>🌟 <strong>DESFECHO LENDÁRIO E RECURSIVO!</strong></p>
      <p>Ao exibir o Diário de Bordo e o Mapa de 1972, Teny descobriu a verdade: Carlão era filho do mecânico pioneiro de 1972, buscando provar as descobertas científicas de seu pai!</p>
      <p>Em vez de conflito, o grupo firmou uma aliança histórica! Carlão juntou-se à viagem como guia especialista da Serra da Lua, revelando segredos incríveis aos alunos!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência Narrativa", target: "node01", isRestart: true }
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

  // Dynamic Graphic Illustration Renderer (SVG)
  renderSceneSVG(node) {
    const container = document.getElementById("sceneIllustration");
    let svgContent = "";

    if (node.id.includes("chico_stealth") || node.id === "node01") {
      // Night bus garage with headlights & flashlight beam
      svgContent = `
        <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#020617"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
            <radialGradient id="lightBeam" cx="20%" cy="80%" r="70%">
              <stop offset="0%" stop-color="rgba(251, 191, 36, 0.4)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
          </defs>
          <rect width="600" height="450" fill="url(#skyGrad)"/>
          <!-- Moon -->
          <circle cx="500" cy="70" r="35" fill="#e2e8f0" opacity="0.8"/>
          <!-- Bus 1972 Silhouette -->
          <path d="M 120 200 Q 140 180 180 180 L 480 180 Q 520 180 530 220 L 530 360 L 120 360 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <!-- Bus Windows -->
          <rect x="150" y="210" width="70" height="45" fill="#38bdf8" opacity="0.3" rx="4"/>
          <rect x="235" y="210" width="70" height="45" fill="#38bdf8" opacity="0.3" rx="4"/>
          <rect x="320" y="210" width="70" height="45" fill="#38bdf8" opacity="0.3" rx="4"/>
          <rect x="405" y="210" width="70" height="45" fill="#38bdf8" opacity="0.3" rx="4"/>
          <!-- 1972 Text on Bus -->
          <text x="280" y="310" fill="#fbbf24" font-family="Cinzel" font-size="28" font-weight="900">ÔNIBUS 1972</text>
          <!-- Wheels -->
          <circle cx="200" cy="360" r="30" fill="#090d16" stroke="#475569" stroke-width="4"/>
          <circle cx="450" cy="360" r="30" fill="#090d16" stroke="#475569" stroke-width="4"/>
          <!-- Light Cone -->
          <polygon points="50,400 350,220 380,300" fill="url(#lightBeam)"/>
          <!-- Flashlight Icon -->
          <circle cx="60" cy="400" r="8" fill="#fbbf24"/>
        </svg>
      `;
    } else if (node.id.includes("banco19") || node.id.includes("plano_mestre")) {
      // Secret compartment & vintage map
      svgContent = `
        <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#0f172a"/>
          <!-- Seat Frame -->
          <rect x="100" y="80" width="400" height="280" rx="16" fill="#1e293b" stroke="#fbbf24" stroke-width="3"/>
          <text x="140" y="130" fill="#fbbf24" font-family="Outfit" font-size="22" font-weight="700">BANCO 19 — COMPARTIMENTO SECRETO</text>
          <!-- Map Parchment -->
          <rect x="160" y="160" width="280" height="160" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
          <path d="M 180 200 Q 240 180 300 240 T 420 220" fill="none" stroke="#b45309" stroke-width="3" stroke-dasharray="6,4"/>
          <circle cx="420" cy="220" r="10" fill="#ef4444"/>
          <text x="360" y="250" fill="#991b1b" font-family="Cinzel" font-size="14" font-weight="700">Serra da Lua</text>
        </svg>
      `;
    } else if (node.id.includes("amelia") || node.id.includes("confronto") || node.id.includes("ending1")) {
      // Tree net trap under moonlight
      svgContent = `
        <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#020617"/>
          <!-- Tree Trunk -->
          <path d="M 400 450 L 440 200 L 520 100 Q 420 80 350 150 Z" fill="#1e293b"/>
          <!-- Net Matrix -->
          <path d="M 150 120 L 350 120 L 320 280 L 180 280 Z" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-dasharray="10,6"/>
          <!-- Pitfall Trap -->
          <ellipse cx="250" cy="380" rx="120" ry="30" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
          <text x="180" y="385" fill="#38bdf8" font-family="Outfit" font-size="14">ARMADILHA DO BURACO</text>
        </svg>
      `;
    } else {
      // Default Nocturnal Bus Visual
      svgContent = `
        <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="450" fill="#090d16"/>
          <circle cx="300" cy="225" r="140" fill="#0f172a" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,4"/>
          <text x="300" y="220" text-anchor="middle" fill="#fbbf24" font-family="Cinzel" font-size="28" font-weight="900">ÔNIBUS 1972</text>
          <text x="300" y="250" text-anchor="middle" fill="#94a3b8" font-family="Outfit" font-size="14">GARAGEM DA SERRA DA LUA</text>
        </svg>
      `;
    }

    container.innerHTML = svgContent;
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
