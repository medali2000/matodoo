import './Contact.css';
import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqebrvd';

const SERVICE_OPTIONS = [
  'Implémentation ERP',
  'Développement sur mesure',
  'Consulting & audit',
  'Connecteurs & intégrations',
  'Formation / Bootcamp',
  'Support & maintenance',
  'Autre',
];

export default function Contact() {
  const [labelRef, labelVisible] = useReveal();
  const [introRef, introVisible] = useReveal();
  const [formRef, formVisible] = useReveal();
  const formElRef = useRef(null);

  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(formElRef.current),
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Contact</div>
        <p ref={introRef} className={`section-intro reveal ${introVisible ? 'visible' : ''}`}>
          Audit gratuit de vos besoins — réponse sous 24h.
        </p>

        <div ref={formRef} className={`form-wrap reveal ${formVisible ? 'visible' : ''}`}>
          {status === 'success' ? (
            <div className="success-msg" style={{ display: 'block' }}>
              ✅ Message envoyé ! Je vous réponds dans les 24h.
            </div>
          ) : (
            <form ref={formElRef} onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input type="text" id="name" name="name" placeholder="Ahmed Ben Ali" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Téléphone / WhatsApp *</label>
                  <input type="tel" id="phone" name="phone" placeholder="+216 XX XXX XXX" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="contact@societe.tn" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Besoin *</label>
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>Choisir un service</option>
                    {SERVICE_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="message">Décrivez votre besoin</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Ex: Nous sommes une entreprise de distribution à Tunis, nous cherchons à automatiser nos achats et notre facturation..."
                  />
                </div>
              </div>
              <input type="hidden" name="source" value="matodoo Landing Page (React)" />
              <input type="hidden" name="_subject" value="Nouveau lead — matodoo" />
              <button type="submit" className="form-submit" disabled={status === 'sending'}>
                <span>
                  {status === 'sending' ? 'Envoi en cours...' : status === 'error' ? 'Erreur — réessayez' : 'Envoyer ma demande'}
                </span>
                <span>{status === 'sending' ? '⏳' : status === 'error' ? '✕' : '→'}</span>
              </button>
              <p className="form-note">Vos données ne sont jamais partagées avec des tiers.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
