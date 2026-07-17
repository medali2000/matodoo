// src/pages/PartnerSimulator.jsx
// Page cachée — accessible uniquement via /simulateur-apporteur
// Cible : apporteurs d'affaires (Campagne 2) — simule leurs revenus
// de commission sur les projets Odoo qu'ils introduisent.

import { useMemo, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import './PartnerSimulator.css';

const nf = new Intl.NumberFormat('fr-TN');
const dt = (v) => `${nf.format(Math.round(v))} DT`;

const CONV = [
  { v: 0.3, label: '1 intro sur 3 aboutit (prudent)' },
  { v: 0.5, label: '1 intro sur 2 aboutit (réaliste)' },
  { v: 0.7, label: '2 intros sur 3 aboutissent (réseau chaud)' },
];

const SUPPORT_MONTHLY = 800;   // contrat support moyen DT/mois
const SUPPORT_COMMISSION = 0.10; // part reversée sur le récurrent
const MIN_PER_INTRO = 5;       // minutes pour une intro
const MIN_FOLLOWUP = 30;       // minutes de suivi par projet signé

function Slider({ label, hint, value, setValue, min, max, step = 1, unit = '', fmt }) {
  return (
    <label className="ap-field">
      <span className="ap-field-head">
        <span>{label}</span>
        <strong>{fmt ? fmt(value) : `${nf.format(value)}${unit}`}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export default function PartnerSimulator() {
  useTheme();

  const [intros, setIntros] = useState(4);
  const [conv, setConv] = useState(0.5);
  const [project, setProject] = useState(18000);
  const [pct, setPct] = useState(12);
  const [withSupport, setWithSupport] = useState(true);

  const r = useMemo(() => {
    const deals = intros * conv;
    const dealsShown = Math.max(Math.round(deals * 10) / 10, 0);
    const oneTime = deals * project * (pct / 100);
    // Hypothèse : la moitié des clients signés prennent un contrat de support
    const supportClients = withSupport ? deals * 0.5 : 0;
    const recurringMonthly = supportClients * SUPPORT_MONTHLY * SUPPORT_COMMISSION;
    const year1 = oneTime + recurringMonthly * 6; // récurrent démarre en cours d'année
    const yearN = oneTime + recurringMonthly * 12;

    const minutes = intros * MIN_PER_INTRO + deals * MIN_FOLLOWUP;
    const hours = Math.max(minutes / 60, 0.1);
    const perHour = year1 / hours;

    return { dealsShown, oneTime, recurringMonthly, year1, yearN, minutes, hours, perHour };
  }, [intros, conv, project, pct, withSupport]);

  const wa = `https://wa.me/21653019976?text=${encodeURIComponent(
    `Bonjour Mohamed, j'ai utilisé votre simulateur apporteur d'affaires. Avec ${intros} intro(s)/an, j'arrive à ≈ ${dt(r.year1)} de commissions. Discutons du partenariat.`)}`;

  return (
    <div className="ap-page">
      <header className="ap-top">
        <span className="ap-logo">mat<b>odoo</b><i>•</i></span>
        <span className="ap-eyebrow">Partenariat apporteur d'affaires · simulation 2 minutes</span>
      </header>

      <main className="container">
        <h1 className="ap-h1">Combien vaut <span>votre réseau ?</span></h1>
        <p className="ap-sub">Vous connaissez des dirigeants de PME. Moi, j'implémente Odoo ERP.
          Une introduction de votre part = une commission pour vous. Réglez les curseurs, voyez les chiffres.</p>

        {/* ── PARAMÈTRES ── */}
        <section className="ap-block">
          <div className="section-label">Vos hypothèses</div>
          <div className="ap-grid">
            <Slider label="Introductions par an" value={intros} setValue={setIntros} min={1} max={12}
              hint="Un email ou un message WhatsApp de mise en relation — c'est tout" />
            <label className="ap-field">
              <span className="ap-field-head"><span>Taux de réussite</span></span>
              <select value={conv} onChange={(e) => setConv(Number(e.target.value))}>
                {CONV.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
              </select>
              <small>Vos intros sont pré-qualifiées : le taux réel est souvent supérieur au démarchage classique</small>
            </label>
            <Slider label="Taille moyenne d'un projet" value={project} setValue={setProject}
              min={8000} max={40000} step={1000} fmt={dt}
              hint="Projet type PME (Achats, Ventes, Stock, Compta) ≈ 18 000 DT" />
            <Slider label="Votre commission" value={pct} setValue={setPct} min={10} max={30} unit=" %"
              hint="Versée après encaissement de chaque facture client — convention écrite" />
            <label className="ap-field ap-toggle">
              <span className="ap-field-head">
                <span>Contrats de support mensuels</span>
                <input type="checkbox" checked={withSupport} onChange={(e) => setWithSupport(e.target.checked)} />
              </span>
              <small>Environ 1 client sur 2 prend un support (~{SUPPORT_MONTHLY} DT/mois).
                Vous touchez {SUPPORT_COMMISSION * 100}% chaque mois, en récurrent, tant que le contrat vit.</small>
            </label>
          </div>
        </section>

        {/* ── RÉSULTATS ── */}
        <section className="ap-block">
          <div className="section-label">Ce que ça vous rapporte</div>
          <div className="ap-results">
            <div className="ap-res card-base">
              <small>Projets signés / an</small>
              <strong>≈ {nf.format(r.dealsShown)}</strong>
            </div>
            <div className="ap-res card-base">
              <small>Commissions projets</small>
              <strong>{dt(r.oneTime)}<em>/an</em></strong>
            </div>
            <div className="ap-res card-base">
              <small>Récurrent support</small>
              <strong>{dt(r.recurringMonthly)}<em>/mois</em></strong>
            </div>
            <div className="ap-res card-base ap-res-hero">
              <small>Total première année</small>
              <strong>{dt(r.year1)}</strong>
              <small className="ap-note">≈ {dt(r.yearN)} en rythme de croisière</small>
            </div>
          </div>

          {/* Signature : effort vs gain */}
          <div className="ap-effort card-base">
            <div className="ap-effort-col">
              <small>Votre temps investi</small>
              <strong>{Math.round(r.minutes)} min<em>/an</em></strong>
              <span>{intros} intro(s) × {MIN_PER_INTRO} min + suivi léger</span>
            </div>
            <div className="ap-effort-arrow">→</div>
            <div className="ap-effort-col ap-effort-gain">
              <small>Valeur de votre heure</small>
              <strong>{dt(r.perHour)}<em>/h</em></strong>
              <span>Probablement l'heure la mieux payée de votre année</span>
            </div>
          </div>
        </section>

        {/* ── COMMENT ÇA MARCHE ── */}
        <section className="ap-block">
          <div className="section-label">Comment ça marche</div>
          <div className="ap-steps">
            <div className="card-base"><h3><i>1.</i> Vous faites l'intro</h3>
              <p>Un contact de votre réseau a besoin de digitaliser sa gestion ? Un email ou un WhatsApp de mise en relation suffit.</p></div>
            <div className="card-base"><h3><i>2.</i> Je m'occupe de tout</h3>
              <p>Cadrage, implémentation, formation, support. Vous êtes informé à chaque étape — votre réputation est entre de bonnes mains.</p></div>
            <div className="card-base"><h3><i>3.</i> Vous êtes payé</h3>
              <p>Commission versée après encaissement de chaque facture. Convention écrite, transparence totale sur les montants.</p></div>
          </div>
          <div className="ap-trust">
            <span>Zéro engagement</span><span>Zéro quota</span><span>Convention écrite</span><span>Paiement sous 15 jours</span>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ap-cta">
          <h2>Les chiffres vous parlent ?</h2>
          <p>Discutons-en 15 minutes — je vous montre la grille de commission complète et deux exemples de projets réels.</p>
          <div className="ap-cta-actions">
            <a className="ap-btn" href={wa} target="_blank" rel="noreferrer">Discuter du partenariat →</a>
            <a className="ap-btn ghost" href="mailto:tmedali731@gmail.com?subject=Partenariat apporteur d'affaires">Répondre par email</a>
          </div>
        </section>
      </main>

      <footer className="ap-foot">
        Mohamed Ali Trabelsi — Consultant en implémentation Odoo ERP · +216 53 019 976 · <a href="https://matodoo.netlify.app">matodoo.netlify.app</a>
      </footer>
    </div>
  );
}
