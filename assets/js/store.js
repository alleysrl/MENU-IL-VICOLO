/* ============================================================================
   IL VICOLO — "MAGAZZINO" DATI (Supabase)
   ----------------------------------------------------------------------------
   Collega il menu al database Supabase. I clienti LEGGONO il menu; lo staff e i
   titolari SCRIVONO solo con la password giusta (verificata dal server).

   • Le PASSWORD non sono qui: stanno nel database Supabase (al sicuro).
     Per cambiarle: Supabase → SQL Editor →
       update public.app_secrets set pw_staff='...', pw_titolare='...' where id=1;

   • La chiave qui sotto è la "publishable" (pubblica): è fatta apposta per stare
     nel sito. Non è un segreto.
   ========================================================================== */
const Store = (function () {
  "use strict";

  const SUPABASE_URL = "https://jbsicxmtzhzreykewfug.supabase.co";
  const SUPABASE_KEY = "sb_publishable_ic_FZ1TUg82e_KB52tAz1Q_pzqdZkPX";

  const REST = SUPABASE_URL + "/rest/v1";
  const headers = { apikey: SUPABASE_KEY, "Content-Type": "application/json" };

  async function rpc(fn, body) {
    const r = await fetch(REST + "/rpc/" + fn, {
      method: "POST", headers: headers, body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error("Supabase rpc " + fn + " -> " + r.status);
    return r.json();
  }

  async function readContent(key) {
    const r = await fetch(REST + "/menu_content?key=eq." + key + "&select=data", { headers: { apikey: SUPABASE_KEY } });
    if (!r.ok) return null;
    const rows = await r.json();
    const d = rows[0] && rows[0].data;
    return d && Object.keys(d).length ? d : null;   // null se vuoto -> il sito usa il menu di riserva
  }

  // Riduce una foto (max lato lungo = maxSize, JPEG di qualità 'q') prima del caricamento.
  // Se qualcosa va storto, restituisce il file originale (robusto).
  function resizeImage(file, maxSize, q) {
    return new Promise(function (resolve) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        let w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) { resolve(file); return; }
        if (Math.max(w, h) > maxSize) {
          if (w >= h) { h = Math.round(h * maxSize / w); w = maxSize; }
          else { w = Math.round(w * maxSize / h); h = maxSize; }
        }
        try {
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          canvas.toBlob(function (blob) { resolve(blob || file); }, "image/jpeg", q);
        } catch (e) { resolve(file); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    });
  }

  return {
    // ritorna 'titolare' | 'staff' | null
    verifyPassword: function (pwd) { return rpc("verify_pw", { pwd: pwd }); },

    // Menu del Giorno pubblicato (o null se non impostato)
    getGiorno: function () { return readContent("giorno"); },
    saveGiorno: function (data, pwd) { return rpc("save_giorno", { new_data: data, pwd: pwd }); },

    // Modifiche al menu completo (o null) — editor titolare
    getMenu: function () { return readContent("menu"); },
    saveMenu: function (data, pwd) { return rpc("save_menu", { new_data: data, pwd: pwd }); },

    // Carica una foto nel bucket 'foto' e restituisce l'indirizzo pubblico
    uploadPhoto: async function (file) {
      const small = await resizeImage(file, 1080, 0.8);   // rimpicciolita e alleggerita (JPEG)
      const base = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const name = Date.now() + "-" + (base || "foto") + ".jpg";
      const r = await fetch(SUPABASE_URL + "/storage/v1/object/foto/" + name, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "image/jpeg", "x-upsert": "true" },
        body: small,
      });
      if (!r.ok) throw new Error("upload " + r.status);
      return SUPABASE_URL + "/storage/v1/object/public/foto/" + name;
    },
  };
})();
