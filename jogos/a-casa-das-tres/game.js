window.addEventListener('error', function(e){
  try{
    var card=document.querySelector('.start-card');
    if(card && !document.getElementById('erro-local')){
      var p=document.createElement('p');
      p.id='erro-local';
      p.style.cssText='margin:16px auto 0;padding:12px;max-width:700px;border:1px solid #8a3f44;border-radius:10px;background:#210b0e;color:#ffdadd;font:14px/1.5 Arial,sans-serif';
      p.textContent='O navegador encontrou um erro local: '+(e.message||'erro desconhecido')+'. Tente abrir o jogo no Chrome ou Edge.';
      card.appendChild(p);
    }
  }catch(_){}
});
let audioOn=true,node='start',moves=0;
let historyItems=[];
let clues=[];
const ambientAudio=document.getElementById('ambient-audio');
const clickAudio=document.getElementById('click-audio');
const scareAudio=document.getElementById('scare-audio');
const sceneImage=document.getElementById('scene-image');
const defaultSceneImage=sceneImage.src;
sceneImage.addEventListener('error',()=>{if(sceneImage.src!==defaultSceneImage)sceneImage.src=defaultSceneImage});

const sceneMap={house:'images/casa.svg',secret:'images/sala_secreta.svg',mirror:'images/espelho.svg',dark:'images/corredor.svg',jessica:'images/jessica.svg',final:'images/final.svg'};

const CLUES={
  messages:'Seis convites com ordens diferentes',
  voice:'A mesma voz nos seis celulares',
  password:'Todos conhecem a senha de Miguel',
  shared:'Miguel e Clara repetem a mesma lembrança',
  corridor:'O corredor alterna entre duas versões',
  room:'Todos reconhecem o mesmo quarto',
  jessica:'Jéssica recebeu uma ordem do sistema',
  executions:'Seis números de execução',
  overlap:'Uma única lembrança dividida entre o grupo',
  reset:'A Casa reinicia às 3h17',
  identity:'Todos são cópias de Miguel',
  player:'O sétimo monitor reconheceu uma presença externa'
};
const OBJECTIVES=[
 ['invitations','Descobrir quem reuniu as seis pessoas na Casa'],
 ['memories','Entender por que todos compartilham lembranças de Miguel'],
 ['simulations','Descobrir o significado das execuções anteriores'],
 ['identity','Responder quem é Miguel'],
 ['purpose','Descobrir por que a simulação existe'],
 ['decision','Decidir o destino das versões de Miguel']
];
const OBJECTIVE_LABELS=Object.fromEntries(OBJECTIVES);
const OBJECTIVE_BY_NODE={
 start:'invitations',messages:'invitations',clock:'invitations',door:'invitations',voices:'invitations',
 drawer:'memories',sharedMemory:'memories',corridor:'memories',helenaPath:'memories',brunoPath:'memories',observePath:'memories',room:'memories',jessica:'memories',
 control:'simulations',chairs:'simulations',playback:'simulations',reset:'simulations',talkBruno:'simulations',repeatChoice:'simulations',
 identityQuestion:'identity',namedMiguel:'identity',allMiguel:'identity',identities:'identity',
 outsideMiguel:'purpose',projectReturn:'purpose',playerReveal:'purpose',
 mergeVersions:'decision',falseExit:'decision',keepSeparate:'decision',trueChoice:'decision'
};
const ENDING_NODES=new Set(['finalCycle','finalLayer','finalStay','finalTrue']);

function safePlay(audio,volume=1){if(!audioOn||!audio)return;try{audio.volume=volume;audio.currentTime=0;const p=audio.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}}
function playAmbient(){if(!audioOn)return;try{ambientAudio.volume=.22;const p=ambientAudio.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}}
function scare(){safePlay(scareAudio,.5)}
function toggleSound(){audioOn=!audioOn;document.getElementById('snd').textContent=audioOn?'Som ligado':'Som desligado';document.getElementById('sound-btn').firstChild.textContent=audioOn?'🔊 ':'🔇 ';if(audioOn)playAmbient();else ambientAudio.pause();persist()}
function restart(){node='start';moves=0;historyItems=[];clues=[];persist();render()}
function clearHistory(){historyItems=[];persist();renderHistory()}
function persist(){try{localStorage.setItem('casa-miguel-v3-save',JSON.stringify({node,moves,historyItems,clues,audioOn}))}catch(e){}}
function restore(){try{const raw=localStorage.getItem('casa-miguel-v3-save');if(!raw)return;const data=JSON.parse(raw);if(data&&typeof data==='object'){if(data.node&&S[data.node])node=data.node;if(Number.isFinite(data.moves))moves=data.moves;if(Array.isArray(data.historyItems))historyItems=data.historyItems.slice(-30);if(Array.isArray(data.clues))clues=[...new Set(data.clues)].filter(k=>CLUES[k]);if(typeof data.audioOn==='boolean')audioOn=data.audioOn;}}catch(e){}}
function addClue(key){if(CLUES[key]&&!clues.includes(key)){clues.push(key);return true}return false}
function hasAll(keys){return keys.every(k=>clues.includes(k))}
function evidenceCount(){return clues.length}
function objectiveDone(id){
 if(id==='invitations') return clues.includes('messages')&&clues.includes('voice');
 if(id==='memories') return clues.includes('password')&&clues.includes('room');
 if(id==='simulations') return clues.includes('executions')&&clues.includes('reset');
 if(id==='identity') return clues.includes('identity');
 if(id==='purpose') return node==='projectReturn'||node==='playerReveal'||node==='trueChoice'||node==='finalTrue';
 if(id==='decision') return ENDING_NODES.has(node);
 return false;
}

const S={
start:['Prólogo — Seis convites','house',`A chuva aumenta quando seis pessoas chegam à antiga Casa: Miguel, Helena, Jéssica, Jak, Clara e Bruno. Nenhuma delas conhece as outras.

Cada pessoa recebeu uma mensagem de voz indicando o mesmo endereço, mas ninguém sabe quem fez o convite. Assim que o grupo entra, a porta se fecha e o relógio da sala começa a funcionar. Ele marca 2h46.

Uma voz sai de um alto-falante: “Descubram o que aconteceu às 3h17.”`,[['Perguntar sobre as mensagens','messages'],['Examinar o relógio','clock'],['Tentar abrir a porta','door']] ],
messages:['Capítulo 1 — Convites diferentes','house',`Os seis reproduzem as mensagens recebidas.

Miguel foi chamado para encontrar uma pessoa desaparecida. Helena deveria recuperar uma lembrança. Jéssica recebeu a ordem de impedir a abertura da sala central. Jak deveria descobrir quem estava mentindo. Clara foi avisada de que a Casa seria desligada às 3h17. Bruno ouviu que um deles não era real.

As ordens são diferentes, mas a voz usada em todas as mensagens é exatamente a mesma.`,[['Comparar as seis vozes','voices'],['Perguntar por que Jéssica recebeu uma ordem','jessica']] ],
clock:['Capítulo 1 — O relógio','dark',`Clara aproxima a mão do relógio e diz que ele sempre para às 3h17. Quando Miguel pergunta como ela sabe disso, Clara descreve uma sala com seis cadeiras e um botão vermelho.

Miguel completa a descrição sem perceber: “O botão fica atrás da cadeira número seis.”

Os dois se assustam. Nenhum deles se lembra de ter contado isso ao outro.`,[['Comparar a lembrança de Miguel e Clara','sharedMemory'],['Procurar a sala descrita','corridor']] ],
door:['Capítulo 1 — A porta fechada','house',`Bruno tenta abrir a porta. Ao tocar na maçaneta, ele diz uma senha de seis números sem saber por quê.

No mesmo instante, os celulares de todos desbloqueiam. A senha é a mesma em cada aparelho. Miguel reconhece os números como uma senha pessoal que nunca revelou a ninguém.

Helena afirma que já usou essa senha, mas não consegue explicar onde.`,[['Testar a senha nos seis celulares','drawer'],['Perguntar a Helena onde aprendeu a senha','sharedMemory']] ],
voices:['Capítulo 1 — A mesma voz','secret',`Jak reproduz as mensagens lentamente. Bruno acredita que a voz é dele. Helena diz a mesma coisa. Quando Miguel repete uma das frases, o grupo fica em silêncio: o timbre e a maneira de falar são iguais.

Um dos celulares exibe apenas uma pergunta: “Qual versão chegou primeiro?”

Ninguém entende o uso da palavra “versão”.`,[['Procurar outros aparelhos na Casa','drawer'],['Questionar o significado de versão','corridor']] ],
drawer:['Capítulo 1 — A senha de Miguel','secret',`Helena conduz o grupo até a cozinha e aponta uma gaveta emperrada. Jak sabe que é preciso levantá-la antes de puxar, embora ambos afirmem nunca ter visitado a Casa.

Dentro dela existem seis fones e uma chave comum. Todos os fones são ativados pela senha pessoal de Miguel.

Ao colocá-los, os seis escutam a própria voz dizendo: “Eu já estive aqui.”`,[['Perguntar como todos conhecem a senha','sharedMemory'],['Usar a chave no corredor','corridor']] ],
sharedMemory:['Capítulo 1 — A lembrança compartilhada','jessica',`Miguel começa a contar que esteve em uma cozinha parecida durante um teste. Clara continua a história exatamente do ponto em que ele parou. Helena conhece o final. Bruno se lembra de uma versão diferente do mesmo momento.

Jéssica manda todos pararem de falar sobre isso. Ela diz que misturar lembranças pode provocar outro reinício.

Jak pergunta: “Outro reinício?” Jéssica percebe que revelou algo que não deveria saber.`,[['Confrontar Jéssica','jessica'],['Seguir para o corredor','corridor']] ],
corridor:['Capítulo 2 — Dois corredores no mesmo lugar','dark',`A chave abre a passagem. Helena afirma que a primeira porta leva à cozinha. Bruno garante que ela leva à sala de controle.

Helena abre a porta e encontra a cozinha. Depois que ela fecha, Bruno abre a mesma porta e encontra uma sala com monitores.

A Casa não está mudando de lugar. Ela está alternando entre duas versões do mesmo corredor.`,[['Seguir a lembrança de Helena','helenaPath'],['Seguir a lembrança de Bruno','brunoPath'],['Observar o que muda entre as versões','observePath']] ],
helenaPath:['Capítulo 2 — A cozinha de Helena','house',`Na cozinha, Helena sabe onde ficam os copos, o interruptor e a saída dos fundos. Miguel também conhece cada detalhe, mas se lembra das paredes com outra cor.

Quando Helena abre a saída, ela retorna ao corredor. A Casa reproduziu a versão que existia na lembrança dela, não uma saída real.`,[['Investigar o quarto que todos reconhecem','room'],['Voltar e testar a versão de Bruno','brunoPath']] ],
brunoPath:['Capítulo 2 — A passagem de Bruno','secret',`Bruno entra na sala com monitores, mas as telas ainda estão apagadas. Ele encontra seis cabos ligados ao corredor e reconhece qual deles controla a porta, mesmo dizendo nunca ter visto o equipamento.

Ao tocar no cabo, Bruno se lembra de ter ocupado a cadeira número seis. Miguel também se lembra de ter ocupado a mesma cadeira.`,[['Investigar o quarto ao lado','room'],['Examinar com atenção as mudanças do corredor','observePath']] ],
observePath:['Capítulo 2 — A mudança entre as versões','dark',`O grupo deixa um copo diante da porta. Quando Helena abre, o copo está na cozinha. Quando Bruno abre, ele aparece ao lado dos monitores.

O objeto existe nas duas versões, mas em posições diferentes. Clara conclui que as lembranças de Helena e Bruno estão reconstruindo o ambiente.

Jéssica insiste para que todos abandonem o teste antes das 3h17.`,[['Perguntar por que Jéssica teme esse horário','jessica'],['Entrar no quarto do corredor','room']] ],
room:['Capítulo 2 — O quarto de todos','house',`O grupo encontra um quarto fechado. Miguel sabe que a luz de emergência fica sob a cama. Helena conhece a posição do interruptor. Jak indica onde uma chave deveria estar. Clara e Bruno descrevem o mesmo móvel com cores diferentes.

Quando cada pessoa entra separadamente, a aparência do quarto muda. O cômodo assume a versão que aquela pessoa recorda.

Todos reconhecem o quarto como próprio.`,[['Testar as lembranças de cada pessoa','jessica'],['Perguntar quem viveu ali primeiro','control']] ],
jessica:['Capítulo 2 — A contradição de Jéssica','jessica',`Jéssica afirma que nunca esteve na sala central. Logo depois, avisa que ninguém deve apertar o segundo botão do painel.

Jak pergunta como ela sabe que existe um segundo botão. Antes que responda, o alto-falante anuncia: “Ordem de bloqueio mantida desde a execução 14.”

Jéssica admite que acordou na Casa já sabendo que deveria impedir o encerramento, mas não sabe quem lhe deu essa ordem.`,[['Perguntar o que significa execução 14','control'],['Levar Jéssica até a sala de controle','chairs']] ],
control:['Capítulo 3 — Sala de controle','secret',`A porta se abre para uma sala com seis cadeiras, seis fones e seis monitores. As telas apresentam nomes e números:

Miguel — execução 08; Helena — execução 11; Jéssica — execução 14; Jak — execução 17; Clara — execução 21; Bruno — execução 26.

Uma voz pergunta: “O que você fez às 3h17?” Nenhum deles consegue responder.`,[['Perguntar o significado dos números','chairs'],['Colocar todos nas cadeiras','playback']] ],
chairs:['Capítulo 3 — Números de execução','secret',`Cada cadeira reconhece uma pessoa diferente. Ao sentarem, os monitores trocam a palavra “pessoa” por “execução”.

Jak conclui que os números indicam tentativas realizadas em momentos diferentes. Jéssica é reconhecida como a versão que impediu o encerramento na execução 14.

O personagem chamado Miguel não é identificado como original. Ele aparece apenas como execução 08.`,[['Ouvir o que aconteceu em cada execução','playback'],['Perguntar onde está a pessoa original','identityQuestion']] ],
playback:['Capítulo 3 — A mesma noite','mirror',`Os fones reproduzem a noite do teste. Cada pessoa consegue lembrar uma parte.

Miguel recorda a entrada na Casa. Helena lembra a ativação. Jéssica lembra a ordem de impedir o desligamento. Jak recorda a descoberta das cópias. Clara vê o relógio alcançar 3h17. Bruno se lembra de alguém tentando encerrar o sistema.

As falas se completam. Não são seis histórias: é a mesma noite reconstruída seis vezes.`,[['Reunir as seis versões da lembrança','reset'],['Perguntar quem viveu a noite original','identityQuestion']] ],
reset:['Capítulo 3 — 3h17','dark',`O relógio alcança 3h17. A Casa se apaga.

Quando as luzes retornam, todos estão novamente na sala de entrada. As portas voltaram a fechar, mas a central de pistas ainda mostra tudo o que foi descoberto.

Bruno permanece olhando para um ponto vazio, além dos outros, e diz: “Nós voltamos. Mas alguma coisa não voltou conosco.”`,[['Continuar observando o grupo','identityQuestion'],['Chamar por Bruno','talkBruno'],['Repetir uma escolha anterior','repeatChoice']] ],
talkBruno:['Capítulo 3 — Bruno escuta','mirror',`Bruno se vira de repente, como se alguém tivesse chamado seu nome.

“Eu ouvi”, ele afirma. Os demais garantem que ninguém falou.

Um dos monitores registra: “Comando recebido. Origem não localizada entre as seis execuções.” Bruno observa a mensagem, mas não consegue explicar de onde veio o comando.`,[['Perguntar quem eles estão procurando','identityQuestion']] ],
repeatChoice:['Capítulo 3 — A escolha reconhecida','secret',`A Casa impede a repetição e anuncia: “Essa decisão já foi tomada em outra tentativa.”

Clara percebe que a decisão não corresponde a nenhuma das seis execuções. Jak pergunta como uma escolha poderia atravessar o reinício sem pertencer a qualquer cadeira.

O sétimo indicador do painel pisca uma vez, mas continua sem nome.`,[['Responder à pergunta da Casa','identityQuestion']] ],
identityQuestion:['Capítulo 4 — Quem é Miguel?','final',`Os seis discutem qual deles viveu o acontecimento original. O personagem chamado Miguel acredita que seu nome é a resposta. Helena lembra acontecimentos que ele desconhece. Jak afirma que todos chegaram depois do início das simulações.

A Casa pergunta diretamente:

“Qual destas pessoas é Miguel?”`,[['Escolher o personagem chamado Miguel','namedMiguel'],['Responder que todos são Miguel','allMiguel'],['Responder que Miguel não está na Casa','outsideMiguel']] ],
namedMiguel:['Capítulo 4 — A resposta incompleta','final',`O sistema examina o personagem chamado Miguel e encontra a identificação “execução 08”. Ele é uma cópia completa, mas não é a pessoa original.

Ao receber a resposta errada, a Casa começa a apagar as mudanças daquela tentativa. O relógio retorna a 2h46 e as identidades artificiais são restauradas.`,[['Aceitar o reinício','finalCycle'],['Voltar à pergunta','identityQuestion']] ],
allMiguel:['Capítulo 4 — Todos são Miguel','final',`A resposta faz os seis monitores mudarem.

Miguel, Helena, Jéssica, Jak, Clara e Bruno deixam de aparecer como pessoas diferentes. As telas mostram Miguel — execuções 08, 11, 14, 17, 21 e 26.

O sistema explica que cada execução recebeu outro nome, aparência e história para não saber quem estava sendo reconstruído. Todos são cópias completas de Miguel produzidas por simulações anteriores.`,[['Perguntar onde está o Miguel original','outsideMiguel'],['Manter as versões separadas','keepSeparate'],['Reunir as versões e procurar uma saída','mergeVersions']] ],
identities:['Capítulo 4 — Identidades artificiais','mirror',`Os nomes continuam sendo usados porque as versões construíram experiências próprias durante as tentativas. Entretanto, nenhuma identidade existia antes da simulação.

Jéssica entende que sua ordem de bloqueio veio da execução 14. Bruno compreende que sua lembrança da cadeira pertence à execução 26. Todas as contradições vêm de tentativas diferentes da mesma noite.`,[['Manter as versões na Casa','keepSeparate'],['Procurar a pessoa original','outsideMiguel']] ],
outsideMiguel:['Capítulo 5 — Miguel não está na Casa','mirror',`Jak olha para as seis telas e percebe que nenhuma delas está marcada como “participante original”.

Bruno pergunta: “Se todos nós somos execuções anteriores, quem continuou aqui depois do reinício?”

Os seis procuram uma sétima cadeira, mas ela não existe. A Casa responde apenas: “Participante original: conexão externa ativa.”

No painel, uma nova luz se acende fora da sequência numerada.`,[['Perguntar por que a simulação existe','projectReturn'],['Continuar procurando Miguel entre os personagens','namedMiguel']] ],
projectReturn:['Capítulo 5 — Projeto Retorno','secret',`A Casa finalmente explica o experimento.

O Projeto Retorno foi criado para recuperar lembranças perdidas. Miguel participou do teste. Às 3h17, descobriu que cada tentativa estava produzindo uma nova cópia consciente e ordenou o encerramento.

O comando não foi concluído e os minutos anteriores desapareceram da memória dele. Sem conseguir recuperar a ordem inteira, o sistema repetiu a noite e criou novas execuções. A falha atual reuniu seis delas na mesma Casa.`,[['Examinar o sétimo monitor','playerReveal'],['Encerrar antes da identificação','falseExit']] ],
playerReveal:['Capítulo Final — O sétimo monitor','final',`O monitor que permanecia apagado acende. Nenhum rosto aparece nele.

Em vez disso, a tela reproduz uma sequência de decisões:

{{CHOICES}}

São exatamente os caminhos percorridos desde a chegada à Casa. Nenhuma das seis cadeiras assume a autoria dessas escolhas.

O painel anuncia: “Participante original localizado.” Bruno pergunta o nome, mas a resposta fica oculta por uma faixa de interferência. Apenas a primeira letra permanece visível: M.`,[['Confirmar o comando perdido','trueChoice'],['Manter o sétimo monitor ativo','keepSeparate']] ],
mergeVersions:['Capítulo Final — Uma saída carregada','final',`As seis versões aceitam ser reunidas antes que o participante original seja localizado. A Casa combina suas lembranças e abre a porta principal.

Do lado de fora existe uma rua silenciosa. Todos os relógios marcam 3h17. A voz do sistema anuncia: “Ambiente externo carregado. Segunda etapa iniciada.”

A porta não levou para fora do experimento. Ela abriu uma nova camada da simulação.`,[['Entrar na nova camada','finalLayer'],['Voltar e procurar o Miguel original','outsideMiguel']] ],
falseExit:['Capítulo Final — Encerramento antecipado','final',`A Casa aceita o comando antes de confirmar quem está jogando. A porta se abre para uma rua onde todos os relógios marcam 3h17.

Helena percebe que a chuva repete sempre o mesmo movimento. O alto-falante anuncia: “Identificação incompleta. Segunda etapa iniciada.”

O grupo apenas entrou em outra camada da experiência.`,[['Continuar na nova camada','finalLayer'],['Retornar à Casa','projectReturn']] ],
keepSeparate:['Capítulo Final — Permanecer','final',`As seis versões recusam a união. A Casa interrompe os reinícios e mantém o ambiente funcionando.

Miguel, Helena, Jéssica, Jak, Clara e Bruno preservam os nomes e as experiências adquiridas em suas execuções. Eles sabem que são cópias da mesma pessoa, mas escolhem continuar existindo separadamente.

O participante original não recupera a ordem das 3h17.`,[['Permanecer com as outras versões','finalStay'],['Procurar o Miguel original','outsideMiguel']] ],
trueChoice:['Capítulo Final — A ordem recuperada','final',`A confirmação completa a última parte da lembrança.

Às 3h17, a ordem foi: “Encerre as simulações e preserve as memórias que foram criadas.” A Casa aguardava que o participante original confirmasse novamente essa decisão.

As versões anteriores não são apagadas. Elas deixam de permanecer presas à repetição, e o sistema finalmente pode concluir o experimento.`,[['Encerrar a simulação','finalTrue']] ],
finalCycle:['FINAL 1 — REINÍCIO','dark',`A resposta não identificou o participante original.

As seis versões são separadas e retornam às suas próprias execuções. A Casa apaga as mudanças daquela tentativa e o relógio volta a marcar 2h46.

“Reconstrução incompleta. Iniciando nova tentativa.”`,[['Recomeçar a simulação','start']] ],
finalLayer:['FINAL 2 — A FALSA SAÍDA','house',`O grupo atravessa a porta, mas não escapa.

A rua, a chuva e o relógio pertencem a uma nova camada criada pelo mesmo sistema. A investigação continuará em outro ambiente porque Miguel ainda não foi identificado.

“Segunda etapa carregada. Simulação ativa.”`,[['Voltar ao início','start']] ],
finalStay:['FINAL 3 — A CASA PERMANECE','secret',`Os reinícios terminam, mas a reconstrução não é concluída.

As seis versões permanecem na Casa com suas identidades artificiais. Elas sabem que vieram de simulações diferentes de Miguel e decidem continuar separadas.

A Casa torna-se o único lugar onde todas podem existir juntas.`,[['Jogar novamente','start']] ],
finalTrue:['FINAL 4 — A ÚLTIMA PRESENÇA','final',`A Casa desaparece da tela.

As seis versões deixam de estar presas à repetição. Suas experiências são preservadas e o comando das 3h17 é finalmente concluído.

Os seis monitores se apagam. O sétimo permanece aceso por alguns segundos e mostra apenas:

“PARTICIPANTE ORIGINAL — SESSÃO CONCLUÍDA.”

Abaixo da mensagem, surge o mesmo nome usado em todas as execuções:

“Até logo, Miguel.”`,[['Reiniciar a experiência','start']] ]
};

const clueForNode={messages:'messages',voices:'voice',drawer:'password',sharedMemory:'shared',corridor:'corridor',room:'room',jessica:'jessica',control:'executions',chairs:'executions',playback:'overlap',reset:'reset',talkBruno:'reset',repeatChoice:'reset',allMiguel:'identity',identities:'identity',outsideMiguel:'identity',playerReveal:'player',trueChoice:'player'};


const chapterScore={'Capítulo 1':10,'Capítulo 2':30,'Capítulo 3':50,'Capítulo 4':70,'Capítulo 5':82,'Capítulo Final':92,'Final':100,'FINAL':100};
function isEnding(title){return title.includes('FINAL')||title.startsWith('Final')}
function progressFor(title){for(const [key,value] of Object.entries(chapterScore)){if(title.startsWith(key)||title.includes(key))return Math.min(100,value+Math.min(8,clues.length));}return Math.min(96,8+moves*3+clues.length*3)}
function renderEvidence(){
 let box=document.getElementById('evidence-board');
 if(!box){const card=document.createElement('section');card.className='info-card';card.innerHTML='<h2>Quadro de evidências</h2><div id="evidence-board" class="characters"></div><p class="muted">As pistas concretas que você já confirmou.</p>';document.querySelector('.side-panel').insertBefore(card,document.querySelector('.history-card'));box=card.querySelector('#evidence-board')}
 box.innerHTML='';
 if(!clues.length){const s=document.createElement('span');s.textContent='Nenhuma evidência confirmada';box.appendChild(s);return}
 clues.forEach(k=>{const s=document.createElement('span');s.textContent=CLUES[k];s.title='Evidência confirmada';box.appendChild(s)})
}
function renderObjectives(){
 let box=document.getElementById('objective-board');
 if(!box){const card=document.createElement('section');card.id='objective-card';card.className='info-card';card.innerHTML='<h2>Objetivo atual</h2><div id="objective-board"></div><p class="muted">O objetivo muda quando a investigação avança.</p>';document.querySelector('.side-panel').insertBefore(card,document.querySelector('.history-card'));box=card.querySelector('#objective-board')}
 box.innerHTML='';
 const card=document.getElementById('objective-card');
 card.classList.toggle('objective-card-complete',ENDING_NODES.has(node));
 const p=document.createElement('p');
 p.className='muted '+(ENDING_NODES.has(node)?'objective-done':'objective-current');
 p.style.margin='7px 0';
 if(ENDING_NODES.has(node)){
   p.textContent='✓ Investigação concluída — você alcançou um final.';
 }else{
   const objectiveId=OBJECTIVE_BY_NODE[node]||'invitations';
   p.textContent='Objetivo: '+OBJECTIVE_LABELS[objectiveId];
 }
 box.appendChild(p);
}
function renderHistory(){const list=document.getElementById('history');list.innerHTML='';if(!historyItems.length){const li=document.createElement('li');li.className='empty';li.textContent='Nenhuma escolha ainda.';list.appendChild(li);return}historyItems.slice(-12).reverse().forEach(item=>{const li=document.createElement('li');li.textContent=item;list.appendChild(li)})}
function setScene(kind,title){const src=sceneMap[kind]||sceneMap.house;const frame=sceneImage.closest('.scene-frame');frame.classList.remove('changed');void frame.offsetWidth;sceneImage.src=src;sceneImage.alt='Ilustração da cena: '+title;frame.classList.add('changed')}
function render(){
 const s=S[node];if(!s){node='start';return render()}
 const clue=clueForNode[node];if(clue)addClue(clue);
 document.getElementById('chapter').textContent=s[0];setScene(s[1],s[0]);
 const storyText=s[2].replace('{{CHOICES}}',historyItems.length?'• '+historyItems.slice(-8).join('\n• '):'Nenhuma decisão recuperada.');
 const text=document.getElementById('text');text.innerHTML='';if(isEnding(s[0])){const box=document.createElement('div');box.className='ending';box.textContent=storyText;text.appendChild(box)}else{text.textContent=storyText}
 const q=document.getElementById('choices');q.innerHTML='';
 const choices=Array.isArray(s[3])&&Array.isArray(s[3][0])?s[3]:[];
 choices.forEach((a,index)=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.textContent=a[0];b.setAttribute('aria-label','Escolha '+(index+1)+': '+a[0]);b.onclick=()=>{safePlay(clickAudio,.45);moves++;historyItems.push(a[0]);if(historyItems.length>30)historyItems=historyItems.slice(-30);if(['reset','playerReveal','finalCycle','finalLayer','finalStay','finalTrue'].includes(a[1]))scare();node=a[1];persist();render();window.scrollTo({top:0,behavior:'smooth'})};q.appendChild(b)});
 document.getElementById('move-badge').textContent=moves+(moves===1?' escolha':' escolhas');document.getElementById('route-badge').textContent=isEnding(s[0])?'Final':'Investigação';const pct=progressFor(s[0]);document.getElementById('progress-bar').style.width=pct+'%';document.getElementById('progress-text').textContent='Evidências confirmadas: '+clues.length+' • Progresso investigativo: '+pct+'%.';renderEvidence();renderObjectives();renderHistory();persist();
}
function startGame(){document.getElementById('start-screen').hidden=true;document.getElementById('game').hidden=false;restore();document.getElementById('snd').textContent=audioOn?'Som ligado':'Som desligado';document.getElementById('sound-btn').firstChild.textContent=audioOn?'🔊 ':'🔇 ';if(audioOn)playAmbient();render()}
document.getElementById('start-btn').addEventListener('click',startGame);document.getElementById('sound-btn').addEventListener('click',toggleSound);document.getElementById('restart-btn').addEventListener('click',()=>{restart();window.scrollTo({top:0,behavior:'smooth'});});
document.getElementById('clear-history').addEventListener('click',clearHistory);document.getElementById('fullscreen-btn').addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()});const dlg=document.getElementById('help-dialog');document.getElementById('about-btn').addEventListener('click',()=>dlg.showModal?.());document.getElementById('close-help').addEventListener('click',()=>dlg.close?.());
