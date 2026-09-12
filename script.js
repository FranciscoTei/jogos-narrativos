/* Catálogo da exposição de jogos narrativos */

const gamesData = [
  {
    code: "01",
    id: "o-misterio-da-escola-mundial",
    title: "O Mistério da Escola Mundial",
    genre: "Mistério escolar",
    icon: "◎",
    overlayText: "UMA ESCOLA. MUITOS SEGREDOS.",
    available: false
  },
  {
    code: "02",
    id: "o-bairro-abandonado",
    title: "O Bairro Abandonado",
    genre: "Terror e mistério",
    icon: "⌂",
    overlayText: "ALGUNS BAIRROS NUNCA ESQUECEM.",
    image: "jogos/o-bairro-abandonado/assets/img/capa-o-bairro-abandonado.png",
    folder: "jogos/o-bairro-abandonado/index.html",
    available: true
  },
  {
    code: "03",
    id: "a-estatua-que-sussurrava",
    title: "A Estátua que Sussurrava",
    genre: "Mistério",
    icon: "♜",
    overlayText: "ALGUMAS ESTÁTUAS TAMBÉM FALAM.",
    available: false
  },
  {
    code: "04",
    id: "o-segredo-de-blackwood",
    title: "O Segredo de Blackwood",
    genre: "Suspense",
    icon: "♞",
    overlayText: "BLACKWOOD GUARDA UM SEGREDO.",
    available: false
  },
  {
    code: "05",
    id: "o-misterio-da-bola-de-ouro",
    title: "O Mistério da Bola de Ouro",
    genre: "Aventura",
    icon: "●",
    overlayText: "MAIS QUE UM JOGO. UM SEGREDO.",
    available: false
  },
  {
    code: "06",
    id: "a-casa-das-tres",
    title: "A Casa das Três",
    genre: "Suspense",
    icon: "👥",
    overlayText: "TRÊS PESSOAS. UMA CASA. MUITAS VERDADES.",
    image: "assets/game4.png",
    folder: "jogos/a-casa-das-tres/index.html",
    available: true
  },
  {
    code: "07",
    id: "a-pasta-de-dente-maligna",
    title: "A Pasta de Dente Maligna",
    genre: "Aventura",
    icon: "⚗",
    overlayText: "UMA EXPERIÊNCIA SAIU DO CONTROLE.",
    available: false
  },
  {
    code: "08",
    id: "a-casa-onde-ninguem-e-o-que-parece",
    title: "A Casa Onde Ninguém é o que Parece",
    genre: "Mistério",
    icon: "⌂",
    overlayText: "NINGUÉM É EXATAMENTE O QUE PARECE.",
    available: false
  },
  {
    code: "09",
    id: "a-vila-das-joias",
    title: "A Vila das Jóias",
    genre: "Investigação",
    icon: "◆",
    overlayText: "UMA COLEÇÃO DESAPARECIDA. UMA VILA DE SEGREDOS.",
    image: "jogos/a-vila-das-joias/assets/images/praca.png",
    folder: "jogos/a-vila-das-joias/index.html",
    available: true
  },
  {
    code: "10",
    id: "o-misterio-da-sala-fechada",
    title: "O Mistério da Sala Fechada",
    genre: "Mistério escolar",
    icon: "▣",
    overlayText: "A PORTA ESTAVA FECHADA. A RESPOSTA, NÃO.",
    image: "jogos/o-misterio-da-sala-fechada/assets/cenarios/capa-sala-fechada.png",
    folder: "jogos/o-misterio-da-sala-fechada/index.html",
    available: true
  },
  {
    code: "11",
    id: "o-roubo-da-taca-de-1966",
    title: "O Roubo da Taça de 1966",
    genre: "Investigação histórica",
    icon: "♛",
    overlayText: "A TAÇA SUMIU. O TEMPO NÃO MENTIU.",
    image: "jogos/o-roubo-da-taca-de-1966/assets/images/salao-desaparecimento-1966.png",
    folder: "jogos/o-roubo-da-taca-de-1966/index.html",
    available: true
  },
  {
    code: "12",
    id: "o-misterio-das-1545",
    title: "O Mistério das 15:45",
    genre: "Investigação histórica",
    icon: "◷",
    overlayText: "SEIS MINUTOS GUARDARAM UMA HISTÓRIA.",
    image: "jogos/O-misterio-das-1545/assets/images/museu-1545.png",
    folder: "jogos/O-misterio-das-1545/index.html",
    available: true
  },
  {
    code: "13",
    id: "onibus-1972",
    title: "Ônibus 1972",
    genre: "Narrativa Recursiva",
    icon: "🚌",
    overlayText: "O RELÓGIO MARCA 00:00. O PLANO COMEÇA AGORA.",
    image: "assets/game4.png",
    folder: "jogos/onibus-1972/index.html",
    available: true
  }
];

let searchQuery = "";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

document.addEventListener("DOMContentLoaded", () => {
  renderGames();
  setupEvents();
});

function renderGames() {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  const normalizedQuery = normalizeText(searchQuery.trim());
  const filtered = gamesData.filter((game) => {
    return normalizeText(game.title).includes(normalizedQuery)
      || normalizeText(game.genre).includes(normalizedQuery)
      || normalizeText(game.overlayText).includes(normalizedQuery)
      || game.code.includes(normalizedQuery);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="games-empty">Nenhum jogo encontrado.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(renderGameCard).join("");
}

function renderGameCard(game) {
  const media = game.available
    ? `<img src="${game.image}" alt="Capa de ${game.title}" class="card-img" loading="lazy">`
    : `<div class="card-placeholder" aria-label="Capa ainda não disponível">
         <span class="placeholder-symbol" aria-hidden="true">${game.icon}</span>
         <strong>Capa em preparação</strong>
         <small>Projeto ${game.code}</small>
       </div>`;

  const cardContent = `
    <div class="card-media">
      ${media}
      <span class="card-code">${game.code}</span>
      <div class="card-overlay">
        <span class="card-overlay-quote">${game.overlayText}</span>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${game.title}</h3>
      <div class="card-footer">
        <span class="card-genre">
          <span class="genre-icon" aria-hidden="true">${game.icon}</span>
          ${game.genre}
        </span>
        <span class="${game.available ? "btn-jogar" : "btn-pendente"}">${game.available ? "Jogar" : "Em desenvolvimento"}</span>
      </div>
    </div>`;

  if (game.available) {
    return `<a class="game-card" data-id="${game.id}" href="${game.folder}" aria-label="Jogar ${game.title}">${cardContent}</a>`;
  }

  return `<article class="game-card is-unavailable" data-id="${game.id}" aria-label="${game.title}, em desenvolvimento">${cardContent}</article>`;
}

function setupEvents() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      searchQuery = event.target.value;
      renderGames();
    });
  }

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllModals();
  });
}

function openAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.classList.add("active");
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.classList.remove("active");
  });
}
