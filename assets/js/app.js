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

  // Menu attivo: quello modificato dal titolare (da Supabase) o quello di menu-data.js
  let activeMenu = MENU;
  let activeSpec = MENU_SPECIALITA;

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
      '<span class="feat-sub">' + activeSpec.map(function (c) { return c.nome; }).join(" · ") + "</span>" +
      "</span>" +
      '<span class="feat-side">›</span>';
    s.addEventListener("click", openSpecialita);
    grid.appendChild(s);
  }

  /* --- MENU DEL GIORNO: pannello a scorrimento ----------------------------- */
  // Contenuto attivo: quello APPROVATO dallo staff (se esiste), altrimenti
  // quello scritto a mano in menu-data.js (MENU_GIORNO).
  let publishedGiorno = null;
  function currentGiorno() {
    return publishedGiorno || { data: MENU_GIORNO.data, nota: MENU_GIORNO.nota, sezioni: MENU_GIORNO.sezioni };
  }

  function renderGiorno() {
    const g = currentGiorno();
    $("#giorno-date").textContent = g.data || todayLabel();
    const note = $("#giorno-note");
    note.textContent = g.nota || "";
    note.style.display = g.nota ? "" : "none";

    const body = $("#giorno-body");
    body.innerHTML = "";
    (g.sezioni || []).forEach(function (sez) {
      const sec = document.createElement("div");
      sec.className = "g-sec";
      let html = '<h3>' + sez.nome + "</h3><ul>";
      (sez.piatti || []).forEach(function (p) {
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
    activeSpec.forEach(function (c, i) {
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
    activeMenu.forEach(function (cat, i) {
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
    const desc = p.descrizione ? "<p>" + p.descrizione + "</p>" : "";
    card.innerHTML =
      '<div class="photo"><div class="fallback">' + (p.emoji || "🍽️") + "</div>" + price + "</div>" +
      '<div class="body"><h3>' + p.nome + "</h3>" + desc + '<span class="seal">♦</span></div>';
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

  /* --- EDITOR NASCOSTO (tasto in basso a destra: tieni premuto 5 secondi) --- */
  const hotspot = $("#notif-hotspot");
  const pwModal = $("#pw-modal");
  const pwBox = $("#pw-box");
  const editOverlay = $("#edit-overlay");
  const editInner = $("#edit-inner");
  let editorRole = null, editorPwd = null;

  const GTEMPLATE = [
    { nome: "Primi", righe: 5 },
    { nome: "Secondi", righe: 3 },
    { nome: "Insalatone", righe: 5 },
    { nome: "Contorni", righe: 4 },
  ];

  function closePw() { pwModal.classList.remove("open"); }
  function closeEditor() { editOverlay.classList.remove("open"); updateScroll(); }

  // tieni premuto → password → apre l'editor
  function openPwPrompt() {
    pwBox.innerHTML =
      '<h2>Area riservata</h2><p class="sub">Inserisci la password per modificare il menu.</p>' +
      '<input type="password" class="field" id="pw-input" inputmode="numeric" placeholder="Password" autocomplete="off">' +
      '<p class="approve-err" id="pw-err"></p>' +
      '<div class="approve-actions"><button class="btn btn-no" id="pw-cancel">Annulla</button><button class="btn btn-primary" id="pw-go">Entra</button></div>';
    pwModal.classList.add("open");
    const inp = $("#pw-input"); inp.focus();
    async function go() {
      const pwd = inp.value.trim();
      const btn = $("#pw-go"); btn.disabled = true; $("#pw-err").textContent = "Verifico...";
      let role = null;
      try { role = await Store.verifyPassword(pwd); }
      catch (e) { $("#pw-err").textContent = "Errore di connessione"; btn.disabled = false; return; }
      if (!role) { $("#pw-err").textContent = "Password errata"; inp.value = ""; btn.disabled = false; return; }
      editorRole = role; editorPwd = pwd;
      closePw();
      if (role === "titolare") openTitolareChoice(); else openGiornoEditor();
    }
    $("#pw-go").addEventListener("click", go);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
    $("#pw-cancel").addEventListener("click", closePw);
  }

  // --- editor Menu del Giorno ---
  function edRow(nome, prezzo) {
    const row = document.createElement("div"); row.className = "g-row";
    row.innerHTML =
      '<input type="text" class="field g-nome" placeholder="Nome piatto">' +
      '<input type="text" class="field g-prezzo" placeholder="€">' +
      '<button type="button" class="row-del" aria-label="Togli">✕</button>';
    row.querySelector(".g-nome").value = nome || "";
    row.querySelector(".g-prezzo").value = prezzo || "";
    row.querySelector(".row-del").addEventListener("click", function () { row.remove(); });
    return row;
  }
  function edSection(nome, piatti) {
    const sec = document.createElement("section"); sec.className = "g-editsec"; sec.dataset.nome = nome;
    const h = document.createElement("h2"); h.textContent = nome;
    const list = document.createElement("div"); list.className = "g-rows";
    (piatti || []).forEach(function (p) { list.appendChild(edRow(p.nome, p.prezzo)); });
    const add = document.createElement("button"); add.type = "button"; add.className = "btn btn-add"; add.textContent = "+ aggiungi piatto";
    add.addEventListener("click", function () { list.appendChild(edRow("", "")); });
    sec.appendChild(h); sec.appendChild(list); sec.appendChild(add);
    return sec;
  }
  function openGiornoEditor() {
    const g = currentGiorno();
    editInner.innerHTML =
      '<header class="admin-head"><p class="kick">✍️ Modifica menu del giorno</p><h1>Menu del Giorno</h1>' +
      '<input type="text" id="ed-data" class="field field-date" placeholder="Es. Martedì 8 luglio"></header>' +
      '<div id="ed-sezioni"></div>' +
      '<label class="nota-label">Nota (facoltativa)<input type="text" id="ed-nota" class="field" placeholder="Es. Primo + Secondo + Contorno · 15€"></label>' +
      '<button class="btn btn-primary btn-big" id="ed-save">Pubblica</button>' +
      '<p class="hint-center" id="ed-msg">Va online subito per tutti i clienti.</p>';
    $("#ed-data").value = (g && g.data) || todayLabel();
    $("#ed-nota").value = (g && g.nota) || "";
    const wrap = $("#ed-sezioni");
    GTEMPLATE.forEach(function (t) {
      let piatti = null;
      if (g && g.sezioni) { const m = g.sezioni.filter(function (s) { return s.nome === t.nome; })[0]; if (m) piatti = m.piatti; }
      if (!piatti) { piatti = []; for (let i = 0; i < t.righe; i++) piatti.push({ nome: "", prezzo: "" }); }
      wrap.appendChild(edSection(t.nome, piatti));
    });
    $("#ed-save").addEventListener("click", saveGiornoEditor);
    editOverlay.classList.add("open");
    editOverlay.scrollTop = 0;
    updateScroll();
  }
  async function saveGiornoEditor() {
    const sezioni = [];
    editInner.querySelectorAll(".g-editsec").forEach(function (sec) {
      const piatti = [];
      sec.querySelectorAll(".g-row").forEach(function (row) {
        const nome = row.querySelector(".g-nome").value.trim();
        const prezzo = row.querySelector(".g-prezzo").value.trim();
        if (nome) piatti.push({ nome: nome, prezzo: prezzo });
      });
      if (piatti.length) sezioni.push({ nome: sec.dataset.nome, piatti: piatti });
    });
    if (!sezioni.length) { $("#ed-msg").textContent = "Inserisci almeno un piatto."; return; }
    const data = { data: $("#ed-data").value.trim(), nota: $("#ed-nota").value.trim(), sezioni: sezioni };
    const btn = $("#ed-save"); btn.disabled = true; $("#ed-msg").textContent = "Pubblico...";
    try {
      const ok = await Store.saveGiorno(data, editorPwd);
      if (ok) { publishedGiorno = await Store.getGiorno(); closeEditor(); showToast("✅ Menu del Giorno pubblicato"); }
      else { $("#ed-msg").textContent = "Password non valida."; btn.disabled = false; }
    } catch (e) { $("#ed-msg").textContent = "Errore di connessione."; btn.disabled = false; }
  }

  /* --- scelta del titolare --- */
  function openTitolareChoice() {
    editInner.innerHTML =
      '<header class="admin-head"><p class="kick">Area titolare</p><h1>Cosa modifichi?</h1></header>' +
      '<div class="choice-grid">' +
      '<button class="btn choice-btn" id="ch-giorno"><span>📋</span>Menu del Giorno</button>' +
      '<button class="btn choice-btn" id="ch-menu"><span>⭐</span>Menu completo<small>prezzi · piatti · foto</small></button>' +
      "</div>";
    $("#ch-giorno").addEventListener("click", openGiornoEditor);
    $("#ch-menu").addEventListener("click", openMenuEditor);
    editOverlay.classList.add("open");
    editOverlay.scrollTop = 0;
    updateScroll();
  }

  /* --- editor MENU COMPLETO (titolare) --- */
  function pickPhoto(fotoInput, refresh) {
    const inp = document.createElement("input");
    inp.type = "file"; inp.accept = "image/*";
    inp.addEventListener("change", async function () {
      const f = inp.files && inp.files[0];
      if (!f) return;
      showToast("Carico la foto...");
      try { fotoInput.value = await Store.uploadPhoto(f); refresh(); showToast("✅ Foto caricata"); }
      catch (e) { showToast("Errore: crea il 'bucket' foto (vedi guida)"); }
    });
    inp.click();
  }
  function dishRow(p) {
    p = p || {};
    const row = document.createElement("div"); row.className = "dish-edit";
    row.dataset.emoji = p.emoji || "";
    row.innerHTML =
      '<input class="field de-nome" placeholder="Nome piatto">' +
      '<div class="de-line">' +
      '<input class="field de-prezzo" placeholder="€">' +
      '<button type="button" class="de-foto"></button>' +
      '<button type="button" class="row-del de-del" aria-label="Togli">✕</button>' +
      "</div>" +
      '<input class="field de-desc" placeholder="Descrizione (facoltativa)">' +
      '<input type="hidden" class="de-fotoval">';
    row.querySelector(".de-nome").value = p.nome || "";
    row.querySelector(".de-prezzo").value = p.prezzo || "";
    row.querySelector(".de-desc").value = p.descrizione || "";
    const fv = row.querySelector(".de-fotoval"); fv.value = p.foto || "";
    const fb = row.querySelector(".de-foto");
    function refresh() { fb.innerHTML = fv.value ? '<img src="' + fv.value + '" alt="">' : "📷"; }
    refresh();
    fb.addEventListener("click", function () { pickPhoto(fv, refresh); });
    row.querySelector(".de-del").addEventListener("click", function () { row.remove(); });
    return row;
  }
  function catSection(cat, tipo) {
    const sec = document.createElement("section"); sec.className = "cat-edit";
    sec.dataset.id = cat.id; sec.dataset.tipo = tipo; sec.dataset.icona = cat.icona || ""; sec.dataset.nome = cat.nome;
    const h = document.createElement("h2");
    h.textContent = (cat.icona || "") + " " + cat.nome + (tipo === "specialita" ? " · Specialità" : "");
    const list = document.createElement("div"); list.className = "dish-list";
    (cat.piatti || []).forEach(function (p) { list.appendChild(dishRow(p)); });
    const add = document.createElement("button"); add.type = "button"; add.className = "btn btn-add"; add.textContent = "+ aggiungi piatto";
    add.addEventListener("click", function () { list.appendChild(dishRow({})); });
    sec.appendChild(h); sec.appendChild(list); sec.appendChild(add);
    return sec;
  }
  function openMenuEditor() {
    editInner.innerHTML =
      '<p class="kick me-kick">⭐ Modifica menu completo</p>' +
      '<div class="me-nav">' +
      '<button type="button" class="me-arrow" id="me-prev" aria-label="Categoria precedente">‹</button>' +
      '<div class="me-navlabel"><span id="me-catname"></span><small id="me-counter"></small></div>' +
      '<button type="button" class="me-arrow" id="me-next" aria-label="Categoria successiva">›</button>' +
      "</div>" +
      '<div class="me-pager" id="me-pager"></div>' +
      '<button class="btn btn-primary btn-big" id="me-save">Pubblica menu</button>' +
      '<p class="hint-center" id="me-msg">Scorri le categorie · le modifiche vanno online per tutti.</p>';
    const pager = $("#me-pager");
    const pages = [];
    function addPage(c, tipo, suffix) {
      const s = catSection(c, tipo); s.classList.add("me-page");
      pager.appendChild(s);
      pages.push({ el: s, nome: (c.icona ? c.icona + " " : "") + c.nome + (suffix || "") });
    }
    activeMenu.forEach(function (c) { addPage(c, "menu", ""); });
    activeSpec.forEach(function (c) { addPage(c, "specialita", " · Specialità"); });
    let idx = 0;
    function show(i) {
      idx = (i + pages.length) % pages.length;
      pages.forEach(function (p, j) { p.el.style.display = j === idx ? "" : "none"; });
      $("#me-catname").textContent = pages[idx].nome;
      $("#me-counter").textContent = (idx + 1) + " / " + pages.length;
      editOverlay.scrollTop = 0;
    }
    $("#me-prev").addEventListener("click", function () { show(idx - 1); });
    $("#me-next").addEventListener("click", function () { show(idx + 1); });
    let msx = 0, msy = 0, mdrag = false;
    pager.addEventListener("touchstart", function (e) { msx = e.touches[0].clientX; msy = e.touches[0].clientY; mdrag = true; }, { passive: true });
    pager.addEventListener("touchend", function (e) {
      if (!mdrag) return; mdrag = false;
      const dx = e.changedTouches[0].clientX - msx, dy = e.changedTouches[0].clientY - msy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
    });
    show(0);
    $("#me-save").addEventListener("click", saveMenuEditor);
    editOverlay.classList.add("open");
    editOverlay.scrollTop = 0;
    updateScroll();
  }
  async function saveMenuEditor() {
    const menu = [], spec = [];
    editInner.querySelectorAll(".cat-edit").forEach(function (sec) {
      const piatti = [];
      sec.querySelectorAll(".dish-edit").forEach(function (row) {
        const nome = row.querySelector(".de-nome").value.trim();
        if (!nome) return;
        piatti.push({
          nome: nome,
          descrizione: row.querySelector(".de-desc").value.trim(),
          prezzo: row.querySelector(".de-prezzo").value.trim(),
          emoji: row.dataset.emoji || "🍽️",
          foto: row.querySelector(".de-fotoval").value.trim(),
        });
      });
      const cat = { id: sec.dataset.id, nome: sec.dataset.nome, icona: sec.dataset.icona, piatti: piatti };
      if (sec.dataset.tipo === "specialita") spec.push(cat); else menu.push(cat);
    });
    const btn = $("#me-save"); btn.disabled = true; $("#me-msg").textContent = "Pubblico...";
    try {
      const ok = await Store.saveMenu({ menu: menu, specialita: spec }, editorPwd);
      if (ok) {
        const m = await Store.getMenu();
        if (m && m.menu) activeMenu = m.menu;
        if (m && m.specialita) activeSpec = m.specialita;
        rebuildGrid();
        closeEditor();
        showToast("✅ Menu aggiornato");
      } else { $("#me-msg").textContent = "Serve la password del titolare."; btn.disabled = false; }
    } catch (e) { $("#me-msg").textContent = "Errore di connessione."; btn.disabled = false; }
  }

  function initHiddenEditor() {
    const ring = $("#notif-ring");
    const HOLD = 5000;
    let timer = null, rafId = null, startT = 0;
    function paint(p) {
      const deg = p * 360;
      ring.style.background = "conic-gradient(var(--gold) " + deg + "deg, rgba(240,180,41,.15) " + deg + "deg)";
    }
    function startPress() {
      hotspot.classList.add("pressing");
      startT = performance.now();
      cancelAnimationFrame(rafId);
      (function step(now) {
        const p = Math.min(1, (now - startT) / HOLD);
        paint(p);
        if (p < 1) rafId = requestAnimationFrame(step);
      })(startT);
      clearTimeout(timer);
      timer = setTimeout(function () { endPress(); openPwPrompt(); }, HOLD);
    }
    function endPress() {
      hotspot.classList.remove("pressing");
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      paint(0);
    }
    hotspot.addEventListener("pointerdown", function (e) { e.preventDefault(); startPress(); });
    hotspot.addEventListener("pointerup", endPress);
    hotspot.addEventListener("pointerleave", endPress);
    hotspot.addEventListener("pointercancel", endPress);
    pwModal.addEventListener("click", function (e) { if (e.target === pwModal) closePw(); });
    editOverlay.addEventListener("click", function (e) { if (e.target === editOverlay) closeEditor(); });
    $("#edit-close").addEventListener("click", closeEditor);
  }

  function rebuildGrid() { $("#grid").innerHTML = ""; buildFeatures(); buildGrid(); }

  /* --- avvio --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", async function () {
    fillStaticText();
    buildFeatures();
    buildGrid();
    initHiddenEditor();
    try {
      const m = await Store.getMenu();
      if (m && m.menu) activeMenu = m.menu;
      if (m && m.specialita) activeSpec = m.specialita;
      if (m && (m.menu || m.specialita)) rebuildGrid();
      publishedGiorno = await Store.getGiorno();
    } catch (e) {}
  });

  // Service worker: rende l'app installabile e funzionante offline.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
