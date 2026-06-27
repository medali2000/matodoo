import './Hero.css';
import { useTypewriter } from '../hooks/useTypewriter';
import { useCountUp } from '../hooks/useCountUp';

const PHRASES = [
  "l'ERP qu'il vous faut",
  "la solution sur mesure",
  "l'automatisation métier",
  "votre transformation digitale",
];

function StatCard({ target, suffix, label }) {
  const [ref, display] = useCountUp(target, suffix);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-num">{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(PHRASES);

  return (
    <div className="hero">
      <div className="hero-grid-bg"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="container">
        <div className="hero-eyebrow">ERP · Automation · On-Premise · Tunisia</div>
        <h1>
          Je transforme vos<br />opérations avec<br />
          <span className="highlight">{typed}</span>
        </h1>
        <p className="hero-sub">
          Développeur Full Stack & Consultant ERP basé en Tunisie. J'implémente, personnalise et
          automatise des solutions de gestion sur mesure — et je forme les équipes qui les utilisent.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">Démarrer un projet →</a>
          <a href="https://medali2000.github.io/" target="_blank" rel="noreferrer" className="btn-ghost">
            Voir mon portfolio ↗
          </a>
        </div>
        <div className="hero-stats">
          <StatCard target={2} suffix="+" label="ans d'expérience ERP" />
          <StatCard target={10} suffix="+" label="projets livrés" />
          <StatCard target={100} suffix="%" label="déploiements on-premise" />
        </div>
      </div>
    </div>
  );
}
