import './Footer.css';
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <span className="mat">mat</span><span className="o">o</span><span className="doo">doo</span>
            </div>
            <div className="footer-tagline">ERP & Business Automation — Tunisia</div>
          </div>
          <div className="footer-links">
            <a href="https://linkedin.com/in/mohamed-ali-trabelsi-619266235" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/medali2000" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://medali2000.github.io" target="_blank" rel="noreferrer">Portfolio ↗</a>
            <a href="tel:+21653019976">+216 53 019 976</a>
            <a href="mailto:tmedali731@gmail.com">tmedali731@gmail.com</a>
          </div>
        </div>
        <p className="footer-copy">© 2026 matodoo — Mohamed Ali Trabelsi. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
