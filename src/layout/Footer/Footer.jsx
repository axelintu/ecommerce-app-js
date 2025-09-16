import "./Footer.css"
export default function Footer() {
  return (<footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Conoce fujioka.com</h3>
          <ul>
            <li>Acerca de nosotros</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Atención al cliente</h3>
          <ul>
            <li>Centro de ayuda</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Mi cuenta</h3>
          <ul>
            <li>Mi cuenta</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <ul>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} fujioka.com Todos los derechos reservados.</span>
        <nav>
          <a href="/privacy">Privacidad</a> &nbsp;
          <a href="/terms">Terminos y condiciones</a> &nbsp;
          <a href="/cookies">Cookies</a>
        </nav>
      </div>
    </div>
  </footer>
  );
}