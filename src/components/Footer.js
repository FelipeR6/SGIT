import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <p>&copy; 2024-2025 SGIT. Todos los derechos reservados.</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacidad</a></li>
          <li className="list-inline-item"><a href="#">Términos</a></li>
          <li className="list-inline-item"><a href="#">Soporte</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
