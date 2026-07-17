// src/pages/RoiCalculator.jsx
// Page cachée — accessible uniquement via /roi-calculator
// Cible : leads outbound (Campagne 1) — calcule le coût de la gestion
// manuelle vs l'investissement Odoo, avec décomposition transparente du prix.

import { useMemo, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './RoiCalculator.css';

const nf = new Intl.NumberFormat('fr-TN');
const dt = (v) => `${nf.format(Math.round(v))} DT`;

const SECTORS = [
  { id: 'commerce', label: 'Commerce & Distribution', stock: true },
  { id: 'industrie', label: 'Industrie & Production', stock: true },
  { id: 'import', label: 'Import / Export', stock: true },
  { id: 'services', label: 'Services & Consulting', stock: false },
  { id: 'autre', label: 'Autre secteur', stock: true },
];

const HOSTINGS = [
  { id: 'online', label: 'Odoo Online (SaaS)', monthly: 0, hint: 'Inclus dans la licence' },
  { id: 'sh', label: 'Odoo.sh (cloud dédié)', monthly: 150, hint: '≈ 150 DT/mois' },
  { id: 'onprem', label: 'On-premise (votre serveur)', monthly: 250, hint: '≈ 250 DT/mois amortis' },
];

// Hypothèses prudentes, affichées telles quelles à l'utilisateur
const H = { timeCut: 0.6, errorCut: 0.8, errorCost: 120, stockLossRate: 0.03, stockCut: 0.5 };

function Slider({ label, hint, value, setValue, min, max, step = 1, unit = '' }) {
  return (
    <label className="roi-field">
      <span className="roi-field-head">
        <span>{label}</span>
        <strong>{nf.format(value)}{unit}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export default function RoiCalculator() {
  useTheme(); // applique le thème sauvegardé (clair/sombre)

  // ── Situation actuelle ──
  const [sector, setSector] = useState('commerce');
  const [admins, setAdmins] = useState(4);
  const [hrsWeek, setHrsWeek] = useState(8);
  const [hourCost, setHourCost] = useState(15);
  const [errors, setErrors] = useState(5);
  const [stockValue, setStockValue] = useState(100000);

  // ── Investissement Odoo ──
  const [users, setUsers] = useState(5);
  const [licence, setLicence] = useState(100);
  const [hosting, setHosting] = useState('online');
  const [confDays, setConfDays] = useState(25);
  const [devDays, setDevDays] = useState(5);
  const [trainDays, setTrainDays] = useState(3);
  const [tjm, setTjm] = useState(450);

  const hasStock = SECTORS.find((s) => s.id === sector)?.stock;

  const r = useMemo(() => {
    // Ce que coûte la gestion manuelle (par an)
    const timeCost = admins * hrsWeek * 52 * hourCost;
    const errorCost = errors * 12 * H.errorCost;
    const stockCost = hasStock ? stockValue * H.stockLossRate : 0;
    const manualTotal = timeCost + errorCost + stockCost;

    // Ce qu'Odoo permet d'économiser (hypothèses prudentes)
    const saving = timeCost * H.timeCut + errorCost * H.errorCut + stockCost * H.stockCut;

    // Investissement Odoo
    const hostMonthly = HOSTINGS.find((h) => h.id === hosting).monthly;
    const implem = { conf: confDays * tjm, dev: devDays * tjm, train: trainDays * tjm };
    const implemTotal = implem.conf + implem.dev + implem.train;
    const recurringYear = 12 * (users * licence + hostMonthly);
    const year1 = implemTotal + recurringYear;

    // Rentabilité
    const monthlySaving = saving / 12;
    const payback = monthlySaving > 0 ? year1 / monthlySaving : Infinity;
    const cost3y = year1 + 2 * recurringYear;
    const roi3y = cost3y > 0 ? ((3 * saving - cost3y) / cost3y) * 100 : 0;

    return { timeCost, errorCost, stockCost, manualTotal, saving, implem, implemTotal,
             recurringYear, year1, payback, roi3y, net1: saving - year1 };
  }, [admins, hrsWeek, hourCost, errors, stockValue, hasStock, users, licence, hosting,
      confDays, devDays, trainDays, tjm]);

  const paybackPct = Math.min((r.payback / 36) * 100, 100);
  const verdict =
    r.payback <= 12 ? `Votre investissement serait rentabilisé en ${Math.ceil(r.payback)} mois — moins d'un an.` :
    r.payback <= 24 ? `Votre investissement serait rentabilisé en ${Math.ceil(r.payback)} mois — moins de deux ans.` :
    r.payback <= 36 ? `Rentabilisation estimée en ${Math.ceil(r.payback)} mois. Un cadrage précis permettrait d'optimiser le périmètre.` :
    `Avec ces paramètres, le retour est long — parlons-en pour cibler les modules à plus fort impact.`;

  const wa = `https://wa.me/21653019976?text=${encodeURIComponent(
    `Bonjour Mohamed, j'ai utilisé votre calculateur ROI. Économies estimées : ${dt(r.saving)}/an pour un investissement année 1 de ${dt(r.year1)}. J'aimerais en discuter.`)}`;

  return (
    <div className="roi-page">
      <header className="roi-top">
        <span className="roi-logo">mat<b>odoo</b><i>•</i></span>
        <span className="roi-eyebrow">Ressource gratuite · 5 minutes · aucune inscription</span>
      </header>

      <main className="container">
        <h1 className="roi-h1">Combien vous coûte réellement<br /><span>votre gestion manuelle ?</span></h1>
        <p className="roi-sub">Répondez honnêtement, gardez les chiffres pour vous. Les hypothèses de calcul
          sont affichées — rien n'est caché, rien n'est envoyé.</p>

        {/* ── ÉTAPE 1 : SITUATION ACTUELLE ── */}
        <section className="roi-block">
          <div className="section-label">01 · Votre situation actuelle</div>
          <div className="roi-grid">
            <label className="roi-field">
              <span className="roi-field-head"><span>Votre secteur</span></span>
              <select value={sector} onChange={(e) => setSector(e.target.value)}>
                {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
            <Slider label="Personnes impliquées dans la gestion" value={admins} setValue={setAdmins}
              min={1} max={20} hint="Admin, facturation, achats, stock…" />
            <Slider label="Heures manuelles / semaine / personne" value={hrsWeek} setValue={setHrsWeek}
              min={1} max={25} unit=" h" hint="Ressaisies, Excel, compilations, pointages…" />
            <Slider label="Coût horaire moyen chargé" value={hourCost} setValue={setHourCost}
              min={5} max={60} unit=" DT" />
            <Slider label="Erreurs de saisie / facturation par mois" value={errors} setValue={setErrors}
              min={0} max={30} hint={`Comptées à ${H.errorCost} DT/erreur (correction + retard de paiement)`} />
            {hasStock && (
              <Slider label="Valeur moyenne de votre stock" value={stockValue} setValue={setStockValue}
                min={0} max={1000000} step={10000} unit=" DT"
                hint={`Pertes estimées à ${H.stockLossRate * 100}% /an (ruptures, surstock, démarque)`} />
            )}
          </div>
          <div className="roi-lossbar">
            <span>Coût annuel estimé de votre gestion actuelle</span>
            <strong>{dt(r.manualTotal)} / an</strong>
          </div>
        </section>

        {/* ── ÉTAPE 2 : INVESTISSEMENT ODOO ── */}
        <section className="roi-block">
          <div className="section-label">02 · Votre investissement Odoo — prix décomposé</div>
          <div className="roi-grid">
            <Slider label="Utilisateurs Odoo" value={users} setValue={setUsers} min={1} max={30}
              hint="Seules les personnes qui se connectent paient une licence" />
            <Slider label="Licence par utilisateur / mois" value={licence} setValue={setLicence}
              min={50} max={200} step={5} unit=" DT" hint="Ajustable selon le plan Odoo choisi" />
            <label className="roi-field">
              <span className="roi-field-head"><span>Hébergement</span></span>
              <select value={hosting} onChange={(e) => setHosting(e.target.value)}>
                {HOSTINGS.map((h) => <option key={h.id} value={h.id}>{h.label} — {h.hint}</option>)}
              </select>
            </label>
            <Slider label="Configuration & implémentation" value={confDays} setValue={setConfDays}
              min={10} max={60} unit=" j" hint="Cadrage, paramétrage modules, migration des données, tests" />
            <Slider label="Développements spécifiques" value={devDays} setValue={setDevDays}
              min={0} max={40} unit=" j" hint="Rapports sur mesure, connecteurs, règles métier propres à vous" />
            <Slider label="Formation des équipes" value={trainDays} setValue={setTrainDays}
              min={1} max={10} unit=" j" />
            <Slider label="Tarif journalier consultant" value={tjm} setValue={setTjm}
              min={300} max={600} step={10} unit=" DT" />
          </div>

          <div className="roi-breakdown card-base">
            <h3>Où va votre argent — année 1</h3>
            <ul>
              <li><span>Configuration & implémentation ({confDays} j × {tjm} DT)</span><b>{dt(r.implem.conf)}</b></li>
              <li><span>Développements spécifiques ({devDays} j × {tjm} DT)</span><b>{dt(r.implem.dev)}</b></li>
              <li><span>Formation ({trainDays} j × {tjm} DT)</span><b>{dt(r.implem.train)}</b></li>
              <li><span>Licences + hébergement (12 mois)</span><b>{dt(r.recurringYear)}</b></li>
              <li className="roi-total"><span>Total année 1</span><b>{dt(r.year1)}</b></li>
              <li className="roi-muted"><span>Années suivantes (licences + hébergement seuls)</span><b>{dt(r.recurringYear)} / an</b></li>
            </ul>
          </div>
        </section>

        {/* ── ÉTAPE 3 : RÉSULTAT ── */}
        <section className="roi-block">
          <div className="section-label">03 · Le verdict</div>
          <div className="roi-results">
            <div className="roi-res card-base"><small>Économies estimées</small><strong>{dt(r.saving)}<em>/an</em></strong>
              <small className="roi-hyp">Hypothèses prudentes : −{H.timeCut * 100}% de temps manuel,
                −{H.errorCut * 100}% d'erreurs{hasStock ? `, −${H.stockCut * 100}% de pertes stock` : ''}</small></div>
            <div className="roi-res card-base"><small>Investissement année 1</small><strong>{dt(r.year1)}</strong></div>
            <div className="roi-res card-base roi-res-hero"><small>Gain net dès l'année 1</small>
              <strong className={r.net1 >= 0 ? 'pos' : 'neg'}>{r.net1 >= 0 ? '+' : ''}{dt(r.net1)}</strong>
              <small>ROI sur 3 ans : <b>{r.roi3y > 0 ? '+' : ''}{Math.round(r.roi3y)}%</b></small></div>
          </div>

          <div className="roi-payback card-base">
            <h3>Point d'équilibre</h3>
            <div className="roi-payback-bar">
              <div className="roi-payback-fill" style={{ width: `${paybackPct}%` }} />
              {isFinite(r.payback) && r.payback <= 36 && (
                <span className="roi-payback-marker" style={{ left: `${paybackPct}%` }}>
                  {Math.ceil(r.payback)} mois
                </span>
              )}
            </div>
            <div className="roi-payback-scale"><span>0</span><span>12 mois</span><span>24 mois</span><span>36 mois</span></div>
            <p className="roi-verdict">{verdict}</p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="roi-cta">
          <h2>Le résultat vous surprend ?</h2>
          <p>On en parle 20 minutes — sans engagement. Je vous dirai aussi si Odoo n'est <b>pas</b> le bon choix pour vous.</p>
          <div className="roi-cta-actions">
            <a className="roi-btn" href={wa} target="_blank" rel="noreferrer">Discuter sur WhatsApp →</a>
            <a className="roi-btn ghost" href="mailto:tmedali731@gmail.com?subject=Résultat calculateur ROI">Répondre par email</a>
          </div>
        </section>
      </main>

      <footer className="roi-foot">
        Mohamed Ali Trabelsi — Consultant Odoo — Tunis, Tunisie · <a href="https://matodoo.netlify.app">matodoo.netlify.app</a>
      </footer>
    </div>
  );
}
