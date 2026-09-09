const pistasPrincipais = [
  "vitrine",
  "pegadas",
  "saida",
  "bilhete",
  "luva",
  "chaveSumida",
  "carrinho",
  "foto",
  "arthurInocentado",
  "chave",
  "registro",
  "origemBilhete",
  "alibis",
  "segredoThomas",
  "contradicao",
  "taca",
  "planoRetirada"
];

const nomesDasPistas = {
  vitrine: "Vitrine aberta com a chave correta; nenhum arrombamento",
  pegadas: "Botas foram usadas como carimbos para fabricar uma fuga",
  saida: "Poeira intacta: a porta lateral permaneceu fechada",
  bilhete: "Fragmento acidental: “B · 23h · caixa 17”",
  luva: "Luva limpa posicionada para apontar deliberadamente para Arthur",
  chaveSumida: "A única chave do Depósito B desapareceu às 20h52",
  carrinho: "Thomas retirou o carrinho de Arthur às 20h48",
  foto: "Negativo automático registrou o carrinho às 21h15",
  arthurInocentado: "Na mesma foto, Arthur trabalha longe do carrinho",
  chave: "Pickles recuperou a chave suja de óleo da roda",
  registro: "Relógio mecânico marcou o crachá de Thomas às 21h14",
  origemBilhete: "Fragmento pertence à folha 17 do bloco de Thomas",
  alibis: "Registros confirmam os álibis de Arthur, George, Eleanor e Henry",
  segredoThomas: "Thomas descreveu um detalhe da luva que não foi divulgado",
  contradicao: "Thomas negou o corredor e depois admitiu levar o carrinho",
  taca: "Taça recuperada dentro da caixa 17 no Depósito B",
  planoRetirada: "Coleta clandestina levaria a caixa pelo portão às 23h"
};

const pessoasInfo = {
  arthur: ["AL", "Arthur Lane", "Funcionário da manutenção"],
  george: ["GW", "George Webb", "Fotógrafo da exposição"],
  eleanor: ["EB", "Eleanor Beckett", "Curadora da exposição"],
  henry: ["HM", "Henry Moore", "Chefe da segurança"],
  thomas: ["TC", "Thomas Cole", "Assistente de transportes"]
};

const arteDasCenas = {
  prologo: ["0% 9%", "Salão da exposição com a vitrine vazia"],
  sala: ["0% 9%", "Salão da exposição com a vitrine vazia"],
  vitrine: ["0% 9%", "Vitrine central vazia no salão"],
  bilhete: ["0% 9%", "Salão onde um papel foi encontrado"],
  corredor: ["50% 9%", "Corredor de serviço com pegadas"],
  porta: ["50% 9%", "Porta lateral coberta por poeira"],
  funcionarios: ["100% 9%", "Sala dos funcionários com carrinho e botas"],
  luva: ["100% 9%", "Sala de funcionários com luvas e botas"],
  arthur: ["100% 9%", "Área de trabalho de Arthur"],
  camera: ["0% 50%", "Câmera e negativos no laboratório fotográfico"],
  george: ["0% 50%", "George examina filmes no laboratório"],
  eleanor: ["50% 50%", "Eleanor diante do quadro de chaves"],
  henry: ["100% 50%", "Henry no posto de segurança com Pickles"],
  registro: ["100% 50%", "Relógio mecânico e registros da segurança"],
  alibis: ["100% 50%", "Registros sendo comparados no posto de segurança"],
  cachorro: ["0% 91%", "Pickles encontra uma chave atrás da cortina"],
  deducao: ["0% 9%", "Cena do crime preparada para uma dedução"],
  hipoteseArthur: ["100% 9%", "Objetos de Arthur na sala dos funcionários"],
  hipotesePorta: ["50% 9%", "Porta lateral sem sinais de uso"],
  deducaoCorreta: ["0% 9%", "Vitrine e pistas da armação"],
  thomas: ["50% 91%", "Thomas diante do investigador"],
  confronto: ["50% 91%", "Thomas sendo confrontado com as provas"],
  deposito: ["100% 91%", "Taça encontrada dentro de uma caixa no depósito"],
  finalbom: ["100% 91%", "Taça recuperada no depósito"],
  finalperfeito: ["100% 91%", "Taça recuperada e caso solucionado"],
  finalruim: ["50% 91%", "Interrogatório após uma acusação errada"]
};

function estadoInicial() {
  return {
    pistas: [],
    visitas: {},
    pessoas: {},
    entrouNoSalao: false,
    examinouVitrine: false,
    examinouPegadas: false,
    examinouPorta: false,
    leuBilhete: false,
    examinouLuva: false,
    viuCamera: false,
    conheceDepositoB: false,
    sabeChaveSumiu: false,
    temChave: false,
    ouviuArthur: false,
    ouviuGeorge: false,
    ouviuEleanor: false,
    ouviuHenry: false,
    encontrouFoto: false,
    inocentouArthur: false,
    consultouRegistro: false,
    identificouPapel: false,
    verificouAlibis: false,
    ouviuThomas: false,
    thomasMencionouLuva: false,
    descobriuSegredoThomas: false,
    entendeuArmacao: false,
    descobriuContradicao: false,
    tacaRecuperada: false,
    descobriuPlano: false
  };
}

let estado = estadoInicial();

function adicionarPista(id) {
  if (!estado.pistas.includes(id)) estado.pistas.push(id);
}

function temPista(id) {
  return estado.pistas.includes(id);
}

function descobrirPessoa(id) {
  estado.pessoas[id] = true;
}

function todasAsPistasForamEncontradas() {
  return pistasPrincipais.every(temPista);
}

function podeDeduzir() {
  return ["vitrine", "pegadas", "luva", "carrinho", "foto"].every(temPista);
}

function podeVerificarAlibis() {
  return estado.ouviuArthur && estado.ouviuGeorge && estado.ouviuEleanor &&
    estado.ouviuHenry && estado.inocentouArthur;
}

function podeConfrontarThomas() {
  const provas = [
    estado.consultouRegistro,
    estado.identificouPapel,
    estado.descobriuSegredoThomas,
    estado.inocentouArthur
  ].filter(Boolean).length;
  return estado.entendeuArmacao && estado.ouviuThomas && provas >= 2;
}

function podeAcusarArthur() {
  return !estado.entendeuArmacao && !estado.inocentouArthur &&
    !estado.consultouRegistro && !estado.tacaRecuperada;
}

function aplicarGatilhos(id, primeiraVisita) {
  if (id === "sala") estado.entrouNoSalao = true;

  if (id === "vitrine") {
    estado.examinouVitrine = true;
    adicionarPista("vitrine");
  }

  if (id === "corredor") {
    estado.examinouPegadas = true;
    adicionarPista("pegadas");
  }

  if (id === "porta") {
    estado.examinouPorta = true;
    adicionarPista("saida");
    descobrirPessoa("henry");
  }

  if (id === "bilhete") {
    estado.leuBilhete = true;
    adicionarPista("bilhete");
  }

  if (id === "funcionarios") descobrirPessoa("arthur");

  if (id === "luva") {
    estado.examinouLuva = true;
    adicionarPista("luva");
    if (estado.thomasMencionouLuva) {
      estado.descobriuSegredoThomas = true;
      adicionarPista("segredoThomas");
    }
  }

  if (id === "arthur") {
    descobrirPessoa("arthur");
    estado.ouviuArthur = true;
    adicionarPista("carrinho");
    descobrirPessoa("thomas");
    if (estado.encontrouFoto) {
      estado.inocentouArthur = true;
      adicionarPista("arthurInocentado");
    }
  }

  if (id === "camera") {
    estado.viuCamera = true;
    descobrirPessoa("george");
  }

  if (id === "george") {
    descobrirPessoa("george");
    estado.ouviuGeorge = true;
    if (estado.ouviuArthur) {
      estado.encontrouFoto = true;
      adicionarPista("foto");
    }
  }

  if (id === "eleanor") {
    descobrirPessoa("eleanor");
    estado.ouviuEleanor = true;
    estado.conheceDepositoB = true;
    estado.sabeChaveSumiu = true;
    adicionarPista("chaveSumida");
    descobrirPessoa("thomas");
    if (estado.leuBilhete) {
      estado.identificouPapel = true;
      adicionarPista("origemBilhete");
    }
  }

  if (id === "henry") {
    descobrirPessoa("henry");
    estado.ouviuHenry = true;
  }

  if (id === "registro") {
    estado.consultouRegistro = true;
    adicionarPista("registro");
    descobrirPessoa("thomas");
  }

  if (id === "cachorro") {
    estado.temChave = true;
    adicionarPista("chave");
  }

  if (id === "deducaoCorreta") estado.entendeuArmacao = true;

  if (id === "alibis") {
    estado.verificouAlibis = true;
    adicionarPista("alibis");
  }

  if (id === "thomas" && primeiraVisita) {
    descobrirPessoa("thomas");
    estado.ouviuThomas = true;
    estado.thomasMencionouLuva = true;
    if (estado.examinouLuva) {
      estado.descobriuSegredoThomas = true;
      adicionarPista("segredoThomas");
    }
  }

  if (id === "confronto") {
    estado.descobriuContradicao = true;
    adicionarPista("contradicao");
  }

  if (id === "deposito") {
    estado.tacaRecuperada = true;
    estado.descobriuPlano = true;
    adicionarPista("taca");
    adicionarPista("planoRetirada");
  }
}

function opcoesDoSalao() {
  const op = [];

  if (!estado.examinouVitrine) op.push(["Examinar a fechadura antes que alguém toque nela", "vitrine"]);
  if (!estado.examinouPegadas) op.push(["Acompanhar as marcas que cortam o tapete", "corredor"]);
  if (!estado.leuBilhete) op.push(["Retirar o papel preso sob a cortina", "bilhete"]);
  if (!estado.viuCamera) op.push(["Verificar por que a câmera disparou às 21h15", "camera"]);

  if (estado.examinouPegadas) op.push(["Refazer o caminho pelo corredor de serviço", "corredor"]);
  if (estado.pessoas.arthur) op.push(["Comparar as provas na sala de manutenção", "funcionarios"]);
  if (estado.pessoas.george) op.push(["Levar uma pergunta precisa à sala escura", "george"]);
  if (estado.pessoas.eleanor) op.push(["Conferir chaves e formulários com Eleanor", "eleanor"]);
  if (estado.pessoas.henry) op.push(["Cruzar os horários no posto de Henry", "henry"]);

  if (podeDeduzir() && !estado.entendeuArmacao) {
    op.unshift(["Reconstruir o roubo no quadro de provas", "deducao"]);
  }

  if (estado.entendeuArmacao && estado.pessoas.thomas) {
    op.unshift(["Ouvir a versão de Thomas diante das provas", "thomas"]);
  }

  if (estado.temChave && estado.conheceDepositoB && !estado.tacaRecuperada) {
    op.unshift(["Abrir o Depósito B antes da coleta das 23h", "deposito"]);
  }

  return op;
}

function obterCena(id, primeiraVisita, antes) {
  const cenas = {
    prologo: () => ({
      titulo: "O alarme das nove e vinte",
      texto: "Westminster, 20 de março de 1966. Às 21h20, um sino elétrico atravessa o prédio quase vazio. Quando você chega ao salão, a curadora está diante de uma vitrine fechada e sem a Taça Jules Rimet. Atrás das paredes, funcionários preparam dezenas de caixas para a coleta das 23h. Se o troféu sair misturado à carga, Londres acordará sem sua taça.",
      op: [["Mandar fechar os portões e entrar no salão", "sala"]]
    }),

    sala: () => ({
      titulo: primeiraVisita ? "Vinte e quatro minutos depois" : "O salão sob outra luz",
      texto: primeiraVisita
        ? "Henry fecha as saídas. Eleanor afasta os curiosos. No centro do salão, o veludo vermelho conserva apenas o contorno da taça desaparecida. Pegadas seguem até um corredor; um papel aparece sob a cortina; no alto, a lâmpada da câmera automática ainda está quente. O relógio marca 21h24."
        : estado.entendeuArmacao
          ? "As pegadas não indicavam uma fuga; conduziam os olhos até Arthur. A luva não caiu; foi colocada. O ladrão construiu uma história falsa e contou com a pressa de quem a encontrasse. Agora falta provar quem teve acesso à chave, ao carrinho e às caixas das 23h."
          : estado.encontrouFoto
            ? "A fotografia muda a investigação: às 21h15, Arthur estava na escada enquanto seu carrinho cruzava o corredor. Os primeiros objetos agora contam uma história diferente."
            : "O relógio avança, mas a sala começa a revelar uma ordem. Cada marca pertence a um minuto, a um objeto e a alguém que esperava retirar uma caixa antes das 23h.",
      op: opcoesDoSalao()
    }),

    vitrine: () => ({
      titulo: antes.examinouVitrine ? "A fechadura e a chave perdida" : "O vidro não foi quebrado",
      texto: antes.examinouVitrine
        ? estado.temChave
          ? "A chave encontrada por Pickles desliza perfeitamente na fechadura. O pano que a envolvia tem o mesmo óleo vermelho da roda do carrinho. Quem abriu a vitrine pretendia recuperar a chave antes da coleta."
          : "A fechadura continua sem riscos. O ladrão não precisou de força nem de ferramentas; precisou entrar no quadro de chaves sem chamar atenção."
        : "O vidro está inteiro. Sob a lente, os pinos internos mostram o desgaste uniforme de uma chave verdadeira. Uma etiqueta de inventário identifica o mecanismo: a reserva fica no quadro da curadoria.",
      op: [
        ["Pedir a Eleanor que confira o quadro de chaves", "eleanor"],
        ["Observar as marcas ao redor do pedestal", "corredor"],
        ["Voltar ao centro do salão", "sala"]
      ]
    }),

    corredor: () => ({
      titulo: primeiraVisita ? "Passos que não caminharam" : "Duas trilhas, duas intenções",
      texto: primeiraVisita
        ? "As pegadas atravessam o tapete com a mesma profundidade do primeiro ao último passo — até nas curvas. Foram impressas com botas seguradas pelas mãos. Ao lado, um risco fino e vacilante segue em outra direção: a marca de uma roda desalinhada."
        : estado.encontrouFoto
          ? "O risco coincide com o carrinho fotografado às 21h15. As pegadas tentavam empurrar a investigação até a porta lateral; a roda defeituosa, que o ladrão não conseguiu esconder, conta o caminho verdadeiro."
          : "As botas produziram uma trilha teatral até a porta. A roda defeituosa deixou uma trilha involuntária até a sala de manutenção.",
      op: [
        ...(!estado.examinouPorta ? [["Ver se alguém realmente usou a porta lateral", "porta"]] : []),
        ["Seguir o risco deixado pela roda", "funcionarios"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    porta: () => ({
      titulo: antes.examinouPorta ? "A saída que permaneceu fechada" : "Poeira sem interrupção",
      texto: antes.examinouPorta
        ? "A faixa de poeira continua inteira sob a porta. Qualquer fuga por aqui é impossível. As pegadas terminavam neste ponto apenas para sustentar uma mentira."
        : "A maçaneta, a soleira e o ferrolho estão cobertos por uma camada contínua de poeira. A porta não foi aberta. Ao ouvir seu chamado pelo interfone, Henry Moore, chefe da segurança, desce ao corredor com um pequeno cão branco nos braços.",
      op: [
        ["Perguntar a Henry o que o prédio registra sozinho", "henry"],
        ["Seguir a trilha verdadeira da roda", "funcionarios"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    funcionarios: () => ({
      titulo: primeiraVisita ? "A roda recém-soldada" : "O armário de Arthur",
      texto: primeiraVisita
        ? "O risco termina sob um carrinho de carga. A roda esquerda recebeu uma solda torta naquela manhã; no eixo, o óleo é vermelho. O armário ao lado está aberto: falta uma luva e as botas reserva estão úmidas. Arthur Lane surge da oficina, assustado ao ver seus objetos reunidos."
        : estado.encontrouFoto
          ? "O carrinho da fotografia está aqui. A solda da roda funciona como uma impressão digital. As botas e a luva apontavam para Arthur, mas a câmera o colocou longe dos próprios objetos."
          : estado.leuBilhete
            ? "A graxa na borda do fragmento tem a mesma cor do óleo do eixo. O papel viajou preso ao carrinho e caiu sob a cortina; não foi deixado como convite para a investigação."
            : "Carrinho, botas e armário pertencem ao mesmo cenário. Arthur pode explicar quem teve acesso a eles antes do alarme.",
      op: [
        ["Pedir a Arthur a sequência exata daquela noite", "arthur"],
        ["Comparar a luva do salão com o armário", "luva"],
        ["Voltar ao corredor", "corredor"]
      ]
    }),

    luva: () => ({
      titulo: antes.examinouLuva ? "Uma lembrança precisa demais" : "A luva que não caiu",
      texto: antes.examinouLuva
        ? estado.thomasMencionouLuva
          ? "Você repete as palavras de Thomas: “punho voltado para a vitrine, junto ao poste esquerdo”. A posição não aparece em fotografia alguma e não foi contada fora do salão. Ele viu a luva aqui — ou foi quem a colocou."
          : "As iniciais A.L. ainda apontam para Arthur, mas a peça está limpa, aberta e alinhada com o pedestal. Parece uma seta cuidadosamente montada, não algo perdido durante uma fuga."
        : estado.thomasMencionouLuva
          ? "A luva está esticada junto ao poste esquerdo, punho voltado para a vitrine — exatamente como Thomas descreveu sem ter entrado na sala. Ele sabia mais do que deveria."
          : "As iniciais A.L. pertencem a Arthur Lane. Mesmo assim, a luva está limpa demais para ter sido usada: dedos esticados, punho voltado para a vitrine, junto ao poste esquerdo. Alguém queria que fosse encontrada.",
      op: [
        ["Descobrir de onde a luva foi retirada", "arthur"],
        ...(estado.sabeChaveSumiu && estado.pessoas.henry && !estado.temChave
          ? [["Pedir que Pickles siga o óleo", "cachorro"]]
          : []),
        ["Voltar ao salão", "sala"]
      ]
    }),

    arthur: () => {
      if (estado.encontrouFoto) {
        return {
          titulo: antes.inocentouArthur ? "Arthur estava na escada" : "Duas coisas na mesma foto",
          texto: antes.inocentouArthur
            ? "A ampliação continua sobre a bancada. Arthur aparece no alto de uma escada enquanto o carrinho atravessa o fundo da imagem. A ordem de manutenção confirma o serviço."
            : "Arthur reconhece a solda da roda. Na mesma fotografia, ele aparece do outro lado do salão, sobre uma escada, com as mãos na luminária. Às 21h15, Arthur e o carrinho estavam em lugares diferentes.",
          op: [
            ["Cruzar os demais álibis com Henry", "henry"],
            ["Voltar ao salão", "sala"]
          ]
        };
      }

      return {
        titulo: primeiraVisita ? "O empréstimo das 20h48" : "Uma palavra ainda não é um álibi",
        texto: primeiraVisita
          ? "Arthur não começa pela luva. Aponta para o espaço vazio do carrinho: “Thomas Cole o retirou às 20h48 para levar formulários ao depósito. Eu subi para consertar uma luminária. Quando voltei, o carrinho estava aqui, as botas molhadas e o armário aberto.”"
          : "Arthur mantém a mesma versão e mostra a ordem de reparo da luminária. O documento prova onde deveria estar, mas somente a câmera pode mostrar onde realmente estava às 21h15.",
        op: [
          ["Procurar a câmera automática", "camera"],
          ["Examinar a luva", "luva"],
          ...(estado.examinouLuva && podeAcusarArthur()
            ? [["Mandar deter Arthur apenas com a luva e as botas", "finalruim"]]
            : []),
          ["Voltar ao salão", "sala"]
        ]
      };
    },

    camera: () => ({
      titulo: primeiraVisita ? "Um clarão a cada quinze minutos" : "O minuto guardado no filme",
      texto: primeiraVisita
        ? "A câmera dispara sozinha a cada quinze minutos para documentar a exposição. O último fotograma foi feito às 21h15, cinco minutos antes do alarme. George Webb levou o filme ainda fechado para a sala escura."
        : estado.ouviuArthur
          ? "Agora há uma pergunta concreta para o negativo das 21h15: onde estavam Arthur e o carrinho de roda soldada? George pode ampliar os dois lados da imagem."
          : "O negativo cobre dezenas de pessoas e objetos. George precisa de um detalhe concreto; procurar ao acaso gastaria o último papel fotográfico antes das 23h.",
      op: [
        ["Encontrar George na sala escura", "george"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    george: () => {
      if (estado.ouviuArthur) {
        return {
          titulo: antes.encontrouFoto ? "A fotografia que separou homem e carrinho" : "21h15: dois lugares ao mesmo tempo",
          texto: antes.encontrouFoto
            ? "Na ampliação, o relógio marca 21h15. Arthur está na escada à esquerda. À direita, seu carrinho desaparece pelo corredor. A fotografia não mostra o rosto de quem o conduz, mas oferece um minuto exato."
            : "Você descreve a solda da roda e a escada de Arthur. A imagem surge lentamente no papel: à esquerda, Arthur trabalha na luminária; à direita, o carrinho atravessa a porta do corredor. Os objetos de Arthur viajaram sem Arthur.",
          op: [
            ["Mostrar a foto a Arthur", "arthur"],
            ["Usar o horário com Henry", "henry"],
            ["Voltar ao salão", "sala"]
          ]
        };
      }

      return {
        titulo: primeiraVisita ? "Trinta e seis negativos" : "Uma pergunta para a imagem",
        texto: "George ergue uma tira de quadros minúsculos. “Posso ampliar um detalhe, não adivinhar qual deles importa.” Antes de gastar o último papel fotográfico, você precisa trazer um objeto ou uma pessoa para procurar.",
        op: [
          ["Seguir as marcas no corredor", "corredor"],
          ["Voltar ao salão", "sala"]
        ]
      };
    },

    bilhete: () => ({
      titulo: antes.leuBilhete ? "Três dados sem assinatura" : "O fragmento preso na cortina",
      texto: antes.leuBilhete
        ? estado.identificouPapel
          ? "O fragmento agora tem origem: folha 17 do bloco pessoal de Thomas. “B” é o depósito; “23h”, o horário da coleta; “caixa 17”, o volume que sairia pelo portão."
          : estado.conheceDepositoB
            ? "Agora “B” tem endereço: Depósito B. Ainda falta descobrir quem recebeu o bloco numerado de onde esta folha foi arrancada."
            : "Uma borda está suja de graxa e rasgada como se tivesse ficado presa sob uma roda antes de cair. O papel não foi deixado para ser encontrado."
        : "Você usa uma pinça. No fragmento amassado, três anotações resistiram ao rasgo: “B · 23h · caixa 17”. Uma mancha de óleo vermelho percorre a borda inferior. O papel provavelmente caiu de algo em movimento.",
      op: [
        ["Levar o código e o papel à curadoria", "eleanor"],
        ["Comparar a graxa com a roda do carrinho", "funcionarios"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    eleanor: () => {
      let texto;
      if (estado.temChave && estado.leuBilhete) {
        texto = antes.temChave && antes.identificouPapel
          ? "A chave abre o Depósito B. O fragmento pertence ao bloco exclusivo de Thomas. Ambos se ligam ao carrinho pela mesma mancha de óleo vermelho."
          : "A chave encontrada abre o Depósito B. O dente rasgado da folha 17 encaixa no canhoto do bloco entregue exclusivamente a Thomas.";
      } else if (estado.leuBilhete) {
        texto = "“B” significa Depósito B. Sua única chave sumiu às 20h52, quando Eleanor atendeu ao telefone e Thomas ficou sozinho diante do quadro. O dente do fragmento encaixa no bloco T.C., usado por ele para organizar a coleta das 23h.";
      } else {
        texto = primeiraVisita
          ? "Eleanor viu a taça às 20h45. Sete minutos depois, precisou atender ao telefone. Thomas ficou sozinho junto ao quadro, separando etiquetas para as caixas das 23h. Quando ela voltou, o gancho do Depósito B estava vazio. Isso demonstra oportunidade, ainda não culpa."
          : "A chave continua desaparecida. No gancho vazio há uma marca de óleo vermelho que pode ser comparada aos objetos do salão.";
      }

      return {
        titulo: primeiraVisita ? "Uma chave fora do quadro" : "O quadro das chaves e a folha 17",
        texto,
        op: [
          ...(estado.temChave ? [["Abrir o Depósito B", "deposito"]] : [["Procurar a chave no salão", "sala"]]),
          ...(estado.leuBilhete && !estado.identificouPapel ? [["Comparar a folha com os blocos", "eleanor"]] : []),
          ["Voltar ao salão", "sala"]
        ]
      };
    },

    henry: () => {
      const temHorario = estado.encontrouFoto;
      const op = [];
      if (temHorario && !estado.consultouRegistro) op.push(["Examinar a marca das 21h15", "registro"]);
      if (estado.examinouLuva && estado.sabeChaveSumiu && !estado.temChave) {
        op.push(["Pedir que Pickles siga o óleo", "cachorro"]);
      }
      if (podeVerificarAlibis() && !estado.verificouAlibis) op.push(["Cruzar os quatro álibis", "alibis"]);
      if (!estado.encontrouFoto) op.push(["Procurar uma fotografia com horário", "camera"]);
      op.push(["Voltar ao salão", "sala"]);

      return {
        titulo: estado.consultouRegistro ? "O código 17 às 21h14" : primeiraVisita ? "Máquinas que não esquecem" : "Falta escolher um minuto",
        texto: temHorario
          ? "Com 21h15 como referência, Henry separa o cartão do minuto anterior. A porta interna aciona um relógio mecânico que perfura automaticamente a hora e o código do crachá usado."
          : "Henry abre uma caixa com centenas de cartões. O relógio mecânico registra cada crachá usado no corredor, mas sem um horário aproximado a busca avançaria além da coleta das 23h. Pickles, seu cão, pode seguir um odor específico se você encontrar um rastro.",
        op
      };
    },

    registro: () => ({
      titulo: antes.consultouRegistro ? "O cartão que não muda de versão" : "Um minuto antes da fotografia",
      texto: antes.consultouRegistro
        ? "A perfuração continua nítida: porta interna, 21h14, crachá 17 — Thomas Cole. O registro não depende da lembrança de nenhuma testemunha."
        : "Às 21h14, a máquina perfurou o código 17. Henry consulta a lista: Thomas Cole. Um minuto depois, a câmera registrou o carrinho no mesmo corredor. Dois mecanismos independentes guardaram uma passagem que Thomas não pretendia revelar.",
      op: [
        ["Voltar ao salão e organizar as pistas", "sala"],
        ["Levar o registro a Thomas", "thomas"]
      ]
    }),

    cachorro: () => ({
      titulo: antes.temChave ? "O esconderijo atrás da cortina" : "Pickles escolhe o rastro verdadeiro",
      texto: antes.temChave
        ? "A chave permanece lacrada como prova. O óleo no pano corresponde ao eixo do carrinho, ligando o esconderijo à rota usada durante o roubo."
        : "Pickles ignora a luva de Arthur. Fareja o eixo do carrinho, atravessa o salão e enfia o focinho atrás de uma cortina. Ali está a chave, embrulhada num pano manchado de óleo vermelho. Foi escondida para que o ladrão pudesse voltar e retirar a caixa às 23h.",
      op: [
        ["Levar a chave à curadoria", "eleanor"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    deducao: () => ({
      titulo: "Reconstrução das 21h15",
      texto: "Você prende cinco imagens no quadro: a vitrine aberta com chave, as pegadas carimbadas, a luva limpa, a roda torta e a fotografia que separa Arthur do carrinho. Os objetos parecem acusar uma pessoa; o tempo conta outra história.",
      op: [
        ["Arthur roubou a taça e depois voltou ao salão", "hipoteseArthur"],
        ["O ladrão fugiu pela porta lateral e perdeu a luva", "hipotesePorta"],
        ["Alguém usou os objetos de Arthur para fabricar um culpado", "deducaoCorreta"]
      ]
    }),

    hipoteseArthur: () => ({
      titulo: "Uma pessoa em dois lugares",
      texto: "A hipótese não sobrevive à fotografia. Às 21h15, Arthur aparece na escada enquanto o carrinho cruza o corredor. Para acusá-lo, seria preciso ignorar a única imagem que mostra os dois ao mesmo tempo.",
      op: [
        ["Rever as pistas e tentar outra hipótese", "deducao"],
        ...(podeAcusarArthur() ? [["Ignorar a dúvida e acusar Arthur", "finalruim"]] : [])
      ]
    }),

    hipotesePorta: () => ({
      titulo: "Pegadas que terminam numa porta fechada",
      texto: "A poeira permanece contínua na maçaneta, no ferrolho e na soleira. As pegadas não registram uma fuga; foram feitas para que a investigação perdesse tempo diante de uma saída impossível.",
      op: [["Rever as pistas e tentar outra hipótese", "deducao"]]
    }),

    deducaoCorreta: () => ({
      titulo: "O crime dentro do crime",
      texto: "A luva, as botas e as pegadas não são restos do roubo; são uma segunda ação: a montagem de um culpado. O verdadeiro percurso é o da roda. Quem levou o carrinho conhecia o quadro de chaves, tinha acesso às caixas das 23h e precisava que todos corressem atrás de Arthur.",
      op: [
        ["Ouvir Thomas sem revelar todas as provas", "thomas"],
        ["Buscar a chave seguindo o óleo do carrinho", "henry"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    alibis: () => ({
      titulo: antes.verificouAlibis ? "Quatro confirmações e uma ausência" : "Quatro horários e um vazio",
      texto: antes.verificouAlibis
        ? "Os registros permanecem na pasta: Arthur, George, Eleanor e Henry têm confirmações que não dependem da própria palavra. Thomas continua sendo a única ausência entre 21h14 e 21h20."
        : "A fotografia e a ordem de reparo confirmam Arthur; o livro da sala escura confirma George; a telefonista confirma Eleanor; outro guarda confirma Henry. Thomas é o único cuja versão não encontra uma segunda testemunha.",
      op: [
        ["Confrontar Thomas", "thomas"],
        ["Voltar ao salão", "sala"]
      ]
    }),

    thomas: () => {
      const op = [];
      if (podeConfrontarThomas() && !estado.descobriuContradicao) op.push(["Pressionar Thomas com duas provas independentes", "confronto"]);
      if (estado.temChave && estado.conheceDepositoB && !estado.tacaRecuperada) op.push(["Não acusar ainda: abrir o Depósito B", "deposito"]);
      if (todasAsPistasForamEncontradas()) op.push(["Apresentar a solução completa", "finalperfeito"]);
      else if (estado.tacaRecuperada) op.push(["Encerrar com a taça, mas sem explicar tudo", "finalbom"]);
      op.push(["Interromper o interrogatório e investigar", "sala"]);

      let texto;
      if (primeiraVisita) {
        texto = "Thomas organiza formulários com rapidez exagerada. “Passei a noite aqui. Não entrei no corredor, não toquei no carrinho e nem vi aquela luva de Arthur esticada junto ao poste esquerdo, com o punho para a vitrine.” Você não havia descrito a posição da luva.";
      } else if (estado.descobriuContradicao) {
        texto = estado.tacaRecuperada
          ? "Você coloca diante de Thomas a folha 17, o registro mecânico e a ordem de coleta encontrada com a taça. Ele procura uma nova versão, mas cada saída já foi fechada por uma prova independente."
          : "Thomas já abandonou a primeira versão. Agora admite o carrinho, mas diz ter levado somente formulários. A caixa 17 precisa ser aberta antes das 23h.";
      } else if (estado.descobriuSegredoThomas) {
        texto = "Ao perceber que revelou a posição secreta da luva, Thomas troca de assunto e culpa Arthur pelas botas molhadas. O deslize é forte, mas ainda precisa ser unido a uma prova mecânica ou documental.";
      } else {
        texto = "Thomas repete que não entrou no corredor e não tocou no carrinho. O registro, a folha 17 e a fotografia podem obrigá-lo a abandonar essa versão.";
      }

      return { titulo: primeiraVisita ? "Uma frase longa demais" : estado.descobriuContradicao ? "A versão que mudou" : "Thomas sob pressão", texto, op };
    },

    confronto: () => ({
      titulo: "A primeira mentira se rompe",
      texto: antes.descobriuContradicao
        ? "Thomas não consegue restaurar sua primeira versão. O depoimento registrado mostra que ele negou o corredor antes de admitir o carrinho."
        : "Você não pergunta se Thomas entrou no corredor. Coloca diante dele provas que nasceram separadas: o relógio mecânico, a folha numerada e o detalhe secreto da luva. Thomas abandona a negação. Admite que conduziu o carrinho, mas diz ter levado apenas papéis ao Depósito B.",
      op: [
        ...(estado.temChave && !estado.tacaRecuperada ? [["Testar a nova história no Depósito B", "deposito"]] : []),
        ["Voltar ao salão e completar o caso", "sala"]
      ]
    }),

    deposito: () => ({
      titulo: primeiraVisita ? "Caixa 17" : "A caixa que não saiu pelo portão",
      texto: primeiraVisita
        ? "A chave gira. Dentro da caixa 17, sob uma camada de catálogos, o ouro da Taça Jules Rimet devolve a luz da lanterna. Ao lado há uma ordem clandestina: “Coleta às 23h. Pagamento após a entrega”. A letra E falha exatamente como na máquina de Thomas. Ele esconderia a taça entre a carga, voltaria com a chave e culparia Arthur até o caminhão partir."
        : "A caixa 17 permanece sob guarda. A taça, a ordem de coleta e a máquina de escrever de Thomas formam o último elo da investigação.",
      op: [
        ["Levar a descoberta a Thomas", "thomas"],
        ...(todasAsPistasForamEncontradas()
          ? [["Apresentar a solução completa", "finalperfeito"]]
          : [["Encerrar apenas com a taça recuperada", "finalbom"]]),
        ["Voltar e completar a investigação", "sala"]
      ]
    }),

    finalbom: () => ({
      titulo: "A taça voltou; a verdade, não",
      texto: "A caixa 17 é retirada da fila e a taça volta à segurança. Thomas afirma que qualquer funcionário poderia ter usado o depósito. Sem confrontar sua primeira mentira e confirmar os demais horários, a polícia não consegue demonstrar quem preparou a coleta. Você salvou o troféu, mas deixou o responsável protegido por uma dúvida que ainda poderia ser resolvida.",
      op: [
        ["Retomar o caso antes de encerrá-lo", "sala"],
        ["Começar uma nova investigação", "__reiniciar__"]
      ]
    }),

    finalperfeito: () => ({
      titulo: "A taça não cruzou o portão",
      texto: "Às 22h43, Thomas confessa. Retirou o carrinho às 20h48, pegou a chave às 20h52 e passou pelo corredor às 21h14. Escondeu a taça na caixa 17 para vendê-la na coleta das 23h. Depois plantou a luva, molhou as botas e carimbou pegadas para incriminar Arthur. O plano falhou porque a roda torta, a câmera, o relógio e o papel rasgado registraram aquilo que ele não conseguiu controlar. Pickles recebe um pedaço de carne. A taça volta à vitrine antes da meia-noite.",
      op: [["Jogar uma nova investigação", "__reiniciar__"]]
    }),

    finalruim: () => ({
      titulo: "O culpado que a cena pediu",
      texto: "Arthur é levado por causa da luva e das botas. Enquanto todos preenchem o relatório, a caixa 17 atravessa o portão às 23h. Na manhã seguinte, George revela o negativo: Arthur estava na escada quando o carrinho entrou no corredor. O ladrão venceu porque sua encenação foi aceita antes que o tempo e as máquinas fossem consultados.",
      op: [
        ["Voltar e investigar antes de acusar", "sala"],
        ["Recomeçar o caso", "__reiniciar__"]
      ]
    })
  };

  return cenas[id]();
}

function objetivoAtual() {
  if (!estado.entrouNoSalao) return "Feche os portões antes da coleta das 23h.";
  if ([estado.examinouVitrine, estado.examinouPegadas, estado.leuBilhete, estado.viuCamera].filter(Boolean).length < 2) {
    return "Preserve dois vestígios antes que o salão seja desmontado.";
  }
  if (!estado.ouviuArthur || !estado.encontrouFoto) return "Encontre Arthur e o carrinho no negativo das 21h15.";
  if (!estado.entendeuArmacao) return "Reconstrua o caminho verdadeiro da roda e o falso caminho das botas.";
  if (!estado.temChave) return "Dê a Pickles o cheiro do óleo vermelho e recupere a chave.";
  if (!estado.descobriuContradicao) return "Una duas provas independentes e rompa a versão de Thomas.";
  if (!estado.tacaRecuperada) return "Abra a caixa 17 antes que o caminhão chegue.";
  if (!estado.verificouAlibis) return "Confirme os quatro horários que eliminam explicações alternativas.";
  if (!todasAsPistasForamEncontradas()) return "Uma ligação ainda falta. Releia a pasta e volte ao local correspondente.";
  return "A sequência está completa. Apresente a verdade a Thomas.";
}

function statusDaPessoa(id) {
  if (id === "thomas") {
    if (estado.descobriuContradicao) return ["Principal suspeito", "is-suspect"];
    return ["Nome ligado às pistas", ""];
  }
  if (id === "arthur" && estado.inocentouArthur) return ["Álibi confirmado", "is-cleared"];
  if (["george", "eleanor", "henry"].includes(id) && estado.verificouAlibis) return ["Álibi confirmado", "is-cleared"];
  return ["Ainda não verificado", ""];
}

function atualizarPessoas() {
  const lista = document.getElementById("pessoas");
  lista.innerHTML = "";

  Object.keys(pessoasInfo).forEach((id) => {
    if (!estado.pessoas[id]) return;
    const [iniciais, nome, funcao] = pessoasInfo[id];
    const [status, classe] = statusDaPessoa(id);
    const item = document.createElement("li");
    item.innerHTML = `
      <span class="initials">${iniciais}</span>
      <p>
        <strong>${nome}</strong>
        <small>${funcao}</small>
        <small class="person-status ${classe}">${status}</small>
      </p>
    `;
    lista.appendChild(item);
  });
}

function atualizarInterface() {
  const progresso = Math.round((estado.pistas.length / pistasPrincipais.length) * 100);
  document.getElementById("barra").style.width = `${progresso}%`;
  document.querySelector(".progress-track").setAttribute("aria-valuenow", progresso);
  document.getElementById("progresso-texto").textContent = `${progresso}% concluído`;
  document.getElementById("contador-pistas").textContent = `${estado.pistas.length}/${pistasPrincipais.length}`;
  document.getElementById("floating-count").textContent = String(estado.pistas.length).padStart(2, "0");
  document.getElementById("objetivo-atual").textContent = objetivoAtual();
  document.getElementById("status-caso").textContent = estado.tacaRecuperada
    ? "Taça recuperada"
    : estado.entendeuArmacao
      ? "Armação descoberta"
      : "Caso em aberto";

  document.getElementById("pistas").innerHTML = estado.pistas
    .map((id, indice) => `<li class="pista" style="animation-delay:${indice * 20}ms">${nomesDasPistas[id]}</li>`)
    .join("");

  atualizarPessoas();
}

function atualizarArte(id) {
  const [posicao, descricao] = arteDasCenas[id] || arteDasCenas.sala;
  const imagem = document.getElementById("imagem");
  const usaSalaoAmplo = ["prologo", "sala", "vitrine", "bilhete", "deducao", "deducaoCorreta"].includes(id);
  imagem.classList.toggle("scene-image--hero", usaSalaoAmplo);
  imagem.style.backgroundPosition = usaSalaoAmplo ? "center 54%" : posicao;
  imagem.dataset.scene = id;
  imagem.setAttribute("aria-label", descricao);
}

function alternarArquivo(aberto) {
  document.body.classList.toggle("drawer-open", aberto);
  document.getElementById("caseFile").setAttribute("aria-hidden", String(!aberto));
  document.querySelectorAll("[data-open-evidence]").forEach((botao) => {
    botao.setAttribute("aria-expanded", String(aberto));
  });
  if (aberto) document.querySelector(".drawer-close").focus();
}

function mostrar(id) {
  if (id === "__reiniciar__") {
    reiniciar();
    return;
  }

  const entradaBloqueada =
    (id === "cachorro" && !(estado.examinouLuva && estado.sabeChaveSumiu && estado.pessoas.henry)) ||
    (id === "registro" && !estado.encontrouFoto) ||
    (id === "deducao" && !podeDeduzir()) ||
    (id === "deducaoCorreta" && !podeDeduzir()) ||
    (id === "alibis" && !podeVerificarAlibis()) ||
    (id === "confronto" && !podeConfrontarThomas()) ||
    (id === "deposito" && !(estado.temChave && estado.conheceDepositoB)) ||
    (id === "finalruim" && !podeAcusarArthur()) ||
    (id === "finalbom" && !estado.tacaRecuperada) ||
    (id === "finalperfeito" && !todasAsPistasForamEncontradas());

  if (entradaBloqueada) {
    mostrar(estado.entrouNoSalao ? "sala" : "prologo");
    return;
  }

  const primeiraVisita = !estado.visitas[id];
  const antes = { ...estado, pistas: [...estado.pistas], pessoas: { ...estado.pessoas } };
  estado.visitas[id] = (estado.visitas[id] || 0) + 1;
  aplicarGatilhos(id, primeiraVisita);

  const cena = obterCena(id, primeiraVisita, antes);
  document.getElementById("titulo").textContent = cena.titulo;
  document.getElementById("indice-cena").textContent = id === "prologo"
    ? "Prólogo"
    : primeiraVisita
      ? "Nova descoberta"
      : "Local revisitado";
  document.getElementById("texto").innerHTML = `<p>${cena.texto}</p>`;

  const div = document.getElementById("opcoes");
  div.innerHTML = "";

  cena.op.forEach(([rotulo, destino], indice) => {
    const botao = document.createElement("button");
    botao.className = "botao";
    botao.type = "button";
    botao.innerHTML = `
      <span class="choice-index">${String(indice + 1).padStart(2, "0")}</span>
      <span class="choice-label">${rotulo}</span>
      <span class="choice-arrow" aria-hidden="true">→</span>
    `;
    botao.addEventListener("click", () => mostrar(destino));
    div.appendChild(botao);
  });

  atualizarArte(id);
  atualizarInterface();

  const painel = document.querySelector(".story-panel");
  painel.classList.remove("scene-enter");
  void painel.offsetWidth;
  painel.classList.add("scene-enter");
}

function reiniciar() {
  alternarArquivo(false);
  estado = estadoInicial();
  mostrar("prologo");
}

document.querySelectorAll("[data-open-evidence]").forEach((botao) => {
  botao.addEventListener("click", () => alternarArquivo(true));
});

document.querySelectorAll("[data-close-evidence]").forEach((botao) => {
  botao.addEventListener("click", () => alternarArquivo(false));
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && document.body.classList.contains("drawer-open")) {
    alternarArquivo(false);
  }
});

mostrar("prologo");
