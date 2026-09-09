const EVIDENCE = {
  timeline: "O medalhão foi visto às 15:40 e a vitrine abriu às 15:45",
  keyUse: "A vitrine intacta foi aberta com a chave correta",
  darkFiber: "Uma fibra azul-escura ficou presa na dobradiça",
  mariaWitness: "Maria viu uma caixa metálica e ouviu um rádio às 15:44",
  tayAlibi: "A câmera mantém Tayonara diante da turma às 15:45",
  cameraFigure: "Uma figura leva uma caixa para a ala técnica às 15:44",
  garciaStatement: "Garcia afirma ter permanecido no depósito",
  keyLog: "Garcia retirou a chave de emergência às 15:42",
  depositLog: "O crachá de Garcia só entrou no depósito às 15:51",
  fiberMatch: "A fibra corresponde ao rasgo recente no paletó de Garcia",
  caseLedger: "Garcia reservou uma caixa metálica para a Galeria dos Relógios",
  medalRecovered: "O Medalhão de Aurora estava dentro da caixa reservada"
};

const PEOPLE = {
  maria: ["MA", "Maria", "Visitante que estava no corredor"],
  tay: ["TA", "Tayonara", "Monitora da visita escolar"],
  garcia: ["GG", "Senhor Garcia", "Técnico responsável pelo acervo"]
};

const CORE_EVIDENCE = ["keyLog", "depositLog", "fiberMatch", "caseLedger", "medalRecovered", "cameraFigure"];

const $ = (id) => document.getElementById(id);

let state = initialState();
let feedbackTimer;

function initialState() {
  return {
    scene: "incident",
    evidence: [],
    people: [],
    visits: {},
    coatObserved: false,
    garciaConfronted: false,
    mistakes: 0,
    solved: false
  };
}

function has(id) {
  return state.evidence.includes(id);
}

function addEvidence(id) {
  if (!EVIDENCE[id] || has(id)) return;
  state.evidence.push(id);
  showFeedback(`Nova evidência registrada: ${EVIDENCE[id]}`);
}

function meet(id) {
  if (!state.people.includes(id)) state.people.push(id);
}

function allCoreEvidence() {
  return CORE_EVIDENCE.every(has);
}

function showFeedback(message) {
  clearTimeout(feedbackTimer);
  const el = $("feedback");
  if (!el) return;
  el.textContent = message;
  feedbackTimer = setTimeout(() => {
    if (el.textContent === message) el.textContent = "";
  }, 2800);
}

function toggleCatalog(open) {
  document.body.classList.toggle("catalog-open", open);
  $("evidenceDrawer").setAttribute("aria-hidden", String(!open));
  document.querySelectorAll("[data-open-catalog]").forEach((button) => {
    button.setAttribute("aria-expanded", String(open));
  });

  if (open) document.querySelector(".drawer-close").focus();
}

function applyTriggers(id, firstVisit) {
  if (id === "display") {
    addEvidence("keyUse");
    addEvidence("darkFiber");
  }
  if (id === "clock") addEvidence("timeline");
  if (id === "maria") {
    meet("maria");
    addEvidence("mariaWitness");
  }
  if (id === "camera") {
    meet("tay");
    addEvidence("tayAlibi");
    addEvidence("cameraFigure");
  }
  if (id === "garcia") {
    meet("garcia");
    addEvidence("garciaStatement");
  }
  if (id === "observeGarcia") state.coatObserved = true;
  if (id === "admin") addEvidence("keyLog");
  if (id === "adminLedger") addEvidence("caseLedger");
  if (id === "deposit") addEvidence("depositLog");
  if (id === "conservation") addEvidence("fiberMatch");
  if (id === "clockGallery") addEvidence("medalRecovered");
  if ((id === "wrongMaria" || id === "wrongTay") && firstVisit) state.mistakes += 1;
  if (id === "solved" || id === "perfect") state.solved = true;
}

function backToHall() {
  return ["Voltar ao salão e reorganizar as pistas", "incident"];
}

function staffChoice() {
  return [has("timeline") || has("cameraFigure") ? "Seguir para a ala reservada aos funcionários" : "Pedir acesso à ala técnica", "staff"];
}

function sceneFor(id, firstVisit) {
  const scenes = {
    incident: () => {
      const investigated = state.evidence.length;
      let text;
      if (firstVisit) {
        text = `<p>Às 15:46, o alarme discreto da Galeria Aurora acende. O Medalhão de Aurora desapareceu, mas a vitrine continua inteira. A diretora Helena fecha as saídas e chama a polícia.</p><p>Como você estava registrando a visita para o jornal da escola, ela pede que anote horários e relatos sob sua supervisão. Enquanto os adultos cuidam das saídas, o relógio continua avançando e cada pessoa no museu tenta lembrar onde estava.</p>`;
      } else if (has("medalRecovered")) {
        text = `<p>O pedestal vazio já não é um mistério isolado. A chave, os registros e a caixa recuperada formam um percurso completo entre 15:42 e 15:51.</p><p>Resta transformar o que você encontrou numa reconstrução que não dependa de aparência ou de palpite.</p>`;
      } else if (allCoreEvidence()) {
        text = `<p>O salão mudou porque suas informações mudaram. Agora a vitrine, a câmera, a chave e os registros da ala técnica apontam para uma mesma sequência.</p><p>O quadro de reconstrução está pronto. É hora de testar qual hipótese respeita todas as provas.</p>`;
      } else if (investigated >= 5) {
        text = `<p>Ao voltar ao salão, detalhes antes separados começam a conversar entre si. A vitrine diz como foi aberta; os horários limitam quem poderia atravessar a galeria.</p><p>Ainda não basta escolher quem parece suspeito. É preciso descobrir para onde a caixa metálica foi levada e encontrar o medalhão.</p>`;
      } else {
        text = `<p>A vitrine permanece no centro da galeria. O corredor público leva às câmeras; uma porta discreta conduz à ala dos funcionários.</p><p>Cada retorno ao salão pode ganhar outro sentido depois de um novo registro.</p>`;
      }

      const choices = [
        [has("keyUse") ? "Reexaminar a vitrine com as novas informações" : "Preservar a vitrine antes que alguém a toque", "display"],
        [has("timeline") ? "Conferir novamente os minutos do desaparecimento" : "Fixar a linha do tempo do alarme", "clock"],
        ["Examinar o corredor público", "corridor"]
      ];
      if (has("timeline") || has("cameraFigure")) choices.push(staffChoice());
      if (state.evidence.length >= 4) choices.push([allCoreEvidence() ? "Montar a reconstrução final" : "Abrir o quadro de hipóteses", "board"]);

      return scene("Salão central", "Galeria Aurora", "Caso em andamento", "display", "◇", text, choices);
    },

    display: () => {
      const text = has("fiberMatch")
        ? `<p>A fibra recolhida aqui já foi comparada ao rasgo recente do paletó de Garcia. A correspondência liga a roupa à abertura da vitrine, mas ganha força somente quando combinada com os registros de horário.</p><div class="finding">A vitrine prova contato com a cena. Ela não prova, sozinha, onde o medalhão foi levado.</div>`
        : `<p>Não há estilhaços nem marcas de ferramenta. O mecanismo confirma que a fechadura recebeu a chave correta às 15:45. Na dobradiça, uma única fibra azul-escura ficou presa.</p><p>A diretora recolhe a fibra num envelope. Cor e tecido podem orientar a busca, mas ainda não identificam uma pessoa.</p>`;
      const choices = [
        ...(state.coatObserved && !has("fiberMatch") ? [["Comparar a fibra com o rasgo observado", "conservation"]] : []),
        ["Relacionar a abertura ao horário do alarme", "clock"],
        ["Ver quem atravessou o corredor", "corridor"],
        backToHall()
      ];
      return scene(has("fiberMatch") ? "Uma fibra com contexto" : "Vidro inteiro, fechadura usada", "Vitrine do medalhão", "Vestígio físico", "display", "◇", text, choices);
    },

    clock: () => {
      const text = `<p>O livro da exposição registra a última conferência às 15:40, feita antes de uma turma seguir para a Sala dos Dinossauros. O sensor da vitrine marca abertura às 15:45 e fechamento trinta e oito segundos depois. O alarme só aparece na portaria às 15:46.</p><div class="finding">A investigação precisa explicar um intervalo de apenas seis minutos — e não toda a tarde.</div>`;
      return scene("Seis minutos", "Relógio da galeria", "Linha do tempo", "clock", "15:45", text, [
        ["Comparar os horários com as câmeras", "camera"],
        staffChoice(),
        backToHall()
      ]);
    },

    corridor: () => {
      const text = firstVisit
        ? `<p>No corredor, uma visitante espera para entregar seu depoimento. Mais adiante, a câmera da Sala dos Dinossauros aponta para a passagem pública; a porta da ala técnica aparece apenas como reflexo num quadro envidraçado.</p><p>Há caminhos para observar antes de perguntar quem é culpado.</p>`
        : `<p>Agora você conhece o corredor em três camadas: o que Maria ouviu, o que a câmera gravou e o que os registros internos marcaram. Nenhuma camada substitui as outras.</p>`;
      const choices = [
        [state.people.includes("maria") ? "Voltar ao relato de Maria" : "Ouvir a visitante que estava no corredor", "maria"],
        [has("cameraFigure") ? "Rever o reflexo das 15:44" : "Solicitar a gravação da Sala dos Dinossauros", "camera"],
        ...(has("timeline") ? [staffChoice()] : []),
        backToHall()
      ];
      return scene("O corredor tem três versões", "Passagem pública", "Área preservada", "corridor", "↗", text, choices);
    },

    maria: () => {
      let text;
      if (firstVisit) {
        text = `<p>Maria estava perto do bebedouro. Às 15:44, viu uma figura de roupa escura levando uma caixa metálica para a ala dos funcionários. Ouviu um rádio chiar e percebeu um passo irregular.</p><div class="dialogue">“Eu não vi o rosto. Não quero acusar alguém apenas pelo jeito de andar.”</div>`;
      } else if (has("cameraFigure")) {
        text = `<p>Ao rever a gravação com Maria, ela reconhece o tamanho da caixa e a direção tomada pela figura, mas não inventa um rosto que não viu.</p><div class="dialogue">“É o mesmo caminho e o mesmo ruído metálico. Eu consigo confirmar isso. Quem era a pessoa, não.”</div><p>O depoimento confirma o percurso; a câmera preserva o horário.</p>`;
      } else {
        text = `<p>Maria mantém a versão sem acrescentar detalhes para agradar à investigação: viu roupa escura, uma caixa pequena, um rádio e um caminhar irregular. Não viu o rosto.</p><p>A constância torna o relato útil, mas ele ainda precisa de uma fonte independente.</p>`;
      }
      return scene("O que Maria realmente viu", "Corredor público", "Depoimento delimitado", "corridor", "MA", text, [
        [has("cameraFigure") ? "Comparar o relato novamente com a imagem" : "Buscar uma imagem que confirme o horário", "camera"],
        ...(has("mariaWitness") ? [["Procurar o registro das caixas metálicas", "admin"]] : []),
        ["Voltar ao corredor", "corridor"]
      ]);
    },

    camera: () => {
      const text = firstVisit
        ? `<p>A gravação mantém Tayonara diante de uma turma durante todo o minuto das 15:45. No vidro de um quadro, porém, aparece o reflexo parcial de outra pessoa carregando uma caixa para a ala técnica às 15:44.</p><p>A imagem não mostra um rosto. Ela confirma um horário, uma direção e a existência da caixa.</p>`
        : has("mariaWitness")
          ? `<p>A gravação continua igual: Tayonara permanece com a turma e a figura atravessa o reflexo às 15:44. O relato de Maria coincide com a imagem sem depender dela.</p><div class="finding">Duas fontes independentes confirmam o percurso da caixa.</div>`
          : `<p>A câmera inocenta Tayonara no intervalo central e preserva o reflexo de uma caixa seguindo para a ala técnica. Falta encontrar quem observou o corredor sem a ajuda da gravação.</p>`;
      return scene("Um reflexo às 15:44", "Sala dos Dinossauros", "Registro independente", "clock", "▶", text, [
        ["Ouvir Tayonara depois de verificar o álibi", "tay"],
        [state.people.includes("maria") ? "Comparar a imagem com Maria" : "Procurar uma testemunha no corredor", "maria"],
        staffChoice(),
        backToHall()
      ]);
    },

    tay: () => {
      const text = `<p>Tayonara explica que conferiu o Medalhão de Aurora às 15:40 e levou os estudantes para a sala seguinte. A lista da escola e a gravação confirmam sua posição às 15:45.</p><div class="dialogue">“Eu não percebi o desaparecimento. Só vi a luz do alarme quando voltei, às 15:47.”</div><p>Ela ajuda a fechar a linha do tempo, mas não é tratada como culpada por ter estado perto da vitrine antes do roubo.</p>`;
      return scene("Uma presença confirmada", "Sala dos Dinossauros", "Álibi verificado", "archive", "TA", text, [
        ["Investigar quem possuía acesso à chave", "admin"],
        ["Voltar às câmeras", "camera"],
        backToHall()
      ]);
    },

    staff: () => {
      const text = firstVisit
        ? `<p>A diretora acompanha você pela ala técnica. Três lugares podem responder a perguntas diferentes: a administração guarda retiradas de chaves, o depósito registra crachás e a bancada de conservação permite comparar materiais.</p><p>Um técnico organiza ferramentas perto da Galeria dos Relógios. Só então você descobre seu nome: Senhor Garcia.</p>`
        : `<p>A ala técnica deixou de ser apenas um corredor restrito. Seus registros podem comparar o que Garcia disse com o que as máquinas conservaram.</p>`;
      return scene("Atrás das salas públicas", "Ala técnica", "Acesso supervisionado", "corridor", "↘", text, [
        ["Consultar o controle de chaves e caixas", "admin"],
        ["Conferir a entrada do depósito", "deposit"],
        [state.people.includes("garcia") ? "Voltar a Garcia" : "Ouvir o técnico perto dos relógios", "garcia"],
        ...(state.coatObserved && has("darkFiber") && !has("fiberMatch") ? [["Usar a bancada de conservação", "conservation"]] : []),
        backToHall()
      ]);
    },

    garcia: () => {
      let text;
      if (state.garciaConfronted) {
        text = has("medalRecovered")
          ? `<p>Garcia já abandonou o álibi do depósito. Ao saber que a caixa da Galeria dos Relógios foi aberta, ele tenta separar a chave, o tecido e o medalhão como coincidências.</p><p>O quadro final precisa mostrar por que elas fazem parte da mesma sequência.</p>`
          : `<p>Diante dos dois registros, Garcia admite que não ficou no depósito. Diz que apenas verificou um sensor e levou uma caixa vazia para os relógios.</p><div class="warning">A versão mudou, mas ainda deve ser testada: onde está a caixa e o que existe dentro dela?</div>`;
      } else if (has("keyLog") || has("depositLog")) {
        text = `<p>Garcia repete que conferiu o inventário no depósito entre 15:35 e 15:50. Seu paletó azul-escuro tem um rasgo recente no punho; um rádio está preso ao cinto e ele apoia menos a perna direita.</p><p>Um registro contradiz parte da fala. O outro pode mostrar se foi engano ou mentira.</p>`;
      } else {
        text = `<p>Garcia se apresenta como técnico do acervo. Diz que permaneceu no depósito entre 15:35 e 15:50, conferindo peças antigas.</p><div class="dialogue">“Não passei pela Galeria Aurora depois do almoço.”</div><p>A afirmação tem horário e lugar definidos. Isso permite verificá-la sem adivinhar.</p>`;
      }

      const choices = [
        ...(!state.coatObserved ? [["Observar o uniforme sem transformar aparência em prova", "observeGarcia"]] : []),
        ["Conferir a retirada da chave", "admin"],
        ["Verificar o crachá no depósito", "deposit"]
      ];
      if (has("keyLog") && has("depositLog") && !state.garciaConfronted) choices.push(["Confrontar os dois horários contraditórios", "confrontGarcia"]);
      if (state.garciaConfronted && has("caseLedger") && has("cameraFigure")) choices.push(["Testar a história da caixa na Galeria dos Relógios", "clockGallery"]);
      choices.push(["Interromper a conversa e voltar à ala técnica", "staff"]);
      return scene(state.garciaConfronted ? "A versão que perdeu seis minutos" : "Um álibi verificável", "Bancada do acervo", "Depoimento registrado", "archive", "GG", text, choices);
    },

    observeGarcia: () => {
      const text = `<p>O rádio, o paletó escuro e o passo irregular lembram a descrição de Maria. No punho direito, o tecido apresenta um rasgo recente.</p><div class="warning">Características semelhantes orientam uma comparação. Não demonstram autoria e não autorizam uma acusação.</div>`;
      return scene("Semelhança não é sentença", "Ala técnica", "Observação", "archive", "◎", text, [
        ...(has("darkFiber") ? [["Levar a fibra e o paletó à conservação", "conservation"]] : [["Examinar primeiro a vitrine", "display"]]),
        ["Verificar o álibi informado por Garcia", "deposit"],
        ["Voltar a Garcia", "garcia"]
      ]);
    },

    admin: () => {
      const text = has("garciaStatement")
        ? `<p>O controle assinado registra que Garcia retirou a chave de emergência da Galeria Aurora às 15:42, alegando ajuste no sensor. A devolução aparece somente às 15:50.</p><p>Isso contradiz a afirmação de que ele não passou pela galeria, mas ainda é necessário demonstrar o destino do medalhão.</p>`
        : `<p>O controle assinado registra que o técnico Garcia retirou a chave de emergência da Galeria Aurora às 15:42 para ajustar um sensor. A devolução ocorreu às 15:50.</p><p>O registro identifica uma oportunidade. Antes de concluir qualquer coisa, você precisa ouvir o técnico e verificar onde ele diz ter estado.</p>`;
      const choices = [
        ...(has("mariaWitness") && !has("caseLedger") ? [["Examinar o livro de circulação das caixas metálicas", "adminLedger"]] : []),
        [state.people.includes("garcia") ? "Levar o horário a Garcia" : "Descobrir quem é Garcia", "garcia"],
        ["Comparar com o acesso ao depósito", "deposit"],
        ["Voltar à ala técnica", "staff"]
      ];
      return scene(has("caseLedger") ? "A chave e a caixa" : "A chave saiu às 15:42", "Administração", "Registro documental", "archive", "KEY", text, choices);
    },

    adminLedger: () => {
      const text = `<p>Como Maria descreveu uma caixa metálica, a diretora abre o livro correto. Às 15:30, Garcia reservou a caixa de conservação número 8 para “ajuste do relógio principal”. O destino anotado é a Galeria dos Relógios.</p><div class="finding">A testemunha revelou o tipo de objeto; o livro revelou quem o retirou e para onde deveria levá-lo.</div>`;
      return scene("Caixa 8: Galeria dos Relógios", "Arquivo administrativo", "Documento relacionado", "archive", "08", text, [
        ...(has("cameraFigure") ? [["Seguir o percurso registrado até os relógios", "clockGallery"]] : [["Confirmar o percurso nas câmeras", "camera"]]),
        ["Perguntar a Garcia sobre a reserva", "garcia"],
        ["Voltar à administração", "admin"]
      ]);
    },

    deposit: () => {
      const text = has("garciaStatement")
        ? `<p>O leitor de crachás não registra Garcia entre 15:35 e 15:50. Sua primeira entrada ocorreu às 15:51 — depois que a chave já havia sido devolvida e o alarme estava ativo.</p><div class="finding">O álibi não é apenas “não confirmado”: um registro automático o contradiz.</div>`
        : `<p>O leitor do depósito registra todas as entradas. O crachá de Garcia aparece somente às 15:51. Para entender a importância desse horário, ainda é preciso ouvir onde ele afirma ter estado.</p>`;
      return scene("O depósito registra 15:51", "Porta do depósito", "Leitura automática", "archive", "15:51", text, [
        ["Ouvir a versão de Garcia", "garcia"],
        ...(has("keyLog") && has("garciaStatement") && !state.garciaConfronted ? [["Confrontar Garcia com os dois registros", "confrontGarcia"]] : []),
        ["Voltar à ala técnica", "staff"]
      ]);
    },

    confrontGarcia: () => {
      state.garciaConfronted = true;
      const text = `<p>Você coloca lado a lado o controle da chave e o leitor do depósito. Garcia não poderia estar no depósito enquanto retirava e usava a chave da galeria.</p><div class="dialogue">“Está bem. Eu verifiquei o sensor e levei uma caixa vazia aos relógios. Esqueci o horário.”</div><p>A primeira mentira foi demonstrada. A nova versão cria uma pergunta testável: a caixa estava realmente vazia?</p>`;
      return scene("Quando o horário não cabe", "Bancada do acervo", "Contradição demonstrada", "clock", "!", text, [
        ...(has("caseLedger") && has("cameraFigure") ? [["Abrir a caixa na Galeria dos Relógios", "clockGallery"]] : []),
        ...(!has("caseLedger") ? [["Procurar o registro da caixa", "admin"]] : []),
        ...(!has("cameraFigure") ? [["Confirmar o percurso da caixa", "camera"]] : []),
        ["Voltar ao salão", "incident"]
      ]);
    },

    conservation: () => {
      const text = `<p>Sob a lente, a fibra da vitrine e o fio solto do punho apresentam a mesma trama, a mesma tonalidade e o mesmo acabamento encerado do uniforme técnico. A falha no rasgo encaixa no trecho recolhido.</p><div class="finding">A comparação confirma contato entre o paletó e a dobradiça. O horário e o objeto recuperado ainda precisam sustentar a sequência completa.</div>`;
      return scene("O rasgo encontra sua origem", "Laboratório de conservação", "Comparação material", "display", "≈", text, [
        ["Levar o resultado a Garcia", "garcia"],
        ["Retornar à vitrine com a comparação", "display"],
        ["Voltar à ala técnica", "staff"]
      ]);
    },

    clockGallery: () => {
      const text = firstVisit
        ? `<p>A caixa número 8 está atrás do painel de manutenção do relógio principal. A diretora rompe o lacre provisório. Dentro dela, envolvido em feltro, está o Medalhão de Aurora.</p><p>Na tampa há a ficha assinada por Garcia. A caixa não cruzou a saída do museu; foi escondida para ser retirada depois do fechamento.</p><div class="finding">O objeto desaparecido foi recuperado num recipiente ligado documentalmente ao técnico.</div>`
        : `<p>O medalhão permanece sob guarda da diretora. Caixa, ficha e lacre estão preservados para a polícia. Nada depende agora de alguém “lembrar melhor”.</p>`;
      return scene("O medalhão atrás do relógio", "Galeria dos Relógios", "Objeto recuperado", "clock", "◆", text, [
        ["Voltar a Garcia com o objeto recuperado", "garcia"],
        ["Montar a reconstrução completa", "board"],
        backToHall()
      ]);
    },

    board: () => {
      if (!allCoreEvidence()) {
        const missing = [];
        if (!has("keyLog") || !has("depositLog")) missing.push("comparar a chave com o depósito");
        if (!has("fiberMatch")) missing.push("confirmar a origem da fibra");
        if (!has("caseLedger") || !has("medalRecovered")) missing.push("seguir a caixa e recuperar o medalhão");
        if (!has("cameraFigure")) missing.push("fixar o percurso das 15:44");
        const text = `<p>O quadro ainda contém saltos. Uma reconstrução não pode terminar com “e então o medalhão apareceu”.</p><div class="warning">Falta ${missing.join("; ")}.</div>`;
        return scene("Uma hipótese ainda incompleta", "Mesa de reconstrução", "Revisão necessária", "archive", "?", text, [
          ...(!has("keyLog") || !has("caseLedger") ? [["Voltar aos registros administrativos", "admin"]] : []),
          ...(!has("depositLog") ? [["Conferir o depósito", "deposit"]] : []),
          ...(!has("fiberMatch") ? [[state.coatObserved ? "Comparar a fibra" : "Observar Garcia antes da comparação", state.coatObserved ? "conservation" : "observeGarcia"]] : []),
          ...(!has("cameraFigure") ? [["Consultar a câmera", "camera"]] : []),
          ...(!has("medalRecovered") && has("caseLedger") && has("cameraFigure") ? [["Seguir a caixa até os relógios", "clockGallery"]] : []),
          backToHall()
        ]);
      }

      const text = `<p>Você dispõe os horários sem nomes em destaque: chave retirada às 15:42; caixa no corredor às 15:44; vitrine aberta às 15:45; chave devolvida às 15:50; depósito acessado às 15:51.</p><p>Depois acrescenta a fibra comparada e o medalhão encontrado. A hipótese correta deve explicar todos os elementos sem transformar semelhança em culpa.</p>`;
      return scene("Cinco horários, uma sequência", "Mesa de reconstrução", "Teste de hipóteses", "archive", "15:45", text, [
        ["Maria usou objetos de Garcia para criar uma falsa pista", "wrongMaria"],
        ["Tayonara deixou a turma e encenou o álibi diante da câmera", "wrongTay"],
        ["Garcia usou a chave, transportou a caixa e inventou o depósito", "reconstruction"]
      ]);
    },

    wrongMaria: () => scene(
      "A testemunha não é a figura",
      "Mesa de reconstrução",
      "Hipótese rejeitada",
      "archive",
      "×",
      `<p>Maria não conhecia o controle das caixas nem aparece levando o objeto. Seu relato surgiu antes de ela assistir à gravação e coincide com um registro independente.</p><div class="warning">Usar a testemunha como culpada não explica a retirada da chave por Garcia, o crachá às 15:51 nem a ficha dentro da caixa.</div>`,
      [["Retirar a acusação e rever as três hipóteses", "board"], backToHall()]
    ),

    wrongTay: () => scene(
      "Uma câmera não permite dois lugares",
      "Mesa de reconstrução",
      "Hipótese rejeitada",
      "clock",
      "×",
      `<p>A gravação contínua e a lista da escola mantêm Tayonara diante dos estudantes. A figura refletida atravessa outro corredor no mesmo intervalo.</p><div class="warning">Para acusá-la seria necessário ignorar duas fontes independentes e todos os registros ligados a Garcia.</div>`,
      [["Retirar a acusação e rever as três hipóteses", "board"], backToHall()]
    ),

    reconstruction: () => {
      const text = `<p>Garcia retirou a chave às 15:42 e colocou o medalhão na caixa número 8. A câmera e Maria registraram a passagem às 15:44. Às 15:45, a vitrine foi fechada novamente; às 15:50, a chave voltou ao quadro.</p><p>Somente depois, às 15:51, Garcia entrou no depósito para fabricar o álibi que contaria. A fibra demonstra contato; a ficha da caixa e o medalhão recuperado completam o percurso.</p><div class="finding">A conclusão nasce da sequência antes de qualquer confissão.</div>`;
      return scene("A verdade cabe nos minutos", "Galeria Aurora", "Reconstrução sustentada", "ending", "✓", text, [
        ["Apresentar a sequência a Garcia e à diretora", "confession"],
        ["Revisar uma última evidência", "incident"]
      ]);
    },

    confession: () => {
      const text = `<p>Diante dos registros e do medalhão recuperado, Garcia para de corrigir a própria história. Ele admite que pretendia retirar a caixa no fim do expediente e vender a peça a um colecionador.</p><div class="dialogue">“Achei que seis minutos seriam pequenos demais para guardar uma história.”</div><p>A diretora entrega os objetos e os registros à polícia. A confissão confirma uma sequência que já estava demonstrada.</p>`;
      return scene("Garcia completa o intervalo", "Gabinete da diretora", "Confirmação", "ending", "GG", text, [
        [state.evidence.length === Object.keys(EVIDENCE).length && state.mistakes === 0 ? "Entregar o relatório completo" : "Encerrar o caso com as provas reunidas", state.evidence.length === Object.keys(EVIDENCE).length && state.mistakes === 0 ? "perfect" : "solved"]
      ]);
    },

    solved: () => scene(
      "O Medalhão de Aurora voltou",
      "Museu Histórico Municipal",
      "Caso solucionado",
      "ending",
      "✓",
      `<p>O medalhão retorna à reserva técnica e o percurso de Garcia é entregue à polícia. Maria foi tratada como testemunha, Tayonara teve o álibi verificado e nenhuma aparência substituiu uma prova.</p><p>Seu relatório resolveu o caso. Algumas etapas poderiam ter sido documentadas com ainda mais cuidado, mas a conclusão não depende de um salto.</p>`,
      [["Investigar novamente", "__restart"]]
    ),

    perfect: () => scene(
      "15:45 deixou de ser um mistério",
      "Museu Histórico Municipal",
      "Relatório completo",
      "ending",
      "★",
      `<p>Você reconstruiu o desaparecimento sem acusar antes da hora e registrou todas as doze evidências. Cada afirmação foi comparada a outra fonte: pessoa com câmera, chave com crachá, fibra com tecido, caixa com objeto.</p><p>O Medalhão de Aurora volta à exposição numa vitrine com registro duplo de abertura. Ao lado, uma placa resume a lição daquela tarde: um detalhe chama atenção; uma sequência demonstra.</p>`,
      [["Começar uma nova investigação", "__restart"]]
    )
  };

  return scenes[id] ? scenes[id]() : scenes.incident();
}

function scene(title, location, chapter, tone, marker, text, choices) {
  return { title, location, chapter, tone, marker, text, choices };
}

function objective() {
  if (!has("keyUse")) return "Preserve a vitrine antes de ouvir versões.";
  if (!has("timeline")) return "Descubra o intervalo exato do desaparecimento.";
  if (!has("mariaWitness") || !has("cameraFigure")) return "Compare uma testemunha com um registro independente.";
  if (!has("garciaStatement")) return "Ouça um álibi com horário e lugar verificáveis.";
  if (!has("keyLog") || !has("depositLog")) return "Cruze a chave retirada com a entrada do depósito.";
  if (!has("fiberMatch")) return "Confirme a origem da fibra sem acusar pela aparência.";
  if (!has("caseLedger")) return "Use a descrição da caixa para encontrar seu registro.";
  if (!has("medalRecovered")) return "Siga a caixa até a Galeria dos Relógios.";
  if (!state.solved) return "Reconstrua os cinco horários antes da confissão.";
  return "Caso encerrado com o medalhão recuperado.";
}

function personStatus(id) {
  if (id === "tay" && has("tayAlibi")) return ["Álibi confirmado", "cleared"];
  if (id === "maria") return ["Testemunha", "cleared"];
  if (id === "garcia" && state.garciaConfronted) return ["Versão contradita", "concern"];
  if (id === "garcia") return ["Depoimento em verificação", ""];
  return ["Informação pendente", ""];
}

function renderSidebar() {
  const total = Object.keys(EVIDENCE).length;
  const progress = Math.round((state.evidence.length / total) * 100);
  const currentObjective = objective();
  $("progressBar").style.width = `${progress}%`;
  $("progressText").textContent = `${progress}% esclarecido`;
  document.querySelector(".progress-track").setAttribute("aria-valuenow", progress);
  $("evidenceCount").textContent = `${state.evidence.length}/${total}`;
  $("miniEvidenceCount").textContent = `${state.evidence.length} de ${total} vestígios`;
  $("peopleCount").textContent = state.people.length;
  $("objectiveText").textContent = currentObjective;
  $("drawerObjective").textContent = currentObjective;

  $("evidenceList").innerHTML = state.evidence
    .map((id, index) => `<li style="animation-delay:${index * 18}ms">${EVIDENCE[id]}</li>`)
    .join("");

  $("peopleList").innerHTML = state.people
    .map((id) => {
      const [initials, name, role] = PEOPLE[id];
      const [status, className] = personStatus(id);
      return `<li><span class="person-initials">${initials}</span><p><strong>${name}</strong><small>${role}</small><small class="person-status ${className}">${status}</small></p></li>`;
    })
    .join("");

  $("evidencePreview").innerHTML = state.evidence.length
    ? state.evidence.slice(-4).map((id) => `<span class="preview-item">${EVIDENCE[id]}</span>`).join("")
    : `<span class="empty-evidence">As primeiras provas aparecerão aqui.</span>`;

  const timelineEvidence = ["timeline", "keyLog", "cameraFigure", "keyUse", "timeline", "depositLog"];
  document.querySelectorAll(".timeline li").forEach((item, index) => {
    item.classList.toggle("is-known", has(timelineEvidence[index]));
  });
}

function render(id) {
  if (id === "__restart") {
    toggleCatalog(false);
    state = initialState();
    render("incident");
    return;
  }

  const firstVisit = !state.visits[id];
  state.visits[id] = (state.visits[id] || 0) + 1;
  state.scene = id;
  applyTriggers(id, firstVisit);

  const current = sceneFor(id, firstVisit);
  $("sceneTitle").textContent = current.title;
  $("sceneLocation").textContent = current.location;
  $("sceneChapter").textContent = firstVisit ? current.chapter : `${current.chapter} · revisita`;
  $("sceneMarker").textContent = current.marker;
  $("sceneArt").dataset.tone = current.tone;
  $("artifactStatus").textContent = has("medalRecovered") ? "Objeto recuperado" : "Objeto ausente";
  $("sceneText").innerHTML = current.text;
  $("choices").innerHTML = "";

  current.choices.forEach(([label, destination], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<span class="choice-number">${String(index + 1).padStart(2, "0")}</span><span class="choice-label">${label}</span><span class="choice-arrow" aria-hidden="true">→</span>`;
    button.addEventListener("click", () => render(destination));
    $("choices").appendChild(button);
  });

  renderSidebar();

  const card = document.querySelector(".narrative-card");
  card.animate(
    [{ opacity: 0.76, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 300, easing: "ease-out" }
  );

  if (window.matchMedia("(max-width: 800px)").matches) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

$("restartButton").addEventListener("click", () => {
  if (window.confirm("Reiniciar a investigação e apagar as pistas coletadas?")) {
    toggleCatalog(false);
    state = initialState();
    render("incident");
  }
});

document.querySelectorAll("[data-open-catalog]").forEach((button) => {
  button.addEventListener("click", () => toggleCatalog(true));
});

document.querySelectorAll("[data-close-catalog]").forEach((button) => {
  button.addEventListener("click", () => toggleCatalog(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("catalog-open")) {
    toggleCatalog(false);
  }
});

render("incident");
