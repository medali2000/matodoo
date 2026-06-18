import './Navbar.css';
import { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useScrollEffects';

const SECTION_IDS = ['about', 'services', 'projects', 'training', 'experience', 'contact'];

const NAV_ITEMS = [
  { id: 'about', label: 'À propos' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projets' },
  { id: 'training', label: 'Formation' },
  { id: 'experience', label: 'Expérience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-inner">
        <a href="#" className="logo">
          <span className="logo-mat">mat</span>
          <span className="logo-o">o</span>
          <span className="logo-doo">doo</span>
          <span className="logo-dot"></span>
        </a>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Thème" type="button">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="#contact" className="nav-cta">Me contacter</a>
        </div>
      </div>
    </nav>
  );
}
