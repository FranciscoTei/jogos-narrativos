window.STORY = {
  start: {
    title: "O BAIRRO ABANDONADO", type: "inicio", image: "opening.svg",
    text: "Há muitos anos, o bairro era um dos lugares mais movimentados da cidade. Com o passar dos anos, as casas, comércios e prédios públicos foram abandonados e o silêncio tomou conta das ruas. Apenas Rosivalda permaneceu. Em certa noite, um estrondo muito forte fez as paredes de sua casa tremerem. Ela decidiu procurar os detetives.",
    choices: [{label:"Conhecer mais sobre Rosivalda",to:"rosivalda"}]
  },
  rosivalda: {
    title:"ROSIVALDA", type:"personagem", image:"rosivalda.svg",
    text:"Rosivalda conta aos detetives que os barulhos acontecem há muitos anos e que parecem ser mais fortes perto de algumas casas. Ela menciona a Casa 80 como um dos locais onde os sons são mais intensos.",
    choices:[{label:"Acionar os detetives",to:"acao"}]
  },
  acao: {
    title:"ACIONAR OS DETETIVES", type:"acao", image:"opening.svg",
    text:"Após serem chamados por Rosivalda, os detetives chegam ao bairro e iniciam a investigação. Quatro caminhos podem ser escolhidos.",
    choices:[
      {label:"Investigar a Casa 80",to:"casa80"},
      {label:"Investigar a Casa 50",to:"casa50"},
      {label:"Investigar a Casa 54",to:"casa54"},
      {label:"Investigar a Casa 48",to:"casa48"}
    ]
  },

  /* CAMINHO 1 — CASA 80 — FINAL 1 */
  casa80:{title:"CASA 80",type:"local",image:"house80.svg",text:"A Casa 80 está abandonada, com móveis velhos e teias de aranhas por toda parte. Entretanto, marcas recentes no chão indicam que algo pesado foi arrastado pelos cômodos.",choices:[
    {label:"Examinar as marcas",to:"c80_marcas"},
    {label:"Procurar objetos",to:"c80_objetos"}
  ]},
  c80_marcas:{title:"MARCAS NO CHÃO",type:"pista",image:"house80.svg",text:"As marcas seguem até uma parte da casa que parece ter sido usada recentemente.",choices:[
    {label:"Seguir as marcas",to:"c80_marcas_seguir"},
    {label:"Examinar paredes",to:"c80_marcas_paredes"}
  ]},
  c80_marcas_seguir:{title:"MARCAS NO CHÃO",speaker:"detetives",type:"pista",image:"house80.svg",text:"Os detetives seguem as marcas pelo exterior da casa. Elas terminam próximas a uma passagem que leva até outra parte do bairro. Como não encontram mais nada naquele local, decidem continuar a investigação na Casa 20.",choices:[{label:"Continuar para a Casa 20",to:"casa20"}]},
  c80_marcas_paredes:{title:"PAREDE MARCADA",speaker:"detetives",type:"pista",image:"clue.svg",text:"Os detetives examinam cuidadosamente as paredes da casa. Uma delas apresenta uma marca que parece esconder alguma coisa.",choices:[{label:"Examinar a marca",to:"c80_parede"}]},
  c80_parede:{title:"PAREDE MARCADA",type:"pista",image:"clue.svg",text:"Uma marca em uma parede parece indicar que algo foi escondido ali. Quando um dos detetives puxa uma parte da parede, um buraco se abre. Mas não há nada dentro. Eles decidem continuar investigando.",clue:"Marca na parede da Casa 80",choices:[
    {label:"Investigar o buraco na parede",to:"c80_buraco"},
    {label:"Ir para casa 20",to:"c80_ir20"}
  ]},
  c80_buraco:{title:"PAREDE MARCADA",speaker:"detetives",type:"pista",image:"clue.svg",text:"Os detetives procuram cuidadosamente por algum compartimento escondido no buraco da parede. Apesar de encontrarem apenas o espaço vazio, percebem que alguém poderia esconder alguma coisa naquele local. Sem encontrar novas pistas, decidem continuar a investigação na Casa 20.",choices:[{label:"Continuar para a Casa 20",to:"casa20"}]},
  c80_ir20:{title:"PAREDE MARCADA",speaker:"detetives",type:"pista",image:"clue.svg",text:"Depois de registrar a descoberta da parede, os detetives decidem seguir para a Casa 20, onde poderão continuar procurando informações.",choices:[{label:"Ir para casa 20",to:"casa20"}]},
  c80_objetos:{title:"OBJETOS ABANDONADOS",speaker:"detetives",type:"pista",image:"clue.svg",text:"Entre ferramentas antigas, os detetives encontram uma pequena caixa e uma peça metálica.",choices:[
    {label:"Examinar a caixa",to:"c80_caixa"},
    {label:"Examinar a peça metálica",to:"c80_peca"}
  ]},
  c80_caixa:{title:"CAIXA DE MADEIRA",speaker:"detetives",type:"pista",image:"document.svg",text:"A caixa contém uma chave enferrujada e um papel sem identificação.",clue:"Chave enferrujada encontrada na Casa 80",choices:[
    {label:"Examinar a chave",to:"casa20"},
    {label:"Guardar o papel",to:"casa20"}
  ]},
  c80_peca:{title:"PEÇA METÁLICA",speaker:"detetives",type:"pista",image:"clue.svg",text:"A peça possui um símbolo gravado e parece fazer parte de um mecanismo maior.",clue:"Peça metálica com símbolo gravado",choices:[
    {label:"Examinar o símbolo",to:"intersecao12"},
    {label:"Guardar a peça",to:"casa20"}
  ]},
  intersecao12:{title:"PISTAS CONVERGENTES",speaker:"detetives",type:"climax",image:"opening.svg",text:"As pistas encontradas na Casa 80 e na Casa 50 apontam para o mesmo mistério: um equipamento antigo escondido no bairro. A investigação agora pode seguir por diferentes caminhos.",clue:"A Casa 80 e a Casa 50 apontam para o mesmo equipamento",choices:[{label:"Seguir a pista da Casa 20",to:"casa20"},{label:"Seguir a pista do Museu",to:"museu50"},{label:"Investigar o Centro do Bairro",to:"centro80"}]},
  casa20:{title:"CASA 20",speaker:"detetives",type:"local",image:"house80.svg",text:"Na Casa 20, os detetives percebem que um móvel antigo, localizado em um dos quartos, esconde uma pequena gaveta. ",choices:[
    {label:"Investigar a gaveta",to:"c20_gaveta"}
  ]},
  c20_gaveta:{title:"GAVETA ESCONDIDA",type:"pista",image:"document.svg",text:"Dentro dela há um documento relacionado a um antigo prefeito da cidade e a um equipamento que sumiu décadas atrás, após acontecimentos estranhos no bairro. Eles observam um símbolo estranho desenhado no papel.",clue:"Documento cita equipamento que sumiu após eventos estranhos.",choices:[
    {label:"Ver o nome do antigo prefeito",to:"c20_nome"},
    {label:"Investigar o símbolo estranho",to:"c20_simbolo"}
  ]},
  c20_nome:{title:"GAVETA ESCONDIDA",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives observam o nome registrado no documento. A identificação confirma que o documento está relacionado a um antigo prefeito da cidade. A informação faz com que eles procurem outros registros antigos que possam esclarecer a ligação entre o prefeito e o equipamento.",choices:[{label:"Continuar a investigação",to:"diario80"}]},
  c20_simbolo:{title:"GAVETA ESCONDIDA",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives analisam o símbolo. Ele parece estar relacionado ao equipamento mencionado na anotação. Para descobrir mais sobre aquela ligação, eles decidem procurar informações nos registros antigos.",choices:[{label:"Continuar a investigação",to:"diario80"}]},
  c20_parede:{title:"PAREDE DA CASA 20",type:"pista",image:"clue.svg",text:"A parede apresenta um desenho e uma data riscada, ambos ligados aos acontecimentos antigos. O símbolo coincide com o equipamento encontrado nas pistas.",clue:"Símbolo da Casa 20 coincide com o equipamento",choices:[
    {label:"Examinar o desenho",to:"diario80"},
    {label:"Registrar a data",to:"diario80"}
  ]},
  diario80:{title:"DIÁRIO ANTIGO",type:"pista",image:"document.svg",text:"As pistas da Casa 20 apontam para acontecimentos antigos e para pessoas ligadas ao bairro.",clue:"Informações antigas relacionadas ao prefeito",choices:[
    {label:"Ler mais no diário",to:"diario_ler"},
    {label:"Procurar páginas escondidas",to:"diario_paginas"},
    {label:"Guardar o diário",to:"diario_guardar"}
  ]},
  diario_ler:{title:"DIÁRIO ANTIGO",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives leem as informações registradas no diário, mas não encontram nada de grande importância. As informações obtidas anteriormente reforçam a necessidade de continuar a investigação.",choices:[{label:"Continuar para o Centro do Bairro",to:"centro80"}]},
  diario_paginas:{title:"DIÁRIO ANTIGO",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives procuram cuidadosamente entre as páginas do diário. Em uma delas, há uma referência a eventos que ocorreram em 1976. Naquele ano uma série de sons estranhos foram relatados pelos moradores dos bairros.",choices:[{label:"Continuar para o Centro do Bairro",to:"centro80"}]},
  diario_guardar:{title:"DIÁRIO ANTIGO",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives guardam o diário para preservar as informações encontradas. Com as pistas reunidas, decidem continuar a investigação em outro ponto do bairro.",choices:[{label:"Continuar para o Centro do Bairro",to:"centro80"}]},
  centro80:{title:"CENTRO DO BAIRRO",type:"local",image:"center.svg",text:"No centro do bairro, os detetives podem conversar com um antigo morador ou procurar informações na antiga discoteca.",choices:[
    {label:"Falar com o ex-morador",to:"exmorador80"},
    {label:"Investigar a Discoteca",to:"discoteca80"}
  ]},
  exmorador80:{title:"EX-MORADOR",type:"personagem",image:"center.svg",text:"O ex-morador conta que, no passado, alguém realizava experiências estranhas no bairro e que a antiga Discoteca pode guardar informações importantes.",choices:[
    {label:"Perguntar sobre os acontecimentos",to:"exmorador_acontecimentos"},
    {label:"Perguntar sobre o equipamento",to:"exmorador_equipamento"}
  ]},
  exmorador_acontecimentos:{title:"EX-MORADOR",type:"personagem",image:"center.svg",text:"O ex-morador conta que os acontecimentos eram mantidos em segredo e que algumas pessoas, como o prefeito da cidade, tentavam esconder o que acontecia no bairro. Suas informações ajudam os detetives a relacionar as pistas encontradas durante a investigação.",choices:[{label:"Continuar a investigação",to:"descoberta80"}]},
  exmorador_equipamento:{title:"EX-MORADOR",type:"personagem",image:"center.svg",text:"O ex-morador confirma que havia uma máquina relacionada às experiências realizadas no passado. Ele não sabe o que aconteceu com ela.",choices:[{label:"Continuar a investigação",to:"descoberta80"}]},
  discoteca80:{title:"DISCOTECA",type:"local",image:"discoteca-externa.png",text:"Na antiga Discoteca, objetos da época ainda estão espalhados pelo salão.",choices:[
    {label:"Procurar registros",to:"descoberta80"},
    {label:"Investigar objetos antigos",to:"descoberta80"}
  ]},
  descoberta80:{title:"DESCOBERTA DO EQUIPAMENTO",type:"climax",image:"opening.svg",text:"As pistas levam a uma construção antiga, lá, eles encontram uma grande máquina escondida entre os escombros, como se tivesse sido escondida. Alguém está ali, entre as sombras.",choices:[
    {label:"Aproximar-se do equipamento",to:"descoberta_aproximar"},
    {label:"Observar a figura nas sombras",to:"descoberta_observar"}
  ]},
  descoberta_aproximar:{title:"DESCOBERTA DO EQUIPAMENTO",type:"climax",image:"opening.svg",text:"Os detetives se aproximam cuidadosamente da grande máquina. Antes que possam examiná-la, percebem que há alguém escondido próximo ao equipamento.",choices:[{label:"Continuar",to:"figura80"}]},
  descoberta_observar:{title:"DESCOBERTA DO EQUIPAMENTO",type:"climax",image:"opening.svg",text:"Os detetives observam atentamente a figura escondida próxima à máquina. Ela parece estar preparando o equipamento para alguma coisa.",choices:[{label:"Continuar",to:"figura80"}]},
  figura80:{title:"FIGURA NAS SOMBRAS",type:"climax",image:"opening.svg",text:"A figura sai das sombras. Ele revela se chamar Zebriúson, ele diz que vai acionar a máquina e mostrar toda a verdade. Os detetives precisam agir antes que o equipamento seja acionado.",choices:[
    {label:"Impedir o acionamento",to:"f1_impedir"},
    {label:"Permitir o acionamento",to:"final100"}
  ]},

  f1_impedir:{title:"IMPEDIR O ACIONAMENTO",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Antes que Zebriúson alcance o painel, um dos detetives retira a peça que iniciaria o equipamento. O outro impede que ele se aproxime novamente da máquina.\n\nZebriúson tenta fugir pelos escombros, mas os detetives bloqueiam a passagem e conseguem capturá-lo. Com a máquina desativada e sem possibilidade de escapar, ele é obrigado a permanecer no local.",choices:[
    {label:"Exigir uma explicação",to:"f1_capturado"}
  ]},
  f1_capturado:{title:"ZEBRIÚSON CAPTURADO",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Os detetives exigem que Zebriúson explique o que pretendia fazer. Ele observa a máquina desativada e percebe que não poderá continuar escondendo sua função.\n\nZebriúson revela que o equipamento é capaz de abrir passagens entre diferentes períodos.",choices:[
    {label:"Perguntar como a máquina funciona",to:"f1_funcionamento"},
    {label:"Perguntar há quanto tempo ele utiliza a máquina",to:"f1_tempo_uso"}
  ]},
  f1_funcionamento:{title:"COMO A MÁQUINA FUNCIONA",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson explica que o equipamento acumula energia até abrir uma passagem temporal. Quem estiver próximo durante o acionamento pode ser transportado para outra época.",choices:[
    {label:"Perguntar sobre os estrondos",to:"f1_estrondos"},
    {label:"Perguntar para qual época ele pretendia viajar",to:"f1_destino"}
  ]},
  f1_estrondos:{title:"OS ESTRONDOS",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Os detetives perguntam se a máquina possui alguma relação com os estrondos ocorridos no bairro.\n\nZebriúson confirma que cada estrondo correspondia à abertura de uma passagem temporal. Os sons continuavam acontecendo porque ele nunca deixou de utilizar o equipamento.",choices:[
    {label:"Perguntar por que ele continuava viajando",to:"f1_viagens"}
  ]},
  f1_destino:{title:"O DESTINO DA VIAGEM",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson não revela qual seria o destino daquela viagem. Ele afirma apenas que utilizava a máquina para visitar diferentes períodos e que aquela seria mais uma de suas viagens.",choices:[
    {label:"Perguntar por que ele continuava viajando",to:"f1_viagens"}
  ]},
  f1_tempo_uso:{title:"O PASSADO DE ZEBRIÚSON",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson afirma que conhece o equipamento há mais tempo do que os detetives imaginam. Quando eles questionam como isso seria possível, ele revela que possui mais de cem anos.\n\nEle explica que atravessou diferentes épocas utilizando a máquina. Embora mais de um século tenha se passado desde seu nascimento, suas viagens alteraram a maneira como o tempo passou para ele.",choices:[
    {label:"Perguntar quantas viagens ele realizou",to:"f1_quantidade_viagens"},
    {label:"Perguntar se sempre retornava ao bairro",to:"f1_retorno_bairro"}
  ]},
  f1_quantidade_viagens:{title:"AS VIAGENS DE ZEBRIÚSON",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson afirma que realizou tantas viagens que já não consegue contá-las. Ele visitou diferentes períodos e sempre retornou à máquina para iniciar uma nova viagem.",choices:[
    {label:"Perguntar por que ele continuava viajando",to:"f1_viagens"}
  ]},
  f1_retorno_bairro:{title:"O RETORNO AO BAIRRO",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson confirma que utilizava o bairro como ponto de partida e de retorno. Depois de visitar outra época, voltava ao equipamento para preparar a viagem seguinte.",choices:[
    {label:"Perguntar por que ele continuava viajando",to:"f1_viagens"}
  ]},
  f1_viagens:{title:"AS VIAGENS DE ZEBRIÚSON",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson explica que continuava utilizando a máquina porque queria conhecer diferentes momentos da história e observar acontecimentos que nenhuma pessoa de sua época poderia testemunhar.\n\nMesmo percebendo que cada ativação produzia um novo estrondo, ele continuou viajando. Para Zebriúson, a possibilidade de atravessar o tempo era mais importante do que os efeitos provocados no bairro.",choices:[
    {label:"Perguntar como a máquina permaneceu escondida",to:"f1_segredo"}
  ]},
  f1_segredo:{title:"O SEGREDO DO EQUIPAMENTO",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Os detetives perguntam como uma máquina daquele tamanho permaneceu escondida durante tantos anos.\n\nZebriúson conta que o antigo prefeito descobriu a existência do equipamento e permitiu que ele permanecesse oculto. O prefeito temia que a população soubesse que viagens temporais estavam sendo realizadas no bairro.\n\nPublicamente, o equipamento foi considerado desaparecido. Na verdade, ele foi escondido naquela construção e continuou sendo utilizado por Zebriúson.",choices:[
    {label:"Perguntar por que o prefeito ajudou Zebriúson",to:"f1_prefeito"},
    {label:"Confrontar Zebriúson sobre os riscos",to:"f1_riscos"}
  ]},
  f1_prefeito:{title:"A PARTICIPAÇÃO DO PREFEITO",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Zebriúson afirma que o prefeito desejava conhecer acontecimentos futuros e obter informações que ainda não existiam em sua época. Em troca, ajudou a manter a máquina escondida.",choices:[
    {label:"Encerrar o interrogatório",to:"f1_reunir"}
  ]},
  f1_riscos:{title:"OS RISCOS DAS VIAGENS",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"Os detetives afirmam que suas viagens colocaram o bairro em risco. Zebriúson admite que conhecia os efeitos das ativações, mas continuou utilizando a máquina porque acreditava que ninguém conseguiria encontrá-lo.",choices:[
    {label:"Encerrar o interrogatório",to:"f1_reunir"}
  ]},
  f1_reunir:{title:"REUNIR AS DESCOBERTAS",characters:["detetive1","detetive2","zebriuson"],type:"climax",image:"opening.svg",text:"A confissão de Zebriúson permite que os detetives finalmente compreendam o que acontecia no bairro.\n\nA máquina escondida era capaz de abrir passagens entre diferentes períodos. Zebriúson possuía mais de cem anos e utilizava o equipamento para viajar continuamente pelo tempo.\n\nOs estrondos eram provocados pelas ativações da máquina. O antigo prefeito conhecia sua existência e ajudou a escondê-la, permitindo que Zebriúson continuasse realizando suas viagens sem ser descoberto.",choices:[
    {label:"Desativar definitivamente a máquina",to:"finalReal"}
  ]},

  /* CAMINHO 2 — CASA 50 — FINAL 2 */
  casa50:{title:"CASA 50",type:"local",image:"house50.svg",text:"Na Casa os detetives encontram diferentes objetos e documentos deixados no local e decidem procurar alguma informação que seja importante.",choices:[
    {label:"Examinar os objetos",to:"c50_objetos"},
    {label:"Examinar os documentos",to:"c50_documentos"}
  ]},
  c50_objetos:{title:"EXAMINAR OS OBJETOS",type:"pista",image:"clue.svg",text:"Entre os objetos deixados na casa, os detetives encontram uma peça metálica incomum. Ela possui marcas que indicam que fazia parte de algum equipamento maior.",clue:"Peça metálica pertencente a um equipamento maior",choices:[
    {label:"Examinar a peça",to:"c50_examinar_peca"},
    {label:"Procurar onde ela era utilizada",to:"c50_uso_peca"}
  ]},
  c50_examinar_peca:{title:"EXAMINAR A PEÇA",type:"pista",image:"clue.svg",text:"Os detetives observam a peça com atenção. Não conseguem determinar sua função, mas percebem que ela apresenta sinais de desgaste e parece ter pertencido a um equipamento antigo.",choices:[{label:"Procurar informações sobre a peça",to:"c50_info_peca"}]},
  c50_uso_peca:{title:"PROCURAR ONDE ELA ERA UTILIZADA",type:"pista",image:"clue.svg",text:"Os detetives procuram outros objetos que possam indicar onde aquela peça era utilizada. Mas não encontram nada.",choices:[{label:"Procurar informações sobre a peça",to:"c50_info_peca"}]},
  c50_documentos:{title:"EXAMINAR OS DOCUMENTOS",type:"pista",image:"document.svg",text:"Entre os documentos encontrados, há registros antigos sobre atividades realizadas no bairro. Os textos estão incompletos, mas algumas informações ainda podem ser lidas.",clue:"Registros antigos citam um equipamento removido",choices:[
    {label:"Ler os registros",to:"c50_ler_registros"},
    {label:"Examinar as anotações",to:"c50_anotacoes"}
  ]},
  c50_ler_registros:{title:"LER OS REGISTROS",type:"pista",image:"document.svg",text:"Os detetives encontram uma descrição incompleta de um equipamento utilizado em uma construção que já não existe.",choices:[{label:"Procurar informações sobre o equipamento",to:"c50_info_equipamento"}]},
  c50_anotacoes:{title:"EXAMINAR AS ANOTAÇÕES",type:"pista",image:"document.svg",text:"As anotações mencionam a retirada de peças de um equipamento antigo. Não há indicação de quem realizou a retirada, mas o registro confirma que partes do equipamento foram removidas.",choices:[{label:"Procurar informações sobre o equipamento",to:"c50_info_equipamento"}]},
  c50_info_peca:{title:"PROCURAR INFORMAÇÕES SOBRE A PEÇA",type:"pista",image:"clue.svg",text:"A peça encontrada na Casa 50 apresenta características semelhantes às descritas nos documentos. Os detetives percebem que ela pode ter pertencido ao equipamento mencionado nos registros.",choices:[
    {label:"Comparar a peça com o documento",to:"c50_comparar_peca"},
    {label:"Procurar outras peças",to:"c50_outras_pecas"}
  ]},
  c50_comparar_peca:{title:"COMPARAR A PEÇA COM O DOCUMENTO",type:"pista",image:"document.svg",text:"As marcas descritas no documento são semelhantes às encontradas na peça. Os detetives concluem que ela fazia parte do equipamento mencionado nos registros.",choices:[{label:"Procurar informações sobre o equipamento",to:"c50_info_equipamento"}]},
  c50_outras_pecas:{title:"PROCURAR OUTRAS PEÇAS",type:"pista",image:"clue.svg",text:"Os detetives procuram outras peças semelhantes pela casa, mas não encontram nenhuma. A busca, porém, confirma que o equipamento foi desmontado e retirado de onde estava.",choices:[{label:"Procurar informações sobre o equipamento",to:"c50_info_equipamento"}]},
  c50_info_equipamento:{title:"PROCURAR INFORMAÇÕES SOBRE O EQUIPAMENTO",type:"pista",image:"document.svg",text:"Os detetives precisam descobrir onde ele foi parar.",clue:"O equipamento foi levado para outra construção do bairro",choices:[
    {label:"Seguir o registro da retirada",to:"c50_registro_retirada"},
    {label:"Procurar uma indicação de localização",to:"c50_localizacao"}
  ]},
  c50_registro_retirada:{title:"SEGUIR O REGISTRO DA RETIRADA",type:"pista",image:"document.svg",text:"Os detetives acompanham as informações deixadas no registro. A última anotação indica que o equipamento foi levado para outra construção do bairro.",choices:[{label:"Ir até a construção antiga",to:"c50_construcao"}]},
  c50_localizacao:{title:"PROCURAR UMA INDICAÇÃO DE LOCALIZAÇÃO",type:"pista",image:"document.svg",text:"Os detetives procuram entre os documentos alguma informação sobre o destino do equipamento. Encontram uma indicação de que ele foi levado para uma construção antiga do bairro.",choices:[{label:"Ir até a construção antiga",to:"c50_construcao"}]},
  c50_construcao:{title:"CONSTRUÇÃO ANTIGA",type:"local",image:"opening.svg",text:"Os detetives chegam à construção indicada nos registros. O local está abandonado e parcialmente coberto por escombros. Entre os destroços, encontram sinais de que um equipamento pesado foi instalado ali.",choices:[
    {label:"Examinar os escombros",to:"c50_escombros"},
    {label:"Seguir os sinais do equipamento",to:"c50_sinais"}
  ]},
  c50_escombros:{title:"EXAMINAR OS ESCOMBROS",type:"pista",image:"opening.svg",text:"Os detetives retiram alguns dos escombros e encontram partes metálicas que parecem pertencer ao mesmo equipamento descrito nos documentos.",choices:[{label:"Examinar o equipamento",to:"equipamento50"}]},
  c50_sinais:{title:"SEGUIR OS SINAIS DO EQUIPAMENTO",type:"pista",image:"opening.svg",text:"Os detetives seguem as marcas deixadas no chão e encontram uma área escondida entre os escombros. Ali está o equipamento que procuravam.",choices:[{label:"Examinar o equipamento",to:"equipamento50"}]},
  museu50:{title:"MUSEU",type:"local",image:"museum.svg",text:"O Museu conserva objetos e uma pintura que mostram o bairro no passado.",choices:[
    {label:"Observar a pintura",to:"pintura50"},
    {label:"Examinar os objetos",to:"objetos50"}
  ]},
  pintura50:{title:"PINTURA",type:"pista",image:"museum.svg",text:"A pintura mostra uma estrutura metálica semelhante a um equipamento antigo.",choices:[{label:"Examinar a estrutura",to:"equipamento50"},{label:"Comparar com os registros",to:"equipamento50"}]},
  objetos50:{title:"OBJETOS DO MUSEU",type:"pista",image:"museum.svg",text:"Uma peça antiga parece fazer parte de um mecanismo maior.",choices:[{label:"Examinar a peça",to:"equipamento50"},{label:"Comparar com a pintura",to:"equipamento50"}]},
  equipamento50:{title:"EQUIPAMENTO",type:"climax",image:"opening.svg",text:"Entre os escombros, os detetives encontram uma grande máquina. O equipamento está aparentemente desligado, mas ainda possui partes intactas. Antes que consigam examiná-lo, percebem que alguém está próximo dali.",choices:[{label:"Examinar o equipamento",to:"c50_examinar_equipamento"},{label:"Procurar quem está ali",to:"c50_procurar_figura"}]},
  c50_examinar_equipamento:{title:"EXAMINAR O EQUIPAMENTO",type:"climax",image:"opening.svg",text:"Os detetives se aproximam da máquina e percebem que ela ainda pode ser acionada. Antes que consigam descobrir como funciona, ouvem passos próximos.",choices:[{label:"Ver a figura nas sombras",to:"figura50"}]},
  c50_procurar_figura:{title:"PROCURAR QUEM ESTÁ ALI",type:"climax",image:"opening.svg",text:"Os detetives procuram entre os escombros e percebem uma figura escondida próxima à máquina.",choices:[{label:"Ver a figura nas sombras",to:"figura50"}]},
  figura50:{title:"FIGURA NAS SOMBRAS",type:"climax",image:"opening.svg",text:"A figura sai das sombras. Ele revela se chamar Zebriúson. Ele diz que conhece aquele equipamento e que chegou o momento de acioná-lo.",choices:[{label:"Perguntar o que o equipamento faz",to:"c50_perguntar_equipamento"}]},
  c50_perguntar_equipamento:{title:"PERGUNTAR O QUE O EQUIPAMENTO FAZ",type:"climax",image:"opening.svg",text:"Zebriúson afirma que o equipamento pode alterar o tempo e que os detetives estão prestes a descobrir o que aconteceu no passado. Ele se prepara para acioná-lo.",choices:[{label:"Tentar impedir",to:"finalReal50",locked:true},{label:"O equipamento foi acionado",to:"final100"}]},

  /* CAMINHO 3 — CASA 54 — FINAL 3 */
  casa54:{title:"CASA 54",type:"local",image:"house54.svg",text:"A Casa 54 parece ter sido abandonada às pressas. Há sinais de que alguém passou por ali recentemente.",choices:[
    {label:"Seguir as pegadas",to:"c54_pegadas"},
    {label:"Observar pela janela",to:"c54_janela"}
  ]},
  c54_pegadas:{title:"PEGADAS",type:"pista",image:"house54.svg",text:"As pegadas atravessam a sala e continuam por um corredor. Algumas marcas seguem em direção aos fundos da casa.",choices:[{label:"Seguir as pegadas",to:"c54_quarto"},{label:"Examinar as marcas no chão",to:"c54_fundos"}]},
  c54_janela:{title:"JANELA",type:"pista",image:"house54.svg",text:"Pela janela, os detetives percebem uma pessoa saindo rapidamente dos fundos da Casa 54.",choices:[{label:"Observar para onde ela vai",to:"c54_rua"},{label:"Seguir a pessoa",to:"c54_telhado"}]},
  c54_quarto:{title:"SEGUIR AS PEGADAS",type:"pista",image:"house54.svg",text:"Os detetives acompanham as pegadas até os fundos da Casa 54. As marcas terminam perto de uma fotografia caída no chão.",choices:[{label:"Examinar a fotografia",to:"c54_foto"}]},
  c54_fundos:{title:"MARCAS NO CHÃO",type:"pista",image:"house54.svg",text:"As marcas foram deixadas recentemente. Ao acompanhá-las, os detetives chegam aos fundos da casa e encontram uma fotografia caída no chão.",choices:[{label:"Examinar a fotografia",to:"c54_foto"}]},
  c54_rua:{title:"OBSERVAR O CAMINHO",type:"acao",image:"house54.svg",text:"Mantendo distância, os detetives observam a pessoa atravessar a rua e entrar na Casa 1.",choices:[{label:"Investigar a Casa 1",to:"casa1"}]},
  c54_telhado:{title:"SEGUIR A PESSOA",type:"acao",image:"house54.svg",text:"Os detetives seguem a pessoa pelas ruas do bairro. Antes que consigam alcançá-la, ela entra na Casa 1 e fecha a porta.",choices:[{label:"Aproximar-se da Casa 1",to:"casa1"}]},
  c54_foto:{title:"FOTOGRAFIA ENCONTRADA",type:"pista",image:"photo.svg",text:"A fotografia mostra a fachada de uma casa do bairro. O número 1 pode ser visto próximo à porta.\n\nUma marca foi desenhada sobre uma entrada lateral da construção.",clue:"Uma fotografia indica a Casa 1 e destaca sua entrada lateral",choices:[{label:"Examinar o verso da fotografia",to:"c54_verso"},{label:"Investigar a entrada marcada",to:"c54_entrada_marcada"}]},
  c54_verso:{title:"VERSO DA FOTOGRAFIA",type:"pista",image:"photo.svg",text:"No verso está escrito: ‘Ele está escondido aqui’. A mensagem indica que alguém ligado aos acontecimentos da Casa 54 pode estar na Casa 1.",choices:[{label:"Seguir para a Casa 1",to:"casa1"}]},
  c54_entrada_marcada:{title:"ENTRADA MARCADA",type:"pista",image:"photo.svg",text:"A marca destaca uma entrada lateral da Casa 1. Os detetives decidem investigar por que alguém indicou especificamente aquele acesso.",choices:[{label:"Seguir para a Casa 1",to:"casa1"}]},
  casa1:{title:"CASA 1",type:"local",image:"house1.svg",text:"A pista encontrada na Casa 54 leva os detetives até a Casa 1. A porta está fechada, mas há sinais de que alguém entrou recentemente.\n\nPelas janelas, eles conseguem ver papéis espalhados e objetos fora do lugar.",choices:[{label:"Entrar na casa",to:"c1_interior"},{label:"Investigar o lado de fora",to:"c1_exterior"}]},
  c1_interior:{title:"INTERIOR DA CASA 1",type:"pista",image:"house1.svg",text:"Papéis espalhados indicam que alguém esteve procurando uma informação específica.",choices:[{label:"Ler os papéis",to:"ataque54"},{label:"Pegar os papéis",to:"ataque54"}]},
  c1_exterior:{title:"LADO DE FORA DA CASA 1",type:"pista",image:"house1.svg",text:"Do lado de fora, uma passagem escondida chama a atenção dos detetives.",choices:[{label:"Abrir a passagem",to:"ataque54"},{label:"Deixar como está",to:"ataque54"}]},
  ataque54:{title:"ATAQUE",characters:["detetive1","detetive2","palhaco"],type:"climax",image:"house1.svg",text:"Uma figura vestida de palhaço surge inesperadamente de dentro da Casa 1. Antes que os detetives consigam reagir, ela ataca um deles.\n\nO outro detetive tenta ajudá-lo, enquanto o palhaço foge e desaparece entre as construções abandonadas.",choices:[{label:"Tentar socorrer o detetive",to:"f3_morte"}]},
  f3_morte:{title:"MORTE DO DETETIVE",characters:["detetive1"],type:"climax",image:"opening.svg",text:"Apesar da tentativa de ajudá-lo, o detetive atacado pelo palhaço não sobrevive.\n\nO detetive sobrevivente percebe que não poderá continuar a investigação sozinho e decide convocar amigos para ajudá-lo.",choices:[{label:"Chamar Fredilson e Uberliuson",to:"f3_chamar_fred_uber"},{label:"Chamar Gustavo e Avenildo",to:"f3_chamar_gustavo_avenildo"}]},
  f3_chamar_fred_uber:{title:"FREDILSON E UBERLIUSON",characters:["detetive1","fredilson","uberliuson"],type:"acao",image:"opening.svg",text:"O detetive sobrevivente chama Fredilson e Uberliuson. Depois de explicar o que aconteceu, os três decidem retomar a investigação seguindo as pistas que levam à Casa 80.\n\nA partir desse momento, eles iniciam uma nova investigação independente.",choices:[{label:"Investigar a Casa 80",to:"f3a_casa80"}]},
  f3_chamar_gustavo_avenildo:{title:"GUSTAVO E AVENILDO",characters:["detetive1","gustavo","avenildo"],type:"acao",image:"opening.svg",text:"O detetive sobrevivente chama Gustavo e Avenildo. Depois de explicar o que aconteceu, os três decidem retomar a investigação seguindo as pistas que levam à Casa 48.\n\nA partir desse momento, eles iniciam uma nova investigação independente.",choices:[{label:"Investigar a Casa 48",to:"f3b_casa48"}]},

  /* CAMINHO 4 — CASA 48 — FINAL 4 */
  casa48:{title:"CASA 48",speaker:"detetives",type:"local",image:"house80.svg",text:"A Casa 48 está abandonada e coberta de poeira. Durante a busca, os detetives encontram uma fotografia antiga caída atrás de um móvel.\n\nA imagem mostra várias pessoas reunidas diante de um estabelecimento do bairro.",choices:[{label:"Examinar as pessoas da fotografia",to:"c48_pessoas"},{label:"Analisar a data da fotografia",to:"c48_data"}]},
  c48_pessoas:{title:"PESSOAS DA FOTOGRAFIA",speaker:"detetives",type:"pista",image:"photo.svg",text:"Entre as pessoas fotografadas, uma jovem chama a atenção dos detetives. Ela possui características muito parecidas com as de Rosivalda.\n\nEntretanto, a fotografia está desgastada e não apresenta o nome da jovem.",choices:[{label:"Ampliar a fotografia",to:"c48_ampliar"},{label:"Mostrar a fotografia a Rosivalda",to:"c48_mostrar"}]},
  c48_ampliar:{title:"FOTOGRAFIA AMPLIADA",speaker:"detetives",type:"pista",image:"photo.svg",text:"Ao ampliar a imagem, os detetives percebem que a jovem está diante da antiga Discoteca do bairro. A placa do estabelecimento aparece parcialmente ao fundo.\n\nNenhuma informação permite confirmar a identidade da jovem.",clue:"Uma jovem parecida com Rosivalda aparece diante da antiga Discoteca",choices:[{label:"Investigar a Discoteca",to:"discoteca48"}]},
  c48_mostrar:{title:"FOTOGRAFIA MOSTRADA A ROSIVALDA",characters:["detetive1","detetive2","rosivalda"],type:"personagem",image:"rosivalda.svg",text:"Rosivalda observa a fotografia, mas não reconhece a jovem, as outras pessoas ou o acontecimento registrado.\n\nEla confirma apenas que o estabelecimento mostrado ao fundo é a antiga Discoteca do bairro.",clue:"Rosivalda não possui lembranças relacionadas à fotografia",choices:[{label:"Investigar a Discoteca",to:"discoteca48"}]},
  c48_data:{title:"DATA DA FOTOGRAFIA",speaker:"detetives",type:"pista",image:"photo.svg",text:"No canto inferior da fotografia aparece o ano de 1976. A data foi escrita ao lado do nome parcialmente apagado da antiga Discoteca.",choices:[{label:"Examinar a inscrição",to:"c48_inscricao"},{label:"Pesquisar o estabelecimento fotografado",to:"c48_estabelecimento"}]},
  c48_inscricao:{title:"INSCRIÇÃO DA FOTOGRAFIA",speaker:"detetives",type:"pista",image:"photo.svg",text:"A inscrição confirma que a fotografia foi tirada durante uma festa realizada em 1976. O restante da mensagem foi apagado pelo tempo.",clue:"A fotografia foi tirada durante uma festa em 1976",choices:[{label:"Seguir até a antiga Discoteca",to:"discoteca48"}]},
  c48_estabelecimento:{title:"ESTABELECIMENTO FOTOGRAFADO",speaker:"detetives",type:"pista",image:"discoteca-externa.png",text:"Os detetives comparam a placa da fotografia com os estabelecimentos abandonados do bairro. A fachada corresponde à antiga Discoteca.",clue:"A fotografia de 1976 foi tirada na Discoteca",choices:[{label:"Investigar a Discoteca",to:"discoteca48"}]},
  intersecao34:{title:"PISTAS DO PASSADO",type:"climax",image:"rosivalda.svg",text:"As pistas da Casa 54 e da Casa 48 revelam a mesma ligação: uma fotografia de 1976 relaciona Rosivalda aos acontecimentos do passado. Os detetives precisam decidir como continuar.",clue:"Fotografia de 1976 liga Casa 54, Casa 48 e Rosivalda",choices:[{label:"Seguir as pistas até a Discoteca",to:"discoteca48"},{label:"Voltar à Casa 1 para investigar o perigo",to:"casa1"}]},
  discoteca48:{title:"DISCOTECA",speaker:"detetives",type:"local",image:"discoteca-externa.png",text:"Os detetives chegam à antiga Discoteca. O salão está abandonado, mas ainda conserva objetos do período em que o estabelecimento funcionava.\n\nFotografias, discos de vinil, cartazes e outros materiais antigos estão espalhados pelo local.",choices:[{label:"Examinar as fotografias antigas",to:"d48_fotos"},{label:"Procurar discos",to:"d48_disco"},{label:"Procurar referências a 1976",to:"d48_materiais"}]},
  d48_fotos:{title:"FOTOGRAFIAS ANTIGAS",speaker:"detetives",type:"pista",image:"photo.svg",text:"Dentro de um armário, os detetives encontram um álbum com fotografias das festas realizadas na Discoteca.\n\nA mesma jovem encontrada na fotografia da Casa 48 aparece em várias imagens. Em uma delas, a data de 1976 está claramente registrada.",choices:[{label:"Comparar as fotografias",to:"d48_comparar_fotos"},{label:"Procurar a identificação da jovem",to:"d48_identificacao"}]},
  d48_comparar_fotos:{title:"COMPARAÇÃO DAS FOTOGRAFIAS",speaker:"detetives",type:"pista",image:"photo.svg",text:"As fotografias foram tiradas em diferentes momentos da mesma festa. A jovem aparece nas primeiras imagens, mas deixa de aparecer nas fotografias seguintes.",clue:"A jovem deixou de aparecer nas fotografias da festa de 1976",choices:[{label:"Pesquisar o desaparecimento na Biblioteca",to:"biblioteca48"}]},
  d48_identificacao:{title:"IDENTIFICAÇÃO DA JOVEM",speaker:"detetives",type:"pista",image:"photo.svg",text:"Nenhuma das fotografias apresenta o nome da jovem. No verso de uma delas existe apenas a anotação: ‘Desaparecida durante a festa’.",clue:"Uma participante desapareceu durante uma festa realizada na Discoteca",choices:[{label:"Procurar notícias na Biblioteca",to:"biblioteca48"}]},
  d48_disco:{title:"DISCO ANTIGO",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"Dentro de uma caixa antiga, os detetives encontram um disco de vinil com músicas antigas.",choices:[{label:"Examinar a capa",to:"d48_capa"},{label:"Ouvir o disco",to:"d48_ouvir"}]},
  d48_capa:{title:"CAPA DO DISCO",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"Ao examinar a capa com atenção, os detetives encontram o nome da Discoteca e uma inscrição: ‘Produzido em 1976’.",clue:"O disco pertence à Discoteca e foi produzido em 1976",choices:[{label:"Pesquisar a Discoteca na Biblioteca",to:"biblioteca48"}]},
  d48_ouvir:{title:"OUVIR O DISCO",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"Apesar dos ruídos provocados pelo tempo, as músicas ainda podem ser ouvidas.",clue:"O disco contém músicas antigas relacionadas à Discoteca",choices:[{label:"Pesquisar informações na Biblioteca",to:"biblioteca48"}]},
  d48_materiais:{title:"MATERIAIS ANTIGOS",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"Próximo ao palco, os detetives encontram um cartaz antigo.\n\nParte do texto está apagada, mas ainda é possível identificar o nome da Discoteca e a data de uma apresentação musical realizada em 1976.",choices:[{label:"Examinar o cartaz",to:"d48_cartaz"},{label:"Procurar informações sobre a apresentação",to:"d48_apresentacao"}]},
  d48_cartaz:{title:"CARTAZ DE 1976",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"O cartaz apresenta a data de uma festa realizada na Discoteca. Alguns nomes foram apagados e não existem informações sobre o que aconteceu durante o evento.",clue:"Uma festa foi realizada na Discoteca em 1976",choices:[{label:"Pesquisar a festa na Biblioteca",to:"biblioteca48"}]},
  d48_apresentacao:{title:"APRESENTAÇÃO INTERROMPIDA",speaker:"detetives",type:"pista",image:"discoteca.svg",text:"Os detetives encontram um pequeno aviso informando que uma das apresentações terminou antes do horário por causa de uma queda de energia.",clue:"Uma queda de energia interrompeu uma apresentação na Discoteca em 1976",choices:[{label:"Pesquisar o apagão na Biblioteca",to:"biblioteca48"}]},
  biblioteca48:{title:"BIBLIOTECA",speaker:"detetives",type:"local",image:"biblioteca-dia.png",text:"As pistas encontradas na Discoteca mencionam uma jovem desconhecida, uma festa, uma queda de energia e o ano de 1976.\n\nPara descobrir o que aconteceu, os detetives seguem até a Biblioteca, onde estão guardados documentos, livros e jornais antigos sobre o bairro.",choices:[{label:"Pesquisar nos jornais antigos",to:"b48_jornais"},{label:"Consultar os registros de moradores",to:"b48_moradores"},{label:"Procurar livros sobre o bairro",to:"b48_livros"}]},
  b48_jornais:{title:"JORNAIS ANTIGOS",speaker:"detetives",type:"pista",image:"document.svg",text:"Depois de examinar várias edições, os detetives encontram um jornal publicado poucos dias depois de uma festa realizada na Discoteca.\n\nUma notícia informa que uma jovem desapareceu durante uma queda de energia. Segundo as testemunhas, ela estava no salão quando as luzes se apagaram. Quando a energia voltou, ninguém conseguiu encontrá-la.\n\nAo lado da notícia existe uma fotografia da desaparecida. A jovem é identificada pelo nome: Rosivalda.",clue:"Rosivalda foi registrada como desaparecida em 1976",choices:[{label:"Comparar a notícia com a fotografia",to:"b48_comparar_noticia"},{label:"Verificar a identidade da desaparecida",to:"b48_verificar_identidade"}]},
  b48_comparar_noticia:{title:"NOTÍCIA E FOTOGRAFIA",speaker:"detetives",type:"pista",image:"photo.svg",text:"A fotografia publicada no jornal mostra a mesma jovem encontrada nas imagens da Casa 48 e da Discoteca.\n\nO nome registrado na notícia é Rosivalda.",choices:[{label:"Concluir a investigação",to:"desfecho48"}]},
  b48_verificar_identidade:{title:"IDENTIDADE DA DESAPARECIDA",speaker:"detetives",type:"pista",image:"document.svg",text:"Os detetives comparam o nome, a fotografia e as informações apresentadas no jornal. As características correspondem às da atual moradora do bairro.\n\nAs provas indicam que a jovem desaparecida em 1976 e Rosivalda são a mesma pessoa.",choices:[{label:"Concluir a investigação",to:"desfecho48"}]},
  b48_moradores:{title:"REGISTROS DE MORADORES",speaker:"detetives",type:"pista",image:"document.svg",text:"Os registros confirmam que Rosivalda mora atualmente no bairro. Entretanto, não existem informações suficientes sobre sua infância, sua família ou o momento em que começou a viver naquele local.\n\nOs documentos levantam dúvidas sobre sua origem, mas não comprovam que ela seja a jovem fotografada em 1976.",clue:"Não existem registros claros sobre a origem de Rosivalda",choices:[{label:"Concluir a investigação",to:"desfecho48"}]},
  b48_livros:{title:"LIVROS SOBRE O BAIRRO",speaker:"detetives",type:"pista",image:"library.svg",text:"Um livro sobre a história do bairro informa que a Discoteca encerrou suas atividades em 1976.",clue:"A Discoteca encerrou suas atividades em 1976",choices:[{label:"Concluir a investigação",to:"desfecho48"}]},
  desfecho48:{title:"CONCLUSÃO DA INVESTIGAÇÃO",characters:["detetive1","detetive2","rosivalda"],type:"climax",image:"rosivalda.svg",text:"Os detetives terminam a análise das informações encontradas na Casa 48, na Discoteca e na Biblioteca. O que poderão explicar a Rosivalda depende das provas reunidas durante a investigação.",choices:[{label:"Não há provas suficientes para contar a verdade a Rosivalda",to:"finalSemProvas48",requiresMissing:"b48_jornais"},{label:"Contar a verdade a Rosivalda com todas as provas",to:"finalRosivalda",requiresVisited:"b48_jornais"}]},

  finalReal:{title:"FINAL 1 — A VERDADE",characters:["detetive1","detetive2","zebriuson"],type:"final",image:"opening.svg",text:"Os detetives retiram do equipamento a peça responsável por iniciar as passagens temporais. Sem ela, a máquina não poderá ser acionada novamente.\n\nZebriúson permanece capturado. Depois de mais de cem anos atravessando diferentes épocas, suas viagens chegam ao fim.\n\nOs detetives descobrem a verdade sobre os estrondos, a máquina escondida, a participação do antigo prefeito e a verdadeira origem de Zebriúson.\n\nFinal 1 — A Verdade.",choices:[{label:"Voltar ao início",to:"start"}]},
  finalReal50:{title:"FINAL 1 — A VERDADE",type:"final",image:"opening.svg",text:"Os detetives impedem o acionamento do equipamento e compreendem a verdade sobre os acontecimentos do bairro.",choices:[{label:"Voltar ao início",to:"start"}]},
  final100:{title:"FINAL 2 — CEM ANOS ATRÁS",type:"final",image:"opening.svg",text:"Zebriúson aciona o equipamento. Uma forte luz toma conta do local. Por alguns instantes, os detetives não conseguem enxergar nada. Quando a luz desaparece, o silêncio toma conta do ambiente.\n\nAos poucos, eles percebem que alguma coisa mudou. A construção, que antes estava abandonada e tomada pelos escombros, agora está conservada. Do lado de fora, o bairro também parece diferente. As ruas estão movimentadas, as casas possuem outra aparência e as pessoas circulam pelas ruas com roupas de uma época distante.\n\nOs detetives saem da construção e observam o que está ao redor. Tudo aquilo que conheciam parece ter desaparecido. O bairro, porém, continua no mesmo lugar, apenas não pertence mais à época que conheciam.\n\nEnquanto observam uma das construções próximas, eles encontram uma inscrição com uma data: 1926.\n\nOs detetives percebem então a dimensão do que aconteceu. Não estavam apenas diante de um bairro diferente. Haviam sido levados para outro período da história.\n\nCem anos no passado.\n\nPresos em 1926, precisam encontrar uma maneira de retornar ao seu próprio tempo.\n\nFim da rota.",choices:[{label:"Voltar ao início",to:"start"}]},
  finalMorte:{title:"FINAL 3 — MORTE DO DETETIVE",type:"final",image:"opening.svg",text:"Um dos detetives não sobrevive ao ataque ocorrido durante o caminho da Casa 54.",choices:[{label:"Voltar ao início",to:"start"}]},
  finalSemProvas48:{title:"INVESTIGAÇÃO SEM PROVAS SUFICIENTES",characters:["detetive1","detetive2","rosivalda"],type:"final",image:"rosivalda.svg",text:"Os detetives não conseguem identificar a jovem fotografada nem confirmar a verdadeira origem de Rosivalda.\n\nO final correto não foi alcançado.",choices:[{label:"Voltar ao início",to:"start"}]},
  finalRosivalda:{title:"FINAL 4 — A VERDADE SOBRE ROSIVALDA",characters:["detetive1","detetive2","rosivalda"],type:"final",image:"rosivalda.svg",text:"Os detetives mostram o jornal e as fotografias a Rosivalda. Mesmo sem possuir lembranças de 1976, ela compreende que é a jovem desaparecida registrada nos documentos.\n\nDiante de todas as provas, eles contam a verdade: Rosivalda veio do passado. Ela desapareceu em 1976 e reapareceu muitos anos depois, tornando-se a única moradora do bairro abandonado.\n\nOs detetives descobriram sua verdadeira identidade, mas não encontraram qualquer explicação para a passagem entre as duas épocas.\n\nComo isso aconteceu permanece um mistério.\n\nFinal 4 — A verdade sobre Rosivalda.",choices:[{label:"Voltar ao início",to:"start"}]}
};

/*
 * CONTINUAÇÕES INDEPENDENTES DO FINAL 3
 * As cenas abaixo são cópias isoladas das investigações dos finais 1 e 4.
 * Seus identificadores, condições e destinos são próprios: nenhuma delas
 * libera ou altera os finais originais.
 */
(function createFinal3IndependentRoutes(){
  const cloneRoute = (prefix, ids, baseCharacters, specialCharacters, firstFriend, overrides = {}) => {
    const allowed = new Set(ids);
    const mapId = id => allowed.has(id) ? `${prefix}${id}` : id;

    ids.forEach(id => {
      const original = window.STORY[id];
      if(!original) return;

      const scene = {
        ...original,
        text:original.text
          .replaceAll("Um dos detetives", firstFriend)
          .replaceAll("um dos detetives", firstFriend)
          .replaceAll("O outro detetive", "O detetive sobrevivente")
          .replaceAll("o outro detetive", "o detetive sobrevivente")
          .replaceAll("Os detetives", "Eles")
          .replaceAll("os detetives", "eles")
          .replaceAll("dos detetives", "da equipe")
          .replaceAll("pelos detetives", "pela equipe"),
        characters:[...baseCharacters],
        choices:(original.choices || [])
          .filter(choice => choice.to === "start" || allowed.has(choice.to))
          .map(choice => ({
            ...choice,
            to:mapId(choice.to),
            ...(choice.requiresVisited ? {requiresVisited:mapId(choice.requiresVisited)} : {}),
            ...(choice.requiresMissing ? {requiresMissing:mapId(choice.requiresMissing)} : {})
          }))
      };

      delete scene.speaker;
      if(specialCharacters[id]) scene.characters = [...baseCharacters, ...specialCharacters[id]];
      if(overrides[id]) Object.assign(scene, overrides[id]);
      window.STORY[`${prefix}${id}`] = scene;
    });
  };

  const final1Ids = [
    "casa80","c80_marcas","c80_marcas_seguir","c80_marcas_paredes","c80_parede","c80_buraco","c80_ir20",
    "c80_objetos","c80_caixa","c80_peca","intersecao12","casa20","c20_gaveta","c20_nome","c20_simbolo",
    "diario80","diario_ler","diario_paginas","diario_guardar","centro80","exmorador80","exmorador_acontecimentos",
    "exmorador_equipamento","discoteca80","descoberta80","descoberta_aproximar","descoberta_observar","figura80",
    "f1_impedir","f1_capturado","f1_funcionamento","f1_estrondos","f1_destino","f1_tempo_uso",
    "f1_quantidade_viagens","f1_retorno_bairro","f1_viagens","f1_segredo","f1_prefeito","f1_riscos","f1_reunir","finalReal"
  ];
  const final1Special = {};
  ["figura80","f1_impedir","f1_capturado","f1_funcionamento","f1_estrondos","f1_destino","f1_tempo_uso",
   "f1_quantidade_viagens","f1_retorno_bairro","f1_viagens","f1_segredo","f1_prefeito","f1_riscos","f1_reunir","finalReal"]
    .forEach(id => final1Special[id] = ["zebriuson"]);

  cloneRoute("f3a_", final1Ids, ["detetive1","fredilson","uberliuson"], final1Special, "Fredilson", {
    finalReal:{
      title:"CONTINUAÇÃO DO FINAL 3 — A VERDADE",
      text:"O grupo desativa a máquina e encerra as viagens de Zebriúson.\n\nA equipe descobre a verdade sobre os estrondos, o equipamento escondido, a participação do antigo prefeito e a origem do viajante do tempo. Também esclarece que ele utilizou o disfarce de palhaço para tentar interromper a investigação.\n\nEssa investigação pertence exclusivamente à continuação do caminho iniciado na Casa 54.",
      choices:[{label:"Voltar ao início",to:"start"}]
    }
  });

  window.STORY.f3a_f1_impedir.choices = [{label:"Questionar o disfarce encontrado",to:"f3a_reconhecer_palhaco"}];
  window.STORY.f3a_reconhecer_palhaco = {
    title:"A IDENTIDADE DO PALHAÇO",
    characters:["detetive1","fredilson","uberliuson","zebriuson"],
    type:"climax",
    image:"opening.svg",
    text:"Ao impedir o acionamento, a equipe encontra perto do painel a máscara utilizada na Casa 1. Partes do mesmo traje ainda estão entre os objetos de Zebriúson.\n\nAs evidências revelam que ele era a figura de palhaço que atacou os detetives.",
    choices:[{label:"Perguntar por que ele atacou o detetive",to:"f3a_motivo_ataque"}]
  };
  window.STORY.f3a_motivo_ataque = {
    title:"O MOTIVO DO ATAQUE",
    characters:["detetive1","fredilson","uberliuson","zebriuson"],
    type:"climax",
    image:"opening.svg",
    text:"Confrontado, Zebriúson admite que usou o disfarce para assustar qualquer pessoa que se aproximasse da máquina. Quando percebeu que a investigação continuaria, atacou o detetive para impedir que o equipamento fosse encontrado.\n\nDepois dessa revelação, a equipe exige que ele explique a verdadeira função da máquina.",
    choices:[{label:"Exigir uma explicação sobre a máquina",to:"f3a_f1_capturado"}]
  };

  const final4Ids = [
    "casa48","c48_pessoas","c48_ampliar","c48_mostrar","c48_data","c48_inscricao","c48_estabelecimento",
    "discoteca48","d48_fotos","d48_comparar_fotos","d48_identificacao","d48_disco","d48_capa","d48_ouvir",
    "d48_materiais","d48_cartaz","d48_apresentacao","biblioteca48","b48_jornais","b48_comparar_noticia",
    "b48_verificar_identidade","b48_moradores","b48_livros","desfecho48","finalSemProvas48","finalRosivalda"
  ];
  const final4Special = {};
  ["c48_mostrar","desfecho48","finalSemProvas48","finalRosivalda"].forEach(id => final4Special[id] = ["rosivalda"]);

  cloneRoute("f3b_", final4Ids, ["detetive1","gustavo","avenildo"], final4Special, "Gustavo", {
    finalSemProvas48:{
      title:"CONTINUAÇÃO DO FINAL 3 — PROVAS INSUFICIENTES",
      text:"O grupo não consegue identificar a jovem fotografada nem confirmar a verdadeira origem de Rosivalda.\n\nO final correto não foi alcançado.",
      choices:[{label:"Voltar ao início",to:"start"}]
    },
    finalRosivalda:{
      title:"CONTINUAÇÃO DO FINAL 3 — A VERDADE SOBRE ROSIVALDA",
      text:"Eles mostram o jornal e as fotografias a Rosivalda. Mesmo sem possuir lembranças de 1976, ela compreende que é a jovem desaparecida registrada nos documentos.\n\nDiante das provas, o grupo explica que Rosivalda veio do passado. A investigação revela sua verdadeira origem, mas não explica como ocorreu a passagem entre as épocas.\n\nEssa investigação pertence exclusivamente à continuação do caminho iniciado na Casa 54.",
      choices:[{label:"Voltar ao início",to:"start"}]
    }
  });
})();
