import './Services.css';
import { useReveal } from '../hooks/useReveal';
import RevealCard from './RevealCard';

const SERVICES = [
  { icon: '🔧', title: 'Implémentation ERP', desc: 'Déploiement complet on-premise, configuration des modules métier, migration des données et go-live accompagné.', tag: 'On-Premise · Migration' },
  { icon: '⚙️', title: 'Développement sur mesure', desc: 'Création de modules personnalisés, workflows automatisés, dashboards et intégrations API avec vos outils existants.', tag: 'Python · OWL · API' },
  { icon: '📊', title: 'Consulting & audit', desc: 'Analyse de vos processus, recommandations ERP, optimisation de vos configurations et amélioration des performances.', tag: 'Audit · Optimisation' },
  { icon: '🔗', title: 'Connecteurs & intégrations', desc: 'Synchronisation entre votre ERP et vos plateformes externes : e-commerce, CRM, outils comptables, APIs tierces.', tag: 'REST API · Webhooks' },
  { icon: '🖥️', title: 'Portails & interfaces', desc: 'Développement de portails client/fournisseur, interfaces self-service et tableaux de bord décisionnels.', tag: 'Portal · Dashboard' },
  { icon: '🚀', title: 'Support & maintenance', desc: 'Suivi post-déploiement, résolution d\'anomalies, montées de version et accompagnement des équipes.', tag: 'Support · DevOps' },
];

export default function Services() {
  const [labelRef, labelVisible] = useReveal();
  const [introRef, introVisible] = useReveal();

  return (
    <section id="services">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Services</div>
        <p ref={introRef} className={`section-intro reveal ${introVisible ? 'visible' : ''}`}>
          De l'analyse des besoins au déploiement en production, j'interviens sur l'ensemble du cycle
          de vie de votre solution ERP.
        </p>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <RevealCard key={s.title} delay={i * 60}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="tag">{s.tag}</span>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
