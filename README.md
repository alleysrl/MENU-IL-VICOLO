# Il Vicolo — Menu (Braceria • Pizzeria)

Menu digitale a schermo, pensato per il cellulare (ideale per un QR code sul tavolo).
Categorie su **2 colonne**; toccando una categoria le schede dei piatti scorrono con
**animazione tipo carte da poker**. In cima due riquadri speciali: **Menu del Giorno** e
**Specialità**.

---

## 📁 I file

| File | A cosa serve |
|------|--------------|
| `index.html` | La pagina. Di solito non si tocca. |
| `assets/js/menu-data.js` | **👈 QUI si cambia tutto**: piatti, prezzi, Menu del Giorno, Specialità. |
| `assets/js/app.js` | Il funzionamento (carosello, animazioni). Non toccare. |
| `assets/css/style.css` | Colori e stile. Non serve toccarlo. |
| `foto/` | (Opzionale) Cartella dove mettere le tue foto reali. |

> Per vedere il menu sul computer: **doppio clic su `index.html`**. Nessuna installazione.

---

## ✏️ Modificare il menu (metodo facile, da GitHub.com)

Il modo più semplice per aggiornare — anche dal telefono, senza installare programmi:
1. Vai su **github.com** → apri il tuo repository **MENU-IL-VICOLO**.
2. Entra in `assets` → `js` → clicca **`menu-data.js`**.
3. In alto a destra del file clicca l'icona **matita ✏️** (Edit).
4. Cambia i testi tra virgolette → in alto clicca **Commit changes**.
5. Dopo ~1 minuto il sito è aggiornato da solo.

> Se usi anche GitHub Desktop: dopo aver modificato online, prima di rimodificare in locale
> clicca **Pull origin** (scarica l'ultima versione).

---

## 📲 Installare l'app sul telefono (con il logo)

Apri l'indirizzo del menu nel browser del telefono, poi:
- **iPhone (Safari):** tocca **Condividi** ⬆️ → **Aggiungi alla schermata Home**.
- **Android (Chrome):** tocca il menu **⋮** → **Installa app** / **Aggiungi a schermata Home**.

Comparirà l'icona 🔥 **Il Vicolo** come un'app e si aprirà a schermo intero.

---

## 🗓️ Menu del Giorno (cambia ogni giorno)

Apri `assets/js/menu-data.js` e cerca **`MENU_GIORNO`** (in alto). Ogni mattina cambi lì
i piatti delle 4 sezioni (Primi, Secondi, Insalatone, Contorni). **Niente foto**, è una
semplice lista a scorrimento.

- **La data** compare da sola (oggi). Se vuoi scriverla a mano: `data: "Martedì 8 luglio"`.
- **Quando si apre:** è impostato solo a **pranzo, Lun–Ven, 12:00–15:00**. Di sera e nel
  weekend il riquadro è **bloccato** 🔒. Per cambiare orario/giorni modifica:
  ```js
  giorni: [1,2,3,4,5],   // 1=Lun 2=Mar 3=Mer 4=Gio 5=Ven 6=Sab 0=Dom
  apre: "12:00",
  chiude: "15:00",
  ```
- **Vederlo a qualsiasi ora (per una prova o per mostrarlo):** apri l'indirizzo aggiungendo
  `?anteprima` in fondo →
  `https://alleysrl.github.io/MENU-IL-VICOLO/?anteprima`
  Così il Menu del Giorno si apre anche di sera o nel weekend, **solo per te**; i clienti con
  l'indirizzo normale continuano a vedere il blocco orario.

## ⭐ Specialità

Cerca **`MENU_SPECIALITA`**: è il sotto-menu con **Bistecche · Griglia · Pizze**.
Metti qui solo la **selezione speciale** (le Bistecche stanno solo qui; di Griglia e Pizze
puoi mettere pochi piatti scelti — quelli completi restano nel menu principale).

---

## ✏️ Piatti, prezzi e foto (menu principale)

Sempre in `menu-data.js`, sezione **`MENU`**:
- **Testo/prezzo:** cambia ciò che è tra virgolette. Il prezzo è solo il numero
  (il simbolo € è automatico). Esempio:
  ```js
  { nome: "Margherita", descrizione: "Pomodoro, mozzarella e basilico", prezzo: "6,50", emoji: "🍕", foto: "" },
  ```
- **Aggiungere un piatto:** copia una riga `{ ... },` e incollala, poi cambia i testi.

### Foto
Ora le schede mostrano **un'icona elegante** (coerente e ordinata). Quando avrai le foto vere:
1. Crea la cartella `foto` e mettici le immagini (es. `margherita.jpg`).
2. Nel piatto scrivi `foto: "foto/margherita.jpg"` (oppure un link a un'immagine online).
Se lasci `foto: ""` resta la bella icona.

---

## 🔄 Aggiornare il sito online (GitHub Desktop)

Dopo aver modificato i file, per mandare le modifiche online:
1. Apri **GitHub Desktop** (vedrai elencate le modifiche fatte).
2. In basso a sinistra scrivi due parole nel riquadro *Summary* (es. "aggiorno menu del giorno").
3. Clicca **Commit to main**.
4. In alto clicca **Push origin**.
5. Dopo ~1 minuto il sito online è aggiornato:
   `https://alleysrl.github.io/MENU-IL-VICOLO/`

### 📱 QR code per il tavolo
Genera un QR code gratuito da quell'indirizzo (cerca "QR code generator"), stampalo e mettilo
sui tavoli: i clienti inquadrano e vedono il menu.

---

## 🎨 Colori
Palette da braceria/pizzeria (brace, legno bruciato, oro, mattone). Si cambia in cima a
`assets/css/style.css` (sezione `:root`).
