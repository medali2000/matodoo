import './Experience.css';
import { useReveal } from '../hooks/useReveal';

const EXPERIENCES = [
  {
    role: 'ERP Full Stack Developer',
    date: 'Avr 2025 – Présent',
    company: 'Moonside Consulting & Services Tunisia',
    desc: 'Développement de modules sur mesure, optimisation des pipelines de déploiement, automatisation des workflows et création de dashboards décisionnels pour des clients multisecteurs.',
  },
  {
    role: 'Consultant Technique-Fonctionnel',
    date: 'Août 2024 – Avr 2025',
    company: 'Shazler IT — Tunis',
    desc: 'Analyse des besoins clients, configuration des modules ERP, formation des équipes ventes/finance/supply chain et développement de rapports personnalisés.',
  },
  {
    role: 'Implémentation ERP — Stage PFE',
    date: 'Fév 2024 – Août 2024',
    company: "Shazler IT — Usine d'eau minérale",
    desc: "Déploiement ERP complet couvrant la production, l'inventaire et la qualité. UAT, go-live et formation des utilisateurs finaux sur site.",
  },
];

function ExperienceItem({ exp, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`exp-item reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="exp-dot"></div>
      <div className="exp-header">
        <span className="exp-role">{exp.role}</span>
        <span className="exp-date">{exp.date}</span>
      </div>
      <div className="exp-company">{exp.company}</div>
      <div className="exp-desc">{exp.desc}</div>
    </div>
  );
}

export default function Experience() {
  const [labelRef, labelVisible] = useReveal();

  return (
    <section id="experience">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Expérience</div>
        <div className="exp-timeline">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceItem key={exp.role} exp={exp} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
