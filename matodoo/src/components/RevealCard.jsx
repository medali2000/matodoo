import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function RevealCard({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    card.style.transition = 'transform 0s';
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform .4s ease, border-color .3s, box-shadow .3s';
    card.style.transform = '';
  };

  return (
    <div
      ref={(node) => { ref.current = node; cardRef.current = node; }}
      className={`card-base reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
