const evidencias = {
  argumento: "Arthur alterou a conclusão do trabalho sem avisar Lucas",
  falhaExterna: "O quadro elétrico registrou uma falha que atingiu três salas",
  cadeira: "A cadeira foi atingida pelo lado da mesa de Arthur",
  folhas: "As folhas de Arthur formam um trajeto até a porta",
  mochila: "A mochila junto à porta tem as iniciais N.M.",
  mochilaExplicada: "Nicollas havia emprestado a mochila a Arthur naquela semana",
  frase: "No caderno: “Hoje alguém vai contar a verdade”",
  fraseExplicada: "A frase era o título da conclusão alterada do trabalho",
  mensagem: "Notificação: “Não conta ainda. Ele vai explicar hoje.”",
  mensagemExplicada: "O histórico completo mostra que Maycon falava da apresentação",
  cameras: "Câmera com bateria prova que a porta não abriu no apagão",
  washington: "Imagem confirma Washington no bebedouro durante a queda",
  nicollas: "Nicollas voltou da sala de materiais antes do apagão",
  testemunho: "Nicollas viu Arthur mudar de lugar dentro da sala",
  contradicao: "Arthur disse que não saiu da janela, mas as provas mostram o contrário",
  deducao: "O trajeto físico reconstrói a queda antes da confissão",
  confissao: "Arthur confirma que derrubou a cadeira ao tentar se afastar"
};

const pessoas = {
  lucas: ["LS", "Lucas", "Recebeu atendimento após a queda"],
  arthur: ["AR", "Arthur", "Discutiu com Lucas antes do apagão"],
  diogo: ["DI", "Diogo", "Usava o computador da sala"],
  maycon: ["MA", "Maycon", "Autor de uma mensagem incompleta"],
  nicollas: ["NI", "Nicollas", "Iniciais encontradas na mochila"],
  washington: ["WA", "Washington", "Saiu para buscar água"]
};

const artes = {
  start: ["assets/cenarios/capa-sala-fechada.png", "Sala do 6º B logo após o apagão"],
  intro: ["assets/cenarios/01_sala_6B.png", "Sala do 6º B antes do apagão"],
  blackout: ["assets/cenarios/capa-sala-fechada.png", "Sala do 6º B depois da queda de energia"],
  room: ["assets/cenarios/capa-sala-fechada.png", "Vestígios preservados na sala do 6º B"],
  physical: ["assets/cenarios/07_regiao_porta_sala.png", "Cadeira e folhas próximas à porta"],
  layout: ["assets/cenarios/07_regiao_porta_sala.png", "Reconstrução do caminho até a porta"],
  backpack: ["assets/cenarios/09_mesa_arthur.png", "Mochila e materiais usados por Arthur"],
  notebook: ["assets/cenarios/09_mesa_arthur.png", "Caderno aberto na mesa de Arthur"],
  computer: ["assets/cenarios/06_area_computador_diogo.png", "Computador usado durante o trabalho"],
  diogo: ["assets/cenarios/06_area_computador_diogo.png", "Histórico automático do computador"],
  maycon: ["assets/cenarios/10_mesa_lucas.png", "Rascunhos do trabalho do grupo"],
  panel: ["assets/cenarios/12_quadro_eletrico.png", "Quadro elétrico do corredor"],
  corridor: ["assets/cenarios/02_corredor_escola.png", "Corredor diante da sala do 6º B"],
  cameras: ["assets/cenarios/05_sala_cameras.png", "Sistema de câmeras com bateria própria"],
  washington: ["assets/cenarios/03_bebedouro.png", "Bebedouro no fim do corredor"],
  nicollas: ["assets/cenarios/04_sala_materiais.png", "Sala de materiais da escola"],
  nicollasTruth: ["assets/cenarios/04_sala_materiais.png", "Nicollas explica a ida à sala de materiais"],
  witness: ["assets/cenarios/02_corredor_escola.png", "Trecho do corredor registrado pela câmera"],
  arthur: ["assets/cenarios/08_area_proxima_janela.png", "Área próxima à janela onde Arthur diz ter ficado"],
  pressure: ["assets/cenarios/07_regiao_porta_sala.png", "Trajeto entre a mesa de Arthur e a porta"],
  deduction: ["assets/cenarios/07_regiao_porta_sala.png", "Vestígios usados na reconstrução"],
  wrongNicollas: ["assets/cenarios/05_sala_cameras.png", "Gravação do corredor durante o apagão"],
  wrongMaycon: ["assets/cenarios/12_quadro_eletrico.png", "Registro da falha elétrica"],
  correct: ["assets/cenarios/capa-sala-fechada.png", "Reconstrução da queda dentro da sala"],
  confession: ["assets/cenarios/09_mesa_arthur.png", "Mesa de Arthur após a reconstrução"],
  report: ["assets/cenarios/11_secretaria_diretoria.png", "Secretaria da direção"],
  badArthur: ["assets/cenarios/11_secretaria_diretoria.png", "Uma acusação sem provas suficientes"],
  badMaycon: ["assets/cenarios/11_secretaria_diretoria.png", "Uma mensagem interpretada sem contexto"],
  badNicollas: ["assets/cenarios/11_secretaria_diretoria.png", "Uma mentira confundida com culpa"],
  perfect: ["assets/cenarios/11_secretaria_diretoria.png", "Relatório completo entregue à direção"],
  good: ["assets/cenarios/11_secretaria_diretoria.png", "Caso encerrado na direção"]
};

function novoEstado() {
  return {
    ev: new Set(),
    visitas: {},
    pessoas: new Set(),
    erros: 0,
    examinouSala: false,
    examinouFisica: false,
    examinouMochila: false,
    leuCaderno: false,
    examinouComputador: false,
    ouviuDiogo: false,
    ouviuMaycon: false,
    contextualizouMensagem: false,
    verificouPainel: false,
    viuCameras: false,
    ouviuWashington: false,
    confrontouNicollas: false,
    ouviuTestemunho: false,
    ouviuArthur: false,
    pressionouArthur: false,
    deduziu: false,
    deduziuAntesConfissao: false,
    confessou: false,
    finalizado: false
  };
}

let S = novoEstado();
let toastTimer;

function tem(id) { return S.ev.has(id); }
function pessoa(id) { S.pessoas.add(id); }
function primeira(id) { return !S.visitas[id]; }

function adicionar(id) {
  if (!evidencias[id] || S.ev.has(id)) return;
  S.ev.add(id);
  const toast = document.getElementById("toast");
  toast.textContent = `Nova evidência: ${evidencias[id]}`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function podeDeduzir() {
  return ["falhaExterna", "cadeira", "folhas", "cameras", "washington", "nicollas", "testemunho", "contradicao"].every(tem);
}

function finalPerfeito() {
  return S.deduziuAntesConfissao && S.erros === 0 && Object.keys(evidencias).every(tem);
}

function contextoDoCadernoDisponivel() {
  return S.contextualizouMensagem && tem("argumento");
}

function aplicarGatilhos(id, primeiraVisita) {
  if (id === "intro") {
    pessoa("lucas");
    pessoa("arthur");
    adicionar("argumento");
  }
  if (id === "room") S.examinouSala = true;
  if (id === "physical") {
    S.examinouFisica = true;
    adicionar("cadeira");
    adicionar("folhas");
  }
  if (id === "backpack") {
    S.examinouMochila = true;
    pessoa("nicollas");
    adicionar("mochila");
    if (S.confrontouNicollas) adicionar("mochilaExplicada");
  }
  if (id === "notebook") {
    S.leuCaderno = true;
    adicionar("frase");
    if (contextoDoCadernoDisponivel()) adicionar("fraseExplicada");
  }
  if (id === "computer") {
    S.examinouComputador = true;
    pessoa("diogo");
    pessoa("maycon");
    adicionar("mensagem");
    if (S.ouviuMaycon) {
      S.contextualizouMensagem = true;
      adicionar("mensagemExplicada");
    }
  }
  if (id === "diogo") {
    S.ouviuDiogo = true;
    pessoa("diogo");
  }
  if (id === "maycon") {
    S.ouviuMaycon = true;
    pessoa("maycon");
  }
  if (id === "panel") {
    S.verificouPainel = true;
    adicionar("falhaExterna");
  }
  if (id === "cameras") {
    S.viuCameras = true;
    pessoa("washington");
    pessoa("nicollas");
    adicionar("cameras");
  }
  if (id === "washington") {
    S.ouviuWashington = true;
    pessoa("washington");
    adicionar("washington");
  }
  if (id === "nicollasTruth") {
    S.confrontouNicollas = true;
    adicionar("nicollas");
    if (S.examinouMochila) adicionar("mochilaExplicada");
  }
  if (id === "witness") {
    S.ouviuTestemunho = true;
    adicionar("testemunho");
  }
  if (id === "arthur") S.ouviuArthur = true;
  if (id === "pressure") {
    S.pressionouArthur = true;
    adicionar("contradicao");
  }
  if (id === "correct") {
    S.deduziu = true;
    if (!S.confessou) S.deduziuAntesConfissao = true;
    adicionar("deducao");
  }
  if (id === "confession") {
    S.confessou = true;
    adicionar("confissao");
  }
  if (["badArthur", "badMaycon", "badNicollas"].includes(id) && primeiraVisita) S.erros += 1;
  if (["perfect", "good"].includes(id)) S.finalizado = true;
}

function voltarSala() { return ["Voltar à sala sem concluir ainda", "room"]; }

function opcoesDaSala() {
  const op = [];
  op.push([S.examinouFisica ? "Reexaminar a cadeira e o caminho das folhas" : "Preservar a cadeira e as folhas antes que sejam movidas", "physical"]);
  op.push([S.examinouMochila ? "Reabrir a mochila levando o que você descobriu" : "Verificar a mochila deixada junto à porta", "backpack"]);
  op.push([S.examinouComputador ? "Retornar ao computador e conferir o histórico" : "Preservar a notificação aberta no computador", "computer"]);
  if (!S.verificouPainel) op.push(["Comparar o apagão com o quadro elétrico", "panel"]);
  op.push([S.viuCameras ? "Rever o corredor gravado durante os 18 segundos" : "Descobrir se a porta realmente ficou fechada", "corridor"]);
  if (S.ouviuArthur) op.push(["Voltar à versão de Arthur com novas provas", "arthur"]);
  if (podeDeduzir() && !S.deduziu) op.unshift(["Reconstruir os 18 segundos no mapa da sala", "deduction"]);
  if (S.deduziu && !S.confessou) op.unshift(["Apresentar a reconstrução a Arthur", "confession"]);
  return op;
}

function cena(id, primeiraVisita) {
  const cenas = {
    start: () => ({ cover: true, titulo: "O Mistério da Sala Fechada", tag: "Caso 6º B · Sexta-feira", texto: `<p>Às 16h19, a luz apaga por dezoito segundos. Quando retorna, Lucas está no chão, uma cadeira bloqueia o caminho da porta e folhas atravessam a sala.</p><p>Uma pessoa cruzou o escuro, três objetos mudaram de lugar e cada colega guardou uma parte diferente daquela tarde.</p>`, op: [["Voltar ao início daquela tarde", "intro"]] }),

    intro: () => ({ titulo: "A conclusão alterada", tag: "16h12 · Antes do apagão", texto: `<p>Sete colegas permanecem no 6º B para terminar uma apresentação. Lucas folheia a versão impressa e para na última página: Arthur mudou a conclusão sem consultar o grupo.</p><div class="quote">— Você vai explicar isso para todo mundo antes de irmos embora — diz Lucas.</div><p>Arthur fecha o caderno. Washington pega uma garrafa vazia. No computador de Diogo, uma janela de conversa pisca e desaparece.</p>`, op: [["A chuva engrossa e as lâmpadas começam a oscilar", "blackout"]] }),

    blackout: () => ({ titulo: "Dezoito segundos", tag: "16h19 · Queda de energia", texto: `<p>O ventilador para. No escuro, Ícaro distingue quatro sons: passos rápidos, folhas deslizando, metal raspando no piso e uma queda.</p><p>Quando a luz retorna, Lucas está consciente, mas não consegue se levantar. A diretora chama o atendimento e ordena que ninguém mexa em nada. Enquanto todos olham para Lucas, Arthur afirma que passou o apagão junto à janela.</p>`, op: [["Entrar novamente depois que Lucas recebe atendimento", "room"]] }),

    room: () => ({ titulo: primeiraVisita ? "A sala preservada" : S.deduziu ? "O caminho agora aparece" : "A mesma sala, outras perguntas", tag: primeiraVisita ? "16h37 · Início da investigação" : "Local revisitado", texto: primeiraVisita
      ? `<p>Com Lucas a caminho da clínica, a diretora fecha o 6º B para preservar os vestígios. Uma cadeira está de lado junto à porta. Folhas formam uma linha irregular. Há uma mochila antiga sob uma mesa e o computador continua ligado.</p><p>Nenhum desses objetos acusa alguém sozinho.</p>`
      : S.deduziu
        ? `<p>A sala não é mais um conjunto de objetos soltos. A mesa de Arthur, a linha das folhas, a cadeira girada e a porta fechada formam um movimento único: alguém tentou abandonar a discussão no escuro.</p>`
        : S.ouviuTestemunho
          ? `<p>Nicollas colocou Arthur junto à própria mesa antes do apagão e perto da porta quando a luz voltou. A cadeira e as folhas podem mostrar como ele atravessou a sala.</p>`
          : `<p>As primeiras versões já mudaram. Voltar a um objeto com uma informação nova pode separar coincidência, mentira e causa.</p>`, op: opcoesDaSala() }),

    physical: () => ({ titulo: primeiraVisita ? "A cadeira não caiu sozinha" : "O sentido do impacto", tag: "Vestígio físico", texto: primeiraVisita
      ? `<p>Um dos pés da cadeira deixou um arco no pó. O risco começa do lado da mesa de Arthur e termina atravessado no caminho de Lucas. As folhas carregam as correções escritas por Arthur e seguem na mesma direção, da mesa até a porta.</p>`
      : S.ouviuTestemunho
        ? `<p>O depoimento de Nicollas dá início e fim ao trajeto: Arthur estava junto à mesa antes do escuro e perto da porta depois. O arco da cadeira e as folhas preenchem o espaço entre os dois pontos.</p>`
        : `<p>O arco no piso indica de onde veio o impacto, mas ainda falta colocar uma pessoa no início e no fim desse caminho.</p>`, op: [["Marcar as posições num mapa da sala", "layout"], ["Ouvir a versão de Arthur", "arthur"], voltarSala()] }),

    layout: () => ({ titulo: S.ouviuTestemunho ? "Dois pontos e um caminho" : "Um caminho ainda sem autor", tag: "Reconstrução parcial", texto: S.ouviuTestemunho
      ? `<p>Ícaro liga as posições: mesa de Arthur, folhas derrubadas, cadeira atingida, porta. Nicollas viu Arthur nos dois extremos em momentos diferentes. A hipótese de que ele permaneceu junto à janela já não cabe na sala.</p>`
      : `<p>As folhas e o risco da cadeira descrevem uma travessia em direção à porta. Sem um horário ou testemunho, ainda não é possível afirmar quem percorreu esse caminho.</p>`, op: [["Comparar o trajeto com Arthur", "arthur"], ["Procurar quem viu a sala antes do escuro", "corridor"], voltarSala()] }),

    backpack: () => ({ titulo: S.confrontouNicollas ? "A mochila mudou de dono" : "As iniciais N.M.", tag: "Objeto sem contexto", texto: S.confrontouNicollas
      ? `<p>Nicollas confirma o empréstimo. A etiqueta interna ainda traz suas iniciais, mas os cadernos e o estojo são de Arthur. A mochila estava ali porque Arthur a usava naquela semana — não porque Nicollas a abandonou durante o apagão.</p>`
      : `<p>Na etiqueta interna aparecem as letras N.M. Dentro estão o caderno e os materiais usados por Arthur. A combinação liga duas pessoas ao mesmo objeto, mas ainda não explica quem o carregava naquela tarde.</p>`, op: [["Abrir o caderno guardado dentro dela", "notebook"], ["Encontrar Nicollas sem tratá-lo como culpado", "nicollas"], voltarSala()] }),

    notebook: () => ({ titulo: contextoDoCadernoDisponivel() ? "A verdade era uma página" : "Hoje alguém vai contar a verdade", tag: contextoDoCadernoDisponivel() ? "Pista reinterpretada" : "Frase ambígua", texto: contextoDoCadernoDisponivel()
      ? `<p>Ao lado da frase há uma seta para “Conclusão — versão 3”. O histórico do computador mostra o mesmo título. Arthur planejava admitir que alterou o trabalho; a frase não descrevia o que aconteceria com Lucas.</p>`
      : `<p>A frase ocupa sozinha o alto da página: “Hoje alguém vai contar a verdade”. Abaixo dela aparecem setas e nomes abreviados de arquivos. Sem o restante da conversa, ela pode ser promessa, cobrança ou ameaça.</p>`, op: [["Procurar o restante da conversa no computador", "computer"], ["Perguntar a Arthur o que pretendia contar", "arthur"], voltarSala()] }),

    computer: () => ({ titulo: S.contextualizouMensagem ? "A conversa completa" : "Uma notificação cortada", tag: S.contextualizouMensagem ? "Registro recuperado" : "Pista digital", texto: S.contextualizouMensagem
      ? `<p>Diogo abre o histórico automático. Às 16h17, Maycon escreveu: “Não conta ainda que o Arthur mudou a conclusão. Ele vai explicar hoje para o grupo”. A mensagem fala do trabalho e foi enviada antes da queda.</p><p>O título do arquivo aberto é “Conclusão — versão 3”, igual à anotação no caderno.</p>`
      : `<p>A tela preserva apenas uma notificação: “Maycon: Não conta ainda. Ele vai explicar hoje”. O restante ficou oculto quando o computador travou às 16h19.</p><p>Diogo sabe recuperar o histórico; Maycon precisa explicar o assunto sem que você complete a frase por ele.</p>`, op: [["Pedir a Diogo o registro automático", "diogo"], ["Ouvir Maycon antes de interpretar a mensagem", "maycon"], ...(S.contextualizouMensagem && S.leuCaderno ? [["Levar o contexto de volta ao caderno", "notebook"]] : []), voltarSala()] }),

    diogo: () => ({ titulo: "O relógio do computador", tag: "Fonte técnica", texto: S.contextualizouMensagem
      ? `<p>Diogo mostra que o horário, o nome do arquivo e a conversa foram recuperados do histórico automático. Eles não dependem da memória de Maycon.</p>`
      : `<p>Diogo confirma que o sistema grava horários e versões, mas a conversa está protegida pela conta de Maycon. Primeiro é preciso pedir que ele autorize a abertura do histórico completo.</p>`, op: [["Pedir a Maycon que libere a conversa", "maycon"], ...(S.ouviuMaycon ? [["Voltar ao computador com a autorização", "computer"]] : []), voltarSala()] }),

    maycon: () => ({ titulo: primeiraVisita ? "O trecho que Maycon escondeu" : S.contextualizouMensagem ? "Mensagem fora da lista" : "Uma explicação ainda sem prova", tag: "Versão de Maycon", texto: S.contextualizouMensagem
      ? `<p>O histórico confirma o que Maycon disse: ele queria que Arthur explicasse a alteração na frente do grupo. Escondeu a mensagem depois da queda porque percebeu como o trecho cortado soaria.</p>`
      : `<p>Maycon admite que pediu a Nicollas para não comentar a mudança do trabalho. Queria obrigar Arthur a explicar a nova conclusão diante de todos. Ele autoriza Diogo a abrir a conversa completa.</p><p>A explicação é possível, mas ainda é apenas a versão de Maycon.</p>`, op: [["Conferir a versão no histórico automático", "computer"], ...(!S.contextualizouMensagem ? [["Acusá-lo usando somente o trecho cortado", "badMaycon"]] : []), voltarSala()] }),

    panel: () => ({ titulo: "A falha veio de fora", tag: "Quadro elétrico · 16h19", texto: `<p>O registro do disjuntor marca a mesma queda no 6º B, no 7º A e na biblioteca. A chuva provocou um curto no circuito do corredor. Ninguém dentro da sala apagou as luzes.</p><div class="alert">Isso elimina sabotagem, mas não explica o que aconteceu durante os dezoito segundos.</div>`, op: [["Ver se a câmera continuou funcionando", "cameras"], voltarSala()] }),

    corridor: () => ({ titulo: primeiraVisita ? "A porta diante da câmera" : "O corredor não mudou", tag: "Limite da sala fechada", texto: S.viuCameras
      ? `<p>A câmera com bateria mostra a porta fechada do início ao fim do apagão. Washington já estava no bebedouro; Nicollas havia retornado segundos antes. Tudo aconteceu entre as quatro paredes.</p>`
      : `<p>A porta possui mola hidráulica e fica no campo da câmera do corredor. Se alguém entrou ou saiu, a gravação deve mostrar — desde que o sistema tenha resistido à falta de energia.</p>`, op: [["Solicitar a gravação à direção", "cameras"], ...(S.pessoas.has("washington") ? [["Ir ao bebedouro falar com Washington", "washington"]] : []), ...(S.pessoas.has("nicollas") ? [["Conferir a história de Nicollas", "nicollas"]] : []), voltarSala()] }),

    cameras: () => ({ titulo: primeiraVisita ? "A câmera que não apagou" : "16h18min41s", tag: "Registro independente", texto: `<p>O sistema de segurança possui bateria própria. Às 16h18min12s, Washington sai com a garrafa. Às 16h18min41s, Nicollas volta da sala de materiais e a porta fecha atrás dele.</p><p>Durante os dezoito segundos sem luz, a porta não se move. Ninguém entrou e ninguém saiu.</p>`, op: [["Confirmar Washington no bebedouro", "washington"], ["Perguntar a Nicollas por que mentiu sobre o corredor", "nicollas"], ["Levar o limite da sala às pistas físicas", "physical"]] }),

    washington: () => ({ titulo: "Do lado de fora", tag: "Álibi confirmado", texto: `<p>Washington aparece na gravação enchendo a garrafa quando as luzes apagam. Do corredor, ele ouve o barulho da cadeira e a queda, mas não vê ninguém atravessar a porta.</p><p>Seu depoimento coincide com uma imagem registrada por outra fonte.</p>`, op: [["Voltar à câmera para conferir Nicollas", "cameras"], ["Retornar ao corredor", "corridor"], voltarSala()] }),

    nicollas: () => ({ titulo: S.confrontouNicollas ? "Uma mentira pequena, um detalhe importante" : S.viuCameras ? "Quarenta segundos fora da sala" : "Uma mochila não prova presença", tag: "Versão de Nicollas", texto: S.confrontouNicollas
      ? `<p>Nicollas admite que entrou sem autorização na sala de materiais para buscar cartolina. Voltou antes do apagão e mentiu por medo de advertência. A mochila com suas iniciais estava emprestada a Arthur havia uma semana.</p><p>Quando retornou, viu Arthur junto à própria mesa e Lucas avançando para continuar a discussão.</p>`
      : S.viuCameras
        ? `<p>A gravação mostra Nicollas saindo da sala de materiais às 16h18min41s, embora ele tenha afirmado que não deixou o 6º B. A mentira está demonstrada; o motivo ainda não.</p>`
        : `<p>Nicollas reconhece as iniciais, mas afirma ter emprestado a mochila a Arthur porque a dele rasgou. Também insiste que não saiu da sala naquela tarde. Sem outro registro, as duas afirmações ainda dependem apenas de sua palavra.</p>`, op: [
          ...(S.confrontouNicollas
            ? [["Perguntar o que mudou quando a luz voltou", "witness"]]
            : S.viuCameras
              ? [["Pedir que explique os quarenta segundos", "nicollasTruth"]]
              : [["Conferir sua saída na câmera do corredor", "cameras"]]),
          ...(S.examinouMochila ? [["Reexaminar a mochila depois da explicação", "backpack"]] : []),
          ...(!S.confrontouNicollas && S.viuCameras ? [["Culpá-lo pela queda porque mentiu", "badNicollas"]] : []),
          voltarSala()
        ] }),

    nicollasTruth: () => ({ titulo: "A cartolina proibida", tag: "Mentira explicada", texto: `<p>Diante do horário da câmera, Nicollas admite que entrou sem autorização na sala de materiais para buscar cartolina. Voltou antes do apagão e mentiu por medo de advertência, não para esconder a queda.</p><p>A mochila com suas iniciais estava emprestada a Arthur havia uma semana. Quando retornou, viu Arthur junto à própria mesa e Lucas avançando para continuar a discussão.</p>`, op: [["Perguntar o que mudou quando a luz voltou", "witness"], ...(S.examinouMochila ? [["Reexaminar a mochila com essa informação", "backpack"]] : []), voltarSala()] }),

    witness: () => ({ titulo: "Arthur não permaneceu na janela", tag: "Antes e depois", texto: `<p>Nicollas organiza a lembrança em dois quadros. Antes do apagão, Arthur estava junto à mesa com as folhas corrigidas. Quando a luz voltou, estava perto da porta, sem as folhas, ao lado da cadeira girada.</p><div class="quote">— Não vi ninguém empurrar Lucas. Vi Arthur em outro lugar.</div>`, op: [["Comparar os dois pontos com a cadeira", "physical"], ["Ouvir a versão de Arthur", "arthur"], voltarSala()] }),

    arthur: () => ({ titulo: S.pressionouArthur ? "A versão que perdeu espaço" : primeiraVisita ? "A janela" : "Arthur diante de novos vestígios", tag: S.pressionouArthur ? "Contradição registrada" : "Versão de Arthur", texto: S.pressionouArthur
      ? `<p>Arthur admite que saiu da janela e atravessou a sala no escuro, mas insiste que não tocou em Lucas. Essa parte é compatível com os vestígios: o contato necessário foi com a cadeira.</p>`
      : S.ouviuTestemunho && S.examinouFisica
        ? `<p>Arthur repete que ficou junto à janela. Você coloca no chão o mapa das folhas e as duas posições descritas por Nicollas. Para manter sua versão, Arthur precisaria explicar como seus papéis cruzaram a sala sem ele.</p>`
        : `<p>Arthur afirma que permaneceu perto da janela durante todo o apagão. Diz que a discussão terminou quando as luzes oscilaram e que não sabe como a cadeira chegou à porta.</p><p>Sem reconstruir o caminho físico, pressioná-lo seria apenas trocar uma versão por outra.</p>`, op: [...(S.ouviuTestemunho && S.examinouFisica && !S.pressionouArthur ? [["Confrontar a janela com o caminho das folhas", "pressure"]] : []), ...(!S.deduziu ? [["Acusá-lo de ter empurrado Lucas de propósito", "badArthur"]] : []), ["Examinar o trajeto sem acusar", "physical"], voltarSala()] }),

    pressure: () => ({ titulo: "A primeira versão não cabe na sala", tag: "Confronto por evidências", texto: `<p>O risco começa na mesa de Arthur. As folhas terminam perto da porta. Nicollas o viu nos dois extremos. Arthur baixa os olhos.</p><div class="quote">— Eu me movi, sim. Queria sair da discussão. Mas não empurrei o Lucas.</div><p>A mentira foi demonstrada. A causa da queda ainda precisa ser deduzida sem transformar contradição em agressão.</p>`, op: [
      ...(podeDeduzir() ? [["Reunir tudo no mapa da sala", "deduction"]] : []),
      ...(!S.verificouPainel ? [["Confirmar a origem do apagão no quadro elétrico", "panel"]] : []),
      ...(!S.ouviuWashington ? [["Confirmar quem estava fora da sala", "washington"]] : []),
      ["Verificar se alguém cruzou a porta", "cameras"],
      voltarSala()
    ] }),

    deduction: () => ({ titulo: "O que ocorreu no escuro?", tag: "Reconstrução · Sem confissão", texto: `<p>Ícaro dispõe o registro elétrico, os horários da câmera, as posições de Nicollas, o arco da cadeira e a linha das folhas. Uma explicação precisa respeitar todas as peças ao mesmo tempo.</p>`, op: [["Nicollas voltou durante o apagão e derrubou Lucas", "wrongNicollas"], ["Maycon provocou a queda de energia para assustar Arthur", "wrongMaycon"], ["Arthur tentou sair, atingiu a cadeira e Lucas tropeçou no escuro", "correct"]] }),

    wrongNicollas: () => ({ titulo: "A porta não permite essa hipótese", tag: "Hipótese descartada", texto: `<p>Nicollas voltou antes do apagão. A câmera permaneceu ligada por bateria e mostra a porta fechada durante os dezoito segundos. Ele mentiu sobre a sala de materiais, mas sua mentira não o coloca no trajeto da queda.</p>`, op: [["Corrigir a hipótese no mapa", "deduction"], ["Rever a gravação", "cameras"]] }),

    wrongMaycon: () => ({ titulo: "Duas máquinas contradizem essa hipótese", tag: "Hipótese descartada", texto: `<p>O quadro elétrico registrou a mesma falha em três salas. O computador situa a mensagem de Maycon antes do acidente e a liga à conclusão do trabalho. Nenhuma das duas provas depende da versão dele.</p>`, op: [["Corrigir a hipótese no mapa", "deduction"], ["Rever o quadro elétrico", "panel"]] }),

    correct: () => ({ titulo: "A cadeira foi o elo", tag: "Dedução sustentada", texto: `<p>Arthur saiu da mesa em direção à porta, derrubando as próprias folhas. No escuro, bateu na lateral da cadeira e a girou para o caminho de Lucas. Lucas avançou sem enxergar o obstáculo e caiu.</p><p>A reconstrução explica os sons, as marcas, as posições e a porta fechada. Ela não exige empurrão nem transforma as outras mentiras em causas.</p>`, op: [["Apresentar a reconstrução a Arthur", "confession"], ["Revisar uma última pista antes da conversa", "room"]] }),

    confession: () => ({ titulo: "Arthur completa os dezoito segundos", tag: "Confirmação final", texto: `<p>Arthur respira fundo diante do mapa.</p><div class="quote">— Eu quis sair antes de ter que admitir o que fiz no trabalho. No escuro, bati na cadeira e ouvi o Lucas cair. Quando a luz voltou, achei que a discussão faria parecer de propósito. Então menti sobre a janela.</div><p>A confissão confirma uma explicação que as provas já sustentavam. A diretora informa que Lucas está bem e voltará às aulas na semana seguinte.</p>`, op: [["Preparar o relatório para a direção", "report"], ["Resolver alguma pista que ficou sem contexto", "room"]] }),

    report: () => ({ titulo: "O que o relatório pode afirmar", tag: "Encerramento responsável", texto: `<p>O relatório separa três coisas: a causa da queda, as mentiras contadas depois e os assuntos que apenas pareciam ligados ao acidente.</p><p>A nota final dependerá do que foi demonstrado antes da confissão — e de quantas pessoas foram acusadas antes das provas.</p>`, op: [["Entregar o relatório", "autoEnd"], ["Voltar e completar a investigação", "room"]] }),

    badArthur: () => ({ ending: true, mark: "!", titulo: "Acusação antes da reconstrução", tag: "Consequência", texto: `<p>Arthur mentiu sobre a janela, mas isso não prova que empurrou Lucas. A diretora interrompe a acusação e exige uma sequência que explique cadeira, folhas, porta e apagão. Confundir mentira com agressão quase transforma um acidente em culpa intencional.</p>`, op: [["Retirar a acusação e voltar aos vestígios", "room"], ["Recomeçar o caso", "__restart"]] }),

    badMaycon: () => ({ ending: true, mark: "?", titulo: "Uma frase sem o restante", tag: "Consequência", texto: `<p>O trecho cortado faz Maycon parecer ameaçador. O histórico completo, porém, mostra que ele falava da apresentação e foi escrito antes do apagão. A diretora devolve o relatório: uma mensagem incompleta não pode substituir contexto.</p>`, op: [["Recuperar a conversa completa", "computer"], ["Recomeçar o caso", "__restart"]] }),

    badNicollas: () => ({ ending: true, mark: "×", titulo: "A mentira errada", tag: "Consequência", texto: `<p>Nicollas mentiu porque entrou sem autorização na sala de materiais. A câmera prova que ele voltou antes do apagão e que a porta permaneceu fechada. Uma mentira pode esconder uma infração sem esconder a causa do acidente.</p>`, op: [["Separar a saída proibida da queda", "nicollas"], ["Recomeçar o caso", "__restart"]] }),

    perfect: () => ({ ending: true, mark: "✓", titulo: "A sala fechada foi explicada", tag: "Relatório completo", texto: `<p>Ícaro demonstra a sequência antes de depender da confissão: a falha elétrica foi externa; ninguém cruzou a porta; Arthur atravessou a sala, derrubou as folhas e girou a cadeira; Lucas tropeçou no obstáculo. A mochila, o caderno e a mensagem também recebem seus contextos corretos.</p><p>Arthur assume a mentira e a alteração do trabalho. Nicollas explica a saída proibida. Maycon reconhece que pressionou o colega. Ninguém é transformado em culpado por uma frase, um objeto ou uma mentira isolada.</p>`, op: [["Investigar novamente", "__restart"]] }),

    good: () => ({ ending: true, mark: "✓", titulo: "O acidente foi esclarecido", tag: "Caso resolvido", texto: `<p>As provas e a confirmação de Arthur esclarecem a queda. Ainda assim, algumas pistas ficaram sem contexto ou alguma acusação foi feita cedo demais. A conclusão principal está correta, mas o relatório não explica tudo o que aconteceu naquela tarde.</p>`, op: [["Voltar antes de entregar e completar o relatório", "room"], ["Começar outra investigação", "__restart"]] })
  };

  if (id === "autoEnd") return cena(finalPerfeito() ? "perfect" : "good", primeiraVisita);
  return cenas[id]();
}

function statusPessoa(id) {
  if (id === "lucas") return S.confessou ? ["Recuperação confirmada", "cleared"] : ["Em atendimento", ""];
  if (id === "arthur") {
    if (S.confessou) return ["Assumiu o acidente", "cleared"];
    if (S.pressionouArthur) return ["Versão contraditória", "conflict"];
    return [S.ouviuArthur ? "Versão registrada" : "Ligado à discussão", ""];
  }
  if (id === "maycon") return S.contextualizouMensagem ? ["Mensagem explicada", "cleared"] : ["Contexto pendente", ""];
  if (id === "nicollas") return S.confrontouNicollas ? ["Saída explicada", "cleared"] : [S.viuCameras ? "Versão contraditória" : "Objeto relacionado", S.viuCameras ? "conflict" : ""];
  if (id === "washington") return S.ouviuWashington ? ["Álibi confirmado", "cleared"] : ["Visto no corredor", ""];
  if (id === "diogo") return S.contextualizouMensagem ? ["Registro confirmado", "cleared"] : ["Fonte digital", ""];
  return ["Mencionado", ""];
}

function objetivo() {
  if (!S.examinouSala) return "Preserve a sala antes que os objetos sejam movidos.";
  if (!S.examinouFisica) return "Registre a cadeira e as folhas antes de ouvir acusações.";
  if (!S.viuCameras) return "Descubra se alguém atravessou a porta durante o apagão.";
  if (!S.verificouPainel) return "Determine se a queda de energia foi causada dentro da sala.";
  if (!S.confrontouNicollas || !S.ouviuTestemunho) return "Separe a mentira de Nicollas daquilo que ele realmente viu.";
  if (!S.pressionouArthur) return "Compare a versão da janela com o caminho físico.";
  if (!S.deduziu) return "Reconstrua os dezoito segundos sem depender de confissão.";
  if (!S.confessou) return "Apresente a reconstrução a Arthur.";
  if (!finalPerfeito()) return "Resolva os objetos e mensagens que ainda estão sem contexto.";
  return "Entregue à direção o relatório sustentado pelas provas.";
}

function progresso() { return Math.round((S.ev.size / Object.keys(evidencias).length) * 100); }

function cabecalho() {
  return `<header class="topbar">
    <a class="brand" href="../../index.html" aria-label="Voltar para Jogos Narrativos"><span class="brand-mark">6B</span><span class="brand-copy"><strong>Mural do Ícaro</strong><small>Os 18 segundos</small></span></a>
    <div class="top-case"><span>Sexta-feira · 16h19</span><strong>O que mudou no escuro?</strong></div>
    <button class="restart" type="button" onclick="restart()">↻ Recomeçar</button>
  </header>
  <section class="progress-row" aria-label="Progresso da investigação"><div class="progress-copy"><span>Relatório de Ícaro</span><strong>${progresso()}% concluído</strong></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progresso()}"><div style="width:${progresso()}%"></div></div></section>`;
}

function lateral() {
  const listaEvidencias = [...S.ev].map(id => `<li class="evidence-item">${evidencias[id]}</li>`).join("");
  const listaPessoas = [...S.pessoas].map(id => {
    const [iniciais, nome, papel] = pessoas[id];
    const [status, classe] = statusPessoa(id);
    return `<li class="person"><span class="person-initials">${iniciais}</span><p><strong>${nome}</strong><small>${papel}</small><small class="person-status ${classe}">${status}</small></p></li>`;
  }).join("");

  return `<aside class="notebook">
    <div class="notebook-head"><span class="notebook-seal">I</span><div><h2>Mural de pistas</h2><p>Fixado por Ícaro</p></div></div>
    <div class="objective"><small>Bilhete para mim</small><p>${objetivo()}</p></div>
    <section class="notebook-section"><div class="section-label"><strong>Quem apareceu</strong><span>${S.pessoas.size}</span></div><ul class="people-list">${listaPessoas || `<li class="empty-note">Os nomes serão fixados aqui quando algum vestígio levar até eles.</li>`}</ul></section>
    <section class="notebook-section"><div class="section-label"><strong>Pistas fixadas</strong><span>${S.ev.size}/${Object.keys(evidencias).length}</span></div><ul class="evidence-list">${listaEvidencias || `<li class="empty-note">O mural ainda está vazio. Preserve o primeiro vestígio.</li>`}</ul></section>
    <section class="notebook-section"><button class="control" type="button" onclick="restart()">↻ Limpar o mural</button></section>
  </aside>`;
}

function relogio() {
  return `<ol class="case-clock"><li><strong>16h12</strong><span>Discussão</span></li><li><strong>16h18</strong><span>Último retorno</span></li><li><strong>16h19</strong><span>18 s no escuro</span></li><li><strong>16h37</strong><span>Sala preservada</span></li></ol>`;
}

function botoes(opcoes) {
  return opcoes.map(([rotulo, destino], indice) => `<button class="choice" type="button" onclick="go('${destino}')"><span class="choice-number">${String(indice + 1).padStart(2, "0")}</span><span class="choice-label">${rotulo}</span><span class="choice-arrow" aria-hidden="true">→</span></button>`).join("");
}

function render(id) {
  if (id === "__restart") return restart();
  if (["deduction", "correct", "wrongNicollas", "wrongMaycon"].includes(id) && !podeDeduzir()) return render("room");

  const primeiraVisita = primeira(id);
  S.visitas[id] = (S.visitas[id] || 0) + 1;
  aplicarGatilhos(id, primeiraVisita);
  const atual = cena(id, primeiraVisita);
  const [imagem, descricao] = artes[id === "autoEnd" ? (finalPerfeito() ? "perfect" : "good") : id] || artes.room;
  const imagemAmpla = imagem.includes("capa-sala-fechada");

  if (atual.cover) {
    document.getElementById("app").innerHTML = `<main class="cover"><img src="${imagem}" alt="${descricao}"><div class="cover-content"><a class="cover-home" href="../../index.html">← Jogos Narrativos</a><div><span class="eyebrow">${atual.tag}</span><h1>${atual.titulo}</h1>${atual.texto}<button class="primary" type="button" onclick="go('${atual.op[0][1]}')">Abrir o caso <span aria-hidden="true">→</span></button></div></div></main>`;
    return;
  }

  if (atual.ending) {
    document.getElementById("app").innerHTML = `<div class="shell">${cabecalho()}<div class="layout"><main class="story"><figure class="scene-visual ${imagemAmpla ? "wide" : ""}" style="--scene-image:url('${imagem}')"><img src="${imagem}" alt="${descricao}"><figcaption class="scene-heading"><div class="scene-meta"><span>${atual.tag}</span><span>Desfecho</span></div><h1>${atual.titulo}</h1></figcaption></figure><section class="ending"><div class="ending-mark">${atual.mark}</div>${atual.texto}<div class="ending-stats"><div class="stat"><strong>${S.ev.size}</strong><span>evidências</span></div><div class="stat"><strong>${S.erros}</strong><span>acusações precoces</span></div><div class="stat"><strong>${Object.keys(S.visitas).length}</strong><span>locais visitados</span></div></div><div class="choices">${botoes(atual.op)}</div></section></main>${lateral()}</div><footer class="footer">Jogo narrativo criado por estudantes · Ficção escolar</footer></div>`;
    return;
  }

  document.getElementById("app").innerHTML = `<div class="shell">${cabecalho()}<div class="layout"><main class="story"><figure class="scene-visual ${imagemAmpla ? "wide" : ""}" style="--scene-image:url('${imagem}')"><img src="${imagem}" alt="${descricao}"><figcaption class="scene-heading"><div class="scene-meta"><span>${atual.tag}</span><span>${primeiraVisita ? "Nova descoberta" : "Local revisitado"}</span></div><h1>${atual.titulo}</h1></figcaption></figure><section class="story-body">${relogio()}<div class="report-line">Anotação no caderno</div><div class="scene-copy">${atual.texto}</div><div class="choice-heading"><strong>O que Ícaro faz agora?</strong><span>Escolha uma ação</span></div><div class="choices">${botoes(atual.op)}</div></section></main>${lateral()}</div><footer class="footer">Um objeto sozinho não conta a história inteira</footer></div>`;

  const painel = document.querySelector(".story");
  painel.classList.remove("scene-enter");
  void painel.offsetWidth;
  painel.classList.add("scene-enter");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function go(id) { render(id); }
function restart() { S = novoEstado(); render("start"); }

render("start");
