/* ============================================================================
   IL VICOLO — LOGICA DEL MENU
   Costruisce la griglia delle categorie e il carosello "carte da poker".
   Non serve modificare questo file per cambiare il menu: usa menu-data.js.
   ========================================================================== */
(function () {
  "use strict";

  /* --- intestazione e piè di pagina dai dati -------------------------------- */
  function fillStaticText() {
    const q = (s) => document.querySelector(s);
    q("#r-name").textContent = RISTORANTE.nome;
    q("#r-sub").textContent = RISTORANTE.sottotitolo;
    q("#r-tag").textContent = RISTORANTE.tagline;
    q("#f-name").textContent = RISTORANTE.nome;
    q("#f-addr").textContent = RISTORANTE.indirizzo;
    q("#f-hours").textContent = RISTORANTE.orari;
    const tel = q("#f-tel");
    tel.textContent = RISTORANTE.telefono;
    tel.href = "tel:" + RISTORANTE.telefono.replace(/\s+/g, "");
    document.title = RISTORANTE.nome + " — " + RISTORANTE.sottotitolo;
  }

  /* --- griglia categorie (2 colonne) --------------------------------------- */
  function buildGrid() {
    const grid = document.getElementById("grid");
    MENU.forEach((cat, i) => {
      const btn = document.createElement("button");
      btn.className = "cat-btn";
      btn.style.animationDelay = i * 55 + "ms";
      btn.setAttribute("aria-label", "Apri " + cat.nome);
      btn.innerHTML =
        '<span class="arrow">›</span>' +
        '<span class="ico">' + cat.icona + "</span>" +
        '<span class="label">' + cat.nome +
        '<span class="count">' + cat.piatti.length + " piatti</span></span>";
      btn.addEventListener("click", () => openCarousel(cat));
      grid.appendChild(btn);
    });
  }

  /* --- CAROSELLO ----------------------------------------------------------- */
  const overlay = document.getElementById("overlay");
  const deckEl = document.getElementById("deck");
  const titleEl = document.getElementById("ov-title");
  const countEl = document.getElementById("ov-count");
  const dotsEl = document.getElementById("dots");

  let piatti = [];
  let cards = [];
  let index = 0;
  let n = 0;
  let staggerTimer = null;

  // Trasformazioni per posizione nel ventaglio (0 = carta davanti).
  // "-1" = carta appena distribuita (vola via a sinistra come al tavolo da poker).
  const BASE = "translate(-50%,-50%) ";
  const STATE = {
    "-1": { t: BASE + "translateX(-135%) rotateZ(-24deg) rotateY(16deg) scale(.92)", o: 0,   z: 4  },
    "0":  { t: BASE + "rotateZ(0deg) translateY(0) scale(1)",                        o: 1,   z: 50 },
    "1":  { t: BASE + "rotateZ(5deg)  translate(15px,-14px) scale(.94)",             o: 1,   z: 40 },
    "2":  { t: BASE + "rotateZ(10deg) translate(27px,-26px) scale(.88)",             o: .9,  z: 30 },
    "3":  { t: BASE + "rotateZ(14deg) translate(38px,-37px) scale(.82)",             o: .78, z: 20 },
    "hi": { t: BASE + "rotateZ(18deg) translate(48px,-47px) scale(.78)",             o: 0,   z: 10 }, // in arrivo
  };
  const DECK_START = BASE + "translateY(46px) rotateZ(-7deg) scale(.9)"; // mazzo prima di distribuire

  // offset circolare: rende il carosello infinito
  function offset(i) {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  function stateFor(d) {
    if (d === 0) return STATE["0"];
    if (d === 1) return STATE["1"];
    if (d === 2) return STATE["2"];
    if (d === 3) return STATE["3"];
    if (d === -1) return STATE["-1"];
    if (d < -1) return { t: STATE["-1"].t, o: 0, z: 3 };   // dietro, invisibili
    return STATE["hi"];                                     // avanti, in arrivo
  }

  function position(stagger) {
    cards.forEach((el, i) => {
      const d = offset(i);
      const s = stateFor(d);
      el.style.zIndex = s.z;
      el.style.opacity = s.o;
      el.style.transform = s.t;
      el.style.transitionDelay = stagger ? Math.max(0, d) * 70 + "ms" : "0ms";
      el.classList.toggle("is-front", d === 0);
      el.setAttribute("aria-hidden", d === 0 ? "false" : "true");
    });
    countEl.textContent = (index + 1) + " / " + n;
    Array.prototype.forEach.call(dotsEl.children, (dot, i) =>
      dot.classList.toggle("active", i === index)
    );
  }

  function buildCard(p) {
    const card = document.createElement("article");
    card.className = "card";

    const price = p.prezzo
      ? '<span class="price">' + RISTORANTE.valuta + " " + p.prezzo + "</span>"
      : "";

    card.innerHTML =
      '<div class="photo">' +
        '<div class="fallback">' + (p.emoji || "🍽️") + "</div>" +
        price +
      "</div>" +
      '<div class="body">' +
        "<h3>" + p.nome + "</h3>" +
        "<p>" + (p.descrizione || "") + "</p>" +
        '<span class="seal">♦</span>' +
      "</div>";

    // carica la foto solo se indicata; se fallisce resta il segnaposto emoji
    if (p.foto) {
      const img = new Image();
      img.alt = p.nome;
      img.loading = "lazy";
      img.onload = function () { img.classList.add("loaded"); };
      img.onerror = function () { img.remove(); };
      img.src = p.foto;
      card.querySelector(".photo").insertBefore(img, card.querySelector(".fallback").nextSibling);
    }

    // toccare la carta davanti = piatto successivo
    card.addEventListener("click", () => {
      if (card.classList.contains("is-front")) go(1);
    });
    return card;
  }

  function openCarousel(cat) {
    piatti = cat.piatti;
    n = piatti.length;
    index = 0;

    titleEl.innerHTML = '<span class="ico">' + cat.icona + "</span>" + cat.nome;

    // carte
    deckEl.innerHTML = "";
    cards = piatti.map((p) => {
      const el = buildCard(p);
      deckEl.appendChild(el);
      return el;
    });

    // pallini
    dotsEl.innerHTML = "";
    piatti.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "dot";
      b.setAttribute("aria-label", "Vai al piatto " + (i + 1));
      b.addEventListener("click", () => { index = i; position(false); });
      dotsEl.appendChild(b);
    });

    deckEl.classList.remove("touched");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // distribuzione delle carte (deal-in) con stacco fra una e l'altra
    cards.forEach((el) => {
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = DECK_START;
    });
    // forza il reflow perché la posizione iniziale venga applicata
    void deckEl.offsetWidth;
    cards.forEach((el) => { el.style.transition = ""; });
    position(true);
    clearTimeout(staggerTimer);
    staggerTimer = setTimeout(
      () => cards.forEach((el) => (el.style.transitionDelay = "0ms")),
      n * 70 + 700
    );
  }

  function closeCarousel() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function go(dir) {
    index = (index + dir + n) % n;
    deckEl.classList.add("touched");
    position(false);
  }

  /* --- comandi: frecce, tastiera, swipe ------------------------------------ */
  document.getElementById("nav-prev").addEventListener("click", () => go(-1));
  document.getElementById("nav-next").addEventListener("click", () => go(1));
  document.getElementById("ov-close").addEventListener("click", closeCarousel);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeCarousel(); });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeCarousel();
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });

  // swipe / trascinamento sul mazzo
  let sx = 0, sy = 0, dragging = false;
  function start(x, y) { sx = x; sy = y; dragging = true; }
  function end(x, y) {
    if (!dragging) return;
    dragging = false;
    const dx = x - sx, dy = y - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  }
  deckEl.addEventListener("touchstart", (e) => start(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  deckEl.addEventListener("touchend", (e) => end(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
  deckEl.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  window.addEventListener("mouseup", (e) => end(e.clientX, e.clientY));

  /* --- avvio --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    fillStaticText();
    buildGrid();
  });
})();
