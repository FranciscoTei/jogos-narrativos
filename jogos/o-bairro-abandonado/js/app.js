const $ = (s) => document.querySelector(s);

let current = "start";
let trail = ["start"];
let clues = [];
let visits = {};
let musicOn = false;
let speechPaused = false;
const ambient = new Audio("assets/audio/suspense.wav");
ambient.loop = true;
ambient.volume = 0.42;
ambient.preload = "auto";

const CHARACTERS = {
  detetive1:{name:"Detetive 1",image:"detetive-1.png"},
  detetive2:{name:"Detetive 2",image:"detetive-2.png"},
  rosivalda:{name:"Rosivalda",image:"rosivalda-personagem.png"},
  zebriuson:{name:"Zebriúson",image:"zebriuson.png"},
  fredilson:{name:"Fredilson",image:"fredilson.png"},
  uberliuson:{name:"Uberliuson",image:"uberliuson.png"},
  gustavo:{name:"Gustavo",image:"gustavo.png"},
  avenildo:{name:"Avenildo",image:"avenildo.png"},
  palhaco:{name:"Figura de palhaço",image:"palhaco.png"}
};

function charactersInScene(scene){
  if(Array.isArray(scene.characters)){
    return scene.characters.map(id => CHARACTERS[id]).filter(Boolean);
  }
  if(current === "start" || current === "rosivalda") return [CHARACTERS.rosivalda];
  if(["figura80","figura50","c50_perguntar_equipamento","final100"].includes(current)){
    return [CHARACTERS.zebriuson];
  }
  if(current === "acao" || isVisited("casa80") || isVisited("casa50")){
    return [CHARACTERS.detetive1, CHARACTERS.detetive2];
  }
  if(isVisited("casa48")) return [CHARACTERS.detetive1, CHARACTERS.detetive2];
  if(scene.speaker === "detetives") return [CHARACTERS.detetive1, CHARACTERS.detetive2];
  if(scene.image === "rosivalda.svg" || current === "finalRosivalda") return [CHARACTERS.rosivalda];
  return [];
}

const objectiveDefs = [
  {id:"rosivalda", label:"Conhecer Rosivalda", unlock:()=>isVisited("start"), done:()=>isVisited("rosivalda")},
  {id:"detetives", label:"Acionar os detetives", unlock:()=>isVisited("rosivalda"), done:()=>isVisited("acao")},
  {id:"caminho", label:"Investigar o caminho escolhido", unlock:()=>isVisited("acao"), done:()=>getRoute()!==null},
  {id:"pistas", label:"Reunir as pistas do caminho", unlock:()=>getRoute()!==null, done:()=>clues.length >= 2},
  {id:"pistasConvergentes", label:"Conectar as pistas", unlock:()=>getRoute()!==null, done:()=>isVisited("intersecao12") || isVisited("intersecao34")},
  {id:"descoberta", label:"Chegar à descoberta", unlock:()=>getRoute()!==null, done:()=>["descoberta80","c50_construcao","equipamento50","ataque54","biblioteca48","desfecho48"].some(isVisited)},
  {id:"final", label:"Concluir a investigação", unlock:()=>Object.values(FINAL_RULES).some(finalUnlocked), done:()=>STORY[current]?.type==="final"}
];

/*
 * Cada final possui uma rota própria e um conjunto de cenas obrigatórias.
 * A ordem das cenas é verificada: chegar a uma cena final por outra rota
 * não libera o desfecho.
 */
const FINAL_RULES = {
  finalReal: {
    label:"FINAL 1 — A VERDADE",
    route:"casa80",
    sequence:["acao","casa80","c80_marcas","c80_parede","casa20","c20_gaveta","diario80","centro80","exmorador80","descoberta80","figura80"],
    requiredEvidence:["c80_parede","c20_gaveta","diario80"],
    entry:"figura80"
  },
  final100: {
    label:"FINAL 2 — CEM ANOS ATRÁS",
    route:"casa50",
    sequence:["acao","casa50","c50_info_equipamento","c50_construcao","equipamento50","figura50","c50_perguntar_equipamento"],
    requiredEvidence:["c50_info_equipamento","c50_construcao","equipamento50","figura50","c50_perguntar_equipamento"],
    entry:"c50_perguntar_equipamento"
  },
  finalMorte: {
    label:"FINAL 3 — MORTE DO DETETIVE",
    route:"casa54",
    sequence:["acao","casa54","c54_pegadas","c54_fundos","c54_foto","intersecao34","casa1","c1_interior","ataque54"],
    requiredEvidence:["c54_foto","casa1","c1_interior","ataque54"],
    entry:"ataque54"
  },
  finalRosivalda: {
    label:"FINAL 4 — A VERDADE SOBRE ROSIVALDA",
    route:"casa48",
    sequence:["acao","casa48","discoteca48","biblioteca48","b48_jornais","desfecho48"],
    requiredEvidence:["discoteca48","biblioteca48","b48_jornais","desfecho48"],
    entry:"desfecho48"
  }
};

function containsOrdered(sequence){
  let pos = 0;
  for(const id of trail){
    if(id === sequence[pos]) pos++;
    if(pos === sequence.length) return true;
  }
  return false;
}

function finalUnlocked(finalId){
  const rule = FINAL_RULES[finalId];
  if(!rule || !isVisited(rule.route)) return false;
  if(!containsOrdered(rule.sequence)) return false;
  if(rule.requiredEvidence.some(id => !isVisited(id))) return false;
  return isVisited(rule.entry);
}

function getRoute(){
  for(const [id, rule] of Object.entries(FINAL_RULES)){
    if(finalUnlocked(id)) return id;
  }
  if(isVisited("casa80")) return "casa80";
  if(isVisited("casa50")) return "casa50";
  if(isVisited("casa54")) return "casa54";
  if(isVisited("casa48")) return "casa48";
  return null;
}

function canEnterFinal(id){
  return !!FINAL_RULES[id] && finalUnlocked(id);
}

function finalRequirementsText(id){
  const rule = FINAL_RULES[id];
  if(!rule) return "Final indisponível.";
  if(!finalUnlocked(id)) return "O final correto não foi alcançado.";
  return "Final liberado.";
}

function status(msg){
  const el = $("#accessStatus");
  if(el) el.textContent = msg;
}

function isVisited(id){
  return trail.includes(id);
}

async function startAmbient(){
  if (!ambient) {
    status("Arquivo de música não encontrado.");
    return false;
  }
  try {
    ambient.currentTime = 0;
    await ambient.play();
    musicOn = true;
    const b = $("#musicToggle");
    if (b) {
      b.setAttribute("aria-pressed","true");
      b.innerHTML = "♫ <span>MÚSICA: PARAR</span>";
    }
    status("Música de suspense iniciada.");
    return true;
  } catch (error) {
    console.error("Falha ao reproduzir a música:", error);
    musicOn = false;
    status("Não foi possível iniciar a música. Clique em MÚSICA: INICIAR.");
    return false;
  }
}

function stopAmbient(){
  if (!ambient) return;
  ambient.pause();
  ambient.currentTime = 0;
  musicOn = false;
  const b = $("#musicToggle");
  if (b) {
    b.setAttribute("aria-pressed","false");
    b.innerHTML = "♫ <span>MÚSICA: INICIAR</span>";
  }
  status("Música de suspense parada.");
}

function currentNarration(){
  const s = STORY[current];
  return `${s.title}. ${s.text}. ${s.choices.map(c => c.label + ".").join(" ")}`;
}

function narrateScene(){
  if(!("speechSynthesis" in window)){
    status("A narração por voz não está disponível neste navegador.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(currentNarration());
  u.lang = "pt-BR";
  u.rate = .92;
  u.pitch = .88;
  u.onstart = () => {
    speechPaused = false;
    const b=$("#narrate");
    if(b) b.setAttribute("aria-pressed","true");
    status("Narração iniciada.");
  };
  u.onend = () => {
    const b=$("#narrate");
    if(b) b.setAttribute("aria-pressed","false");
    status("Narração concluída.");
  };
  speechSynthesis.speak(u);
}

function togglePause(){
  if(!("speechSynthesis" in window)) return;
  if(speechSynthesis.speaking && !speechSynthesis.paused){
    speechSynthesis.pause();
    speechPaused = true;
    $("#pauseNarration").innerHTML = "▶ <span>CONTINUAR</span>";
    status("Narração pausada.");
  }else if(speechSynthesis.paused){
    speechSynthesis.resume();
    speechPaused = false;
    $("#pauseNarration").innerHTML = "Ⅱ <span>PAUSAR</span>";
    status("Narração continuada.");
  }
}

function updateSidebar(){
  const objectivesEl = $("#objectives");
  objectivesEl.innerHTML = objectiveDefs
    .filter(o => o.unlock())
    .map(o => {
      const done = o.done();
      return `<div class="objective ${done ? "done" : ""}">${o.label}</div>`;
    }).join("");

  $("#clues").innerHTML = clues.length
    ? clues.map(x => `<div class="clue">${x}</div>`).join("")
    : `<div class="clue">Nenhuma pista registrada.</div>`;

  const sidePath = $("#sidePath");
  if(sidePath){
    sidePath.innerHTML = trail.map((id,i) =>
      `<div class="path-step ${i === trail.length-1 ? "current" : ""}">
        <span class="num">${String(i+1).padStart(2,"0")}</span>
        <span>${STORY[id].title}</span>
      </div>`
    ).join("");
    sidePath.scrollTop = sidePath.scrollHeight;
  }

  $("#locations").textContent = new Set(trail).size;
  $("#visits").textContent = trail.length;
}


function updateProgress(){
  const unique = new Set(trail).size;
  const totalScenes = Object.keys(STORY).length;
  const pct = Math.min(100, Math.round(unique / totalScenes * 100));
  $("#bar").style.width = Math.max(8,pct) + "%";
  $("#pct").textContent = pct + "%";
}

function render(){
  const s = STORY[current];
  visits[current] = (visits[current] || 0) + 1;

  // A Biblioteca possui duas imagens: na primeira visita, dia; em retornos, noite.
  // As demais cenas usam a imagem definida diretamente no roteiro.
  let sceneImage = s.image;
  if (current === "biblioteca" && visits[current] > 1) sceneImage = "biblioteca-noite.png";
  $("#image").src = "assets/img/" + sceneImage;
  $("#image").alt = s.title;
  $("#title").textContent = s.title;
  const speakerPortrait = $("#speakerPortrait");
  const characterSide = $("#characterSide");
  const characterCards = $("#characterCards");
  const characterSideTitle = $("#characterSideTitle");
  const sceneCharacters = charactersInScene(s);
  speakerPortrait.hidden = true;
  speakerPortrait.setAttribute("aria-hidden", "true");
  characterSide.hidden = sceneCharacters.length === 0;
  characterSide.setAttribute("aria-hidden", sceneCharacters.length ? "false" : "true");
  characterSideTitle.textContent = sceneCharacters.length > 2 ? "PERSONAGENS" : (sceneCharacters.length > 1 ? "DETETIVES" : "PERSONAGEM");
  characterCards.classList.toggle("multiple", sceneCharacters.length > 1);
  characterCards.classList.remove("count-1","count-2","count-3");
  if(sceneCharacters.length) characterCards.classList.add(`count-${Math.min(3,sceneCharacters.length)}`);
  characterCards.innerHTML = sceneCharacters.map(character => `
    <div class="character-frame">
      <img src="assets/img/${character.image}" alt="${character.name}">
      <div class="character-frame-name">${character.name}</div>
    </div>`).join("");

  const narrative = $("#text");
  narrative.innerHTML = "";
  s.text.split(/\n\s*\n/).forEach(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph.trim();
    narrative.appendChild(p);
  });
  $("#crumb").textContent = "INVESTIGAÇÃO / " + s.title;

  const choices = $("#choices");
  choices.innerHTML = "";

  let visibleChoices = [...s.choices];

  visibleChoices.forEach(c => {
    const isFinalChoice = Object.prototype.hasOwnProperty.call(FINAL_RULES, c.to);
    const manuallyLocked = c.locked === true;
    const evidenceLocked = (c.requiresVisited && !isVisited(c.requiresVisited)) || (c.requiresMissing && isVisited(c.requiresMissing));
    const unlocked = !manuallyLocked && !evidenceLocked && (!isFinalChoice || canEnterFinal(c.to));
    const lockedMessage = evidenceLocked
      ? "Esta opção não corresponde às provas reunidas."
      : manuallyLocked
      ? "Esta opção está bloqueada neste caminho."
      : finalRequirementsText(c.to);
    const b = document.createElement("button");
    b.className = "choice" + (unlocked ? "" : " locked-choice");
    b.type = "button";
    b.disabled = !unlocked;
    b.innerHTML = `<span class="label">${c.label}${!unlocked ? " 🔒" : ""}</span>`;
    b.title = unlocked ? c.label : lockedMessage;
    b.addEventListener("click", () => {
      if(!unlocked){
        status(lockedMessage);
        return;
      }
      go(c.to);
    });
    choices.appendChild(b);
  });

  $("#back").disabled = trail.length <= 1;
  updateSidebar();
  updateProgress();
}

function go(id){
  const isFinalChoice = Object.prototype.hasOwnProperty.call(FINAL_RULES, id);
  if(isFinalChoice && !canEnterFinal(id)){
    status(finalRequirementsText(id));
    return;
  }
  if("speechSynthesis" in window) speechSynthesis.cancel();
  trail.push(id);
  current = id;

  const s = STORY[id];
  if(s.clue && !clues.includes(s.clue)) clues.push(s.clue);

  render();
  status("Cena carregada: " + s.title + ".");
  window.scrollTo({top:0, behavior:"smooth"});
}

function back(){
  if(trail.length <= 1) return;
  if("speechSynthesis" in window) speechSynthesis.cancel();
  trail.pop();
  current = trail[trail.length-1];
  render();
  status("Retornou à cena anterior.");
}

function reset(){
  if("speechSynthesis" in window) speechSynthesis.cancel();
  current = "start";
  trail = ["start"];
  clues = [];
  visits = {};
  render();
}

async function startInvestigation(){
  reset();

  const cover = $("#coverScreen");
  if(cover){
    cover.classList.add("hidden");
    cover.setAttribute("aria-hidden","true");
  }

  document.body.classList.add("game-started");
  const main = $("#main-content");
  if(main) main.focus({preventScroll:true});

  // O clique no botão libera o áudio no navegador.
  await startAmbient();
  status("Investigação iniciada.");
}





document.addEventListener("DOMContentLoaded", () => {
  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  };

  bind("coverStart", startInvestigation);
  bind("startGame", startInvestigation);

  bind("musicToggle", async () => {
    if (musicOn) stopAmbient();
    else await startAmbient();
  });

  bind("narrate", narrateScene);
  bind("pauseNarration", togglePause);
  bind("back", back);
  bind("path", () => {
    const modal = $("#modal");
    const list = $("#pathList");
    if(!modal || !list) return;
    list.innerHTML = trail.map((id,i) => `<div class="path-step ${i === trail.length-1 ? "current" : ""}"><span class="num">${String(i+1).padStart(2,"0")}</span><span>${STORY[id].title}</span></div>`).join("");
    modal.classList.add("show");
  });
  bind("reset", () => { reset(); status("Nova investigação iniciada."); });
  bind("close", () => { const modal=$("#modal"); if(modal) modal.classList.remove("show"); });
  const modalEl = $("#modal");
  if(modalEl) modalEl.addEventListener("click", (e) => { if(e.target === modalEl) modalEl.classList.remove("show"); });

  bind("fontUp", () => {
    document.body.classList.remove("small-text");
    document.body.classList.add("large-text");
    status("Texto ampliado.");
  });
  bind("fontDown", () => {
    document.body.classList.remove("large-text");
    document.body.classList.add("small-text");
    status("Texto reduzido.");
  });
  bind("contrastToggle", () => {
    document.body.classList.toggle("high-contrast");
    status(document.body.classList.contains("high-contrast")
      ? "Alto contraste ativado." : "Alto contraste desativado.");
  });
  bind("motionToggle", () => {
    document.body.classList.toggle("reduce-motion");
    status(document.body.classList.contains("reduce-motion")
      ? "Animações reduzidas." : "Animações normais.");
  });

  render();
});
