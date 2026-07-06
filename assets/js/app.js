/* ============================================================================
   IL VICOLO — LOGICA DEL MENU
   Griglia categorie + riquadri speciali (Menu del Giorno, Specialità) +
   carosello "carte da poker". Per i contenuti usa SEMPRE menu-data.js.
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const overlay = $("#overlay");
  const giornoOverlay = $("#giorno-overlay");
  const specOverlay = $("#spec-overlay");
  const deckEl = $("#deck");
  const titleEl = $("#ov-title");
  const countEl = $("#ov-count");
  const dotsEl = $("#dots");

  // Modalità ANTEPRIMA: aggiungendo ?anteprima all'indirizzo, il Menu del Giorno
  // è sempre apribile (utile per mostrarlo a qualsiasi ora, es. al socio la sera).
  // I clienti, con l'indirizzo normale, vedono il regolare blocco orario.
  const ANTEPRIMA = /anteprima/i.test(location.search) || /anteprima/i.test(location.hash);

  /* --- intestazione e piè di pagina ---------------------------------------- */
  function fillStaticText() {
    $("#r-name").textContent = RISTORANTE.nome;
    $("#r-sub").textContent = RISTORANTE.sottotitolo;
    $("#r-tag").textContent = RISTORANTE.tagline;
    $("#f-name").textContent = RISTORANTE.nome;
    $("#f-addr").textContent = RISTORANTE.indirizzo;
    $("#f-hours").textContent = RISTORANTE.orari;
    const tel = $("#f-tel");
    tel.textContent = RISTORANTE.telefono;
    tel.href = "tel:" + RISTORANTE.telefono.replace(/\s+/g, "");
    document.title = RISTORANTE.nome + " — " + RISTORANTE.sottotitolo;
  }

  /* --- utilità gestione overlay -------------------------------------------- */
  function updateScroll() {
    const anyOpen = [overlay, giornoOverlay, specOverlay].some((o) =>
      o.classList.contains("open")
    );
    document.body.style.overflow = anyOpen ? "hidden" : "";
  }
  let toastEl = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.remove("show");
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  /* --- MENU DEL GIORNO: disponibilità -------------------------------------- */
  const AB = { 0: "Dom", 1: "Lun", 2: "Mar", 3: "Mer", 4: "Gio", 5: "Ven", 6: "Sab" };
  const GIORNI = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

  function parseHM(s) { const p = String(s).split(":"); return (+p[0]) * 60 + (+p[1] || 0); }
  function todayLabel() {
    const d = new Date();
    return GIORNI[d.getDay()] + " " + d.getDate() + " " + MESI[d.getMonth()];
  }
  function giornoStatus() {
    if (ANTEPRIMA) return { open: true };
    const d = new Date();
    const mins = d.getHours() * 60 + d.getMinutes();
    const okDay = MENU_GIORNO.giorni.indexOf(d.getDay()) !== -1;
    const okTime = mins >= parseHM(MENU_GIORNO.apre) && mins < parseHM(MENU_GIORNO.chiude);
    return { open: okDay && okTime };
  }
  function giorniLabel(arr) {
    const s = arr.slice().sort((a, b) => a - b);
    if (s.join() === "1,2,3,4,5") return "Lun–Ven";
    if (s.join() === "0,6") return "Sab–Dom";
    return s.map((d) => AB[d]).join(" · ");
  }
  function scheduleLabel() {
    return "Pranzo · " + giorniLabel(MENU_GIORNO.giorni) + " · " + MENU_GIORNO.apre + "–" + MENU_GIORNO.chiude;
  }

  /* --- RIQUADRI SPECIALI (in cima alla griglia) ---------------------------- */
  function buildFeatures() {
    const grid = $("#grid");

    // Menu del Giorno
    const g = document.createElement("button");
    g.className = "feature giorno";
    const st = giornoStatus();
    if (!st.open) g.classList.add("locked");
    g.innerHTML =
      '<span class="feat-ico">📋</span>' +
      '<span class="feat-txt">' +
      '<span class="feat-title">Menu del Giorno</span>' +
      '<span class="feat-sub">' + scheduleLabel() + "</span>" +
      "</span>" +
      '<span class="feat-side">' +
      (st.open ? '<span class="badge open">Aperto&nbsp;›</span>' : '<span class="lock">🔒</span>') +
      "</span>";
    g.addEventListener("click", function () {
      if (giornoStatus().open) {
        openGiorno();
      } else {
        g.classList.remove("shake"); void g.offsetWidth; g.classList.add("shake");
        showToast("🔒 Menu del Giorno disponibile solo a " + scheduleLabel().toLowerCase());
      }
    });
    grid.appendChild(g);

    // Specialità
    const s = document.createElement("button");
    s.className = "feature specialita";
    s.innerHTML =
      '<span class="shine"></span>' +
      '<span class="spark s1">✦</span><span class="spark s2">✧</span><span class="spark s3">✦</span>' +
      '<span class="feat-ico">⭐</span>' +
      '<span class="feat-txt">' +
      '<span class="feat-title">Specialità</span>' +
      '<span class="feat-sub">Bistecche · Griglia · Pizze</span>' +
      "</span>" +
      '<span class="feat-side">›</span>';
    s.addEventListener("click", openSpecialita);
    grid.appendChild(s);
  }

  /* --- MENU DEL GIORNO: pannello a scorrimento ----------------------------- */
  function renderGiorno() {
    $("#giorno-date").textContent = MENU_GIORNO.data || todayLabel();
    const note = $("#giorno-note");
    note.textContent = MENU_GIORNO.nota || "";
    note.style.display = MENU_GIORNO.nota ? "" : "none";

    const body = $("#giorno-body");
    body.innerHTML = "";
    MENU_GIORNO.sezioni.forEach(function (sez) {
      const sec = document.createElement("div");
      sec.className = "g-sec";
      let html = '<h3>' + sez.nome + "</h3><ul>";
      sez.piatti.forEach(function (p) {
        const price = p.prezzo ? '<span class="g-price">' + RISTORANTE.valuta + " " + p.prezzo + "</span>" : "";
        html += '<li><span class="g-name">' + p.nome + "</span>" + price + "</li>";
      });
      html += "</ul>";
      sec.innerHTML = html;
      body.appendChild(sec);
    });
  }
  function openGiorno() {
    renderGiorno();
    giornoOverlay.classList.add("open");
    giornoOverlay.scrollTop = 0;
    updateScroll();
  }
  function closeGiorno() { giornoOverlay.classList.remove("open"); updateScroll(); }

  /* --- SPECIALITÀ: sotto-menu ---------------------------------------------- */
  function buildSpecCards() {
    const wrap = $("#spec-cards");
    wrap.innerHTML = "";
    MENU_SPECIALITA.forEach(function (c, i) {
      const card = document.createElement("button");
      card.className = "spec-card";
      card.style.animationDelay = i * 130 + "ms";
      card.innerHTML =
        '<span class="shine"></span>' +
        '<span class="spec-ico">' + c.icona + "</span>" +
        '<span class="spec-name">' + c.nome + "</span>" +
        '<span class="spec-count">' + c.piatti.length + " proposte</span>" +
        '<span class="spec-go">Scopri ›</span>';
      card.addEventListener("click", function () { openCarousel(c); });
      wrap.appendChild(card);
    });
  }
  function openSpecialita() { buildSpecCards(); specOverlay.classList.add("open"); updateScroll(); }
  function closeSpecialita() { specOverlay.classList.remove("open"); updateScroll(); }

  /* --- griglia categorie (2 colonne) --------------------------------------- */
  function buildGrid() {
    const grid = $("#grid");
    MENU.forEach(function (cat, i) {
      const btn = document.createElement("button");
      btn.className = "cat-btn";
      btn.style.animationDelay = 120 + i * 55 + "ms";
      btn.setAttribute("aria-label", "Apri " + cat.nome);
      btn.innerHTML =
        '<span class="arrow">›</span>' +
        '<span class="ico">' + cat.icona + "</span>" +
        '<span class="label">' + cat.nome +
        '<span class="count">' + cat.piatti.length + " piatti</span></span>";
      btn.addEventListener("click", function () { openCarousel(cat); });
      grid.appendChild(btn);
    });
  }

  /* --- CAROSELLO CARTE DA POKER -------------------------------------------- */
  let piatti = [], cards = [], index = 0, n = 0, staggerTimer = null;

  const BASE = "translate(-50%,-50%) ";
  const STATE = {
    "-1": { t: BASE + "translateX(-135%) rotateZ(-24deg) rotateY(16deg) scale(.92)", o: 0, z: 4 },
    "0":  { t: BASE + "rotateZ(0deg) translateY(0) scale(1)",                        o: 1, z: 50 },
    "1":  { t: BASE + "rotateZ(5deg)  translate(15px,-14px) scale(.94)",             o: 1, z: 40 },
    "2":  { t: BASE + "rotateZ(10deg) translate(27px,-26px) scale(.88)",             o: .9, z: 30 },
    "3":  { t: BASE + "rotateZ(14deg) translate(38px,-37px) scale(.82)",             o: .78, z: 20 },
    "hi": { t: BASE + "rotateZ(18deg) translate(48px,-47px) scale(.78)",             o: 0, z: 10 },
  };
  const DECK_START = BASE + "translateY(46px) rotateZ(-7deg) scale(.9)";

  function offset(i) { let d = i - index; if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d; }
  function stateFor(d) {
    if (d === 0) return STATE["0"];
    if (d === 1) return STATE["1"];
    if (d === 2) return STATE["2"];
    if (d === 3) return STATE["3"];
    if (d === -1) return STATE["-1"];
    if (d < -1) return { t: STATE["-1"].t, o: 0, z: 3 };
    return STATE["hi"];
  }
  function position(stagger) {
    cards.forEach(function (el, i) {
      const d = offset(i), s = stateFor(d);
      el.style.zIndex = s.z;
      el.style.opacity = s.o;
      el.style.transform = s.t;
      el.style.transitionDelay = stagger ? Math.max(0, d) * 70 + "ms" : "0ms";
      el.classList.toggle("is-front", d === 0);
      el.setAttribute("aria-hidden", d === 0 ? "false" : "true");
    });
    countEl.textContent = (index + 1) + " / " + n;
    Array.prototype.forEach.call(dotsEl.children, function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }
  function buildCard(p) {
    const card = document.createElement("article");
    card.className = "card";
    const price = p.prezzo ? '<span class="price">' + RISTORANTE.valuta + " " + p.prezzo + "</span>" : "";
    card.innerHTML =
      '<div class="photo"><div class="fallback">' + (p.emoji || "🍽️") + "</div>" + price + "</div>" +
      '<div class="body"><h3>' + p.nome + "</h3><p>" + (p.descrizione || "") + '</p><span class="seal">♦</span></div>';
    if (p.foto) {
      const img = new Image();
      img.alt = p.nome; img.loading = "lazy";
      img.onload = function () { img.classList.add("loaded"); };
      img.onerror = function () { img.remove(); };
      img.src = p.foto;
      const photo = card.querySelector(".photo");
      photo.insertBefore(img, photo.querySelector(".fallback").nextSibling);
    }
    card.addEventListener("click", function () { if (card.classList.contains("is-front")) go(1); });
    return card;
  }
  function openCarousel(cat) {
    piatti = cat.piatti; n = piatti.length; index = 0;
    titleEl.innerHTML = '<span class="ico">' + cat.icona + "</span>" + cat.nome;

    deckEl.innerHTML = "";
    cards = piatti.map(function (p) { const el = buildCard(p); deckEl.appendChild(el); return el; });

    dotsEl.innerHTML = "";
    piatti.forEach(function (_, i) {
      const b = document.createElement("button");
      b.className = "dot";
      b.setAttribute("aria-label", "Vai al piatto " + (i + 1));
      b.addEventListener("click", function () { index = i; position(false); });
      dotsEl.appendChild(b);
    });

    deckEl.classList.remove("touched");
    overlay.classList.add("open");
    updateScroll();

    cards.forEach(function (el) { el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = DECK_START; });
    void deckEl.offsetWidth;
    cards.forEach(function (el) { el.style.transition = ""; });
    position(true);
    clearTimeout(staggerTimer);
    staggerTimer = setTimeout(function () { cards.forEach(function (el) { el.style.transitionDelay = "0ms"; }); }, n * 70 + 700);
  }
  function closeCarousel() { overlay.classList.remove("open"); updateScroll(); }
  function go(dir) { index = (index + dir + n) % n; deckEl.classList.add("touched"); position(false); }

  /* --- comandi ------------------------------------------------------------- */
  $("#nav-prev").addEventListener("click", function () { go(-1); });
  $("#nav-next").addEventListener("click", function () { go(1); });
  $("#ov-close").addEventListener("click", closeCarousel);
  $("#giorno-close").addEventListener("click", closeGiorno);
  $("#spec-close").addEventListener("click", closeSpecialita);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeCarousel(); });
  giornoOverlay.addEventListener("click", function (e) { if (e.target === giornoOverlay) closeGiorno(); });
  specOverlay.addEventListener("click", function (e) { if (e.target === specOverlay) closeSpecialita(); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (overlay.classList.contains("open")) closeCarousel();
      else if (specOverlay.classList.contains("open")) closeSpecialita();
      else if (giornoOverlay.classList.contains("open")) closeGiorno();
      return;
    }
    if (!overlay.classList.contains("open")) return;
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });

  // swipe / trascinamento
  let sx = 0, sy = 0, dragging = false;
  function start(x, y) { sx = x; sy = y; dragging = true; }
  function end(x, y) {
    if (!dragging) return; dragging = false;
    const dx = x - sx, dy = y - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  }
  deckEl.addEventListener("touchstart", function (e) { start(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  deckEl.addEventListener("touchend", function (e) { end(e.changedTouches[0].clientX, e.changedTouches[0].clientY); });
  deckEl.addEventListener("mousedown", function (e) { start(e.clientX, e.clientY); });
  window.addEventListener("mouseup", function (e) { end(e.clientX, e.clientY); });

  /* --- avvio --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    fillStaticText();
    buildFeatures();
    buildGrid();
  });

  // Service worker: rende l'app installabile e funzionante offline.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
