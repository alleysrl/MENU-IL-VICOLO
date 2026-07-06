/* ============================================================================
   IL VICOLO — DATI DEL MENU
   ----------------------------------------------------------------------------
   Questo è l'UNICO file che devi modificare per cambiare il menu.

   COME MODIFICARE:
   • Cambia i testi tra virgolette "..." (nome, descrizione, prezzo).
   • Il prezzo è solo il numero (senza €). Es: "8,50". Il simbolo € è aggiunto
     in automatico. Se un piatto non ha prezzo, scrivi  prezzo: ""
   • La foto: incolla un link a un'immagine (es. Unsplash) oppure il nome di un
     file dentro la cartella "foto", es:  foto: "foto/margherita.jpg"
   • L'emoji serve come icona di riserva se la foto non si carica.

   COME AGGIUNGERE UN PIATTO:
   Copia una riga  { ... },  e incollala sopra o sotto, cambiando i testi.

   COME AGGIUNGERE UNA CATEGORIA:
   Copia un blocco  { id:"...", nome:"...", icona:"...", piatti:[ ... ] },
   Ricorda: ogni "id" deve essere diverso dagli altri.
   ========================================================================== */

const RISTORANTE = {
  nome: "Il Vicolo",
  sottotitolo: "Braceria • Pizzeria",
  tagline: "Carne alla brace e pizza cotta a legna",
  indirizzo: "Via del Vicolo 12 — Città (XX)",
  telefono: "+39 000 000 0000",
  orari: "Mar–Dom 19:00 – 24:00 · Lunedì chiuso",
  valuta: "€",
};

const MENU = [

  /* ---------------------------------------------------------------- ANTIPASTI */
  {
    id: "antipasti",
    nome: "Antipasti",
    icona: "🥖",
    piatti: [
      { nome: "Tagliere del Vicolo", descrizione: "Salumi e formaggi misti con miele e composte", prezzo: "14", emoji: "🧀", foto: "https://loremflickr.com/800/600/charcuterie?lock=1" },
      { nome: "Bruschette miste", descrizione: "Pane croccante con pomodoro, lardo e funghi", prezzo: "7", emoji: "🍅", foto: "https://loremflickr.com/800/600/bruschetta?lock=2" },
      { nome: "Fritto misto all'italiana", descrizione: "Olive ascolane, mozzarelline e verdure", prezzo: "9", emoji: "🍢", foto: "https://loremflickr.com/800/600/fried?lock=3" },
      { nome: "Provola alla piastra", descrizione: "Fusa con speck croccante e pepe nero", prezzo: "8", emoji: "🧀", foto: "https://loremflickr.com/800/600/cheese?lock=4" },
      { nome: "Polpette al sugo", descrizione: "Della nonna, al pomodoro e basilico", prezzo: "8", emoji: "🍖", foto: "https://loremflickr.com/800/600/meatball?lock=5" },
      { nome: "Crostini toscani", descrizione: "Con paté di fegatini e cipolla rossa", prezzo: "7", emoji: "🥖", foto: "https://loremflickr.com/800/600/crostini?lock=6" },
    ],
  },

  /* -------------------------------------------------------------------- PRIMI */
  {
    id: "primi",
    nome: "Primi",
    icona: "🍝",
    piatti: [
      { nome: "Tagliatelle al ragù", descrizione: "Ragù di manzo cotto a lungo", prezzo: "11", emoji: "🍝", foto: "https://loremflickr.com/800/600/tagliatelle?lock=7" },
      { nome: "Rigatoni all'amatriciana", descrizione: "Guanciale, pecorino e pomodoro", prezzo: "10", emoji: "🍝", foto: "https://loremflickr.com/800/600/pasta?lock=8" },
      { nome: "Gnocchi al pomodoro", descrizione: "Fatti in casa, pomodoro e basilico", prezzo: "9", emoji: "🥔", foto: "https://loremflickr.com/800/600/gnocchi?lock=9" },
      { nome: "Paccheri cacio e pepe", descrizione: "Pecorino romano e pepe nero", prezzo: "11", emoji: "🧀", foto: "https://loremflickr.com/800/600/spaghetti?lock=10" },
      { nome: "Risotto ai porcini", descrizione: "Mantecato con funghi porcini", prezzo: "12", emoji: "🍄", foto: "https://loremflickr.com/800/600/risotto?lock=11" },
      { nome: "Pappardelle al cinghiale", descrizione: "Sugo di cinghiale in umido", prezzo: "12", emoji: "🍝", foto: "https://loremflickr.com/800/600/pasta?lock=12" },
    ],
  },

  /* ------------------------------------------------------------------ SECONDI */
  {
    id: "secondi",
    nome: "Secondi",
    icona: "🍖",
    piatti: [
      { nome: "Stinco di maiale al forno", descrizione: "Cottura lenta con patate arrosto", prezzo: "15", emoji: "🍖", foto: "https://loremflickr.com/800/600/pork?lock=13" },
      { nome: "Brasato al Barolo", descrizione: "Manzo brasato nel vino rosso", prezzo: "16", emoji: "🍷", foto: "https://loremflickr.com/800/600/beef?lock=14" },
      { nome: "Cotoletta alla milanese", descrizione: "Impanata e dorata nel burro", prezzo: "14", emoji: "🍖", foto: "https://loremflickr.com/800/600/schnitzel?lock=15" },
      { nome: "Spezzatino con patate", descrizione: "In umido, ricetta di casa", prezzo: "13", emoji: "🥘", foto: "https://loremflickr.com/800/600/stew?lock=16" },
      { nome: "Scaloppine ai funghi", descrizione: "Fettine di vitello e champignon", prezzo: "13", emoji: "🍄", foto: "https://loremflickr.com/800/600/meat?lock=17" },
      { nome: "Coniglio alla cacciatora", descrizione: "Con olive e erbe aromatiche", prezzo: "14", emoji: "🍖", foto: "https://loremflickr.com/800/600/meat?lock=18" },
    ],
  },

  /* ------------------------------------------------------------------- GRIGLIA */
  {
    id: "griglia",
    nome: "Griglia",
    icona: "🔥",
    piatti: [
      { nome: "Grigliata mista del Vicolo", descrizione: "Salsiccia, costine, pancetta e spiedini", prezzo: "20", emoji: "🔥", foto: "https://loremflickr.com/800/600/barbecue?lock=19" },
      { nome: "Salsiccia alla brace", descrizione: "Nostrana, cotta a legna", prezzo: "10", emoji: "🌭", foto: "https://loremflickr.com/800/600/sausage?lock=20" },
      { nome: "Costine di maiale", descrizione: "Marinate e grigliate", prezzo: "14", emoji: "🍖", foto: "https://loremflickr.com/800/600/ribs?lock=21" },
      { nome: "Spiedini misti", descrizione: "Carne mista e verdure alla brace", prezzo: "13", emoji: "🍢", foto: "https://loremflickr.com/800/600/skewer?lock=22" },
      { nome: "Braciole di maiale", descrizione: "Alla brace con rosmarino", prezzo: "12", emoji: "🍖", foto: "https://loremflickr.com/800/600/grill?lock=23" },
      { nome: "Pancetta arrotolata", descrizione: "Croccante alla griglia", prezzo: "11", emoji: "🥓", foto: "https://loremflickr.com/800/600/bacon?lock=24" },
    ],
  },

  /* ----------------------------------------------------------------- BISTECCHE */
  {
    id: "bistecche",
    nome: "Bistecche",
    icona: "🥩",
    piatti: [
      { nome: "Bistecca alla Fiorentina", descrizione: "Chianina al sangue · prezzo all'etto", prezzo: "6", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=25" },
      { nome: "Costata di manzo", descrizione: "Frollata, circa 500 g", prezzo: "24", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=26" },
      { nome: "Filetto di manzo", descrizione: "Taglio pregiato, cottura a scelta", prezzo: "22", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=27" },
      { nome: "Tomahawk", descrizione: "Circa 1 kg, ideale per due", prezzo: "55", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=28" },
      { nome: "Picanha alla brace", descrizione: "Taglio brasiliano, succoso", prezzo: "19", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=29" },
      { nome: "Tagliata di manzo", descrizione: "Con rucola e scaglie di grana", prezzo: "18", emoji: "🥩", foto: "https://loremflickr.com/800/600/steak?lock=30" },
    ],
  },

  /* ------------------------------------------------------------------ CONTORNI */
  {
    id: "contorni",
    nome: "Contorni",
    icona: "🥗",
    piatti: [
      { nome: "Patate al forno", descrizione: "Croccanti al rosmarino", prezzo: "4", emoji: "🥔", foto: "https://loremflickr.com/800/600/potato?lock=31" },
      { nome: "Verdure grigliate", descrizione: "Di stagione, alla brace", prezzo: "5", emoji: "🫑", foto: "https://loremflickr.com/800/600/vegetables?lock=32" },
      { nome: "Insalata mista", descrizione: "Fresca di giornata", prezzo: "4", emoji: "🥗", foto: "https://loremflickr.com/800/600/salad?lock=33" },
      { nome: "Fagioli all'uccelletto", descrizione: "In umido con salvia", prezzo: "5", emoji: "🫘", foto: "https://loremflickr.com/800/600/beans?lock=34" },
      { nome: "Funghi trifolati", descrizione: "Con aglio e prezzemolo", prezzo: "5", emoji: "🍄", foto: "https://loremflickr.com/800/600/mushroom?lock=35" },
      { nome: "Spinaci saltati", descrizione: "Al burro o all'aglio", prezzo: "4", emoji: "🥬", foto: "https://loremflickr.com/800/600/spinach?lock=36" },
    ],
  },

  /* --------------------------------------------------------------------- PIZZE */
  {
    id: "pizze",
    nome: "Pizze",
    icona: "🍕",
    piatti: [
      { nome: "Margherita", descrizione: "Pomodoro, mozzarella e basilico", prezzo: "6", emoji: "🍕", foto: "https://loremflickr.com/800/600/pizza?lock=37" },
      { nome: "Marinara", descrizione: "Pomodoro, aglio e origano", prezzo: "5,50", emoji: "🍅", foto: "https://loremflickr.com/800/600/pizza?lock=38" },
      { nome: "Diavola", descrizione: "Salame piccante e mozzarella", prezzo: "8", emoji: "🌶️", foto: "https://loremflickr.com/800/600/pizza?lock=39" },
      { nome: "Quattro formaggi", descrizione: "Mozzarella, gorgonzola, grana, provola", prezzo: "8,50", emoji: "🧀", foto: "https://loremflickr.com/800/600/pizza?lock=40" },
      { nome: "Capricciosa", descrizione: "Prosciutto, funghi, carciofi, olive", prezzo: "9", emoji: "🍕", foto: "https://loremflickr.com/800/600/pizza?lock=41" },
      { nome: "Del Vicolo", descrizione: "Bufala, 'nduja e basilico fresco", prezzo: "10", emoji: "🔥", foto: "https://loremflickr.com/800/600/pizza?lock=42" },
      { nome: "Boscaiola", descrizione: "Funghi, salsiccia e mozzarella", prezzo: "9,50", emoji: "🍄", foto: "https://loremflickr.com/800/600/pizza?lock=43" },
    ],
  },

  /* --------------------------------------------------------------------- DOLCI */
  {
    id: "dolci",
    nome: "Dolci",
    icona: "🍰",
    piatti: [
      { nome: "Tiramisù della casa", descrizione: "Classico, fatto in casa", prezzo: "5", emoji: "🍮", foto: "https://loremflickr.com/800/600/tiramisu?lock=44" },
      { nome: "Panna cotta", descrizione: "Ai frutti di bosco", prezzo: "5", emoji: "🍓", foto: "https://loremflickr.com/800/600/dessert?lock=45" },
      { nome: "Cannolo siciliano", descrizione: "Ricotta e gocce di cioccolato", prezzo: "5", emoji: "🥮", foto: "https://loremflickr.com/800/600/dessert?lock=46" },
      { nome: "Tortino al cioccolato", descrizione: "Caldo, dal cuore morbido", prezzo: "6", emoji: "🍫", foto: "https://loremflickr.com/800/600/chocolate?lock=47" },
      { nome: "Gelato artigianale", descrizione: "Gusti a scelta", prezzo: "4", emoji: "🍨", foto: "https://loremflickr.com/800/600/icecream?lock=48" },
      { nome: "Sbrisolona", descrizione: "Con crema al mascarpone", prezzo: "5", emoji: "🍰", foto: "https://loremflickr.com/800/600/cake?lock=49" },
    ],
  },

  /* ---------------------------------------------------------------------- BERE */
  {
    id: "bere",
    nome: "Bere",
    icona: "🍷",
    piatti: [
      { nome: "Acqua naturale / frizzante", descrizione: "Bottiglia 75 cl", prezzo: "2", emoji: "💧", foto: "https://loremflickr.com/800/600/water?lock=50" },
      { nome: "Bibite in lattina", descrizione: "Cola, aranciata, tè freddo", prezzo: "3", emoji: "🥤", foto: "https://loremflickr.com/800/600/soda?lock=51" },
      { nome: "Birra artigianale", descrizione: "Alla spina, 0,4 L", prezzo: "5", emoji: "🍺", foto: "https://loremflickr.com/800/600/beer?lock=52" },
      { nome: "Calice di vino della casa", descrizione: "Rosso o bianco", prezzo: "4", emoji: "🍷", foto: "https://loremflickr.com/800/600/wine?lock=53" },
      { nome: "Chianti DOCG", descrizione: "Bottiglia 75 cl", prezzo: "18", emoji: "🍷", foto: "https://loremflickr.com/800/600/wine?lock=54" },
      { nome: "Montepulciano d'Abruzzo", descrizione: "Bottiglia 75 cl", prezzo: "15", emoji: "🍷", foto: "https://loremflickr.com/800/600/wine?lock=55" },
    ],
  },

  /* -------------------------------------------------------------- CAFFETTERIA */
  {
    id: "caffetteria",
    nome: "Caffetteria",
    icona: "☕",
    piatti: [
      { nome: "Caffè espresso", descrizione: "Miscela della casa", prezzo: "1,20", emoji: "☕", foto: "https://loremflickr.com/800/600/espresso?lock=56" },
      { nome: "Cappuccino", descrizione: "Cremoso e schiumato", prezzo: "1,50", emoji: "☕", foto: "https://loremflickr.com/800/600/cappuccino?lock=57" },
      { nome: "Caffè corretto", descrizione: "Con grappa o sambuca", prezzo: "2", emoji: "☕", foto: "https://loremflickr.com/800/600/coffee?lock=58" },
      { nome: "Amaro della casa", descrizione: "Digestivo alle erbe", prezzo: "4", emoji: "🍸", foto: "https://loremflickr.com/800/600/liquor?lock=59" },
      { nome: "Grappa", descrizione: "Barricata o bianca", prezzo: "4", emoji: "🥃", foto: "https://loremflickr.com/800/600/whiskey?lock=60" },
      { nome: "Tisana / Tè", descrizione: "Alla frutta o classico", prezzo: "2,50", emoji: "🍵", foto: "https://loremflickr.com/800/600/tea?lock=61" },
    ],
  },

];
