// =====================================================
// A VILA DAS JÓIAS — Motor Narrativo Recursivo
// Vila das Joias, 1995 — Jogo de Investigação
// =====================================================

const IMG = {
  praca: 'assets/images/praca.png',
  salao: 'assets/images/salao.png',
  ponto: 'assets/images/ponto_emergencia.png',
  hospedaria: 'assets/images/hospedaria.png',
  relojoaria: 'assets/images/relojoaria.png',
  delegacia: 'assets/images/delegacia.png',
  biblioteca: 'assets/images/biblioteca.png',
  casa: 'assets/images/casa_abandonada.png',
  jack: 'assets/images/oficina_jack.png',
  mina: 'assets/images/mina.png'
};

const CLUES = {
  marks:          ['Riscos na armação',       'A joia encontrada possui marcas gravadas com ferramenta. Parecem deliberadas.'],
  morseCode:      ['Código Morse: "P3"',      'Os riscos formam a mensagem "P3" em Código Morse.'],
  maisieWitness:  ['Pessoa com bolsa',        'Maisie viu alguém correndo com uma bolsa pesada na madrugada.'],
  secondFigure:   ['Segunda pessoa',          'Maisie percebeu outra pessoa parada vigiando na escuridão.'],
  routeNorth:     ['Rota para o norte',       'A pessoa com a bolsa seguiu em direção às casas abandonadas.'],
  maisieDevice:   ['Aparelho luminoso',       'A segunda pessoa segurava um aparelho de rádio portátil com antena curta e luz âmbar pulsante.'],
  coltAbsent:     ['Guarda ausente',          'Colt se afastou do posto durante minutos cruciais na noite do roubo.'],
  coltReason:     ['Barulho no beco',         'Colt diz ter saído para checar um barulho no beco lateral.'],
  jessieLocks:    ['Marcas nas fechaduras',   'As vitrines não foram quebradas: as fechaduras apresentam riscos finos de uma ferramenta de precisão.'],
  piperNoRecord:  ['Joia sem origem',         'Uma peça da coleção não possui registro de extração mineral.'],
  inventoryCode:  ['Código de arquivo',       'Piper forneceu um número para busca nos registros antigos.'],
  mineSealed:     ['Mina selada',             'Registros indicam que a mina foi fechada com riquezas ainda dentro.'],
  foundersPhrase: ['Frase dos fundadores',    '"O caminho permanece onde nenhuma pedra nasceu da terra."'],
  p3Meaning:      ['O significado de P3',     'P3 era o terceiro posto da antiga rota de emergência, ao norte, perto das casas abandonadas.'],
  jackRadio:      ['Rádio de ondas curtas',   'Jack possui equipamento profissional de rádio na oficina.'],
  jackMorse:      ['Tabela de Morse',         'Uma tabela de Código Morse está na parede da oficina de Jack.'],
  jackLied:       ['Conhecimento impossível', 'Jack revelou saber que P3 era o posto do norte antes de Isaac contar o significado do código.'],
  jackDeviceMatch:['Ligação com o esconderijo','O rádio de Jack usa a mesma frequência, luz âmbar e adaptação descritas por Maisie e registradas no esconderijo.'],
  gemTargeted:    ['Joia visada',             'Alguém tentou recuperar especificamente a joia marcada.'],
  hideoutFound:   ['Esconderijo',             'Casa abandonada no norte usada como base.'],
  mikeReceipts:   ['Recibos de Mike',         'Compras de suprimentos em nome de Mike no esconderijo.'],
  gemsAllTested:  ['Joias testadas',          'Cada joia roubada foi pesada e examinada individualmente.'],
  radioNote:      ['Canal do esconderijo',    'As anotações dos ladrões citam a frequência 7,18, um “receptor J” e uma luz pulsante.'],
  syntheticGem:   ['Joia artificial',         'A peça marcada é uma imitação antiga de resina mineral, fabricada em baixa temperatura.'],
  mapRevealed:    ['Mapa encontrado',         'Uma cápsula metálica com o mapa estava selada dentro da joia artificial.']
};

const CLUE_IDS = Object.keys(CLUES);
const REQUIRED_BEFORE_MAP = CLUE_IDS.filter(id => id !== 'mapRevealed');

// =====================================================
// GERENCIAMENTO DE ESTADO
// =====================================================

const defaultState = () => ({
  version: 2,
  scene: 'intro',
  clues: [],
  visited: [],
  gemLocation: null,
  turns: 0,
  threatSeen: false,
  maisieLevel: 0,
  jessieLevel: 0,
  piperLevel: 0,
  coltTalked: false,
  jackLevel: 0,
  libraryLevel: 0,
  salaoVisits: 0,
  hideoutStage: 0,
  collectionRecovered: false,
  invasionReviewed: false,
  gemTransferAuthorized: false,
  ended: false
});

let state = defaultState();
let audioContext = null;
let isMuted = false;

// =====================================================
// DOM E UTILITÁRIOS
// =====================================================

const $ = id => document.getElementById(id);
const bg = $('sceneBg'), title = $('sceneTitle'), story = $('storyText'), choices = $('choices');
const place = $('scenePlace'), chapter = $('chapterLabel'), feedback = $('feedback');

function has(id) { return state.clues.includes(id); }

function hasAll(ids) { return ids.every(has); }

function addClue(id) {
  if (!has(id)) {
    state.clues.push(id);
    feedback.textContent = `Pista registrada: ${CLUES[id][0]}`;
    setTimeout(() => {
      if (feedback.textContent.startsWith('Pista')) feedback.textContent = '';
    }, 3000);
  }
}

function visit(id) { if (!state.visited.includes(id)) state.visited.push(id); }

function paragraphs(arr) {
  return arr.map(x =>
    x.startsWith('—') ? `<p class="dialogue">${x}</p>` : `<p>${x}</p>`
  ).join('');
}

function setScene({ img, where, chap, name, text, opts = [] }) {
  state.scene = name;
  bg.style.backgroundImage = `url('${img}')`;
  const si = $('sceneImg');
  if (si) {
    si.style.animation = 'none';
    si.offsetHeight; // reflow
    si.style.animation = '';
    si.src = img;
  }
  place.textContent = where;
  chapter.textContent = chap;
  title.textContent = name;
  story.innerHTML = Array.isArray(text) ? paragraphs(text) : text;
  choices.innerHTML = '';
  opts.forEach(o => {
    const b = document.createElement('button');
    b.className = 'choice' + (o.locked ? ' locked' : '');
    b.innerHTML = `${o.label}${o.note ? `<small>${o.note}</small>` : ''}`;
    b.disabled = !!o.locked;
    b.onclick = o.action;
    choices.appendChild(b);
  });
  updateUI();
  autoSave();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI() {
  $('clueCount').textContent = state.clues.length;
  $('clueStatus').textContent = state.clues.length;
  $('gemStatus').textContent = state.gemLocation
    ? ({ delegacia: 'Delegacia', salao: 'Salão', isaac: 'Com Isaac', relojoaria: 'Relojoaria (lacrada)' }[state.gemLocation])
    : '—';
  $('visitStatus').textContent = `${state.visited.length}/10`;
  const progress = Math.min(100, Math.round(
    (state.clues.length / CLUE_IDS.length) * 85 +
    (state.visited.length / 10) * 10 +
    (state.ended ? 5 : 0)
  ));
  $('progressBar').style.width = progress + '%';

  const n = state.clues.length;
  if (state.ended) $('caseHint').textContent = '';
  else if (n === 0) $('caseHint').textContent = 'Belle prepara o caderno. A investigação começa agora.';
  else if (n < 5)  $('caseHint').textContent = 'Cada morador pode ter uma peça do quebra-cabeça.';
  else if (n < 10) $('caseHint').textContent = 'Talvez valha a pena revisitar alguns locais com as novas informações.';
  else if (n < 15) $('caseHint').textContent = 'As peças estão se conectando. Será que já é hora de agir?';
  else             $('caseHint').textContent = 'O quadro está quase completo.';
}

function autoSave() { localStorage.setItem('misterioJoiasSave', JSON.stringify(state)); }

function loadSave() {
  try {
    const s = JSON.parse(localStorage.getItem('misterioJoiasSave'));
    if (s && s.scene && s.version === 2) { state = { ...defaultState(), ...s }; return true; }
  } catch (e) {}
  return false;
}

function tick() {
  state.turns++;
  if (state.turns >= 3 && !state.threatSeen) {
    state.threatSeen = true;
    gemThreat();
    return true;
  }
  return false;
}

// =====================================================
// SISTEMA DE ÁUDIO
// =====================================================

function initAudio() {
  const a = $('bgMusic');
  if (a) { a.volume = 0.4; a.play().catch(() => startSynth()); }
}

function startSynth() {
  try {
    if (audioContext) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioContext = new AC();
    const o = audioContext.createOscillator();
    const g = audioContext.createGain();
    const f = audioContext.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(55, audioContext.currentTime);
    f.type = 'lowpass'; f.frequency.setValueAtTime(160, audioContext.currentTime);
    g.gain.setValueAtTime(0.06, audioContext.currentTime);
    o.connect(f); f.connect(g); g.connect(audioContext.destination); o.start();
  } catch (e) {}
}

function toggleAudio() {
  const a = $('bgMusic');
  isMuted = !isMuted;
  if (a) a.muted = isMuted;
  if (audioContext) { isMuted ? audioContext.suspend() : audioContext.resume(); }
  $('audioToggleBtn').textContent = isMuted ? '🔇 Mudo' : '🔊 Som';
}

// =====================================================
// CENAS — ABERTURA (PRÓLOGO NARRADO)
// =====================================================

function intro() {
  visit('praca');
  setScene({
    img: IMG.praca, where: 'Vila das Joias', chap: 'Prólogo',
    name: 'O Segredo da Vila das Joias',
    text: [
      'No ano de 1995, a Vila das Joias é um pequeno e próspero vilarejo cercado por montanhas. Seu nome vem de uma coleção de pedras preciosas preservada há muitas gerações no Salão das Joias, um dos lugares mais importantes da vila.',
      'Os moradores conhecem várias histórias sobre a origem da coleção. Uma delas afirma que os fundadores encontraram suas primeiras pedras preciosas em uma antiga mina nas montanhas. Com a riqueza retirada de lá, construíram casas, estradas e transformaram o povoado na Vila das Joias.',
      'Porém, a mina desapareceu dos mapas. Segundo os registros oficiais, ela se esgotou e foi abandonada. Sua entrada acabou perdida com o passar das décadas.'
    ],
    opts: [{ label: 'Continuar', action: introLegend }]
  });
}

function introLegend() {
  setScene({
    img: IMG.praca, where: 'Vila das Joias', chap: 'Prólogo',
    name: 'A Lenda da Joia Selada',
    text: [
      'Existe também uma frase antiga, repetida por alguns moradores sem que ninguém saiba explicar sua origem: “O caminho permanece onde nenhuma pedra nasceu da terra.”',
      'Uns dizem que ela fala sobre a mina perdida. Outros acreditam que é apenas uma invenção para assustar curiosos.',
      'Com o passar das gerações, a verdade se misturou à lenda.'
    ],
    opts: [{ label: 'Continuar', action: introTheft }]
  });
}

function introTheft() {
  setScene({
    img: IMG.salao, where: 'Vila das Joias', chap: 'Prólogo',
    name: 'Luzes na Madrugada',
    text: [
      'Às duas e dezessete da madrugada, os cães da praça começam a latir. Uma pancada metálica ecoa no beco ao lado do Salão das Joias.',
      'Mais ao norte, por um instante, uma pequena luz âmbar pisca no escuro. Depois tudo volta ao silêncio.',
      'Ninguém imagina que, naquela hora, a história da vila acaba de mudar.'
    ],
    opts: [{ label: 'Continuar', action: introMistake }]
  });
}

function introMistake() {
  setScene({
    img: IMG.ponto, where: 'Vila das Joias', chap: 'Prólogo',
    name: 'O Alarme',
    text: [
      'Pouco antes do amanhecer, o alarme do Salão dispara. Quando Piper e Colt chegam, as vitrines estão vazias e a coleção desapareceu.',
      'A polícia isola o prédio. Do lado de fora, pegadas de barro seguem pela saída lateral e somem nas ruas da vila.',
      'Na manhã seguinte, Isaac e Belle decidem observar aquilo que os adultos, na pressa, talvez tenham deixado passar.'
    ],
    opts: [{ label: 'Iniciar a investigação', action: introIsaac }]
  });
}

function introIsaac() {
  setScene({
    img: IMG.praca, where: 'Praça Central', chap: 'Capítulo 1',
    name: 'A Manhã Seguinte',
    text: [
      'Isaac acorda com uma notícia que toma conta da vila: a coleção de joias do Salão foi roubada durante a madrugada.',
      'Sua amiga Belle aparece na porta.',
      '— Isaac! Levaram praticamente tudo do Salão. O guarda fechou a área, mas eu ouvi que encontraram pegadas de lama perto da saída lateral. Vamos até lá antes que as pistas desapareçam.'
    ],
    opts: [{ label: 'Ir com Belle ao Salão das Joias', action: firstSalon }]
  });
}

function firstSalon() {
  visit('salao');
  state.salaoVisits++;
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Capítulo 1',
    name: 'Vitrines Vazias',
    text: [
      'A janela lateral está quebrada, com vidro espalhado perto da parede. As vitrines, porém, estão intactas, abertas e vazias.',
      'Piper, a curadora da coleção, confere os registros em silêncio. Colt, o guarda noturno, anda de um lado para o outro sem encarar ninguém.'
    ],
    opts: [
      { label: 'Examinar as vitrines quebradas', action: examineSalon },
      { label: 'Observar a saída lateral', action: lateralExit }
    ]
  });
}

function examineSalon() {
  addClue('jessieLocks');
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Capítulo 1',
    name: 'Vidro e Precisão',
    text: [
      'O vidro quebrado veio apenas da janela lateral. Nas vitrines não há golpes: as fechaduras mostram riscos finos e paralelos, deixados por uma ferramenta de precisão.',
      'Belle anota no caderno: “A janela serviu de entrada ou distração. Para abrir as vitrines, alguém veio preparado.”'
    ],
    opts: [{ label: 'Verificar a saída lateral', action: lateralExit }]
  });
}

function lateralExit() {
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Capítulo 1',
    name: 'Pegadas na Lama',
    text: [
      'Na saída lateral, Belle aponta pegadas de barro fresco no chão. Alguém saiu correndo por aqui durante a madrugada.',
      'As marcas seguem em direção ao antigo ponto de emergência que os viajantes usam nas montanhas.'
    ],
    opts: [{ label: 'Seguir o rastro', action: findGem }]
  });
}

function findGem() {
  visit('ponto');
  setScene({
    img: IMG.ponto, where: 'Ponto de Emergência', chap: 'Capítulo 2',
    name: 'Uma Joia no Chão',
    text: [
      'Sob o banco de madeira do abrigo de emergência, algo brilha. Uma joia da coleção.',
      'Isaac a examina. Não parece ter caído por acidente — foi colocada ali de propósito, apoiada contra a parede do banco.',
      'Belle observa: "Se alguém roubou todas as joias, como conseguiu esquecer justamente uma?"'
    ],
    opts: [{ label: 'Examinar a joia de perto', action: examineMarks }]
  });
}

function examineMarks() {
  addClue('marks');
  setScene({
    img: IMG.ponto, where: 'Ponto de Emergência', chap: 'Capítulo 2',
    name: 'Riscos Deliberados',
    text: [
      'Isaac segura a peça contra a luz. Na armação de metal, há riscos pequenos e organizados: pontos curtos e traços longos, gravados com alguma ferramenta.',
      'Não são danos de queda. São marcas feitas de propósito.',
      'Isaac copia os símbolos no caderno. Ainda não sabe o que significam, mas parecem algum tipo de código. Talvez alguém na vila consiga identificar.'
    ],
    opts: [{ label: 'Decidir o que fazer com a joia', action: gemDecision }]
  });
}

function gemDecision() {
  setScene({
    img: IMG.ponto, where: 'Ponto de Emergência', chap: 'Capítulo 2',
    name: 'O que Fazer com a Joia?',
    text: [
      'A peça pertence à coleção da vila. Belle pergunta o que Isaac pretende fazer com ela enquanto investigam.'
    ],
    opts: [
      {
        label: 'Entregar à Delegacia',
        note: 'Fica sob custódia policial.',
        action: () => { state.gemLocation = 'delegacia'; hub('A joia foi entregue à delegacia.'); }
      },
      {
        label: 'Devolver ao Salão das Joias',
        note: 'Retorna à coleção, sob os cuidados de Piper.',
        action: () => { state.gemLocation = 'salao'; hub('Piper guardou a joia no cofre.'); }
      },
      {
        label: 'Manter consigo por enquanto',
        note: 'Permite examinar a peça diretamente.',
        action: () => { state.gemLocation = 'isaac'; hub('Isaac guarda a joia no bolso.'); }
      }
    ]
  });
}

// =====================================================
// CENA — HUB (PRAÇA CENTRAL)
// =====================================================

function hub(msg = '') {
  visit('praca');
  if (msg) feedback.textContent = msg;
  const text = [];
  if (state.hideoutStage >= 3) {
    text.push('A praça está mais calma. Isaac tem provas concretas, mas ainda restam perguntas sem resposta.');
  } else {
    text.push('Moradores comentam sobre o roubo em voz baixa. Cada pessoa na vila pode ter visto ou ouvido alguma coisa.');
  }
  setScene({
    img: IMG.praca, where: 'Praça Central', chap: 'Investigação',
    name: 'Próximo Passo',
    text,
    opts: hubOptions()
  });
}

function hubOptions() {
  const opts = [
    { label: '🏨 Hospedaria Bela Vista', action: hospedaria },
    { label: '🕰️ Relojoaria', action: relojoaria },
    { label: '💎 Salão das Joias', action: salaoRevisit },
    { label: '🚓 Delegacia', action: delegacia },
    { label: '📚 Biblioteca da Vila', action: biblioteca },
    { label: '📻 Oficina de Jack', action: jackWorkshop },
    {
      label: '🧭 Ponto de emergência',
      note: has('morseCode') && !has('p3Meaning') ? 'Talvez “P3” esteja ligado à antiga rota.' : '',
      action: messagePointRevisit
    },
    {
      label: '🏚️ Casas abandonadas ao norte',
      locked: !has('routeNorth'),
      note: !has('routeNorth') ? 'Isaac não sabe para onde os suspeitos foram.' : '',
      action: abandonedApproach
    }
  ];
  return opts;
}

function messagePointRevisit() {
  visit('ponto');
  const text = [
    'O abrigo continua vazio. Na madeira do banco, ainda há a marca limpa do lugar onde a joia foi apoiada.',
    'Uma placa enferrujada identifica o abrigo como P2. Se a mensagem dizia “P3”, ela provavelmente indicava outro posto da mesma rota.'
  ];
  const opts = [];

  if (has('morseCode') && !has('p3Meaning')) {
    text.push('O mapa completo dos antigos postos deve estar guardado na biblioteca.');
    opts.push({ label: 'Procurar o mapa dos postos na biblioteca', action: biblioteca });
  }

  opts.push({ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } });
  setScene({ img: IMG.ponto, where: 'Ponto de Emergência P2', chap: 'Revisita', name: 'A Placa Enferrujada', text, opts });
}

// =====================================================
// CENAS — HOSPEDARIA (MAISIE)
// =====================================================

function hospedaria() {
  visit('hospedaria');
  const text = ['A hospedaria é acolhedora. Maisie limpa o balcão enquanto olha pela janela.'];
  const opts = [];

  if (state.maisieLevel === 0) {
    opts.push({ label: 'Perguntar a Maisie sobre a noite do roubo', action: maisieBasic });
  } else if (state.maisieLevel === 1) {
    text.push('Maisie parece disposta a conversar mais.');
    opts.push({ label: 'Perguntar se viu mais alguma coisa', action: maisieSecond });
  } else if (state.maisieLevel === 2 && !has('routeNorth')) {
    opts.push({ label: 'Perguntar para onde a pessoa foi', action: maisieRoute });
  }

  if (state.maisieLevel >= 2 && (has('jackRadio') || has('jackMorse')) && !has('maisieDevice')) {
    opts.push({ label: 'Perguntar sobre o que a segunda pessoa segurava', action: maisieDevice });
  }

  if (has('maisieDevice')) {
    text.push('Depois de rever a lembrança, Maisie confirmou a antena curta e a luz âmbar do aparelho.');
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.hospedaria, where: 'Hospedaria Bela Vista', chap: 'Investigação',
    name: 'A Hospedaria', text, opts
  });
}

function maisieBasic() {
  state.maisieLevel = 1;
  addClue('maisieWitness');
  setScene({
    img: IMG.hospedaria, where: 'Hospedaria Bela Vista', chap: 'Investigação',
    name: 'Maisie Conta o que Viu',
    text: [
      '— Eu estava fechando a cozinha quando ouvi passos rápidos lá fora.',
      '— Olhei pela janela e vi alguém atravessando a rua com uma bolsa grande. Corria como se estivesse fugindo.'
    ],
    opts: [
      { label: 'Perguntar se viu mais alguma coisa', action: maisieSecond },
      { label: 'Agradecer e sair', action: () => { if (!tick()) hub(); } }
    ]
  });
}

function maisieSecond() {
  state.maisieLevel = 2;
  addClue('secondFigure');
  setScene({
    img: IMG.hospedaria, where: 'Hospedaria Bela Vista', chap: 'Investigação',
    name: 'Uma Segunda Pessoa',
    text: [
      '— Tinha outra pessoa. Mais longe, parada na esquina. Não se mexia.',
      '— Parecia estar esperando ou vigiando. Não consegui ver o rosto de nenhum dos dois.'
    ],
    opts: [
      { label: 'Perguntar para onde a primeira pessoa foi', action: maisieRoute },
      { label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }
    ]
  });
}

function maisieRoute() {
  state.maisieLevel = 3;
  addClue('routeNorth');
  setScene({
    img: IMG.hospedaria, where: 'Hospedaria Bela Vista', chap: 'Investigação',
    name: 'A Direção da Fuga',
    text: [
      '— A pessoa com a bolsa seguiu para o norte, onde ficam aquelas casas antigas que ninguém usa mais.',
      '— Depois disso perdi de vista. Fiquei com medo de sair.',
      'Belle anota a direção no caderno.'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

function maisieDevice() {
  addClue('maisieDevice');
  setScene({
    img: IMG.hospedaria, where: 'Hospedaria Bela Vista', chap: 'Investigação',
    name: 'Um Detalhe na Escuridão',
    text: [
      '— Agora que você pergunta... a pessoa na esquina segurava alguma coisa.',
      '— Era pequeno, com uma antena curta. Uma luz âmbar pulsava devagar, como nos rádios quando recebem sinal.',
      'Maisie desenha o formato no caderno de Isaac. Agora existe um detalhe concreto para comparar com algum aparelho da vila.'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

// =====================================================
// CENAS — RELOJOARIA (JESSIE)
// =====================================================

function relojoaria() {
  visit('relojoaria');
  const text = ['A relojoaria é pequena e cheia de engrenagens. Ferramentas de precisão cobrem a bancada.'];
  const opts = [];

  if (state.jessieLevel === 0) {
    text.push('Jessie trabalha concentrada. Além de relógios, examina trancas e mecanismos danificados.');
    opts.push({ label: 'Mostrar a cópia das marcas da joia', action: jessieShowMarks });
  } else if (state.jessieLevel === 1) {
    opts.push({ label: 'Perguntar se identificou os riscos', action: jessieDecode });
  } else if (state.jessieLevel >= 2) {
    text.push('Jessie continua trabalhando. Olha de relance para Isaac.');
  }

  if (state.jessieLevel >= 2 && has('foundersPhrase') && has('piperNoRecord') && !has('syntheticGem')) {
    if (state.gemLocation === 'isaac' || state.gemLocation === 'relojoaria') {
      opts.push({ label: 'Pedir que Jessie examine a pedra com a lente de aumento', action: jessieSynthetic });
    } else {
      opts.push({ label: 'Solicitar a transferência da joia para um exame', action: requestGemTransfer });
    }
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Investigação',
    name: 'A Relojoaria', text, opts
  });
}

function jessieShowMarks() {
  state.jessieLevel = 1;
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Investigação',
    name: 'Jessie Examina as Marcas',
    text: [
      'Jessie pega uma lupa e estuda a cópia do caderno de Isaac em silêncio.',
      '— Não é dano de queda. Foi gravado com uma ferramenta, de propósito. Preciso de mais tempo para entender o padrão.',
      has('jessieLocks')
        ? 'Ela também compara os riscos com as fotografias das fechaduras. “Não são iguais. O código foi gravado às pressas; as vitrines foram abertas por alguém experiente.”'
        : 'Jessie recomenda que Isaac fotografe também as fechaduras das vitrines antes de tirar conclusões.'
    ],
    opts: [
      { label: 'Esperar enquanto ela analisa', action: jessieDecode },
      { label: 'Voltar mais tarde', action: () => { if (!tick()) hub(); } }
    ]
  });
}

function jessieDecode() {
  state.jessieLevel = 2;
  addClue('morseCode');
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Investigação',
    name: 'Pontos e Traços',
    text: [
      '— São pontos e traços organizados. Isso é Código Morse.',
      '— A mensagem é "P3". Pode ser uma localização combinada, uma abreviação... só faz sentido para quem escreveu.',
      'Belle pergunta como Jessie conhece Código Morse. Jessie dá de ombros: "Conserto rádios antigos. Aprendi por necessidade."'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

function jessieSynthetic() {
  state.gemLocation = 'relojoaria';
  state.gemTransferAuthorized = true;
  addClue('syntheticGem');
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Investigação',
    name: 'A Pedra sob a Lente',
    text: [
      'Jessie coloca a joia sob a lente mais potente da oficina. Fica em silêncio por quase um minuto.',
      '— Isto não é uma gema cultivada em forno. É uma imitação antiga feita de resina mineral, moldada em baixa temperatura e montada numa armação metálica.',
      'Piper e o inspetor são avisados. Jessie lacra a peça na bancada: o exame confirma que ela foi fabricada, mas ainda não prova o que existe em seu interior.'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

function requestGemTransfer() {
  const fromPolice = state.gemLocation === 'delegacia';
  state.gemLocation = 'relojoaria';
  state.gemTransferAuthorized = true;
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Investigação',
    name: 'Custódia Registrada',
    text: [
      fromPolice
        ? 'O inspetor registra a retirada da joia e acompanha o transporte até a relojoaria. A peça permanece dentro de um estojo lacrado.'
        : 'Piper assina a retirada da peça do cofre e acompanha Isaac até a relojoaria. A joia não fica sem supervisão.',
      'A ausência de registro levantou uma suspeita, mas Jessie deixa claro: somente o exame físico poderá confirmar se a peça é artificial.'
    ],
    opts: [{ label: 'Examinar a joia sob a lente', action: jessieSynthetic }]
  });
}

// =====================================================
// CENAS — SALÃO DAS JOIAS (PIPER & COLT)
// =====================================================

function salaoRevisit() {
  visit('salao');
  state.salaoVisits++;
  const text = [];
  if (state.collectionRecovered) {
    text.push('A coleção recuperada está novamente no salão, agora dentro de vitrines lacradas pela polícia. Piper confere cada peça devolvida enquanto Colt vigia a entrada.');
  } else if (state.salaoVisits === 2) {
    text.push('O salão continua interditado. Piper compara os livros de inventário enquanto Colt permanece por perto.');
  } else {
    text.push('Em mais uma visita ao salão interditado, Isaac percebe que as vitrines vazias continuam preservadas como parte da investigação.');
  }
  const opts = [];

  if (!has('jessieLocks')) {
    opts.push({ label: 'Examinar cuidadosamente as fechaduras das vitrines', action: examineSalon });
  }

  if (state.piperLevel === 0) {
    opts.push({ label: 'Conversar com Piper sobre a coleção', action: talkPiper });
  }
  if (state.piperLevel >= 1 && has('mineSealed') && !has('inventoryCode')) {
    opts.push({ label: 'Mostrar a Piper o que encontrou na biblioteca', action: piperDeepDive });
  }
  if (!state.coltTalked) {
    opts.push({ label: 'Conversar com Colt sobre a noite do roubo', action: talkColt });
  }

  if (state.piperLevel >= 1 && state.coltTalked) {
    text.push('Piper e Colt já contaram o que sabiam. Mas novas informações de outros locais podem mudar o que Isaac consegue perguntar aqui.');
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Investigação',
    name: 'O Salão', text, opts
  });
}

function talkPiper() {
  state.piperLevel = 1;
  addClue('piperNoRecord');
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Investigação',
    name: 'Os Registros de Piper',
    text: [
      '— Estou comparando linha por linha dos livros de inventário. A maioria das peças está catalogada com local de extração, data e peso.',
      '— Mas achei algo estranho nos registros. Uma das joias não tem origem mineral anotada. Nenhuma mina, nenhuma data de extração.',
      '— Pode ser um erro antigo de catalogação. Ou pode ser outra coisa.'
    ],
    opts: [{ label: 'Voltar ao salão', action: salaoRevisit }]
  });
}

function piperDeepDive() {
  state.piperLevel = 2;
  addClue('inventoryCode');
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Investigação',
    name: 'O Código do Arquivo',
    text: [
      'Isaac mostra a Piper as atas sobre a mina. Ela fica pensativa.',
      '— Se essa peça sem registro está ligada aos fundadores, talvez haja algo nos arquivos restritos da biblioteca.',
      'Piper anota um código de inventário antigo e entrega a Isaac.'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

function talkColt() {
  state.coltTalked = true;
  addClue('coltAbsent');
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Investigação',
    name: 'O Guarda Nervoso',
    text: [
      'Colt engole em seco antes de falar.',
      '— Eu saí do posto. Por alguns minutos. Ouvi um barulho no beco lateral e fui verificar.',
      '— Quando voltei, já tinham entrado.'
    ],
    opts: [
      { label: 'Perguntar que tipo de barulho era', action: coltBarulho },
      { label: 'Voltar ao salão', action: salaoRevisit }
    ]
  });
}

function coltBarulho() {
  addClue('coltReason');
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Investigação',
    name: 'O Barulho no Beco',
    text: [
      '— Parecia alguém batendo em metal. Como se forçassem uma grade.',
      '— Quando cheguei, não tinha ninguém. Acho que pode ter sido uma distração.',
      'Belle sussurra para Isaac: "Se foi uma distração, quem a criou?"'
    ],
    opts: [{ label: 'Voltar ao salão', action: salaoRevisit }]
  });
}

// =====================================================
// CENAS — BIBLIOTECA
// =====================================================

function biblioteca() {
  visit('biblioteca');
  const text = ['Prateleiras de madeira rangem sob o peso de décadas de documentos.'];
  const opts = [];

  if (state.libraryLevel === 0) {
    opts.push({ label: 'Procurar documentos sobre a história da vila', action: bibliotecaHistory });
  }
  if (state.libraryLevel >= 1 && !has('mineSealed')) {
    opts.push({ label: 'Investigar os registros sobre a mina antiga', action: bibliotecaMine });
  }
  if (has('inventoryCode') && !has('foundersPhrase')) {
    opts.push({ label: 'Usar o código de Piper nos arquivos restritos', action: bibliotecaFounders });
  }
  if (has('morseCode') && has('routeNorth') && !has('p3Meaning')) {
    opts.push({ label: 'Procurar um mapa dos antigos postos de emergência', action: bibliotecaEmergencyMap });
  }
  if (state.libraryLevel >= 1) {
    text.push('Belle organiza as anotações enquanto Isaac procura entre os documentos.');
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.biblioteca, where: 'Biblioteca', chap: 'Investigação',
    name: 'A Biblioteca', text, opts
  });
}

function bibliotecaHistory() {
  state.libraryLevel = 1;
  setScene({
    img: IMG.biblioteca, where: 'Biblioteca', chap: 'Investigação',
    name: 'A Fundação da Vila',
    text: [
      'Jornais antigos contam a história oficial: mineradores descobriram pedras preciosas nas montanhas e fundaram a vila.',
      'Quando a mina se esgotou, a entrada foi esquecida.',
      'Belle nota algo: "Alguns jornais dizem que a mina foi fechada por decisão dos fundadores. Não por ter acabado."'
    ],
    opts: [
      { label: 'Investigar mais sobre a mina', action: bibliotecaMine },
      { label: 'Voltar à biblioteca', action: biblioteca }
    ]
  });
}

function bibliotecaMine() {
  state.libraryLevel = 2;
  addClue('mineSealed');
  setScene({
    img: IMG.biblioteca, where: 'Biblioteca', chap: 'Investigação',
    name: 'Atas Secretas',
    text: [
      'Em atas mais antigas, Isaac encontra uma versão diferente.',
      'A mina não estava vazia. Os fundadores decidiram fechar a entrada porque temiam que a riqueza atraísse exploração descontrolada.',
      'Os registros oficiais foram alterados para dizer que a mina se esgotou. A localização verdadeira foi apagada dos mapas.'
    ],
    opts: [{ label: 'Voltar à biblioteca', action: biblioteca }]
  });
}

function bibliotecaFounders() {
  state.libraryLevel = 3;
  addClue('foundersPhrase');
  setScene({
    img: IMG.biblioteca, where: 'Biblioteca', chap: 'Investigação',
    name: 'O Pergaminho Escondido',
    text: [
      'Isaac usa o código de Piper. Entre dois inventários encadernados, Belle encontra um pergaminho solto.',
      'Em caligrafia antiga, está escrito:',
      '— "O caminho permanece onde nenhuma pedra nasceu da terra."',
      'Isaac relê várias vezes. Uma pedra que não nasceu da terra...'
    ],
    opts: [{ label: 'Voltar à praça', action: () => { if (!tick()) hub(); } }]
  });
}

function bibliotecaEmergencyMap() {
  addClue('p3Meaning');
  setScene({
    img: IMG.biblioteca, where: 'Biblioteca', chap: 'Investigação',
    name: 'O Terceiro Posto',
    text: [
      'Num atlas de resgate de 1958, Isaac encontra três abrigos marcados como P1, P2 e P3.',
      'A joia foi encontrada no P2. O P3 ficava mais ao norte, ao lado das casas hoje abandonadas. A mensagem não indicava onde a joia estava: mandava quem a encontrasse seguir para o próximo ponto.',
      'A rota vista por Maisie confirma a leitura. Pela primeira vez, “P3” deixa de ser apenas um código misterioso.'
    ],
    opts: [{ label: 'Voltar à biblioteca', action: biblioteca }]
  });
}

// =====================================================
// CENAS — OFICINA DE JACK
// =====================================================

function jackWorkshop() {
  visit('jack');
  state.jackLevel = Math.max(state.jackLevel, 1);
  const text = ['Fios, válvulas, soldas e peças de rádio cobrem cada superfície da oficina.'];
  const opts = [];

  if (state.jackLevel <= 1) {
    text.push('Jack aparece sorridente. "Isaac! Soube do roubo. Coisa terrível. Posso ajudar?"');
    opts.push({ label: 'Conversar com Jack sobre o roubo', action: jackChat });
  }
  if (state.jackLevel >= 2 && !has('jackRadio')) {
    opts.push({ label: 'Olhar ao redor da oficina', action: jackLookAround });
  }
  if (has('jackRadio') && !has('jackMorse')) {
    opts.push({ label: 'Examinar a folha na parede', action: jackNoticeChart });
  }
  if (has('morseCode') && has('p3Meaning') && has('jackMorse') && !has('jackLied')) {
    opts.push({ label: 'Mencionar o código encontrado na joia', action: jackTestMorse });
  }
  if (has('jackRadio') && has('maisieDevice') && has('radioNote') && !has('jackDeviceMatch')) {
    opts.push({ label: 'Comparar o rádio com as anotações do esconderijo', action: jackCompareDevice });
  }
  if (has('jackLied')) {
    text[0] = 'A oficina de Jack. O rádio domina a bancada e a tabela de Morse continua na parede.';
    text.push('Jack trabalha em silêncio, evitando olhar para Isaac.');
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Investigação',
    name: 'A Oficina', text, opts
  });
}

function jackChat() {
  state.jackLevel = 2;
  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Investigação',
    name: 'O Vizinho Curioso',
    text: [
      'Jack faz perguntas. Muitas.',
      '— Encontraram alguma pista? A polícia tem suspeitos? Alguém viu alguma coisa?',
      'Belle nota que Jack parece mais interessado em saber o que Isaac descobriu do que em ajudar.'
    ],
    opts: [
      { label: 'Olhar ao redor da oficina', action: jackLookAround },
      { label: 'Sair', action: () => { if (!tick()) hub(); } }
    ]
  });
}

function jackLookAround() {
  addClue('jackRadio');
  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Investigação',
    name: 'Equipamento de Rádio',
    text: [
      'Isaac observa a bancada. Um rádio de ondas curtas profissional ocupa o centro, com antenas, cabos e um microfone.',
      'Na parede ao lado, há uma folha plastificada com símbolos organizados em fileiras.'
    ],
    opts: [
      { label: 'Examinar a folha na parede', action: jackNoticeChart },
      { label: 'Sair', action: () => { if (!tick()) hub(); } }
    ]
  });
}

function jackNoticeChart() {
  addClue('jackMorse');
  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Investigação',
    name: 'A Folha na Parede',
    text: [
      'É uma tabela completa de Código Morse. Cada letra do alfabeto convertida em pontos e traços.',
      'Jack percebe o olhar de Isaac.',
      '— Veio junto com o rádio. Acho que os donos anteriores usavam. Nunca precisei dessas coisas.'
    ],
    opts: [{ label: 'Voltar à oficina', action: jackWorkshop }]
  });
}

function jackTestMorse() {
  addClue('jackLied');
  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Investigação',
    name: 'A Informação que Isaac Não Deu',
    text: [
      'Isaac diz apenas: “As marcas formam P3.” Ele não menciona o mapa da biblioteca nem o norte.',
      'Jack responde depressa demais: “Nunca estive naquele posto ao norte.” Em seguida, fica imóvel.',
      '— Que posto? — pergunta Belle. Jack tenta corrigir: “Eu só imaginei.”',
      'Mas não era possível imaginar aquilo. Jack sabia o significado de P3 antes de Isaac contar.'
    ],
    opts: [{ label: 'Sair da oficina', action: () => { if (!tick()) hub(); } }]
  });
}

function jackCompareDevice() {
  addClue('jackDeviceMatch');
  setScene({
    img: IMG.jack, where: 'Oficina de Jack', chap: 'Confronto',
    name: 'A Mesma Frequência',
    text: [
      'Nas anotações recolhidas no esconderijo, Belle encontrou “7,18 — receptor J” ao lado de um desenho de luz pulsante.',
      'O mostrador do rádio de Jack está travado em 7,18. Ao receber um sinal, uma luz âmbar pulsa exatamente como Maisie descreveu.',
      'Jack desliga o aparelho e manda os dois saírem. Agora há três ligações independentes: a testemunha, o registro do esconderijo e o equipamento da oficina.'
    ],
    opts: [{ label: 'Levar a comparação à polícia', action: delegacia }]
  });
}

// =====================================================
// CENAS — DELEGACIA
// =====================================================

function delegacia() {
  visit('delegacia');
  const text = ['A delegacia é pequena. Um quadro de cortiça com notas e um mapa cobrem a parede.'];
  const opts = [];

  if (state.gemLocation === 'delegacia' && state.threatSeen && !state.invasionReviewed) {
    text.push('O inspetor parece preocupado. O laudo da tentativa de invasão está pronto.');
    opts.push({ label: 'Examinar o laudo do arrombamento', action: delegaciaInvasion });
  }

  opts.push({ label: 'Revisar o quadro de evidências', action: delegaciaReview });

  if (state.collectionRecovered && has('hideoutFound') && has('mikeReceipts')) {
    opts.push({ label: 'Apresentar uma acusação formal', action: delegaciaAccuse });
  } else if (state.clues.length >= 3) {
    opts.push({ label: 'Perguntar se as provas já sustentam uma acusação', action: delegaciaAccuse });
  }

  opts.push({ label: 'Sair', action: () => { if (!tick()) hub(); } });

  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Investigação',
    name: 'Delegacia de Polícia', text, opts
  });
}

function delegaciaReview() {
  const n = state.clues.length;
  let text;
  if (n < 4) text = ['O quadro está quase vazio. Isaac precisa de muito mais informações.'];
  else if (n < 10) text = ['O quadro começa a tomar forma. Depoimentos e observações, mas faltam conexões concretas.'];
  else text = ['O quadro está denso. Várias linhas conectam pistas diferentes. Algo grande está por trás deste roubo.'];

  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Investigação',
    name: 'Quadro de Evidências', text,
    opts: [{ label: 'Voltar', action: delegacia }]
  });
}

function delegaciaInvasion() {
  state.invasionReviewed = true;
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Investigação',
    name: 'Tentativa de Arrombamento',
    text: [
      '— Alguém tentou forçar a janela lateral no fim da tarde.',
      '— Não mexeram no cofre. Não mexeram nos arquivos. Só tentaram abrir a gaveta onde a joia estava guardada.',
      '— Alguém quer aquela joia de volta. Especificamente aquela.'
    ],
    opts: [{ label: 'Voltar', action: delegacia }]
  });
}

function delegaciaAccuse() {
  if (!has('hideoutFound')) {
    setScene({
      img: IMG.delegacia, where: 'Delegacia', chap: 'Investigação',
      name: 'Provas Insuficientes',
      text: [
        'O inspetor revisa as notas de Isaac com atenção.',
        '— São observações válidas, mas não tenho como agir com isso. Testemunhos e coincidências não sustentam um mandado.',
        '— Continue investigando. Encontre provas físicas.'
      ],
      opts: [{ label: 'Voltar à investigação', action: delegacia }]
    });
    return;
  }

  const suspects = [];

  if (has('morseCode'))
    suspects.push({ label: 'Jessie — possui ferramentas e identificou o código', action: () => challengeInnocent('Jessie') });
  if (has('coltAbsent'))
    suspects.push({ label: 'Colt — se ausentou do posto na noite do roubo', action: () => challengeInnocent('Colt') });
  if (has('jackMorse') || has('jackRadio'))
    suspects.push({ label: 'Jack — possui rádio e tabela de Morse', action: () => accuseSuspect('jack') });
  if (has('mikeReceipts'))
    suspects.push({ label: 'Mike — nome aparece nos recibos do esconderijo', action: () => accuseSuspect('mike') });

  suspects.push({ label: 'Ainda não tenho certeza', action: delegacia });

  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Acusação',
    name: 'Quem é o Responsável?',
    text: ['Isaac apresenta suas anotações. O inspetor pergunta:', '— Você tem alguém em mente?'],
    opts: suspects
  });
}

function challengeInnocent(person) {
  const reason = person === 'Jessie'
    ? 'Saber usar ferramentas e reconhecer Morse explica como Jessie ajudou a investigação, mas não a coloca no salão durante o roubo.'
    : 'A ausência de Colt é suspeita, porém o barulho no beco também pode ter sido criado justamente para afastá-lo.';
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Revisão da hipótese',
    name: `A Hipótese sobre ${person}`,
    text: [
      `O inspetor separa suspeita de prova. “${reason}”`,
      '— Posso registrar sua acusação, mas ela alertará a vila. Antes disso, procure uma ligação física com o esconderijo ou com a mensagem P3.'
    ],
    opts: [
      { label: 'Retirar a acusação e continuar investigando', action: delegacia },
      { label: `Insistir na acusação contra ${person}`, action: () => accuseInnocent(person) }
    ]
  });
}

function accuseInnocent(person) {
  state.ended = true;
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Consequência',
    name: 'A Pista Errada',
    text: `<div class="ending bad">
      <p>A investigação formal é aberta contra ${person}. A notícia se espalha pela vila em questão de horas.</p>
      <p>Enquanto todos se concentram na pessoa errada, os verdadeiros responsáveis percebem a oportunidade. Naquela noite, eles deixam a vila antes que os mandados corretos sejam preparados.</p>
      <p>A coleção permanece segura com a polícia, mas Mike e seu parceiro escapam — e a verdade sobre a joia marcada continua escondida.</p>
      <p class="reveal">A investigação seguiu pelo caminho errado. Os verdadeiros criminosos aproveitaram a distração e desapareceram.</p>
    </div>`,
    opts: [{ label: 'Recomeçar a investigação', action: restart }]
  });
}

function accuseSuspect(who) {
  if (who === 'jack' && !(has('jackLied') && has('jackDeviceMatch'))) {
    accuseInsufficient();
    return;
  }

  const knowsMike = has('mikeReceipts');
  const knowsJack = has('jackLied') && has('jackDeviceMatch');

  if (knowsMike && knowsJack) {
    const other = who === 'mike' ? 'Jack' : 'Mike';
    setScene({
      img: IMG.delegacia, where: 'Delegacia', chap: 'Acusação',
      name: 'Há Mais Alguém?',
      text: [`O inspetor anota e pergunta:`, `— Você acredita que agiu sozinho? Há mais alguém envolvido?`],
      opts: [
        { label: `${other} também está envolvido`, action: accuseBoth },
        { label: 'Não tenho certeza', action: goodEndingPartial }
      ]
    });
  } else {
    goodEndingPartial();
  }
}

function accuseInsufficient() {
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Revisão da hipótese',
    name: 'Ainda São Provas Circunstanciais',
    text: [
      'O inspetor explica que possuir rádio e uma tabela de referência não constitui crime.',
      '— A reação de Jack é importante, mas precisamos ligar o aparelho dele ao esconderijo ou à testemunha. Sem isso, ele será liberado e saberá que estamos perto.'
    ],
    opts: [
      { label: 'Continuar investigando', action: delegacia },
      { label: 'Insistir mesmo sem a ligação física', action: insistInsufficient }
    ]
  });
}

function insistInsufficient() {
  state.ended = true;
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Consequência',
    name: 'O Alerta',
    text: `<div class="ending bad">
      <p>Sem uma ligação física, Jack é liberado. A acusação apressada confirma que a polícia está perto da verdade.</p>
      <p>Naquela noite, Mike e Jack abandonam a vila. A coleção foi recuperada, mas os responsáveis escapam antes dos mandados.</p>
      <p class="reveal">Uma conclusão correta, apresentada sem provas suficientes, também pode colocar a investigação em risco.</p>
    </div>`,
    opts: [{ label: 'Recomeçar a investigação', action: restart }]
  });
}

function accuseBoth() {
  if (has('syntheticGem') && state.gemTransferAuthorized && state.gemLocation === 'relojoaria') {
    if (hasAll(REQUIRED_BEFORE_MAP)) beforeClosing();
    else caseNeedsReview();
  } else {
    goodEndingFull();
  }
}

function caseNeedsReview() {
  const missing = REQUIRED_BEFORE_MAP.filter(id => !has(id)).length;
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Decisão',
    name: 'Uma Última Revisão',
    text: [
      'As provas já permitem prender Mike e Jack, mas o caderno ainda possui perguntas sem resposta.',
      `Belle conta ${missing} ${missing === 1 ? 'pista essencial ainda não verificada' : 'pistas essenciais ainda não verificadas'}. Encerrar agora resolverá o roubo, mas não será uma investigação completa.`
    ],
    opts: [
      { label: 'Continuar investigando antes das prisões', action: hub },
      { label: 'Autorizar as prisões e encerrar o caso', action: goodEndingFullResolve }
    ]
  });
}

// =====================================================
// CENAS — CASA ABANDONADA (ESCONDERIJO)
// =====================================================

function abandonedApproach() {
  visit('casa');
  if (state.collectionRecovered) {
    abandonedSecured();
    return;
  }
  state.hideoutStage = Math.max(state.hideoutStage, 1);
  setScene({
    img: IMG.casa, where: 'Arredores Norte', chap: 'Investigação',
    name: 'As Casas Abandonadas',
    text: [
      'A trilha ao norte leva a um grupo de casas velhas com paredes de pedra cobertas de musgo.',
      'A maioria parece intocada. Mas uma delas tem marcas recentes de barro na entrada.'
    ],
    opts: [
      { label: 'Entrar na casa com marcas de barro', action: abandonedInside },
      { label: 'Voltar à praça', action: hub }
    ]
  });
}

function abandonedInside() {
  state.hideoutStage = 2;
  setScene({
    img: IMG.casa, where: 'Casa Abandonada', chap: 'Investigação',
    name: 'Dentro da Casa',
    text: [
      'O chão de madeira range. Uma mesa no centro tem marcas recentes na poeira. Ferramentas pequenas, um pedaço de pano e um copo.',
      'Belle aponta para o assoalho: "Essas tábuas foram movidas."'
    ],
    opts: [
      { label: 'Examinar a mesa', action: abandonedTable },
      { label: 'Levantar as tábuas do assoalho', action: abandonedFloor }
    ]
  });
}

function abandonedTable() {
  addClue('mikeReceipts');
  const afterRecovery = state.collectionRecovered;
  const afterDiscovery = state.hideoutStage >= 3;
  setScene({
    img: IMG.casa, where: 'Casa Abandonada', chap: 'Investigação',
    name: 'Recibos e Ferramentas',
    text: [
      afterRecovery
        ? 'Dentro da caixa de evidências recolhida na casa, o inspetor separa recibos de suprimentos em nome de alguém chamado Mike.'
        : 'Entre as ferramentas, Isaac encontra recibos de suprimentos. Estão em nome de alguém chamado Mike.',
      'Balanças de precisão, lentes e uma anotação sobre a frequência 7,18 mostram que o lugar serviu como oficina e ponto de comunicação.'
    ],
    opts: [afterRecovery
      ? { label: 'Voltar às provas recolhidas', action: abandonedSecured }
      : afterDiscovery
        ? { label: 'Examinar as anotações junto às joias', action: abandonedNotes }
        : { label: 'Levantar as tábuas do assoalho', action: abandonedFloor }]
  });
}

function abandonedFloor() {
  state.hideoutStage = 3;
  addClue('hideoutFound');
  addClue('gemsAllTested');
  setScene({
    img: IMG.casa, where: 'Casa Abandonada', chap: 'Ponto de Virada',
    name: 'Sob o Assoalho',
    text: [
      'Em um compartimento improvisado, Isaac e Belle encontram a coleção inteira.',
      'Cada joia está separada e numerada. Foram pesadas e medidas. Os ladrões não queriam vendê-las. Procuravam algo específico.'
    ],
    opts: [
      { label: 'Examinar as anotações junto às joias', action: abandonedNotes },
      ...(!has('mikeReceipts') ? [{ label: 'Examinar também os objetos sobre a mesa', action: abandonedTable }] : []),
      { label: 'Recuperar tudo e voltar à praça', action: () => recoverCollection('As joias roubadas foram recuperadas.') }
    ]
  });
}

function abandonedNotes() {
  addClue('radioNote');
  const afterRecovery = state.collectionRecovered;
  setScene({
    img: IMG.casa, where: 'Casa Abandonada', chap: 'Ponto de Virada',
    name: 'Anotações dos Ladrões',
    text: [
      'Ao lado de várias peças, a anotação diz "natural — descartada".',
      'Na última linha: "falta uma peça — verificar P3".',
      'Mais abaixo aparecem “7,18 — receptor J” e o desenho de uma luz pulsante. Belle entende: “Eles testaram todas as peças, comunicavam-se por rádio e ainda procuram a joia que ficou para trás.”'
    ],
    opts: [
      ...(!has('mikeReceipts') ? [{ label: 'Examinar os objetos sobre a mesa', action: abandonedTable }] : []),
      afterRecovery
        ? { label: 'Voltar às provas recolhidas', action: abandonedSecured }
        : { label: 'Entregar a coleção e as anotações à polícia', action: () => recoverCollection('A coleção e as provas foram entregues à polícia.') }
    ]
  });
}

function abandonedSecured() {
  const opts = [];
  const text = [
    'A casa já não parece abandonada: uma fita da polícia fecha a porta, e as marcas de barro foram fotografadas.',
    'A coleção não está mais sob o assoalho. Foi recolhida, catalogada e levada para um local seguro.'
  ];
  if (!has('mikeReceipts')) {
    text.push('O inspetor ainda separa os objetos encontrados sobre a mesa. Talvez algum deles identifique quem usava o esconderijo.');
    opts.push({ label: 'Examinar os objetos recolhidos', action: abandonedTable });
  }
  if (!has('radioNote')) {
    text.push('As anotações encontradas junto às joias ainda podem guardar uma ligação com o segundo criminoso.');
    opts.push({ label: 'Examinar as anotações recolhidas', action: abandonedNotes });
  }
  if (has('mikeReceipts') && has('radioNote')) {
    text.push('Nada foi deixado para trás. As provas agora precisam ser cruzadas com o que existe em outros locais.');
  }
  opts.push({ label: 'Voltar à praça', action: hub });
  setScene({ img: IMG.casa, where: 'Casa Abandonada', chap: 'Revisita', name: 'Local Isolado', text, opts });
}

function recoverCollection(msg) {
  state.collectionRecovered = true;
  hub(msg);
}

// =====================================================
// CENA — INTERLÚDIO (AMEAÇA)
// =====================================================

function gemThreat() {
  addClue('gemTargeted');
  let name, text;

  if (state.gemLocation === 'delegacia') {
    name = 'Barulho na Delegacia';
    text = [
      'Ao cair da tarde, um policial chega à praça: alguém acaba de tentar forçar a janela lateral da delegacia.',
      'Não tocaram no cofre. Tentaram abrir apenas a gaveta onde a joia de Isaac estava.'
    ];
  } else if (state.gemLocation === 'salao') {
    name = 'O Salão Invadido de Novo';
    text = [
      'Piper encontra uma janela arrombada. O invasor ignorou tudo e tentou abrir apenas a vitrine da joia devolvida.',
      'Por que alguém voltaria por uma única peça?'
    ];
  } else if (state.gemLocation === 'relojoaria') {
    name = 'Batidas na Porta dos Fundos';
    text = [
      'Ao cair da tarde, alguém força a porta dos fundos da relojoaria. Jessie acende as luzes e o invasor foge antes de entrar.',
      'A bancada da joia lacrada era o único alvo visível pela janela.'
    ];
  } else {
    name = 'Sombras na Rua';
    text = [
      'Ao cair da tarde, Isaac percebe passos atrás de si. Quando se vira, vê uma sombra recuando entre as casas.',
      'Alguém está vigiando Isaac.'
    ];
  }

  setScene({
    img: state.gemLocation === 'delegacia' ? IMG.delegacia : state.gemLocation === 'salao' ? IMG.salao : state.gemLocation === 'relojoaria' ? IMG.relojoaria : IMG.praca,
    where: 'Vila das Joias', chap: 'Interlúdio', name, text,
    opts: [{ label: 'Continuar', action: hub }]
  });
}

// =====================================================
// CENAS — FINAIS
// =====================================================

function goodEndingPartial() {
  state.ended = true;
  setScene({
    img: IMG.salao, where: 'Salão das Joias', chap: 'Encerramento',
    name: 'Caso Parcialmente Resolvido',
    text: `<div class="ending good">
      <p>A polícia age rápido. Mike é encontrado antes de conseguir fugir. A coleção roubada é devolvida ao Salão das Joias.</p>
      <p>Porém, nem todos os envolvidos foram identificados. A segunda pessoa que Maisie viu continua desconhecida. As joias voltam ao cofre, mas a pergunta permanece: por que os ladrões examinaram cada peça separadamente?</p>
      <p>Isaac olha para a coleção restaurada. Resolveu o roubo. Mas algo continua sem explicação.</p>
      <p class="reveal">A coleção foi recuperada. Um dos responsáveis foi preso. Mas nem todas as perguntas foram respondidas.</p>
    </div>`,
    opts: [{ label: 'Jogar novamente', action: restart }]
  });
}

function goodEndingFull() {
  state.ended = true;
  setScene({
    img: IMG.praca, where: 'Praça Central', chap: 'Encerramento',
    name: 'Caso Resolvido',
    text: `<div class="ending good">
      <p>As provas são sólidas. Mike realizou o roubo e Jack coordenou a operação usando rádio e Código Morse. Os dois são detidos.</p>
      <p>Toda a coleção é devolvida. A vila respira aliviada.</p>
      <p>Mas Isaac guarda uma dúvida que não consegue ignorar: os ladrões testaram cada peça uma a uma. Procuravam algo específico entre aquelas joias. O quê?</p>
      <p class="reveal">O roubo foi solucionado e ambos os criminosos capturados. Mas o verdadeiro motivo por trás do crime permanece enterrado.</p>
    </div>`,
    opts: [{ label: 'Jogar novamente', action: restart }]
  });
}

function beforeClosing() {
  setScene({
    img: IMG.delegacia, where: 'Delegacia', chap: 'Decisão',
    name: 'Fechar o Caso?',
    text: [
      'O inspetor confirma que as provas sustentam os mandados. Mike e Jack ficam sob vigilância enquanto a operação é preparada para o amanhecer.',
      'A joia sem registro de extração. A frase dos fundadores. A análise de Jessie.',
      '"O caminho permanece onde nenhuma pedra nasceu da terra."',
      'Antes das prisões, ainda há tempo para realizar um exame oficial na peça lacrada — sem deixá-la fora da custódia.'
    ],
    opts: [
      { label: 'Executar os mandados e encerrar a investigação', action: goodEndingFullResolve },
      { label: 'Autorizar um último exame na joia', action: perfectPrelude }
    ]
  });
}

function goodEndingFullResolve() {
  state.ended = true;
  setScene({
    img: IMG.praca, where: 'Praça Central', chap: 'Encerramento',
    name: 'Caso Encerrado',
    text: `<div class="ending good">
      <p>Mike e Jack são presos. A coleção retorna ao Salão das Joias. A vila celebra.</p>
      <p>Isaac guarda o caderno. Nas últimas páginas, a frase dos fundadores permanece sem explicação. A joia marcada volta ao cofre — inteira, intacta e guardando seu segredo.</p>
      <p class="reveal">O roubo foi resolvido e os criminosos capturados. Mas a história dos fundadores e o verdadeiro segredo da joia permanecem escondidos.</p>
    </div>`,
    opts: [{ label: 'Jogar novamente', action: restart }]
  });
}

function perfectPrelude() {
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Revelação',
    name: 'A Pedra que Não Nasceu da Terra',
    text: [
      'Na relojoaria, a joia permanece sobre a mesa dentro do estojo lacrado. Belle, Jessie, Piper e o inspetor acompanham o exame.',
      '“Onde nenhuma pedra nasceu da terra.” Jessie confirmou que a peça é artificial; Piper confirmou que ela não possui origem mineral registrada.',
      'O inspetor autoriza uma radiografia na pequena clínica da vila antes que qualquer parte da peça seja aberta.'
    ],
    opts: [{ label: 'Continuar o raciocínio', action: perfectRevelation }]
  });
}

function perfectRevelation() {
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Revelação',
    name: 'A Imagem sob a Resina',
    text: [
      'A radiografia revela uma pequena cápsula metálica no centro da resina. Dentro dela existe uma forma fina e enrolada, parecida com uma folha de papel.',
      'Belle completa: “Os fundadores não esconderam o segredo num compartimento da armação. Moldaram a joia artificial ao redor de uma cápsula.”',
      'O exame confirma que existe algo dentro sem danificar a peça. Agora Piper e o inspetor precisam decidir se há justificativa para abri-la.'
    ],
    opts: [{ label: 'Decidir o que fazer', action: perfectDilemma }]
  });
}

function perfectDilemma() {
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'O Grande Dilema',
    name: 'Destruir a Joia?',
    text: [
      'A joia faz parte da história da vila. Abrir a cápsula exigirá cortar a resina antiga, mas a radiografia permite preservar a armação e documentar todo o procedimento.',
      'Se os fundadores estiverem certos, o conteúdo pode indicar a Mina Perdida. Se estiverem errados, uma peça histórica será danificada sem necessidade.',
      'Piper autoriza a abertura como responsável pela coleção, e o inspetor registra a decisão como parte da investigação. A escolha final cabe ao grupo.'
    ],
    opts: [
      { label: 'Abrir a joia sob registro oficial', action: perfectBreak },
      { label: 'Preservar a joia e fechar o caso', action: goodEndingFullResolve }
    ]
  });
}

function perfectBreak() {
  addClue('mapRevealed');
  setScene({
    img: IMG.relojoaria, where: 'Relojoaria', chap: 'Revelação',
    name: 'O Mapa',
    text: [
      'Com as autorizações registradas, Jessie corta apenas a camada de resina indicada pela radiografia. A armação permanece intacta.',
      'No centro aparece uma cápsula metálica. Dentro dela, protegido da umidade por décadas, está um pequeno mapa enrolado.',
      'Isaac o desenrola. Marcações, coordenadas e uma rota traçada em tinta antiga. A entrada da Mina Perdida.'
    ],
    opts: [{ label: 'Preparar a captura dos criminosos', action: perfectAmbush }]
  });
}

function perfectAmbush() {
  setScene({
    img: IMG.mina, where: 'Montanhas', chap: 'Final 100%',
    name: 'A Emboscada',
    text: [
      'Usando o transmissor apreendido no esconderijo, a polícia envia na frequência 7,18 uma mensagem controlada: “Mapa confirmado. P3 ao amanhecer.”',
      'Mike e Jack, já sob vigilância, deixam seus postos e seguem juntos pela rota norte. A polícia registra o encontro e os prende antes que alcancem a mina.',
      'Com os dois detidos e a trilha segura, o inspetor leva Isaac, Belle e Piper até as coordenadas do mapa.'
    ],
    opts: [{ label: 'Entrar na mina', action: perfectEnding }]
  });
}

function perfectEnding() {
  visit('mina');
  state.ended = true;
  setScene({
    img: IMG.mina, where: 'Mina Perdida', chap: 'Final 100%',
    name: 'A Vila das Jóias',
    text: `<div class="ending perfect">
      <p>Dentro da mina, Isaac encontra veios de minerais preservados, ferramentas históricas e registros deixados pelos primeiros moradores.</p>
      <p>A verdadeira história da Vila das Joias estava guardada aqui. Os fundadores construíram a vila com a riqueza da mina e esconderam sua localização para protegê-la de exploração descontrolada.</p>
      <p>Semanas depois, os registros do esconderijo, a comunicação em 7,18 e a tentativa de recuperar a joia sustentam a condenação de Mike e Jack. A coleção é restaurada, incluindo a peça artificial cuidadosamente remontada.</p>
      <p>As anotações de Mike revelam a última ironia: sem saber qual peça era artificial, ele escolheu ao acaso justamente aquela joia para deixar a mensagem que acabou expondo todo o plano.</p>
      <p class="reveal"><strong>FINAL 100%</strong> — Todas as pistas encontradas. Todos os criminosos capturados. A Mina Perdida desvendada. A história da vila revelada.</p>
    </div>`,
    opts: [{ label: 'Jogar novamente', action: restart }]
  });
}

// =====================================================
// INTERFACE — MODAIS, MAPA, CADERNO
// =====================================================

function showJournal() {
  const items = state.clues.length
    ? state.clues.map(id => `<div class="clue-item"><strong>${CLUES[id][0]}</strong><p>${CLUES[id][1]}</p></div>`).join('')
    : '<p>Nenhuma pista registrada ainda.</p>';
  showModal(`<h2>📓 Caderno de Isaac <span class="badge">${state.clues.length}</span></h2><div class="clue-list">${items}</div>`);
}

function showMap() {
  const all = [
    ['Praça Central', 'praca'], ['Salão das Joias', 'salao'], ['Ponto de Emergência', 'ponto'],
    ['Hospedaria', 'hospedaria'], ['Relojoaria', 'relojoaria'], ['Delegacia', 'delegacia'],
    ['Biblioteca', 'biblioteca'], ['Casa Abandonada', 'casa'], ['Oficina de Jack', 'jack'],
    ['Mina Perdida', 'mina']
  ];
  showModal(`<h2>🗺️ Mapa da Vila</h2><div class="map-list">${all.map(([n, id]) => `
    <div class="map-item">
      <strong>${state.visited.includes(id) ? '✓' : '○'} ${n}</strong>
      <p>${state.visited.includes(id) ? 'Visitado.' : 'Não visitado.'}</p>
    </div>`).join('')}</div>`);
}

function showModal(html) {
  $('modalContent').innerHTML = html;
  $('modal').classList.remove('hidden');
}
function closeModal() { $('modal').classList.add('hidden'); }
function restart() { localStorage.removeItem('misterioJoiasSave'); state = defaultState(); intro(); }

// =====================================================
// INICIALIZAÇÃO
// =====================================================

$('journalBtn').onclick = showJournal;
$('mapBtn').onclick = showMap;
$('closeModal').onclick = closeModal;
$('modal').onclick = e => { if (e.target === $('modal')) closeModal(); };
$('saveBtn').onclick = () => {
  autoSave();
  feedback.textContent = 'Progresso salvo.';
  setTimeout(() => feedback.textContent = '', 1800);
};
$('restartBtn').onclick = () => { if (confirm('Reiniciar toda a investigação?')) restart(); };
$('audioToggleBtn').onclick = toggleAudio;

$('startGameBtn').onclick = () => {
  $('startOverlay').classList.add('hidden');
  initAudio();
  if (loadSave() && state.gemLocation && !state.ended) {
    hub('Progresso restaurado.');
  } else {
    state = defaultState();
    intro();
  }
};
