import './Projects.css';
import { useReveal } from '../hooks/useReveal';
import RevealCard from './RevealCard';

const PROJECTS = [
  { icon: '🏭', title: "Usine d'eau minérale", desc: 'Implémentation complète ERP pour une usine de production : gestion de la fabrication, contrôle qualité, inventaire et traçabilité.', tags: ['Manufacturing', 'Inventory', 'Quality'] },
  { icon: '🏪', title: 'Réseau de points de vente', desc: 'Déploiement multi-magasins avec synchronisation en temps réel des stocks, gestion de caisse et rapports consolidés.', tags: ['POS', 'Multi-site', 'Reporting'] },
  { icon: '🏗️', title: 'Entreprise de construction', desc: "Gestion des projets, suivi des chantiers, facturation à l'avancement et contrôle des coûts par projet.", tags: ['Project', 'Invoicing', 'Costing'] },
  { icon: '🔌', title: 'Connecteurs & intégrations', desc: 'Développement de connecteurs sur mesure entre ERP et plateformes externes : passerelles de paiement, marketplaces, outils RH.', tags: ['API', 'Webhooks', 'Automation'] },
];

export default function Projects() {
  const [labelRef, labelVisible] = useReveal();
  const [introRef, introVisible] = useReveal();

  return (
    <section id="projects">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Projets réalisés</div>
        <p ref={introRef} className={`section-intro reveal ${introVisible ? 'visible' : ''}`}>
          Des déploiements concrets dans des secteurs variés — preuve qu'un bon ERP s'adapte à
          n'importe quel métier.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <RevealCard key={p.title} delay={i * 60}>
              <span className="project-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
