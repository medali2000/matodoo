import './Stack.css';
import { useReveal } from '../hooks/useReveal';

const STACK = [
  { name: 'ERP (Odoo)', highlight: true },
  { name: 'Python', highlight: true },
  { name: 'OWL Framework', highlight: true },
  { name: 'On-Premise', highlight: true },
  { name: 'Community Edition', highlight: true },
  { name: 'JavaScript' },
  { name: 'Docker' },
  { name: 'PostgreSQL' },
  { name: 'CI/CD' },
  { name: 'Prometheus' },
  { name: 'Grafana' },
  { name: 'Angular' },
  { name: 'Spring Boot' },
  { name: 'REST API' },
];

export default function Stack() {
  const [labelRef, labelVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section id="stack">
      <div className="container">
        <div ref={labelRef} className={`section-label reveal ${labelVisible ? 'visible' : ''}`}>Stack technique</div>
        <div ref={gridRef} className={`stack-grid reveal ${gridVisible ? 'visible' : ''}`}>
          {STACK.map((s) => (
            <span key={s.name} className={`stack-pill ${s.highlight ? 'highlight' : ''}`}>{s.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
