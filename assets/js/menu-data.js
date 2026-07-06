/* ============================================================================
   IL VICOLO — DATI DEL MENU
   ----------------------------------------------------------------------------
   Questo è l'UNICO file da modificare per cambiare il menu.
   È diviso in 4 parti:
     1) RISTORANTE        → nome, indirizzo, telefono, orari
     2) MENU_GIORNO       → il Menu del Giorno (cambia ogni giorno, no foto)
     3) MENU_SPECIALITA   → le Specialità (Bistecche · Griglia · Pizze)
     4) MENU              → il menu principale (le altre categorie)

   Regole rapide:
   • Cambia solo i testi tra virgolette "...".
   • Prezzo = solo il numero (senza €). Es: "8,50". Vuoto = nessun prezzo:  prezzo: ""
   • Foto: lascia  foto: ""  per una card elegante con l'icona (impostazione attuale).
            Per usare una foto vera: metti "foto/nome.jpg" (file nella cartella "foto") o un link.
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
   Niente foto: è una semplice lista a scorrimento.

   QUANDO SI PUÒ APRIRE:
   • "giorni"  → i giorni in cui è disponibile.  1=Lun 2=Mar 3=Mer 4=Gio 5=Ven 6=Sab 0=Dom
   • "apre"/"chiude" → la fascia oraria (formato 24h). Fuori orario il riquadro è bloccato.
   Così com'è: solo a PRANZO, dal LUNEDÌ al VENERDÌ, 12:00–15:00 (di sera e nel weekend è chiuso).

   LA DATA: lascia  data: ""  per mostrare in automatico la data di oggi,
            oppure scrivila tu, es:  data: "Martedì 8 luglio"
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
   Sotto-menu delle Specialità: Bistecche · Griglia · Pizze.
   Metti qui SOLO la selezione speciale (non tutti i piatti della griglia/pizze
   del menu principale devono stare qui). Le Bistecche stanno solo qui.
   ========================================================================== */
const MENU_SPECIALITA = [
  {
    id: "spec-bistecche",
    nome: "Bistecche",
    icona: "🥩",
    piatti: [
      { nome: "Bistecca alla Fiorentina", descrizione: "Chianina al sangue · prezzo all'etto", prezzo: "6", emoji: "🥩", foto: "" },
      { nome: "Costata di manzo", descrizione: "Frollata, circa 500 g", prezzo: "24", emoji: "🥩", foto: "" },
      { nome: "Filetto di manzo", descrizione: "Taglio pregiato, cottura a scelta", prezzo: "22", emoji: "🥩", foto: "" },
      { nome: "Tomahawk", descrizione: "Circa 1 kg, ideale per due", prezzo: "55", emoji: "🥩", foto: "" },
      { nome: "Picanha alla brace", descrizione: "Taglio brasiliano, succoso", prezzo: "19", emoji: "🥩", foto: "" },
      { nome: "Tagliata di manzo", descrizione: "Con rucola e scaglie di grana", prezzo: "18", emoji: "🥩", foto: "" },
    ],
  },
  {
    id: "spec-griglia",
    nome: "Griglia",
    icona: "🔥",
    piatti: [
      { nome: "Grigliata mista del Vicolo", descrizione: "Salsiccia, costine, pancetta e spiedini", prezzo: "20", emoji: "🔥", foto: "" },
      { nome: "Costine di maiale", descrizione: "Marinate e grigliate", prezzo: "14", emoji: "🍖", foto: "" },
      { nome: "Spiedini misti", descrizione: "Carne mista e verdure alla brace", prezzo: "13", emoji: "🍢", foto: "" },
      { nome: "Braciole di maiale", descrizione: "Alla brace con rosmarino", prezzo: "12", emoji: "🍖", foto: "" },
    ],
  },
  {
    id: "spec-pizze",
    nome: "Pizze",
    icona: "🍕",
    piatti: [
      { nome: "Del Vicolo", descrizione: "Bufala, 'nduja e basilico fresco", prezzo: "10", emoji: "🔥", foto: "" },
      { nome: "Boscaiola", descrizione: "Funghi, salsiccia e mozzarella", prezzo: "9,50", emoji: "🍄", foto: "" },
      { nome: "Diavola", descrizione: "Salame piccante e mozzarella", prezzo: "8", emoji: "🌶️", foto: "" },
      { nome: "Capricciosa", descrizione: "Prosciutto, funghi, carciofi, olive", prezzo: "9", emoji: "🍕", foto: "" },
    ],
  },
];


/* ============================== 4) MENU PRINCIPALE =========================
   Le Bistecche NON sono qui (stanno nelle Specialità).
   Griglia e Pizze restano anche qui, con la lista completa.
   ========================================================================== */
const MENU = [

  /* ---------------------------------------------------------------- ANTIPASTI */
  {
    id: "antipasti",
    nome: "Antipasti",
    icona: "🥖",
    piatti: [
      { nome: "Tagliere del Vicolo", descrizione: "Salumi e formaggi misti con miele e composte", prezzo: "14", emoji: "🧀", foto: "" },
      { nome: "Bruschette miste", descrizione: "Pane croccante con pomodoro, lardo e funghi", prezzo: "7", emoji: "🍅", foto: "" },
      { nome: "Fritto misto all'italiana", descrizione: "Olive ascolane, mozzarelline e verdure", prezzo: "9", emoji: "🍢", foto: "" },
      { nome: "Provola alla piastra", descrizione: "Fusa con speck croccante e pepe nero", prezzo: "8", emoji: "🧀", foto: "" },
      { nome: "Polpette al sugo", descrizione: "Della nonna, al pomodoro e basilico", prezzo: "8", emoji: "🍖", foto: "" },
      { nome: "Crostini toscani", descrizione: "Con paté di fegatini e cipolla rossa", prezzo: "7", emoji: "🥖", foto: "" },
    ],
  },

  /* -------------------------------------------------------------------- PRIMI */
  {
    id: "primi",
    nome: "Primi",
    icona: "🍝",
    piatti: [
      { nome: "Tagliatelle al ragù", descrizione: "Ragù di manzo cotto a lungo", prezzo: "11", emoji: "🍝", foto: "" },
      { nome: "Rigatoni all'amatriciana", descrizione: "Guanciale, pecorino e pomodoro", prezzo: "10", emoji: "🍝", foto: "" },
      { nome: "Gnocchi al pomodoro", descrizione: "Fatti in casa, pomodoro e basilico", prezzo: "9", emoji: "🥔", foto: "" },
      { nome: "Paccheri cacio e pepe", descrizione: "Pecorino romano e pepe nero", prezzo: "11", emoji: "🧀", foto: "" },
      { nome: "Risotto ai porcini", descrizione: "Mantecato con funghi porcini", prezzo: "12", emoji: "🍄", foto: "" },
      { nome: "Pappardelle al cinghiale", descrizione: "Sugo di cinghiale in umido", prezzo: "12", emoji: "🍝", foto: "" },
    ],
  },

  /* ------------------------------------------------------------------ SECONDI */
  {
    id: "secondi",
    nome: "Secondi",
    icona: "🍖",
    piatti: [
      { nome: "Stinco di maiale al forno", descrizione: "Cottura lenta con patate arrosto", prezzo: "15", emoji: "🍖", foto: "" },
      { nome: "Brasato al Barolo", descrizione: "Manzo brasato nel vino rosso", prezzo: "16", emoji: "🍷", foto: "" },
      { nome: "Cotoletta alla milanese", descrizione: "Impanata e dorata nel burro", prezzo: "14", emoji: "🍖", foto: "" },
      { nome: "Spezzatino con patate", descrizione: "In umido, ricetta di casa", prezzo: "13", emoji: "🥘", foto: "" },
      { nome: "Scaloppine ai funghi", descrizione: "Fettine di vitello e champignon", prezzo: "13", emoji: "🍄", foto: "" },
      { nome: "Coniglio alla cacciatora", descrizione: "Con olive e erbe aromatiche", prezzo: "14", emoji: "🍖", foto: "" },
    ],
  },

  /* ------------------------------------------------------------------- GRIGLIA */
  {
    id: "griglia",
    nome: "Griglia",
    icona: "🔥",
    piatti: [
      { nome: "Grigliata mista del Vicolo", descrizione: "Salsiccia, costine, pancetta e spiedini", prezzo: "20", emoji: "🔥", foto: "" },
      { nome: "Salsiccia alla brace", descrizione: "Nostrana, cotta a legna", prezzo: "10", emoji: "🌭", foto: "" },
      { nome: "Costine di maiale", descrizione: "Marinate e grigliate", prezzo: "14", emoji: "🍖", foto: "" },
      { nome: "Spiedini misti", descrizione: "Carne mista e verdure alla brace", prezzo: "13", emoji: "🍢", foto: "" },
      { nome: "Braciole di maiale", descrizione: "Alla brace con rosmarino", prezzo: "12", emoji: "🍖", foto: "" },
      { nome: "Pancetta arrotolata", descrizione: "Croccante alla griglia", prezzo: "11", emoji: "🥓", foto: "" },
    ],
  },

  /* ------------------------------------------------------------------ CONTORNI */
  {
    id: "contorni",
    nome: "Contorni",
    icona: "🥗",
    piatti: [
      { nome: "Patate al forno", descrizione: "Croccanti al rosmarino", prezzo: "4", emoji: "🥔", foto: "" },
      { nome: "Verdure grigliate", descrizione: "Di stagione, alla brace", prezzo: "5", emoji: "🫑", foto: "" },
      { nome: "Insalata mista", descrizione: "Fresca di giornata", prezzo: "4", emoji: "🥗", foto: "" },
      { nome: "Fagioli all'uccelletto", descrizione: "In umido con salvia", prezzo: "5", emoji: "🫘", foto: "" },
      { nome: "Funghi trifolati", descrizione: "Con aglio e prezzemolo", prezzo: "5", emoji: "🍄", foto: "" },
      { nome: "Spinaci saltati", descrizione: "Al burro o all'aglio", prezzo: "4", emoji: "🥬", foto: "" },
    ],
  },

  /* --------------------------------------------------------------------- PIZZE */
  {
    id: "pizze",
    nome: "Pizze",
    icona: "🍕",
    piatti: [
      { nome: "Margherita", descrizione: "Pomodoro, mozzarella e basilico", prezzo: "6", emoji: "🍕", foto: "" },
      { nome: "Marinara", descrizione: "Pomodoro, aglio e origano", prezzo: "5,50", emoji: "🍅", foto: "" },
      { nome: "Diavola", descrizione: "Salame piccante e mozzarella", prezzo: "8", emoji: "🌶️", foto: "" },
      { nome: "Quattro formaggi", descrizione: "Mozzarella, gorgonzola, grana, provola", prezzo: "8,50", emoji: "🧀", foto: "" },
      { nome: "Capricciosa", descrizione: "Prosciutto, funghi, carciofi, olive", prezzo: "9", emoji: "🍕", foto: "" },
      { nome: "Del Vicolo", descrizione: "Bufala, 'nduja e basilico fresco", prezzo: "10", emoji: "🔥", foto: "" },
      { nome: "Boscaiola", descrizione: "Funghi, salsiccia e mozzarella", prezzo: "9,50", emoji: "🍄", foto: "" },
    ],
  },

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
