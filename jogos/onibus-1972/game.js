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
      <p>Beredito sabe que por trás do crime há <strong>medos, traumas e histórias humanas não contadas</strong>. Escolha qual frente examinar:</p>
    `,
    choices: [
      {
        text: "💼 [TRAMA 1] Ouvir Frederico (Luto) e Edilias (Receio da Polícia) no bagageiro.",
        target: "node_trama1"
      },
      {
        text: "📼 [TRAMA 2] Ajudar Peter (Insegurança) a recuperar as gravações na Sala CRT.",
        target: "node_trama2"
      },
      {
        text: "📻 [TRAMA 3] Interrogar Janeto (Desespero), Louise (Busca do Pai) e Brinidite.",
        target: "node_trama3"
      },
      {
        text: "🌲 [TRAMA 4] Escutar Valdinete (Solidão) e armar a figueira com João e Amélia.",
        target: "node_trama4"
      },
      {
        text: "⚖️ [EXPEDIR MANDADO HUMANO] Unir as provas e resolver o caso com justiça e compaixão!",
        target: "node_expedir_mandado",
        reqClue: "video_restaurado_peter"
      }
    ]
  },

  // TRAMA 1: MOCHILA & LUTO DE FREDERICO / MEDO DE EDILIAS
  node_trama1: {
    id: "node_trama1",
    chapter: "TRAMA 1 — O DOSSIÊ E O LUTO",
    title: "O Conflito de Frederico e Edilias",
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
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama1_edilias_confianca: {
    id: "node_trama1_edilias_confianca",
    chapter: "TRAMA 1 — SUPERAÇÃO DE EDILIAS",
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
        text: "⬅️ Voltar ao Hub com o laudo de confiança de Edilias!",
        target: "node01"
      }
    ]
  },

  node_trama1_frederico_luto: {
    id: "node_trama1_frederico_luto",
    chapter: "TRAMA 1 — O PERDÃO DE FREDERICO",
    title: "O Acolhimento do Luto de Frederico",
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
        text: "⬅️ Voltar ao Hub Central.",
        target: "node01"
      }
    ]
  },

  // TRAMA 2: INSEGURANÇA DE PETER
  node_trama2: {
    id: "node_trama2",
    chapter: "TRAMA 2 — INSEGURANÇA E SUPERAÇÃO",
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
    chapter: "TRAMA 2 — SUPERAÇÃO DE PETER",
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

  // TRAMA 3: DRAMAS DE JANETO, LOUISE & BRINIDITE
  node_trama3: {
    id: "node_trama3",
    chapter: "TRAMA 3 — DRAMAS E CONTRADIÇÕES",
    title: "Interrogatório Emocional no Ônibus",
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
        text: "⬅️ Voltar ao Hub Central de Beredito.",
        target: "node01"
      }
    ]
  },

  node_trama3_desesperado: {
    id: "node_trama3_desesperado",
    chapter: "TRAMA 3 — A VERDADE DE JANETO",
    title: "O Desabafo Desesperado de Janeto",
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
        text: "⬅️ Voltar ao Hub para organizar o cerco garantindo ajuda à filha de Janeto.",
        target: "node01"
      }
    ]
  },

  // TRAMA 4: SOLIDÃO DE VALDINETE & OPERAÇÃO
  node_trama4: {
    id: "node_trama4",
    chapter: "TRAMA 4 — ESCUTA E OPERAÇÃO",
    title: "A Escuta de Valdinete e o Cerco",
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
        text: "⬅️ Voltar ao Hub Central.",
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
      <blockquote>"A lei será cumprida, mas a dignidade humana será preservada!" — afirmou Beredito.</blockquote>
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
