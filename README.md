# Il Vicolo — Menu (Braceria • Pizzeria)

Menu digitale a schermo, pensato per il cellulare (ideale per un QR code sul tavolo).
Categorie disposte su **2 colonne**; toccando una categoria le foto dei piatti
scorrono in un carosello con **animazione tipo carte da poker**.

---

## 📁 I file

| File | A cosa serve |
|------|--------------|
| `index.html` | La pagina. Di solito non si tocca. |
| `assets/js/menu-data.js` | **👈 QUI si cambia il menu**: piatti, prezzi, foto. |
| `assets/js/app.js` | Il funzionamento (carosello, animazioni). Non toccare. |
| `assets/css/style.css` | I colori e lo stile. Non serve toccarlo. |
| `foto/` | (Opzionale) Cartella dove mettere le tue foto reali. |

---

## 👀 Vedere il menu sul tuo computer

Fai **doppio clic su `index.html`**: si apre nel browser e vedrai già tutto
(le foto d'esempio compaiono se sei connesso a internet). Nessuna installazione.

---

## ✏️ Come cambiare i piatti, i prezzi e le foto

Apri **`assets/js/menu-data.js`** con un qualsiasi editor di testo.

- **Testo/prezzo:** cambia ciò che è tra virgolette. Il prezzo è solo il numero
  (il simbolo € è aggiunto in automatico). Esempio:
  ```js
  { nome: "Margherita", descrizione: "Pomodoro, mozzarella e basilico", prezzo: "6,50", emoji: "🍕", foto: "..." },
  ```
- **Aggiungere un piatto:** copia una riga `{ ... },` e incollala, poi cambia i testi.
- **Aggiungere una categoria:** copia un intero blocco `{ id:"...", ... piatti:[...] },`
  (ogni `id` deve essere diverso).

### Mettere le TUE foto
Due modi:
1. **Da un link:** incolla l'indirizzo di un'immagine online tra le virgolette di `foto:`.
2. **Da file tuoi:** crea la cartella `foto`, mettici le immagini (es. `margherita.jpg`)
   e scrivi `foto: "foto/margherita.jpg"`.

> Le foto attuali sono d'esempio (servizio gratuito online) e vanno sostituite con
> le foto vere del ristorante. Se una foto non si carica, appare un'icona colorata al suo posto.

---

## 🚀 Pubblicare online su GitHub Pages

1. Vai su **github.com** → crea un nuovo repository (es. `il-vicolo-menu`), pubblico.
2. Carica **tutti** i file di questa cartella (trascinali nella pagina del repository,
   oppure usa "Add file → Upload files"). Mantieni la struttura delle cartelle.
3. Nel repository: **Settings → Pages**.
4. In *Branch* scegli `main` e cartella `/ (root)`, poi **Save**.
5. Dopo circa un minuto il menu sarà online a un indirizzo tipo:
   `https://TUO-UTENTE.github.io/il-vicolo-menu/`

### 📱 QR code per il tavolo
Prendi l'indirizzo qui sopra e generane un QR code gratuito (cerca "QR code generator").
Stampalo e mettilo sui tavoli: i clienti inquadrano e vedono il menu.

---

## 🎨 Colori
La palette richiama la braceria/pizzeria: brace arancione, legno bruciato, oro caldo,
rosso mattone. Si possono cambiare in cima a `assets/css/style.css` (sezione `:root`).
