const state = {
  scene: "prologue",
  clues: [],
  people: {},
  choiceHistory: [],
  emilyAlive: true,
  thomasAlive: true,
  danielAlive: true,
  richardAlive: true,
  helenaExposed: false,
  cultHideoutFound: false,
  investigatedPeople: [],
  protectedPerson: null,
  examinedEvidence: [],
  mistakes: 0,
  serverEvidence: false
};

const scenes = {
  prologue: {
    kicker: "1. PRÓLOGO — 23H47",
    title: "Blackwood está silenciosa.",
    time: "23:47",
    text: [
      "Blackwood está silenciosa.",
      "As ruas estão praticamente vazias.",
      "Na casa do prefeito, Katherine Walker está em seu quarto, tentando descobrir quem realmente foi sua mãe.",
      "Durante toda a infância, Richard Walker afirmou que <strong>Eleanor Walker havia abandonado a família</strong>.",
      "Katherine nunca acreditou completamente nessa história. Nos últimos dias, ela encontrou documentos antigos com o nome de Eleanor e começou a investigar.",
      "O celular vibra.",
      "<strong>23h51.</strong>",
      "<blockquote>“Pare de procurar por sua mãe.”</blockquote>",
      "Katherine responde:",
      "<blockquote>“Quem é você?”</blockquote>",
      "A tela do celular pisca sozinha. Um símbolo aparece: <strong>um círculo envolvendo um relógio marcando 00h00</strong>.",
      "Katherine percebe que não consegue desligar o aparelho.",
      "Ela olha para a janela e vê uma figura observando a casa.",
      "<strong>23h59.</strong>",
      "O relógio da cidade começa a tocar.",
      "<blockquote>DONG.<br>DONG.<br>DONG.</blockquote>",
      "<strong>00h00.</strong>",
      "As luzes se apagam.",
      "Um grito é ouvido.",
      "Depois, silêncio."
    ],
    next: "victim"
  },

  victim: {
    kicker: "2. A PRIMEIRA VÍTIMA",
    title: "O quarto fechado",
    time: "manhã",
    text: [
      "Na manhã seguinte, Katherine Walker é encontrada morta.",
      "A porta continua trancada e a janela está fechada. Não há sinais evidentes de entrada pela porta.",
      "Há vários elementos fora do lugar, mas a equipe ainda não sabe quais deles explicam o crime.",
      "Escolha o que examinar e forme sua própria hipótese antes de interrogar os suspeitos."
    ],
    next: "crimeScene"
  },

  crimeScene: {
    kicker: "2. INVESTIGAÇÃO DO QUARTO",
    title: "Escolha o que examinar",
    time: "manhã",
    text: [
      "Cada objeto revela uma parte diferente da história. As pistas examinadas ficam registradas na barra lateral."
    ],
    dynamicChoices: () => {
      const options = [
        ["Examinar o relógio parado", "examineClock"],
        ["Analisar o celular de Katherine", "examinePhone"],
        ["Ler as últimas páginas do diário", "examineDiary"],
        ["Inspecionar o duto de ventilação", "examineDuct"]
      ];
      const remaining = options.filter(([, target]) => !state.examinedEvidence.includes(target));
      return remaining.length ? remaining : [["Relacionar as pistas do quarto", "solveLockedRoom"]];
    }
  },

  examineClock: {
    kicker: "PISTA DO QUARTO",
    title: "O relógio interrompido",
    time: "manhã",
    text: ["O mecanismo não está quebrado. Ele foi parado manualmente em 00h00, provavelmente para marcar o horário escolhido pelo responsável."],
    evidence: "examineClock",
    clue: "O relógio foi parado manualmente em 00h00.",
    next: "crimeScene"
  },

  examinePhone: {
    kicker: "PISTA DO QUARTO",
    title: "Uma mensagem sem remetente",
    time: "manhã",
    text: ["O aparelho recebeu a ameaça sem registrar um número. O símbolo de um círculo e um relógio indica que a mensagem pode ter vindo de um sistema externo."],
    evidence: "examinePhone",
    clue: "O celular recebeu uma ameaça enviada por uma origem oculta.",
    next: "crimeScene"
  },

  examineDiary: {
    kicker: "PISTA DO QUARTO",
    title: "A mentira de Richard",
    time: "manhã",
    text: ["A última anotação de Katherine diz: <blockquote>“Meu pai mentiu. Minha mãe não me abandonou.”</blockquote> A investigação da jovem estava concentrada em Eleanor."],
    evidence: "examineDiary",
    clue: "Katherine descobriu que Richard mentiu sobre Eleanor.",
    next: "crimeScene"
  },

  examineDuct: {
    kicker: "PISTA DO QUARTO",
    title: "A entrada que não era uma porta",
    time: "manhã",
    text: ["A grade está deslocada, há marcas recentes nos parafusos e uma pequena fibra escura presa ao metal. Uma pessoa poderia alcançar o quarto pela manutenção."],
    evidence: "examineDuct",
    clue: "A grade do duto foi removida recentemente e contém uma fibra escura.",
    next: "crimeScene"
  },

  solveLockedRoom: {
    kicker: "DEDUÇÃO 1",
    title: "Como alguém entrou no quarto fechado?",
    time: "manhã",
    text: ["Escolha a hipótese sustentada pelas evidências materiais."],
    choices: [
      ["Pela janela, antes de ela ser fechada", "roomDeductionError"],
      ["Pelo duto de ventilação", "suspects"],
      ["A porta possuía uma chave secreta", "roomDeductionError"]
    ]
  },

  roomDeductionError: {
    kicker: "HIPÓTESE NÃO COMPROVADA",
    title: "Essa explicação não corresponde às marcas",
    time: "manhã",
    text: ["A janela não foi violada e nenhuma chave secreta foi encontrada. Volte às provas físicas antes de concluir."],
    mistake: true,
    next: "solveLockedRoom"
  },

  suspects: {
    kicker: "3. OS PRIMEIROS SUSPEITOS",
    title: "Quem sabia o que Katherine procurava?",
    time: "manhã",
    text: [
      "A investigação começa com quatro nomes. Para avançar, será necessário ouvir todos e comparar seus depoimentos.",
      "<strong>RICHARD WALKER</strong><br>Prefeito, pai de Katherine e homem extremamente influente. Durante anos afirmou que Eleanor havia abandonado a família.",
      "<strong>EMILY CARTER</strong><br>Melhor amiga de Katherine. Sabia que ela estava tentando descobrir a verdade sobre a mãe.",
      "<strong>THOMAS REED</strong><br>Funcionário antigo da prefeitura. Trabalhou em um projeto secreto anos atrás.",
      "<strong>DANIEL MOORE</strong><br>Vizinho da família. Viu movimentação estranha perto da casa na noite do crime."
    ],
    dynamicChoices: () => {
      const options = [
        ["Investigar Richard Walker", "investigateRichard"],
        ["Investigar Emily Carter", "investigateEmily"],
        ["Investigar Thomas Reed", "investigateThomas"],
        ["Investigar Daniel Moore", "investigateDaniel"]
      ];
      const remaining = options.filter(([, target]) => !state.investigatedPeople.includes(target));
      return remaining.length ? remaining : [["Comparar todos os depoimentos", "compareTestimonies"]];
    }
  },

  compareTestimonies: {
    kicker: "DEDUÇÃO 2",
    title: "Qual depoimento liga o invasor ao duto?",
    time: "tarde",
    text: ["Richard escondeu o passado, Emily guardou os arquivos e Thomas citou o grupo secreto. Mas apenas um depoimento descreve o trajeto usado na noite do crime."],
    choices: [
      ["A fotografia escondida por Richard", "testimonyError"],
      ["O pendrive entregue por Emily", "testimonyError"],
      ["A gravação e a voz relatadas por Daniel", "second"]
    ]
  },

  testimonyError: {
    kicker: "CONTRADIÇÃO",
    title: "Essa pista explica o motivo, não a entrada",
    time: "tarde",
    text: ["A evidência escolhida ajuda a revelar o Projeto Érebo, mas não coloca a figura junto ao sistema de ventilação. Compare novamente os depoimentos."],
    mistake: true,
    next: "compareTestimonies"
  },

  investigateRichard: {
    kicker: "4. PRIMEIRA INVESTIGAÇÃO — RICHARD",
    title: "A história do abandono",
    time: "tarde",
    text: [
      "Richard insiste que Eleanor abandonou a família muitos anos atrás.",
      "Mas o investigador encontra uma fotografia antiga escondida no escritório do prefeito.",
      "Nela aparecem Richard, Eleanor, o chefe da polícia, a Juíza Helena Ward e outras pessoas diante de uma instalação municipal.",
      "No verso está escrito: <strong>PROJETO ÉREBO</strong>.",
      "Richard se recusa a explicar por que guardou a fotografia se Eleanor simplesmente havia ido embora."
    ],
    clue: "Richard mentiu sobre o desaparecimento de Eleanor Walker.",
    investigated: "investigateRichard",
    next: "suspects"
  },

  investigateEmily: {
    kicker: "4. PRIMEIRA INVESTIGAÇÃO — EMILY",
    title: "O segredo de Katherine",
    time: "tarde",
    text: [
      "Emily conta que Katherine nunca procurou apenas um assassino.",
      "Ela procurava a própria história.",
      "<blockquote>“O pai dela dizia que Eleanor tinha abandonado a família. Katherine começou a achar documentos mostrando que isso era mentira.”</blockquote>",
      "Emily entrega um pendrive que Katherine deixou escondido.",
      "Existe nele uma pasta chamada <strong>ÉREBO</strong>."
    ],
    clue: "Katherine investigava o destino de sua mãe, Eleanor Walker.",
    investigated: "investigateEmily",
    next: "suspects"
  },

  investigateThomas: {
    kicker: "4. PRIMEIRA INVESTIGAÇÃO — THOMAS",
    title: "Thomas demonstra nervosismo.",
    time: "tarde",
    text: [
      "Thomas fica pálido ao ouvir o nome de Eleanor.",
      "<blockquote>“Katherine chegou perto demais do que aconteceu no Projeto Érebo.”</blockquote>",
      "Ele admite que trabalhou para Richard na época, mas diz que não pode falar em público.",
      "Antes de encerrar a conversa, Thomas deixa uma frase:",
      "<blockquote>“O problema não era apenas a prefeitura. Existia um grupo por trás dela.”</blockquote>"
    ],
    clue: "Thomas relacionou o Projeto Érebo a um grupo secreto.",
    investigated: "investigateThomas",
    next: "suspects"
  },

  investigateDaniel: {
    kicker: "4. PRIMEIRA INVESTIGAÇÃO — DANIEL",
    title: "Uma figura perto da casa",
    time: "tarde",
    text: [
      "Daniel mostra uma gravação incompleta de uma câmera externa.",
      "Uma pessoa aparece entrando na área lateral da mansão pouco antes da meia-noite.",
      "A figura não vai até a porta. Ela segue na direção da parede onde fica a saída externa do sistema de ventilação.",
      "Daniel também afirma ter ouvido uma voz feminina antes do apagão."
    ],
    clue: "A pessoa suspeita seguiu na direção do sistema de ventilação da mansão.",
    investigated: "investigateDaniel",
    next: "suspects"
  },

  second: {
    kicker: "5. CRUZAMENTO DAS PISTAS",
    title: "O Projeto Érebo e os registros judiciais",
    time: "tarde",
    text: [
      "Os quatro depoimentos se complementam e apontam para um acontecimento antigo escondido pelas autoridades.",
      "Agora é necessário consultar tanto os arquivos da prefeitura quanto os registros judiciais."
    ],
    next: "projectErebo"
  },

  projectErebo: {
    kicker: "6. PROJETO ÉREBO",
    title: "O projeto de controle mental",
    time: "noite",
    text: [
      "Documentos escondidos revelam a verdadeira função do Projeto Érebo.",
      "O projeto estudava maneiras de <strong>influenciar a mente, alterar lembranças e conduzir o comportamento de pessoas</strong>.",
      "Eleanor Walker trabalhava no projeto porque acreditava que essa tecnologia poderia ser utilizada para ajudar pessoas a superar lembranças traumáticas e esquecer experiências muito dolorosas.",
      "Mas Eleanor descobriu que outros participantes queriam usar o projeto para <strong>controlar cidadãos e atrair vítimas para locais escolhidos</strong>.",
      "Quando tentou impedir esse uso, aproximou-se demais do segredo por trás do projeto."
    ],
    clue: "O Projeto Érebo tentava influenciar memórias e controlar o comportamento humano.",
    next: "justiceCoverup"
  },

  justiceCoverup: {
    kicker: "7. O CASO ENCERRADO",
    title: "A mulher que nunca abandonou Katherine",
    time: "noite",
    text: [
      "Os registros judiciais mostram algo impossível de conciliar com a história contada por Richard.",
      "<strong>Eleanor Walker morreu durante o Projeto Érebo.</strong>",
      "A morte foi registrada internamente, mas o processo desapareceu antes de chegar ao público.",
      "A responsável por arquivar e selar os documentos foi a <strong>Juíza Helena Ward</strong>.",
      "Richard aceitou o encobrimento e depois disse à filha que Eleanor havia simplesmente abandonado a família.",
      "O Projeto Érebo foi oficialmente cancelado após a morte, mas parte de suas pesquisas continuou escondida."
    ],
    clue: "A Juíza Helena Ward ajudou a encobrir a morte de Eleanor Walker.",
    next: "thomasTruth"
  },

  thomasTruth: {
    kicker: "8. THOMAS REVELA A VERDADE",
    title: "O Segredo da Meia-Noite",
    time: "noite",
    text: [
      "Thomas decide contar o que sabe.",
      "O grupo por trás do Projeto Érebo se chamava <strong>Segredo da Meia-Noite</strong>.",
      "Para seus membros, <strong>00h00 era um horário sagrado</strong>: representava o momento em que um dia termina e outro começa, símbolo de apagar uma identidade e criar outra.",
      "Richard Walker não era apenas alguém que conhecia o culto. <strong>Ele era seu principal cultista em Blackwood.</strong>",
      "Foi por isso que participou do encobrimento da morte da própria esposa quando Eleanor chegou perto demais de revelar o grupo.",
      "Thomas afirma que a morte de Eleanor nunca foi apenas um acidente político. Ela ameaçava toda a existência do culto."
    ],
    clue: "Richard Walker era o principal cultista do Segredo da Meia-Noite em Blackwood.",
    next: "phoneControl"
  },

  phoneControl: {
    kicker: "9. A REDE DA CIDADE",
    title: "Os celulares não são seguros",
    time: "21:40",
    text: [
      "Emily mostra um comportamento estranho no celular de Katherine: mensagens surgiram sem um remetente normal e o aparelho foi bloqueado à distância.",
      "Thomas explica que o Segredo se apropriou de uma infraestrutura digital municipal criada anos depois do Érebo.",
      "Com ela, o culto consegue <strong>interferir em celulares conectados à rede da cidade</strong>: enviar mensagens, bloquear aparelhos e manipular comunicações.",
      "Essa capacidade permite assustar pessoas, espalhar informações falsas e conduzir cidadãos até locais escolhidos.",
      "O poder do culto não é sobrenatural. Ele mistura influência política, tecnologia e as pesquisas derivadas do Projeto Érebo."
    ],
    clue: "O culto consegue interferir nos celulares conectados à rede municipal de Blackwood.",
    next: "protect"
  },

  protect: {
    kicker: "10. TERCEIRA ESCOLHA",
    title: "Quem proteger?",
    time: "22:30",
    text: [
      "Thomas e Daniel estão sendo observados pelo culto.",
      "O jogador precisa escolher quem receberá proteção."
    ],
    choices: [
      ["A — Proteger Thomas", "protectThomas"],
      ["B — Proteger Daniel", "protectDaniel"]
    ]
  },

  protectThomas: {
    kicker: "10. TERCEIRA ESCOLHA — THOMAS",
    title: "A chave do arquivo",
    time: "23:10",
    text: [
      "Thomas permanece em segurança.",
      "Ele entrega ao investigador uma chave antiga e explica que existe um arquivo secreto abaixo da prefeitura.",
      "<blockquote>“Se quiser descobrir onde eles se reúnem, procure o mapa dos túneis.”</blockquote>"
    ],
    protect: "Thomas",
    clue: "Thomas entregou a chave completa do arquivo e os códigos necessários para rastrear a rede do Segredo.",
    next: "secretArchive"
  },

  protectDaniel: {
    kicker: "10. TERCEIRA ESCOLHA — DANIEL",
    title: "Uma mensagem de Thomas",
    time: "23:59",
    text: [
      "Daniel recebe proteção, mas Thomas fica exposto.",
      "Pouco antes da meia-noite, Thomas envia uma última mensagem ao investigador:",
      "<blockquote>“Richard liderava o culto, mas não foi ele quem entrou no quarto de Katherine. Procure Helena.”</blockquote>",
      "Depois disso, Thomas é encontrado morto.",
      "Entre seus pertences, a polícia encontra uma cópia parcial do mapa subterrâneo."
    ],
    protect: "Daniel",
    death: "Thomas",
    clue: "Thomas apontou a Juíza Helena como peça central no assassinato de Katherine.",
    next: "secretArchive"
  },

  secretArchive: {
    kicker: "11. O ARQUIVO SUBTERRÂNEO",
    title: "O mapa de Blackwood",
    time: "noite",
    text: [
      "No arquivo secreto existem fotografias, relatórios do Érebo, registros judiciais e um mapa subterrâneo de Blackwood.",
      "Os túneis secretos conectam uma <strong>fábrica desativada, a mansão Walker e a igreja</strong>. Ramificações menores alcançam prédios públicos da cidade.",
      "Há também uma lista de membros do Segredo da Meia-Noite:",
      "<strong>Richard Walker</strong> — principal cultista.<br><strong>Juíza Helena Ward</strong> — responsável por proteger o culto judicialmente.<br><strong>Marcus Hale</strong> — chefe da polícia.<br><strong>Padre Elias Crow</strong> — recrutador.<br><strong>Victor Crane</strong> — financiador.",
      "O nome de Eleanor aparece em outra lista, marcada como: <strong>RISCO DE EXPOSIÇÃO</strong>."
    ],
    clue: "Um mapa liga a prefeitura, o tribunal, a igreja e uma fábrica desativada.",
    next: "danielMissing"
  },

  danielMissing: {
    kicker: "12. DANIEL DESAPARECE",
    title: "Uma testemunha em perigo",
    time: "noite",
    text: [
      "Daniel desaparece de casa.",
      "Seu celular permanece sobre a mesa, embora ele tivesse levado o aparelho ao sair.",
      "A tela liga sozinha e mostra uma frase:",
      "<blockquote>“TRAGAM A TESTEMUNHA PARA O SANTUÁRIO.”</blockquote>",
      "O culto aparentemente clonou ou controlou o aparelho à distância.",
      "O mapa subterrâneo indica dois lugares onde Daniel pode estar."
    ],
    next: "findDaniel"
  },

  findDaniel: {
    kicker: "13. QUARTA ESCOLHA",
    title: "Onde procurar Daniel?",
    time: "23:15",
    text: [
      "O jogador precisa escolher rapidamente."
    ],
    choices: [
      ["A — Seguir imediatamente o túnel até a fábrica", "hideoutDirect"],
      ["B — Voltar ao tribunal para confrontar Helena", "helenaOffice"]
    ]
  },

  helenaOffice: {
    kicker: "13. O TRIBUNAL",
    title: "O gabinete vazio",
    time: "23:25",
    text: [
      "O gabinete da Juíza Helena Ward está vazio.",
      "Dentro de uma gaveta secreta existem cópias dos registros de Eleanor e um esquema técnico da mansão Walker.",
      "No desenho, o <strong>duto de ventilação do quarto de Katherine</strong> está marcado em vermelho.",
      "Há ainda fibras de um tecido semelhante ao encontrado junto à grade do duto.",
      "A ligação com Helena fica muito mais forte."
    ],
    exposesHelena: true,
    clue: "Helena possuía um esquema do duto de ventilação do quarto de Katherine.",
    next: "hideoutLate"
  },

  hideoutDirect: {
    kicker: "14. ENTRADA DIRETA NO SANTUÁRIO",
    title: "Os servidores ainda estão ligados",
    time: "23:30",
    text: [
      "A equipe segue o mapa sem desvio e chega à fábrica antes que o local seja esvaziado.",
      "Daniel é libertado. Os servidores continuam funcionando e uma cópia dos registros de transmissão pode ser preservada.",
      "A pressa salvou a testemunha e manteve aberta a possibilidade de rastrear quem comanda o sistema."
    ],
    serverEvidence: true,
    clue: "Os registros ativos dos servidores foram preservados.",
    next: "hideout"
  },

  hideoutLate: {
    kicker: "14. CHEGADA TARDIA AO SANTUÁRIO",
    title: "Parte dos arquivos foi apagada",
    time: "23:38",
    text: [
      "As provas encontradas no tribunal fortalecem diretamente a acusação contra Helena, mas o desvio custa alguns minutos.",
      "Daniel ainda é libertado, porém parte dos registros de transmissão já foi apagada. Restam as gravações internas, os equipamentos e o depoimento da testemunha."
    ],
    clue: "O tribunal forneceu provas materiais contra Helena, mas parte dos registros digitais foi perdida.",
    next: "hideout"
  },

  hideout: {
    kicker: "14. O ESCONDERIJO DO CULTO",
    title: "O Santuário da Meia-Noite",
    time: "23:35",
    text: [
      "O túnel termina abaixo de uma fábrica desativada.",
      "Atrás de uma parede falsa existe o esconderijo do Segredo da Meia-Noite: <strong>O Santuário da Meia-Noite</strong>.",
      "O local contém uma sala circular com doze cadeiras, arquivos roubados, servidores ligados à rede municipal, fotografias de cidadãos e equipamentos derivados do Projeto Érebo.",
      "Em uma parede existe o símbolo do relógio marcando 00h00.",
      "Daniel é encontrado preso em uma sala lateral e consegue ser libertado.",
      "Ele confirma que reconheceu a voz ouvida na mansão:",
      "<blockquote>“Era a Juíza Helena Ward.”</blockquote>",
      "Uma gravação interna mostra Helena entrando por um túnel de manutenção que leva até a região da mansão Walker."
    ],
    findsHideout: true,
    clue: "Daniel reconheceu a voz da Juíza Helena Ward, e o esconderijo guarda provas contra ela.",
    next: "eleanorVideo"
  },

  eleanorVideo: {
    kicker: "15. A ÚLTIMA MENSAGEM DE ELEANOR",
    title: "Ela queria ajudar pessoas",
    time: "23:42",
    text: [
      "No Santuário existe uma gravação antiga feita por Eleanor Walker.",
      "Eleanor explica que entrou no Projeto Érebo com uma intenção diferente da do culto.",
      "Ela acreditava que, se fosse possível influenciar determinadas lembranças, pessoas poderiam receber ajuda para superar experiências ruins e traumas.",
      "Mas percebeu que Richard e o Segredo queriam transformar a pesquisa em uma ferramenta de obediência.",
      "<blockquote>“Eu queria ajudar pessoas a se libertarem de lembranças ruins. Eles querem decidir o que cada pessoa deve pensar.”</blockquote>",
      "Eleanor decidiu denunciar o projeto.",
      "Foi então que se tornou uma ameaça para o próprio marido e para Helena, que garantiu o encobrimento judicial de sua morte."
    ],
    clue: "Eleanor queria usar a pesquisa para ajudar pessoas, mas tentou denunciar o uso do Érebo pelo culto.",
    next: "confrontRichard"
  },

  confrontRichard: {
    kicker: "16. O PREFEITO",
    title: "A confissão de Richard",
    time: "23:48",
    text: [
      "O investigador confronta Richard Walker com as provas.",
      "Richard finalmente admite que era o principal cultista de Blackwood.",
      "Ele confirma que ajudou a esconder a morte de Eleanor e inventou a história de que ela havia abandonado Katherine.",
      "<blockquote>“Se Katherine soubesse quem a mãe realmente era, acabaria encontrando o Érebo. Eu tentei manter o passado enterrado.”</blockquote>",
      "Richard afirma que não entrou no quarto da filha.",
      "Segundo ele, Helena era responsável por impedir que os segredos do culto chegassem aos tribunais — e por silenciar ameaças quando necessário.",
      "Antes de revelar quem ainda controla o Segredo, Richard recebe no próprio celular uma ordem enviada pelo sistema do grupo: <strong>00h00 — ENCERRAR O CICLO</strong>.",
      "Richard percebe que o grupo também decidiu eliminá-lo. Antes de fugir, deixa cair um mapa com uma antiga fazenda marcada nos arredores de Blackwood."
    ],
    clue: "Richard confessou que liderava o culto e que mentiu para Katherine sobre Eleanor.",
    next: "accusation"
  },

  accusation: {
    kicker: "DEDUÇÃO FINAL",
    title: "Quem entrou no quarto de Katherine?",
    time: "23:52",
    text: [
      "Richard tinha motivo para esconder o passado, mas negou ter entrado no quarto. Escolha a pessoa sustentada pelo duto, pela voz, pelo esquema da mansão e pelos registros do Santuário."
    ],
    choices: [
      ["Acusar Richard Walker", "accusationError"],
      ["Acusar Emily Carter", "accusationError"],
      ["Acusar a Juíza Helena Ward", "helenaReveal"]
    ]
  },

  accusationError: {
    kicker: "ACUSAÇÃO INCOMPLETA",
    title: "As provas não sustentam essa acusação",
    time: "23:52",
    text: [
      "A pessoa escolhida não corresponde à voz feminina, ao esquema do duto e ao trajeto registrado. Uma acusação sem ligação entre motivo, acesso e presença não encerrará o caso."
    ],
    mistake: true,
    next: "accusation"
  },

  helenaReveal: {
    kicker: "17. A ASSASSINA DE KATHERINE",
    title: "Juíza Helena Ward",
    time: "23:53",
    text: [
      "As provas agora se encaixam.",
      "Helena encobriu judicialmente a morte de Eleanor anos atrás.",
      "Quando Katherine começou a procurar a mãe e chegou perto do Projeto Érebo, Helena recebeu a missão de impedir que as provas viessem a público.",
      "Ela entrou na mansão pela rede de manutenção e alcançou o quarto por meio do <strong>duto de ventilação</strong>.",
      "Depois saiu pelo mesmo caminho, deixando porta e janela fechadas.",
      "A mensagem no celular de Katherine foi enviada pelo sistema controlado pelo culto para assustá-la e fazê-la abandonar a investigação.",
      "Daniel reconheceu a voz de Helena, e os registros do Santuário confirmam seu trajeto.",
      "<strong>Helena Ward matou Katherine para proteger o mesmo segredo que havia ajudado a esconder após a morte de Eleanor.</strong>",
      "Ao perceber que os arquivos do Santuário foram acessados, Helena ordena a destruição das provas e foge por uma passagem rural. O mapa deixado por Richard aponta seu destino: uma fazenda usada pelo grupo."
    ],
    clue: "A Juíza Helena Ward é a assassina de Katherine Walker.",
    next: "tower"
  },

  tower: {
    kicker: "18. A FAZENDA DE BLACKWOOD",
    title: "O último esconderijo — 23h58",
    time: "23:58",
    text: [
      "Helena foge para uma antiga fazenda nos arredores de Blackwood, utilizada pelo Segredo em situações de emergência.",
      "Richard também está no local, tentando impedir que o próprio grupo apague todas as provas que poderiam ligá-lo ao Érebo.",
      "O relógio marca <strong>23h58</strong>.",
      "Helena afirma que 00h00 é sagrado para o Segredo porque representa o instante em que uma história pode ser encerrada e outra pode ser imposta.",
      "O jogador tem uma última escolha."
    ],
    dynamicChoices: () => {
      const choices = [
        ["A — Confrontar Helena imediatamente", "badEnd"],
        ["B — Proteger as provas e chamar autoridades de fora de Blackwood", "goodEnd"]
      ];
      if (state.thomasAlive && state.serverEvidence) {
        choices.push(["C — Usar os códigos de Thomas para rastrear a transmissão", "secretEnd"]);
      }
      return choices;
    }
  },

  badEnd: {
    kicker: "FINAL 1 — O CULTO SOBREVIVE",
    title: "00h00",
    time: "00:00",
    text: [
      "O jogador confronta Helena antes de garantir que as provas estejam seguras.",
      "À meia-noite, os servidores do Santuário apagam grande parte dos arquivos controlados pelo culto.",
      "Helena é capturada, mas vários membros importantes desaparecem e Richard nega parte da confissão.",
      "O caso de Katherine é solucionado, porém o Segredo da Meia-Noite continua ativo.",
      "<strong>FINAL — O CULTO SOBREVIVE.</strong>"
    ],
    ending: "bad"
  },

  goodEnd: {
    kicker: "FINAL 2 — A VERDADE VEM À LUZ",
    title: "Justiça para Eleanor e Katherine",
    time: "00:00",
    text: [
      "O jogador envia cópias das provas para autoridades de fora de Blackwood antes da meia-noite.",
      "Os registros confirmam a existência do Segredo da Meia-Noite, o Projeto Érebo, o encobrimento da morte de Eleanor e a responsabilidade de Helena pela morte de Katherine.",
      "Richard é exposto como principal cultista de Blackwood e participante do encobrimento da esposa.",
      "Helena é presa, e a antiga versão de que Eleanor abandonou a família é oficialmente desmentida.",
      "Katherine finalmente consegue, mesmo depois de sua morte, revelar quem sua mãe realmente foi.",
      "Mas alguns nomes da lista do culto continuam sem identificação.",
      "<strong>FINAL — A VERDADE VEM À LUZ.</strong>"
    ],
    ending: "good"
  },

  secretEnd: {
    kicker: "FINAL 3 — O CÍRCULO MAIOR",
    title: "A transmissão",
    time: "00:00",
    text: [
      "Em vez de agir imediatamente, o jogador rastreia a transmissão que ordenaria a destruição das provas.",
      "Ela não parte de Helena nem de Richard.",
      "O sinal vem de fora de Blackwood.",
      "No servidor aparece uma lista de outras cidades acompanhadas pelo mesmo símbolo de 00h00.",
      "Richard era o principal cultista de Blackwood, mas a organização é muito maior do que a cidade.",
      "A tela mostra uma última mensagem:",
      "<blockquote>“BLACKWOOD FOI APENAS O PRIMEIRO TESTE.”</blockquote>",
      "<strong>FINAL SECRETO — O CÍRCULO MAIOR.</strong>"
    ],
    ending: "secret"
  }
};

const cluesList = document.getElementById("clues-list");
const peopleList = document.getElementById("people-list");
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const sceneKicker = document.getElementById("scene-kicker");
const choicesEl = document.getElementById("choices");
const continueArea = document.getElementById("continue-area");
const gameClock = document.getElementById("game-clock");
const sceneImage = document.getElementById("scene-image");
const ambience = document.getElementById("ambient-audio");
ambience.loop = true;
ambience.volume = 0.28;
let musicOn = false;
let narrationOn = false;
let fontScale = 1;
const blackout = document.getElementById("blackout");
const blackoutMessage = document.getElementById("blackout-message");
const blackoutBtn = document.getElementById("blackout-btn");

const people = [
  "Katherine Walker",
  "Eleanor Walker",
  "Richard Walker",
  "Emily Carter",
  "Thomas Reed",
  "Daniel Moore",
  "Juíza Helena Ward",
  "Marcus Hale — chefe da polícia",
  "Padre Elias Crow",
  "Victor Crane"
];

function renderSidebar() {
  cluesList.innerHTML = "";
  state.clues.forEach(c => {
    const li = document.createElement("li");
    li.className = "found";
    li.textContent = c;
    cluesList.appendChild(li);
  });
  if (!state.clues.length) {
    const li = document.createElement("li");
    li.textContent = "Nenhuma pista desbloqueada.";
    cluesList.appendChild(li);
  }

  peopleList.innerHTML = "";
  people.forEach(p => {
    const li = document.createElement("li");
    const dead =
      (p === "Katherine Walker") ||
      (p === "Eleanor Walker") ||
      (p === "Emily Carter" && !state.emilyAlive) ||
      (p === "Thomas Reed" && !state.thomasAlive) ||
      (p === "Daniel Moore" && !state.danielAlive) ||
      (p === "Richard Walker" && !state.richardAlive);
    li.textContent = dead ? `${p} — morto(a)` : p;
    if (dead) li.className = "found";
    peopleList.appendChild(li);
  });
}

function addClue(clue) {
  if (clue && !state.clues.includes(clue)) state.clues.push(clue);
}

function isAlive(person) {
  if (person === "Emily") return state.emilyAlive;
  if (person === "Thomas") return state.thomasAlive;
  if (person === "Daniel") return state.danielAlive;
  if (person === "Richard") return state.richardAlive;
  return true;
}

function applyDeath(person) {
  if (person === "Emily") state.emilyAlive = false;
  if (person === "Thomas") state.thomasAlive = false;
  if (person === "Daniel") state.danielAlive = false;
  if (person === "Richard") state.richardAlive = false;
}

function imageFor(scene) {
  const key = `${scene.kicker || ""} ${scene.title || ""}`;
  if (key.includes("PRÓLOGO")) return "blackwood";
  if (key.includes("VÍTIMA") || key.includes("Katherine")) return "victim";
  if (key.includes("PREFEITO") || key.includes("Richard")) return "mayor";
  if (key.includes("FAZENDA") || key.includes("FINAL")) return "tower";
  return "investigation";
}

function renderImage(scene) {
  const type = imageFor(scene);
  sceneImage.style.background = `linear-gradient(rgba(0,0,0,.04), rgba(0,0,0,.16)), url("assets/images/${type}.svg") center/cover no-repeat`;
}

function renderScene(id) {
  stopNarration();
  state.scene = id;
  const scene = scenes[id];
  sceneKicker.textContent = scene.kicker;
  sceneTitle.textContent = scene.title;
  const textBlocks = scene.dynamicText ? scene.dynamicText() : scene.text;
  sceneText.innerHTML = textBlocks.map(t => `<p>${t}</p>`).join("");
  choicesEl.innerHTML = "";
  continueArea.innerHTML = "";
  gameClock.textContent = scene.time || "—";
  renderImage(scene);

  if (scene.clue) addClue(scene.clue);
  if (scene.investigated && !state.investigatedPeople.includes(scene.investigated)) {
    state.investigatedPeople.push(scene.investigated);
  }
  if (scene.protect) state.protectedPerson = scene.protect;
  if (scene.exposesHelena) state.helenaExposed = true;
  if (scene.findsHideout) state.cultHideoutFound = true;
  if (scene.evidence && !state.examinedEvidence.includes(scene.evidence)) {
    state.examinedEvidence.push(scene.evidence);
  }
  if (scene.mistake) state.mistakes += 1;
  if (scene.serverEvidence) state.serverEvidence = true;

  if (scene.death && (!scene.deathOnlyIfAlive || isAlive(scene.death))) {
    applyDeath(scene.death);
    showBlackout(scene.death, () => renderAfterDeath(scene));
  }

  if (scene.death && scene.deathOnlyIfAlive && !isAlive(scene.death)) {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Continuar";
    btn.onclick = () => renderScene(scene.next);
    continueArea.appendChild(btn);
  }

  const availableChoices = scene.dynamicChoices ? scene.dynamicChoices() : scene.choices;
  if (availableChoices) {
    availableChoices.forEach(([label, target]) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = label;
      btn.onclick = () => {
        state.choiceHistory.push({ from: id, target });
        renderScene(target);
      };
      choicesEl.appendChild(btn);
    });
  } else if (!scene.death && scene.next && !scene.ending) {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Continuar";
    btn.onclick = () => renderScene(scene.next);
    continueArea.appendChild(btn);
  } else if (scene.ending) {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Reiniciar investigação";
    btn.onclick = resetGame;
    continueArea.appendChild(btn);
  }

  renderSidebar();
}

function renderAfterDeath(scene) {
  choicesEl.innerHTML = "";
  continueArea.innerHTML = "";
  if (scene.next) {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Continuar";
    btn.onclick = () => renderScene(scene.next);
    continueArea.appendChild(btn);
  }
  renderSidebar();
}

function showBlackout(person, callback) {
  const names = {
    Emily: "Emily é encontrada morta.",
    Thomas: "Thomas é encontrado morto.",
    Daniel: "Daniel é encontrado morto.",
    Richard: "Richard é encontrado morto."
  };
  blackoutMessage.textContent = names[person] || "";
  blackout.classList.remove("hidden");
  blackoutBtn.onclick = () => {
    blackout.classList.add("hidden");
    callback();
  };
}

function resetGame() {
  state.scene = "prologue";
  state.clues = [];
  state.choiceHistory = [];
  state.emilyAlive = true;
  state.thomasAlive = true;
  state.danielAlive = true;
  state.richardAlive = true;
  state.helenaExposed = false;
  state.cultHideoutFound = false;
  state.investigatedPeople = [];
  state.protectedPerson = null;
  state.examinedEvidence = [];
  state.mistakes = 0;
  state.serverEvidence = false;
  blackout.classList.add("hidden");
  renderScene("prologue");
}

function changeFont(delta) {
  fontScale = Math.min(1.35, Math.max(.85, fontScale + delta));
  document.documentElement.style.setProperty("--font-scale", fontScale.toFixed(2));
}

function plainSceneNarration() {
  const scene = scenes[state.scene];
  if (!scene) return "";
  const blocks = scene.dynamicText ? scene.dynamicText() : scene.text;
  const holder = document.createElement("div");
  holder.innerHTML = [scene.title, ...blocks].join(". ");
  return holder.textContent.replace(/\s+/g, " ").trim();
}

function stopNarration() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  narrationOn = false;
  const button = document.getElementById("narration-btn");
  if (button) {
    button.textContent = "▶ Narração";
    button.setAttribute("aria-pressed", "false");
  }
}

function toggleNarration() {
  if (!("speechSynthesis" in window)) {
    alert("A narração não é compatível com este navegador.");
    return;
  }
  if (narrationOn) {
    stopNarration();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(plainSceneNarration());
  utterance.lang = "pt-BR";
  utterance.rate = .92;
  utterance.pitch = .95;
  utterance.volume = 1;
  utterance.onend = stopNarration;
  narrationOn = true;
  const button = document.getElementById("narration-btn");
  button.textContent = "■ Parar narração";
  button.setAttribute("aria-pressed", "true");
  window.speechSynthesis.speak(utterance);
}

function toggleMusic() {
  const button = document.getElementById("music-btn");
  if (!ambience.paused) {
    ambience.pause();
    musicOn = false;
    button.textContent = "♫ Música desligada";
    button.setAttribute("aria-pressed", "false");
    return;
  }
  musicOn = true;
  playMusic();
}

function playMusic() {
  const button = document.getElementById("music-btn");
  const playback = ambience.play();
  if (playback) {
    playback.then(() => {
      button.textContent = "♫ Música ligada";
      button.setAttribute("aria-pressed", "true");
    }).catch(() => {
      musicOn = false;
      button.textContent = "♫ Ativar música";
      button.setAttribute("aria-pressed", "false");
    });
  }
}

document.getElementById("restart-btn").addEventListener("click", resetGame);
document.getElementById("font-decrease").addEventListener("click", () => changeFont(-.1));
document.getElementById("font-increase").addEventListener("click", () => changeFont(.1));
document.getElementById("narration-btn").addEventListener("click", toggleNarration);
document.getElementById("music-btn").addEventListener("click", toggleMusic);

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  musicOn = true;
  ambience.currentTime = 0;
  playMusic();
  renderScene("prologue");
});
