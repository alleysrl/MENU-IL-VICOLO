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
      const clean = file.name.replace(/[^a-zA-Z0-9.]/g, "-").toLowerCase();
      const name = Date.now() + "-" + clean;
      const r = await fetch(SUPABASE_URL + "/storage/v1/object/foto/" + name, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": file.type || "image/jpeg", "x-upsert": "true" },
        body: file,
      });
      if (!r.ok) throw new Error("upload " + r.status);
      return SUPABASE_URL + "/storage/v1/object/public/foto/" + name;
    },
  };
})();
