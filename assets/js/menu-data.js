/* ============================================================================
   IL VICOLO — DATI DEL MENU
   ----------------------------------------------------------------------------
   Questo è l'UNICO file da modificare per cambiare il menu.
   È diviso in 4 parti:
     1) RISTORANTE        → nome, indirizzo, telefono, orari
     2) MENU_GIORNO       → il Menu del Giorno (cambia ogni giorno, no foto)
     3) MENU_SPECIALITA   → le Specialità (Primi · Griglia)
     4) MENU              → il menu principale (le altre categorie)

   Regole rapide:
   • Cambia solo i testi tra virgolette "...".
   • Prezzo = solo il numero (senza €). Es: "8,50". Vuoto = nessun prezzo:  prezzo: ""
     Per il prezzo all'etto scrivi es:  prezzo: "6/etto"
   • Foto: "foto/nome.jpg" (file nella cartella "foto"). Vuoto  foto: ""  = icona elegante.
   ========================================================================== */


/* ============================== 1) RISTORANTE ============================= */
const RISTORANTE = {
  nome: "Il Vicolo",
  sottotitolo: "Braceria • Pizzeria",
  tagline: "Carne alla brace e pizza cotta a legna",
  indirizzo: "Via del Vicolo 12 — Città (XX)",
  telefono: "+39 000 000 0000",
  orari: "Mar–Dom 19:00 – 24:00 · Lunedì chiuso",
  valuta: "€",
};


/* ============================== 2) MENU DEL GIORNO =========================
   >>> QUESTO È IL MENU CHE CAMBIA OGNI GIORNO — MODIFICA QUI OGNI MATTINA <<<
   (I piatti qui sotto sono d'esempio: sostituiscili con quelli del giorno.)

   QUANDO SI PUÒ APRIRE:
   • "giorni"  → i giorni disponibili.  1=Lun 2=Mar 3=Mer 4=Gio 5=Ven 6=Sab 0=Dom
   • "apre"/"chiude" → la fascia oraria (24h). Fuori orario il riquadro è bloccato.
   Così com'è: solo a PRANZO, LUN–VEN, 12:00–15:00 (di sera e nel weekend è chiuso).

   LA DATA: lascia  data: ""  per la data di oggi automatica, oppure es. data: "Martedì 8 luglio"
   ========================================================================== */
const MENU_GIORNO = {
  giorni: [1, 2, 3, 4, 5],
  apre: "12:00",
  chiude: "15:00",
  data: "",
  nota: "Primo + Secondo + Contorno · 15€ (acqua e caffè inclusi)",

  sezioni: [
    {
      nome: "Primi",
      piatti: [
        { nome: "Tagliatelle al ragù di manzo", prezzo: "9" },
        { nome: "Penne all'arrabbiata", prezzo: "8" },
        { nome: "Risotto alla zucca", prezzo: "9" },
        { nome: "Gnocchi al pesto", prezzo: "8" },
        { nome: "Zuppa di legumi", prezzo: "8" },
      ],
    },
    {
      nome: "Secondi",
      piatti: [
        { nome: "Arrosto di vitello", prezzo: "12" },
        { nome: "Pollo arrosto con patate", prezzo: "11" },
        { nome: "Frittata di verdure", prezzo: "9" },
      ],
    },
    {
      nome: "Insalatone",
      piatti: [
        { nome: "Cesar (pollo, grana, crostini)", prezzo: "9" },
        { nome: "Greca (feta, olive, pomodoro)", prezzo: "9" },
        { nome: "Tonno e fagioli", prezzo: "9" },
        { nome: "Caprese (mozzarella, pomodoro, basilico)", prezzo: "8" },
        { nome: "Vegetariana (verdure grigliate, hummus)", prezzo: "9" },
      ],
    },
    {
      nome: "Contorni",
      piatti: [
        { nome: "Patate al forno", prezzo: "4" },
        { nome: "Verdure grigliate", prezzo: "5" },
        { nome: "Spinaci saltati", prezzo: "4" },
        { nome: "Insalata mista", prezzo: "4" },
      ],
    },
  ],
};


/* ============================== 3) MENU SPECIALITÀ =========================
   Sotto-menu delle Specialità: Primi · Griglia (con bistecche e Fiorentina).
   ========================================================================== */
const MENU_SPECIALITA = [
  {
    id: "spec-primi",
    nome: "Primi",
    icona: "🍝",
    piatti: [
      { nome: "Tagliatelle al papero", descrizione: "", prezzo: "14", emoji: "🍝", foto: "foto/tagliatelle-anatra.jpg" },
      { nome: "Tagliatelle ai porcini", descrizione: "", prezzo: "14", emoji: "🍄", foto: "foto/tagliatelle-porcini.jpg" },
      { nome: "Culurgiones", descrizione: "", prezzo: "14", emoji: "🥟", foto: "foto/culurgiones.jpg" },
      { nome: "Spaghetti allo scoglio", descrizione: "", prezzo: "15", emoji: "🦐", foto: "foto/spaghetti-scoglio.jpg" },
      { nome: "Tagliatelle balsamia", descrizione: "", prezzo: "17", emoji: "🍝", foto: "foto/tagliatelle-balsamia.jpg" },
    ],
  },
  {
    id: "spec-griglia",
    nome: "Griglia",
    icona: "🔥",
    piatti: [
      { nome: "Tagliata di manzo, rucola e grana", descrizione: "", prezzo: "19", emoji: "🥩", foto: "" },
      { nome: "Tagliata di manzo con porcini", descrizione: "", prezzo: "21", emoji: "🥩", foto: "foto/tagliata-porcini.jpg" },
      { nome: "Bistecca di manzo 500 g", descrizione: "", prezzo: "27", emoji: "🥩", foto: "foto/bistecchina-manzo.jpg" },
      { nome: "Bistecca di costata", descrizione: "Min. 1 kg", prezzo: "5/etto", emoji: "🥩", foto: "" },
      { nome: "Bistecca Fiorentina", descrizione: "Min. 1,2 kg", prezzo: "6/etto", emoji: "🥩", foto: "foto/fiorentina.jpg" },
    ],
  },
];


/* ============================== 4) MENU PRINCIPALE ========================= */
const MENU = [

  /* ---------------------------------------------------------------- ANTIPASTI */
  {
    id: "antipasti",
    nome: "Antipasti",
    icona: "🥖",
    piatti: [
      { nome: "Crostini misti dello chef", descrizione: "", prezzo: "9", emoji: "🥖", foto: "foto/crostini-misti.jpg" },
      { nome: "Gran tagliere toscano", descrizione: "Per 2 persone", prezzo: "18", emoji: "🧀", foto: "foto/gran-tagliere-toscano.jpg" },
      { nome: "Burrata alla mugellana", descrizione: "", prezzo: "14", emoji: "🧀", foto: "foto/burrata.jpg" },
      { nome: "Antipasto sardo", descrizione: "", prezzo: "16", emoji: "🫒", foto: "" },
      { nome: "Carpaccio di bresaola", descrizione: "", prezzo: "15", emoji: "🥩", foto: "foto/carpaccio-bresaola.jpg" },
      { nome: "Caprese con verdure grigliate", descrizione: "", prezzo: "14", emoji: "🍅", foto: "" },
    ],
  },

  /* -------------------------------------------------------------------- PRIMI */
  {
    id: "primi",
    nome: "Primi",
    icona: "🍝",
    piatti: [
      { nome: "Tortelli di patate burro e salvia", descrizione: "", prezzo: "15", emoji: "🥟", foto: "foto/tortelli-burro-salvia.jpg" },
      { nome: "Tortelli di patate al ragù", descrizione: "", prezzo: "16", emoji: "🥟", foto: "foto/tortelli-ragu.jpg" },
      { nome: "Malloreddus alla campidanese", descrizione: "", prezzo: "14", emoji: "🍝", foto: "foto/malloreddus.jpg" },
      { nome: "Pappardelle alla maremmana", descrizione: "", prezzo: "16", emoji: "🍝", foto: "foto/pappardelle-cinghiale.jpg" },
      { nome: "Pici al pecorino e pepe", descrizione: "", prezzo: "14", emoji: "🍝", foto: "foto/pici-cacio-pepe.jpg" },
      { nome: "Tagliatelle al ragù", descrizione: "", prezzo: "14", emoji: "🍝", foto: "" },
    ],
  },

  /* ------------------------------------------------------------------ SECONDI */
  {
    id: "secondi",
    nome: "Secondi",
    icona: "🍖",
    piatti: [
      { nome: "Peposo alla fornacina", descrizione: "", prezzo: "16", emoji: "🥘", foto: "foto/peposo.jpg" },
      { nome: "Bocconcini di cinghiale in umido", descrizione: "", prezzo: "17", emoji: "🍖", foto: "foto/bocconcini-cinghiale.jpg" },
      { nome: "Polpette di manzo alla fiorentina", descrizione: "", prezzo: "15", emoji: "🍖", foto: "foto/polpette-manzo.jpg" },
      { nome: "Polpette di cacio e uova al sugo", descrizione: "", prezzo: "14", emoji: "🧀", foto: "" },
      { nome: "Melanzane alla greca", descrizione: "", prezzo: "15", emoji: "🍆", foto: "foto/melanzane-greca.jpg" },
      { nome: "Salsiccia e fagioli", descrizione: "", prezzo: "14", emoji: "🌭", foto: "" },
    ],
  },

  /* ------------------------------------------------------------------- GRIGLIA */
  {
    id: "griglia",
    nome: "Griglia",
    icona: "🔥",
    piatti: [
      { nome: "Hamburger di chianina fatto in casa", descrizione: "", prezzo: "14", emoji: "🍔", foto: "" },
      { nome: "Svizzera del buon gustaio", descrizione: "", prezzo: "17", emoji: "🥩", foto: "foto/svizzera.jpg" },
      { nome: "Rosticciana in doppia cottura", descrizione: "", prezzo: "15", emoji: "🍖", foto: "foto/rosticciana-salsiccia.jpg" },
      { nome: "Salsicce toscane alla griglia", descrizione: "", prezzo: "13", emoji: "🌭", foto: "" },
      { nome: "Agnello alla scottadito", descrizione: "", prezzo: "17", emoji: "🍖", foto: "foto/agnello-scottadito.jpg" },
      { nome: "Tagliata di manzo al rosmarino", descrizione: "", prezzo: "22", emoji: "🥩", foto: "foto/tagliata-rosmarino.jpg" },
    ],
  },

  /* ------------------------------------------------------------------ CONTORNI */
  {
    id: "contorni",
    nome: "Contorni",
    icona: "🥗",
    piatti: [
      { nome: "Patate al forno", descrizione: "", prezzo: "6", emoji: "🥔", foto: "foto/patate-arrosto.jpg" },
      { nome: "Fagioli saltati", descrizione: "", prezzo: "6", emoji: "🫘", foto: "foto/fagioli.jpg" },
      { nome: "Spinaci aglio e olio", descrizione: "", prezzo: "6", emoji: "🥬", foto: "foto/spinaci.jpg" },
      { nome: "Verdure grigliate", descrizione: "", prezzo: "7", emoji: "🫑", foto: "foto/verdure-grigliate.jpg" },
    ],
  },

  /* --------------------------------------------------------------------- PIZZE
     16 pizze reali con foto. PREZZI DA INSERIRE (metti il numero tra le virgolette
     di  prezzo: ""  — es. prezzo: "7"). Puoi anche aggiungere gli ingredienti in "descrizione". */
  {
    id: "pizze",
    nome: "Pizze",
    icona: "🍕",
    piatti: [
      { nome: "Margherita", descrizione: "", prezzo: "", emoji: "🍕", foto: "foto/pizza-margherita.jpg" },
      { nome: "Marinara", descrizione: "", prezzo: "", emoji: "🍅", foto: "foto/pizza-marinara.jpg" },
      { nome: "Napoli", descrizione: "", prezzo: "", emoji: "🍕", foto: "foto/pizza-napoli.jpg" },
      { nome: "Partenopea", descrizione: "", prezzo: "", emoji: "🍕", foto: "foto/pizza-partenopea.jpg" },
      { nome: "Capricciosa", descrizione: "", prezzo: "", emoji: "🍕", foto: "foto/pizza-capricciosa.jpg" },
      { nome: "Diavola", descrizione: "", prezzo: "", emoji: "🌶️", foto: "foto/pizza-diavola.jpg" },
      { nome: "Quattro formaggi", descrizione: "", prezzo: "", emoji: "🧀", foto: "foto/pizza-4-formaggi.jpg" },
      { nome: "Prosciutto e funghi", descrizione: "", prezzo: "", emoji: "🍄", foto: "foto/pizza-prosciutto-funghi.jpg" },
      { nome: "Prosciutto e porcini", descrizione: "", prezzo: "", emoji: "🍄", foto: "foto/pizza-prosciutto-porcini.jpg" },
      { nome: "Vegetariana", descrizione: "", prezzo: "", emoji: "🥬", foto: "foto/pizza-vegetariana.jpg" },
      { nome: "Melanzane e salsiccia", descrizione: "", prezzo: "", emoji: "🍆", foto: "foto/pizza-melanzane-salsiccia.jpg" },
      { nome: "Tonno e cipolla", descrizione: "", prezzo: "", emoji: "🐟", foto: "foto/pizza-tonno-cipolla.jpg" },
      { nome: "Bismark", descrizione: "", prezzo: "", emoji: "🍳", foto: "foto/pizza-bismark.jpg" },
      { nome: "Americana", descrizione: "", prezzo: "", emoji: "🍕", foto: "foto/pizza-americana.jpg" },
      { nome: "Tirolese", descrizione: "", prezzo: "", emoji: "🥓", foto: "foto/pizza-tirolese.jpg" },
      { nome: "Maialona", descrizione: "", prezzo: "", emoji: "🐷", foto: "foto/pizza-maialona.jpg" },
    ],
  },

  /* ===== DA QUI IN GIÙ: CATEGORIE D'ESEMPIO (da sostituire coi piatti veri) ===== */

  /* --------------------------------------------------------------------- DOLCI */
  {
    id: "dolci",
    nome: "Dolci",
    icona: "🍰",
    piatti: [
      { nome: "Tiramisù della casa", descrizione: "Classico, fatto in casa", prezzo: "5", emoji: "🍮", foto: "" },
      { nome: "Panna cotta", descrizione: "Ai frutti di bosco", prezzo: "5", emoji: "🍓", foto: "" },
      { nome: "Cannolo siciliano", descrizione: "Ricotta e gocce di cioccolato", prezzo: "5", emoji: "🥮", foto: "" },
      { nome: "Tortino al cioccolato", descrizione: "Caldo, dal cuore morbido", prezzo: "6", emoji: "🍫", foto: "" },
      { nome: "Gelato artigianale", descrizione: "Gusti a scelta", prezzo: "4", emoji: "🍨", foto: "" },
      { nome: "Sbrisolona", descrizione: "Con crema al mascarpone", prezzo: "5", emoji: "🍰", foto: "" },
    ],
  },

  /* ---------------------------------------------------------------------- BERE */
  {
    id: "bere",
    nome: "Bere",
    icona: "🍷",
    piatti: [
      { nome: "Acqua naturale / frizzante", descrizione: "Bottiglia 75 cl", prezzo: "2", emoji: "💧", foto: "" },
      { nome: "Bibite in lattina", descrizione: "Cola, aranciata, tè freddo", prezzo: "3", emoji: "🥤", foto: "" },
      { nome: "Birra artigianale", descrizione: "Alla spina, 0,4 L", prezzo: "5", emoji: "🍺", foto: "" },
      { nome: "Calice di vino della casa", descrizione: "Rosso o bianco", prezzo: "4", emoji: "🍷", foto: "" },
      { nome: "Chianti DOCG", descrizione: "Bottiglia 75 cl", prezzo: "18", emoji: "🍷", foto: "" },
      { nome: "Montepulciano d'Abruzzo", descrizione: "Bottiglia 75 cl", prezzo: "15", emoji: "🍷", foto: "" },
    ],
  },

  /* -------------------------------------------------------------- CAFFETTERIA */
  {
    id: "caffetteria",
    nome: "Caffetteria",
    icona: "☕",
    piatti: [
      { nome: "Caffè espresso", descrizione: "Miscela della casa", prezzo: "1,20", emoji: "☕", foto: "" },
      { nome: "Cappuccino", descrizione: "Cremoso e schiumato", prezzo: "1,50", emoji: "☕", foto: "" },
      { nome: "Caffè corretto", descrizione: "Con grappa o sambuca", prezzo: "2", emoji: "☕", foto: "" },
      { nome: "Amaro della casa", descrizione: "Digestivo alle erbe", prezzo: "4", emoji: "🍸", foto: "" },
      { nome: "Grappa", descrizione: "Barricata o bianca", prezzo: "4", emoji: "🥃", foto: "" },
      { nome: "Tisana / Tè", descrizione: "Alla frutta o classico", prezzo: "2,50", emoji: "🍵", foto: "" },
    ],
  },

];
