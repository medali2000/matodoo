import './Training.css';
import { useReveal } from '../hooks/useReveal';
import RevealCard from './RevealCard';

const TRAININGS = [
  { icon: '🎓', title: 'Bootcamp ERP', desc: "Formation intensive sur l'utilisation et la configuration d'un ERP. Idéal pour les équipes en cours de digitalisation.", tag: 'Présentiel / En ligne' },
  { icon: '💻', title: 'Développement ERP', desc: 'Initiation au développement de modules personnalisés : Python backend, OWL frontend et bonnes pratiques techniques.', tag: 'Technique · Hands-on' },
  { icon: '🔄', title: 'Automatisation des processus', desc: "Ateliers pratiques pour identifier, modéliser et automatiser les workflows métier via l'ERP et les outils complémentaires.", tag: 'Workshop · Équipes' },
  { icon: '📈', title: 'Formation utilisateurs', desc: 'Sessions d\'adoption post-déploiement adaptées à chaque profil : ventes, achats, comptabilité, stocks.', tag: 'Sur site · Sur mesure' },
];

export default function Training() {
  const [labelRef, labelVisible] = useReveal();
  const [introRef, introVisible] = useReveal();

  return (
    <section id="training">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Formation & Bootcamps</div>
        <p ref={introRef} className={`section-intro reveal ${introVisible ? 'visible' : ''}`}>
          Je transmets mon expertise à travers des sessions de formation pratiques, des bootcamps
          intensifs et des ateliers sur mesure.
        </p>
        <div className="bootcamp-grid">
          {TRAININGS.map((t, i) => (
            <RevealCard key={t.title} className="bootcamp-card" delay={i * 60}>
              <div className="bootcamp-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className="btag">{t.tag}</span>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
