import './About.css';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const [labelRef, labelVisible] = useReveal();
  const [photoRef, photoVisible] = useReveal();
  const [contentRef, contentVisible] = useReveal();

  return (
    <section id="about">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>
          À propos
        </div>
        <div className="about-grid">
          <div ref={photoRef} className={`photo-wrap reveal-left ${photoVisible ? 'visible' : ''}`}>
            <div className="photo-ring"></div>
            <div className="photo-circle">
              {/*
                To add your photo:
                1. Place your image file in the /public folder (e.g. public/profile.jpg)
                2. Replace the line below with: <img src="/profile.jpg" alt="Mohamed Ali Trabelsi" />
              */}
              <img src="/profile.png" alt="Mohamed Ali Trabelsi"/>
            </div>
          </div>
          <div ref={contentRef} className={`reveal ${contentVisible ? 'visible' : ''}`}>
            <div className="about-name">Mohamed Ali Trabelsi</div>
            <div className="about-title">ERP Consultant & Full Stack Developer</div>
            <p className="about-bio">
              Ingénieur en informatique diplômé d'ESPRIT, je mets mon expertise au service des
              entreprises pour digitaliser et automatiser leurs opérations. Spécialisé dans
              l'implémentation ERP on-premise, je traduis les besoins métier complexes en solutions
              techniques concrètes — et je transmets ce savoir à travers des formations et bootcamps
              dédiés.
            </p>
            <div className="about-chips">
              <span className="about-chip">📍 Tunisia</span>
              <span className="about-chip">⚡ ERP Expert</span>
              <span className="about-chip">🟢 Freelance disponible</span>
              <span className="about-chip">📞 +216 53 019 976</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
