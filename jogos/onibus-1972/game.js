/* ===================================================================
   ÔNIBUS 1972 — MOTOR NÃO-LINEAR RECURSIVO (HUB & TRAMAS CRUZADAS)
   =================================================================== */

// Base Data: Intertwined Clues Definition
const CLUES = {
  depoimento_valdinete: {
    id: "depoimento_valdinete",
    title: "Testemunho de Valdinete",
    icon: "👁️",
    desc: "Valdinete afirma ter visto Janeto fotografando a rota do 1972 com um caderno nas mãos às 23h."
  },
  codigo_radio_louise: {
    id: "codigo_radio_louise",
    title: "Frequência de Rádio de Louise",
    icon: "📻",
    desc: "Código de transmissão captado por Louise. Permite sincronizar o áudio das câmeras com o terminal."
  },
  video_restaurado_peter: {
    id: "video_restaurado_peter",
    title: "Vídeo Restaurado da Câmera 04",
    icon: "📼",
    desc: "Frames recuperados por Peter exibindo a silhueta de Janeto violando a trava do bagageiro."
  },
  caderno_rotas_janeto: {
    id: "caderno_rotas_janeto",
    title: "Caderno da Rota do 1972 (Brinidite)",
    icon: "🗺️",
    desc: "Anotações encontradas por Brinidite provando que Janeto monitorou a viagem por semanas."
  },
  laudo_bagageiro_edilias: {
    id: "laudo_bagageiro_edilias",
    title: "Laudo Pericial de Edilias",
    icon: "🔍",
    desc: "Perícia de Edilias atestando corte com lâmina militar na trava da mochila de Frederico."
  },
  mandado_seguranca: {
    id: "mandado_seguranca",
    title: "Mandado de Prisão por Espionagem",
    icon: "⚖️",
    desc: "Expedido pelo Policial Beredito após o cruzamento de todas as provas das 4 tramas!"
  }
};

// Base Data: Endings Definition
const ENDINGS = {
  ending1: {
    id: "ending1",
    code: "FINAL 1",
    title: "Prisão por Espionagem (Vitória Perfeita)",
    badge: "⚖️",
    desc: "Flagrante perfeito! O Policial Beredito usou o cruzamento das 4 tramas para algemar Janeto na figueira, recuperando a mochila do experimento de Frederico intacta!"
  },
  ending2: {
    id: "ending2",
    code: "FINAL 2",
    title: "Erro Judiciário (Falso Culpado)",
    badge: "❌",
    desc: "Beredito acusou o suspeito errado antes de cruzar as provas. Janeto escapou com a mochila e o relógio do 1972 acionou o laço temporal!"
  },
  ending3: {
    id: "ending3",
    code: "FINAL 3",
    title: "Perseguição na Rota da Serra",
    badge: "⛰️",
    desc: "Janeto fugiu pela estrada com parte do dossiê. Beredito, Tony e Frederico embarcam no 1972 para uma caçada policial!"
  },
  ending4: {
    id: "ending4",
    code: "FINAL 4",
    title: "A Revelação do Relógio de 1972 (Final Secreto)",
    badge: "🌌",
    desc: "Descobriu-se que a mochila do experimento reage com o protótipo quântico no painel do 1972, revelando o segredo da anomalia temporal!"
  },
  ending5: {
    id: "ending5",
    code: "FINAL 5",
    title: "Fuga do Espião",
    badge: "🚨",
    desc: "Luzes precipitadas assustaram Janeto, que fugiu na escuridão mas deixou o caderno de rotas caindo no pátio."
  },
  ending6: {
    id: "ending6",
    code: "FINAL 6",
    title: "O Relógio 00:00 (Reinício Policial)",
    badge: "🌀",
    desc: "Ao ser encurralado, Janeto acionou a ignição do 1972, disparando o laço temporal de 2005. O tempo reseta com todas as provas guardadas!"
  },
  ending7: {
    id: "ending7",
    code: "FINAL 7",
    title: "Confissão e Custódia Policial",
    badge: "🌟",
    desc: "Janeto confessou seus motivos e concordou em viajar para a Serra da Lua sob custódia oficial do Policial Beredito."
  }
};

// Base Data: Story Nodes (Matriz Não-Linear de Hub)
const NODES = {
  // CENTRAL HUB OF BEREDITO
  node01: {
    id: "node01",
    chapter: "CENTRAL DE INVESTIGAÇÃO (2005)",
    title: "O Hub Policial da Garagem",
    time: "00:00 AM",
    location: "📍 Garagem Municipal - Mesa de Beredito",
    camera: "CAM 00 &bull; CENTRAL DE COMANDO",
    avatars: ["Policial Beredito", "Chico", "Tony"],
    text: `
      <p>Na gelada madrugada de <strong>2005</strong>, o <strong>Policial Beredito</strong> instalou seu posto de comando na guarita da garagem municipal.</p>
      <p>O <strong>Ônibus 1972</strong> está pronto para a viagem da professora <strong>Bernadete</strong>. Mas às 00:00, o alarme disparou! Alguém tentou roubar a mochila do passageiro <strong>Frederico</strong> contendo documentos do <strong>Experimento do Governo</strong>.</p>
      <p>O guardinha <strong>Chico</strong> e o motorista <strong>Tony</strong> aguardam suas ordens. Escolha qual frente de investigação examinar agora:</p>
    `,
    choices: [
      {
        text: "💼 [TRAMA 1] Periciar o Bagageiro e a Mochila com Frederico e Edilias.",
        target: "node_trama1"
      },
      {
        text: "📼 [TRAMA 2] Ir ao Terminal de Vídeo CRT examinar as gravações com Peter.",
        target: "node_trama2"
      },
      {
        text: "📻 [TRAMA 3] Interrogar os passageiros (Janeto, Louise, Brinidite) no salão do 1972.",
        target: "node_trama3"
      },
      {
        text: "🌲 [TRAMA 4] Inspecionar a área externa da figueira com Valdinete, João e Amélia.",
        target: "node_trama4"
      },
      {
        text: "⚖️ [EMITIR MANDADO POLICIAL] Cruzar todas as provas coletadas para o cerco final!",
        target: "node_expedir_mandado",
        reqClue: "video_restaurado_peter"
      }
    ]
  },

  // TRAMA 1: MOCHILA & EXPERIMENTO
  node_trama1: {
    id: "node_trama1",
    chapter: "TRAMA 1 — O DOSSIÊ DO GOVERNO",
    title: "A Perícia na Mochila de Frederico",
    time: "00:05 AM",
    location: "📍 Bagageiro Lateral do Ônibus 1972",
    camera: "CAM 04 &bull; BAGAGEIRO",
    avatars: ["Policial Beredito", "Frederico", "Edilias"],
    text: `
      <p>O Policial Beredito ajoelhou-se ao lado do mecânico <strong>Edilias</strong> e do passageiro <strong>Frederico</strong>.</p>
      <p>Frederico segurava a mochila preta com o selo confidencial do governo:</p>
      <blockquote>"Policial Beredito! Eu participo de um experimento do governo na Serra da Lua. Alguém sabia que eu estaria neste ônibus hoje!"</blockquote>
      <p>Edilias apontou para o zíper violado:</p>
      <blockquote>"Analisei o bagageiro. O invasor usou lâmina militar de precisão para cortar a alça sem rasgar o couro!"</blockquote>
    `,
    choices: [
      {
        text: "Registrar o Laudo de Edilias no dossiê oficial.",
        target: "node01",
        addClue: "laudo_bagageiro_edilias"
      },
      {
        text: "⚠️ [SE TIVER VÍDEO DE PETER] Mostrar os frames da Câmera 04 para Edilias comparar a lâmina!",
        target: "node_trama1_cruzamento",
        reqClue: "video_restaurado_peter"
      },
      {
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama1_cruzamento: {
    id: "node_trama1_cruzamento",
    chapter: "CRUZAMENTO TRAMA 1 & 2",
    title: "Confirmação da Lâmina Militar",
    time: "00:08 AM",
    location: "📍 Bagageiro do 1972",
    camera: "CAM 04 &bull; PERÍCIA AVANÇADA",
    avatars: ["Policial Beredito", "Edilias"],
    text: `
      <p>Ao comparar os frames restaurados por Peter com a trava violada, Edilias exclamou:</p>
      <blockquote>"É a mesma ferramenta! A pessoa que aparece no vídeo segurando essa lâmina é o <strong>Janeto</strong>!"</blockquote>
    `,
    choices: [
      {
        text: "⬅️ Voltar ao Hub com a autoria confirmada!",
        target: "node01"
      }
    ]
  },

  // TRAMA 2: TERMINAL DIGITAL & CÂMERAS CRT
  node_trama2: {
    id: "node_trama2",
    chapter: "TRAMA 2 — CÂMERAS CRT",
    title: "O Terminal Digital de Peter",
    time: "00:07 AM",
    location: "📍 Sala de Monitoramento CRT",
    camera: "CAM 01 &bull; TERMINAL DIGITAL",
    avatars: ["Policial Beredito", "Peter", "Chico"],
    text: `
      <p>Na sala de rádio e vídeo, o aluno de TI <strong>Peter</strong> operava o monitor CRT de fósforo verde.</p>
      <p>Peter ajustou o contraste da Câmera 04:</p>
      <blockquote>"Policial Beredito! A gravação das 23:55 foi corrompida por uma interferência de rádio externa! Preciso da frequência exata para dessincronizar o ruído!"</blockquote>
    `,
    choices: [
      {
        text: "📻 [SE TIVER FREQUÊNCIA DE LOUISE] Fornecer o código de rádio de Louise para restaurar o vídeo!",
        target: "node_trama2_restaurado",
        reqClue: "codigo_radio_louise"
      },
      {
        text: "Tentar forçar a imagem sem o código de rádio. (Risco de corromper o arquivo)",
        target: "node_loop_trigger"
      },
      {
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama2_restaurado: {
    id: "node_trama2_restaurado",
    chapter: "TRAMA 2 — VÍDEO RESTAURADO",
    title: "A Revelação nos Frames da Câmera 04",
    time: "00:10 AM",
    location: "📍 Sala de Monitoramento CRT",
    camera: "CAM 04 &bull; VÍDEO RESTAURADO",
    avatars: ["Policial Beredito", "Peter"],
    text: `
      <p>Com o código de Louise, Peter removeu o ruído! A imagem congelou em alta nitidez no segundo exato em que a mão de <strong>Janeto</strong> cortava a tranca do bagageiro!</p>
      <blockquote>"Consegui, Beredito! O vídeo prova o roubo da mochila em flagrante!" — comemorou Peter.</blockquote>
    `,
    choices: [
      {
        text: "Adicionar o Vídeo Restaurado ao Dossiê de Beredito.",
        target: "node01",
        addClue: "video_restaurado_peter"
      }
    ]
  },

  // TRAMA 3: INTERROGATÓRIO & CONTRADIÇÕES
  node_trama3: {
    id: "node_trama3",
    chapter: "TRAMA 3 — INTERROGATÓRIO",
    title: "Confronto no Salão do Ônibus",
    time: "00:09 AM",
    location: "📍 Salão de Passageiros do 1972",
    camera: "CAM 05 &bull; INTERROGATÓRIO",
    avatars: ["Policial Beredito", "Janeto", "Louise", "Brinidite"],
    text: `
      <p>O Policial Beredito reuniu os passageiros no salão iluminado por faróis.</p>
      <p><strong>Brinidite</strong> ergueu um caderno de anotações:</p>
      <blockquote>"Beredito! Achei este mapa no chão. <strong>Janeto anotou cada parada e horário do Ônibus 1972 por três semanas!</strong>"</blockquote>
      <p><strong>Louise</strong> ajustou o transmissor rádio:</p>
      <blockquote>"Sintonizei esta frequência secreta transmitindo às 23:55 (Código: <strong>FREQ-107.5</strong>)!"</blockquote>
      <p>Janeto cruzou os braços e negou tudo: <em>"Eu não estive no pátio! Fiquei no alojamento a noite toda!"</em></p>
    `,
    choices: [
      {
        text: "Coletar o Caderno de Rotas de Brinidite e a Frequência de Rádio de Louise.",
        target: "node01",
        addClue: "caderno_rotas_janeto",
        addClue2: "codigo_radio_louise"
      },
      {
        text: "👁️ [SE TIVER DEPOIMENTO DE VALDINETE] Confrontar o álibi falso de Janeto com o testemunho das 23h!",
        target: "node_trama3_desmantelado",
        reqClue: "depoimento_valdinete"
      },
      {
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama3_desmantelado: {
    id: "node_trama3_desmantelado",
    chapter: "TRAMA 3 — ÁLIBI DESMANTELADO",
    title: "A Queda do Falso Álibi de Janeto",
    time: "00:14 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM 05 &bull; CONFRONTO",
    avatars: ["Policial Beredito", "Janeto", "Valdinete"],
    text: `
      <p>O Policial Beredito encarou Janeto e apresentou o testemunho de Valdinete:</p>
      <blockquote>"Sua mentira caiu, Janeto! Valdinete te viu rondando a garagem às 23h com a câmera e este caderno de rotas!"</blockquote>
      <p>Janeto empalideceu e gaguejou, sem conseguir responder!</p>
    `,
    choices: [
      {
        text: "⬅️ Voltar ao Hub para dar a ordem de captura!",
        target: "node01"
      }
    ]
  },

  // TRAMA 4: ÁREA EXTERNA & ARMADILHA NA FIGUEIRA
  node_trama4: {
    id: "node_trama4",
    chapter: "TRAMA 4 — OPERAÇÃO DE CAMPO",
    title: "Inspeção na Figueira Centenária",
    time: "00:11 AM",
    location: "📍 Área da Figueira",
    camera: "CAM 06 &bull; FIGUEIRA",
    avatars: ["Policial Beredito", "Valdinete", "João Alegria", "Amélia"],
    text: `
      <p>No pátio externo, a moradora <strong>Valdinete</strong> prestou seu depoimento a Beredito:</p>
      <blockquote>"Vi Janeto escondido sob estes galhos fotografando a rota do ônibus antes das 00:00!"</blockquote>
      <p><strong>João Alegria</strong> e <strong>Amélia</strong> apresentaram a tática:</p>
      <blockquote>"Beredito! Podemos usar uma mochila preta de isca com o João correndo pelo pátio, enquanto a rede de caça de Amélia despenca da figueira!"</blockquote>
    `,
    choices: [
      {
        text: "Registrar o Testemunho de Valdinete e preparar a armadilha de João e Amélia.",
        target: "node01",
        addClue: "depoimento_valdinete"
      },
      {
        text: "⚖️ [SE TIVER MANDADO] Executar a Operação Policial de Flagrante na Figueira!",
        target: "node_cerco_flagrante",
        reqClue: "mandado_seguranca"
      },
      {
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  // EXPEDIÇÃO DO MANDADO NO HUB
  node_expedir_mandado: {
    id: "node_expedir_mandado",
    chapter: "DECISÃO JUDICIAL",
    title: "Expedição do Mandado por Beredito",
    time: "00:16 AM",
    location: "📍 Guarita de Beredito",
    camera: "CAM 00 &bull; MANDADO EMITIDO",
    avatars: ["Policial Beredito"],
    text: `
      <p>Com o cruzamento do Laudo de Edilias, o Vídeo de Peter, as Rotas de Brinidite e a Testemunha Valdinete, o Policial Beredito assinou o <strong>Mandado de Segurança Nacional</strong>!</p>
      <blockquote>"Temos provas irrefutáveis! Vamos cercar o espião Janeto agora!" — declarou Beredito.</blockquote>
    `,
    choices: [
      {
        text: "🚀 Ir para a Figueira e executar a Operação de Flagrante! (Final 1)",
        target: "node_cerco_flagrante",
        addClue: "mandado_seguranca"
      }
    ]
  },

  // CERCO FINAL DE FLAGRANTE
  node_cerco_flagrante: {
    id: "node_cerco_flagrante",
    chapter: "CLÍMAX DA OPERAÇÃO",
    title: "O Cerco Policial em Flagrante",
    time: "00:22 AM",
    location: "📍 Figueira Centenária",
    camera: "CAM 06 &bull; FLAGRANTE POLICIAL",
    avatars: ["Policial Beredito", "Janeto", "João Alegria", "Amélia"],
    text: `
      <p>João Alegria correu apitando com a mochila de isca! Cego pela ambição, Janeto disparou atrás dele e afundou no buraco camuflado por Amélia!</p>
      <p>A rede despencou dos galhos e o Policial Beredito deu voz de prisão por espionagem governamental!</p>
    `,
    choices: [
      {
        text: "⚖️ Efetuar a Prisão Oficial e proteger a mochila do experimento! (Final 1)",
        target: "node_ending1"
      },
      {
        text: "Permitir que Frederico e Bernadete ouçam a confissão de Janeto. (Final 7)",
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
      <p>Na tentativa de escapar, Janeto acionou o motor do 1972. A ressonância do experimento na mochila disparou o alarme quântico!</p>
      <p>O tempo retrocedeu para as 00:00 de 2005, mas todas as provas e cruzamentos continuam salvos no caderno de Beredito!</p>
    `,
    isLoopReset: true,
    choices: [
      {
        text: "🌀 Reiniciar o Loop de 2005 (Preservando Matriz de Evidências)",
        target: "node01"
      }
    ]
  },

  // ENDINGS
  node_ending1: {
    id: "node_ending1",
    chapter: "DESFECHO POLICIAL",
    title: "FINAL 1 — Prisão por Espionagem",
    time: "00:35 AM",
    location: "📍 Garagem Municipal - Flagrante",
    camera: "CAM OK &bull; PRISÃO 2005",
    avatars: ["Policial Beredito", "Janeto", "Frederico", "Bernadete"],
    endingId: "ending1",
    text: `
      <p>⚖️ <strong>VITÓRIA DE SEGURANÇA NACIONAL!</strong></p>
      <p>O Policial Beredito algemou <strong>Janeto</strong> em flagrante na figueira!</p>
      <p>Com o cruzamento perfeito das 4 tramas, os documentos confidenciais do Experimento do Governo foram protegidos intactos. Toda a turma embarcou feliz no Ônibus 1972 para a viagem à Serra da Lua!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência / Explorar Outras Ramificações", target: "node01", isRestart: true }
    ]
  },

  node_ending7: {
    id: "node_ending7",
    chapter: "DESFECHO SECCIONAL",
    title: "FINAL 7 — Confissão e Custódia Policial",
    time: "01:00 AM",
    location: "📍 Salão do Ônibus 1972",
    camera: "CAM OK &bull; CONFISSÃO",
    avatars: ["Policial Beredito", "Janeto", "Frederico"],
    endingId: "ending7",
    text: `
      <p>🌟 <strong>FINAL SECRETO DE CUSTÓDIA!</strong></p>
      <p>Janeto confessou que temia que o experimento temporal colapsasse a cidade. Beredito autorizou que ele viaje sob custódia policial para auxiliar Frederico na serra!</p>
    `,
    choices: [
      { text: "🔄 Reiniciar Experiência Narrativa", target: "node01", isRestart: true }
    ]
  }
};
